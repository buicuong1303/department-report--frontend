/* eslint-disable react/no-multi-comp */
import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import MenuItemRoot from '../MenuItemRoot';
import MenuItemChildren from '../MenuItemChildren';
import { makeStyles } from '@material-ui/styles';
import { useLocation } from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
  menuItemRoot: {
    backgroundColor: theme.palette.primary.dark,
    borderBottom: '1px solid #ffffff',
    '& > a': {
      borderBottom: 'none'
    }
  },
}));

const AppMenuItem = (props) => {
  const classes = useStyles();
  const location = useLocation();

  const { title, children, href } = props;

  const [anchorEl, setAnchorEl] = useState(null);
  const [open, setOpen] = React.useState(false);

  const [activeRoute, setActiveRoute] = useState(false);

  //*hook
  useEffect(() => {
    setActiveRoute(window.location.pathname.includes(href));
  }, [location, href]);

  //*logic
  const handleClick = (event, status) => {
    if(children && status) setAnchorEl(event.currentTarget);
    setOpen(status);
  };

  return(
    <>
      <MenuItemRoot
        className={activeRoute ? classes.menuItemRoot : null}
        handleClick={handleClick}
        href={href}
        noChildren={!children}
        open={open}
        title={title}
      />

      {
        children !== undefined ?
          <MenuItemChildren
            anchorEl={anchorEl}
            children={children}
            handleClick={handleClick}
            head
            onOutSiteClick={handleClick}
            open={open}
          /> : null
      }
    </>
  );
};

AppMenuItem.propTypes = {
  children: PropTypes.array,
  href: PropTypes.string,
  index: PropTypes.number,
  title: PropTypes.string,
};

export default AppMenuItem;
