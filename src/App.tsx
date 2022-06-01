import React, { useEffect } from 'react';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import { COURSES_PATH, LOGIN_PATH, LOGOUT_PATH, ROUTES } from './config/routes-config';
import Navigator from './components/navigators/Navigator';
import { useDispatch, useSelector } from 'react-redux';
import { StateType } from './redux/store';
import { ClientData, emptyClientData } from './models/ClientData';
import { RouteType } from './models/RouteType';
import { coursesService } from './config/service-config';
import { authAction, setCourses, setOperationCode } from './redux/actions';
import { OperationCode } from './models/OperationCode';
import ActionConfirmation from './components/dialogs/ActionConfirmation';
import { Box, LinearProgress, Paper } from '@mui/material';


const App: React.FC = () => {
  const dispatch = useDispatch();
  const clientData: ClientData = useSelector<StateType, ClientData>(state => state.clientData);
  const operationCode: OperationCode = useSelector<StateType, OperationCode>(state => state.operationCode);
  const [block, setBlock] = React.useState(false);

  const serverErr = {title: 'ERROR - The server is unavailable. Trying to reconnect', content: <LinearProgress/>};
  const unknownErr = {title: 'Oops something went wrong', content: ''}




  //useImitator();
  useEffect(() => {
    coursesService.get().then(courses => {
      dispatch(setCourses(courses));
      dispatch(setOperationCode(OperationCode.OK))
    }).catch(err => dispatch(setOperationCode(err)))
  }, [operationCode, clientData])
  const [flNavigate, setFlNavigate] = React.useState<boolean>(true);
  const relevantItems: RouteType[] = React.useMemo<RouteType[]>(() => getRelevantItems(clientData), [clientData])
  React.useEffect(() => setFlNavigate(false), [])
  function operationCodeHandler() {
    switch (operationCode) {
      case OperationCode.AUTH_ERROR: dispatch(authAction(emptyClientData)); break;
      case OperationCode.SERVER_UNAVAILABLE:
        setBlock(true);
        coursesService.get().then(() => dispatch(setOperationCode(OperationCode.OK)))
        break;
      case OperationCode.UNKNOWN: setBlock(true); break;
      default: setBlock(false); break;
    }
  }
  const operationCodeCallback = React.useCallback(operationCodeHandler, [operationCode]);
  React.useEffect(() => {
    const interval = setInterval(operationCodeCallback, 2000);
    return () => clearInterval(interval)
  }, [operationCodeCallback])


  return block ?
    <Box sx={{ display: 'flex', justifyContent: 'center' }}>
        <ActionConfirmation 
          open={block} 
          title = {operationCode==OperationCode.SERVER_UNAVAILABLE ? serverErr.title : (operationCode==OperationCode.UNKNOWN ? unknownErr.title : 'successfully connected')} 
          content= {operationCode==OperationCode.SERVER_UNAVAILABLE ?  serverErr.content : (operationCode==OperationCode.UNKNOWN ? unknownErr.content : '')} />
    </Box> 
    :<BrowserRouter>
      <Navigator items={relevantItems} />
      {flNavigate && (clientData.email ? <Navigate to={COURSES_PATH}></Navigate> :
        <Navigate to={LOGIN_PATH}></Navigate>)}
      <Routes>
        {getRoutes(relevantItems, clientData)}
      </Routes>
    </BrowserRouter>
}

export default App;
function getRoutes(relevantItems: RouteType[], clientData: ClientData): React.ReactNode {
  const logoutRoute = relevantItems.find(ri => ri.path === LOGOUT_PATH);
  if (logoutRoute) {
    logoutRoute.label = clientData.displayName;
  }
  return relevantItems.map(r => <Route key={r.path} path={r.path} element={r.element} />)
}

function getRelevantItems(clientData: ClientData): RouteType[] {
  return ROUTES.filter(r => (!!clientData.email && r.authenticated) ||
    (!clientData.email && !r.authenticated && !r.administrator) || (clientData.isAdmin && r.administrator))
}

