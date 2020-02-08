import React from 'react';
import classes from './Toolbar.module.css'
import Logo from '../../Logo/Logo'
import NavigationItems from '../NavigationItems/NavigationItems';
import DrawerToggle from '../SideDrawer/DrawerToggle/DrawerToggle'

import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';


const toolbar = (props) => (
    <header className={classes.Toolbar}>
        <AppBar position="static">
            <Toolbar className={classes.Toolbar}>
                <DrawerToggle clicked={props.drawerToggleClicked}/>
                <div className={classes.Logo}>
                    <Logo />
                </div>
                <nav className={classes.DesktopOnly}>
                    <NavigationItems isAuthenticated={props.isAuth}/>
                </nav>
            </Toolbar>
        </AppBar>
    </header>
);

export default toolbar;