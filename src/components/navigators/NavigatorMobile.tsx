
import React from 'react';
import { RouteType } from '../../models/RouteType';
import { Drawer, Box, Typography, IconButton, List, ListItem, ListItemIcon, ListItemText, ListItemButton, Button, AppBar, Toolbar } from '@mui/material';
import { Menu } from '@mui/icons-material';
import { Link as RouterLink } from 'react-router-dom';
import ListAltOutlinedIcon from '@mui/icons-material/ListAltOutlined';
import AddOutlinedIcon from '@mui/icons-material/AddOutlined';
import HourglassEmptyOutlinedIcon from '@mui/icons-material/HourglassEmptyOutlined';
import AttachMoneyOutlinedIcon from '@mui/icons-material/AttachMoneyOutlined';
import LoginOutlinedIcon from '@mui/icons-material/LoginOutlined';
import LogoutOutlinedIcon from '@mui/icons-material/LogoutOutlined';
import CreateNewFolderIcon from '@mui/icons-material/CreateNewFolder';

const NavigatorMobile: React.FC<{ items: RouteType[] }> = ({ items }) => {
    const icons = [<ListAltOutlinedIcon />, <AddOutlinedIcon />, <HourglassEmptyOutlinedIcon />, <AttachMoneyOutlinedIcon />, <LoginOutlinedIcon />, <LogoutOutlinedIcon />, <CreateNewFolderIcon />];
    type Anchor = 'menu'
    const anchor = `menu`;
    const [state, setState] = React.useState({
        menu: false
    });

    const toggleDrawer =
        (anchor: Anchor, open: boolean) =>
            (event: React.KeyboardEvent | React.MouseEvent) => {
                if (
                    event.type === 'keydown' &&
                    ((event as React.KeyboardEvent).key === 'Tab' ||
                        (event as React.KeyboardEvent).key === 'Shift')
                ) {
                    return;
                }
                setState({ ...state, [anchor]: open });
            };

    const list = (anchor: Anchor) => (
        <Box
            p={2}
            sx={{ width: 230 }}
            role="presentation"
            onClick={toggleDrawer(anchor, false)}
            onKeyDown={toggleDrawer(anchor, false)}
        >
            <List >
                {items.map((item, index) => (
                    <ListItem button key={item.path} component={RouterLink} to={item.path}>
                        <ListItemIcon>
                            {icons[index]}
                        </ListItemIcon>
                        <ListItemText primary={item.label} />

                    </ListItem>
                ))}
            </List>
        </Box>
    );
    return <><AppBar position={'fixed'}>
        <React.Fragment key={anchor}>
            <Toolbar >
                <IconButton
                    color="inherit"
                    aria-label="open drawer"
                    onClick={toggleDrawer(anchor, true)}
                    edge="start"
                >
                    <Menu />
                </IconButton>
                <Button onClick={toggleDrawer(anchor, true)} color='inherit'>{anchor}</Button>
            </Toolbar>
        </React.Fragment>
    </AppBar>
        <Drawer
            open={state[anchor]}
            onClose={toggleDrawer(anchor, false)}
        >
            {list(anchor)}
        </Drawer></>
}

export default NavigatorMobile;