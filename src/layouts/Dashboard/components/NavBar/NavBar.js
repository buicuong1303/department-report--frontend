/* eslint-disable react/no-multi-comp */
import React, { useEffect, useState } from 'react';
import IconButton from '@material-ui/core/IconButton';
import { makeStyles } from '@material-ui/styles';
import {
  Toolbar,
  AppBar,
  Avatar,
  Typography,
  Button,
  List
} from '@material-ui/core';
import InputIcon from '@material-ui/icons/Input';
import AppMenuItem from './components/AppMenuItem';
import navigationConfig from './navigationConfig';
import { useLocation } from 'react-router-dom';
import { Img } from 'react-image';
import DialogConfirmSignOut from 'components/DialogConfirmSignOut';
import { useSelector } from 'react-redux';

const useStyles = makeStyles(theme => ({
  root: {
    zIndex: 2,
    position: 'relative',
    padding: '0px',
    height: 'auto'
  },
  appName: {
    color: 'white',
    fontSize: '20px',
    marginLeft: theme.spacing(2)
  },
  avtLogo: {
    marginRight: theme.spacing(2)
  },
  logoutButton: {
    backgroundColor: theme.palette.primary.main,
    '&:hover': {
      backgroundColor: theme.palette.primary.dark
    }
  },
  logoutIcon: {
    marginRight: '8px'
  },
  listMenuWrap: {
    flex: 1,
    height: '100%'
  },
  listMenu: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    padding: '0px',
    margin: '0px',
    height: '64px'
  },
  avatar: {
    height: '50px',
    width: '50px',
    borderRadius: '50%',
    margin: '0px 10px'
  }
}));

const NavBar = props => {
  const classes = useStyles();
  const location = useLocation();
  const userInfo = useSelector(state => state.session.userInfo);
  const { href } = props;
  const [navigation, setNavigation] = useState([]);

  const [onlyView, setOnlyView] = useState(false);
  const handleLogout = () => {
    // eslint-disable-next-line no-undef
    const automationLoginUrl = process.env.REACT_APP_LOGIN_PAGE;
    localStorage.removeItem('accessToken');
    window.location.href =
      automationLoginUrl +
      '?return_url=' +
      window.location.protocol +
      '//' +
      window.location.host +
      window.location.pathname +
      '&is_log_out=true';
  };

  //* Dialog Confirm
  const [dialogConfirmValue, setDialogConfirmValue] = useState({
    open: false,
    message: ''
  });
  const handleOpenDialogConfirm = () =>
    setDialogConfirmValue({
      open: true,
      message: 'This will end your session'
    });
  const handleSubmitDialogConfirm = async () => handleLogout();
  const handleCloseDialogConfirm = () =>
    setDialogConfirmValue({ message: '', open: false });

  //*hook
  useEffect(() => {
    if (window.location.pathname.indexOf('sales-logs/view') !== -1)
      setOnlyView(true);
    if (window.location.pathname.indexOf('data-sheets/view') !== -1)
      setOnlyView(true);
  }, [location, href]);

  useEffect(() => {
    const newNavigation = navigationConfig(userInfo.permissions);
    setNavigation(newNavigation);

    // eslint-disable-next-line
  }, [userInfo]);

  return (
    <AppBar
      className={classes.root}
      position="static"
    >
      <Toolbar>
        <IconButton
          aria-label="open drawer"
          className={classes.avtLogo}
          color="inherit"
          edge="start"
        >
          <Avatar
            alt="Life Processing"
            src="/images/logo.png"
          />

          <Typography
            className={classes.appName}
            component="h2"
            variant="h3"
          >
            DEPARTMENT REPORT
          </Typography>
        </IconButton>

        {!onlyView && (
          <>
            <div className={classes.listMenuWrap}>
              <List className={classes.listMenu}>
                {navigation.map((item, index) => (
                  <AppMenuItem
                    children={item.children}
                    href={item.href}
                    index={index}
                    isChoose={false}
                    key={index}
                    title={item.title}
                  />
                ))}
              </List>
            </div>

            {userInfo.id && (
              <Img
                alt="avatar"
                className={classes.avatar}
                src={[
                  // eslint-disable-next-line no-undef
                  `${process.env.REACT_APP_AUTOMATION_CORE_BACKEND}/public/images/avatars/${userInfo.id}.png`,
                  '/images/default_avatar.png'
                ]}
              />
            )}

            <div>
              <Button
                className={classes.logoutButton}
                color="inherit"
                fullWidth
                onClick={handleOpenDialogConfirm}
              >
                <InputIcon className={classes.logoutIcon} />
                Sign out
              </Button>
            </div>
          </>
        )}
      </Toolbar>

      <DialogConfirmSignOut
        handleClose={handleCloseDialogConfirm}
        handleConfirm={handleSubmitDialogConfirm}
        message={dialogConfirmValue.message}
        open={dialogConfirmValue.open}
      />
    </AppBar>
  );
};

export default NavBar;
