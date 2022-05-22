import React from 'react';
import { RouteType } from '../../models/RouteType';
import { Link as RouterLink, useLocation } from 'react-router-dom';
import MenuIcon from '@mui/icons-material/Menu'
import { AppBar, IconButton, ListItem, Toolbar, Typography, Drawer, List, Avatar } from '@mui/material';
import { getRouteIndex } from '../../util/functions';
import PersonIcon from '@mui/icons-material/Person';
import { useSelector } from 'react-redux';
import { StateType } from '../../redux/store';
import { ClientData } from '../../models/ClientData';
const NavigatorMobile: React.FC<{items: RouteType[]}> = ({items}) => {
    
    const [flOpen, setOpen] = React.useState<boolean>(false);
    const location = useLocation();
    const getRouteIndexCallback = React.useCallback(getRouteIndex, [items, location])
    const index = getRouteIndexCallback(items, location.pathname);
    const currentUser = useSelector<StateType, ClientData>(state => state.clientData);
   
    function toggleOpen() {
        setOpen(!flOpen);
    }
    function getListItems(): React.ReactNode {
        return items.map(i => <ListItem onClick={toggleOpen} component={RouterLink} to={i.path} key={i.path}>{i.label}</ListItem>)
    }
    return <AppBar position="fixed">
        <Toolbar><IconButton onClick={toggleOpen} style={{color: 'white'}}>
            <MenuIcon/>
        </IconButton>
        <Typography >{items[index].label}</Typography>
        <Drawer open={flOpen} onClose={toggleOpen} anchor="left">
            <List>
            <Avatar sx={{ m: 1, bgcolor: 'secondary.main', align: 'end'}}>
                <PersonIcon />            
            </Avatar>
                <Typography sx={{
                    fontSize: {xs:'3.5vw', sm: '1.5vw'},
                    paddingLeft: '16px'
                }}>
                {currentUser.displayName}
                </Typography>
                {getListItems()}
            </List>
        </Drawer></Toolbar>
    </AppBar>
}
export default NavigatorMobile;
