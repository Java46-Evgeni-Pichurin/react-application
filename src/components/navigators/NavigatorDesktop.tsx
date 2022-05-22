import { AppBar, Avatar, Box, Tab, Typography } from '@mui/material';
import Tabs from '@mui/material/Tabs';
import React from 'react';
import { Link as RouterLink, useLocation } from 'react-router-dom';
import { RouteType } from '../../models/RouteType';
import { getRouteIndex } from '../../util/functions';
import PersonIcon from '@mui/icons-material/Person';
import { useSelector } from 'react-redux';
import { StateType } from '../../redux/store';
import { ClientData } from '../../models/ClientData';

const NavigatorDesktop: React.FC<{ items: RouteType[] }> = ({ items }) => {
    const location = useLocation();
    const getRouteIndexCallback = React.useCallback(getRouteIndex, [items, location])
    const tabNumber = getRouteIndexCallback(items, location.pathname);
    const currentUser = useSelector<StateType, ClientData>(state => state.clientData);
    function getTabs(): React.ReactNode {
        return items.map(item => <Tab style={{color: 'white'}} key={item.path} component={RouterLink} to={item.path} label={item.label} />) 
    }
    return <AppBar position={'fixed'}>
        <Box>
            <Tabs indicatorColor='secondary' value={tabNumber} >
            {getTabs()}
            <Avatar sx={{ m: 1, bgcolor: 'secondary.main', align: 'end'}}>
                <PersonIcon />            
            </Avatar>
                <Typography sx={{
                    fontSize: '1.5vw',
                    paddingTop: '10px'
                }}>
                {currentUser.displayName}
                </Typography>
            </Tabs>
            </Box>
        </AppBar>
}
export default NavigatorDesktop;
