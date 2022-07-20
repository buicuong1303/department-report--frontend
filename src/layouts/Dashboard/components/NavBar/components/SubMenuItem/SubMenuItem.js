/* eslint-disable react/no-multi-comp */
import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import SubMenuItemRoot from '../SubMenuItemRoot';
import { makeStyles } from '@material-ui/styles';
import MenuItemChildren from '../MenuItemChildren';
import { useLocation } from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
  subMenuItemRoot: {
    backgroundColor: theme.palette.primary.dark,
  }
}));

const SubMenuItem = props => {
  const classes = useStyles();
  const location = useLocation();

  const { title, children, href, onOutSiteClick } = props;

  const [anchorEl, setAnchorEl] = React.useState(null);
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
      <SubMenuItemRoot
        className={activeRoute ? classes.subMenuItemRoot : null}
        handleClick={handleClick}
        href={href}
        noChildren={!children}
        onOutSiteClick={onOutSiteClick}
        open={open}
        title={title}
      />

      {
        children !== undefined ?
          <MenuItemChildren
            anchorEl={anchorEl}
            children={children}
            handleClick={handleClick}
            onOutSiteClick={onOutSiteClick}
            open={open}
          /> : null
      }
    </>
  );
};



SubMenuItem.propTypes = {
  children: PropTypes.array,
  href: PropTypes.string,
  index: PropTypes.number,
  onOutSiteClick: PropTypes.func,
  title: PropTypes.string,
};

export default SubMenuItem;
