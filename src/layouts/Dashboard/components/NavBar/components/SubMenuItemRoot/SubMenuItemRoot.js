import React from 'react';
import PropTypes from 'prop-types';
import {
  MenuItem,
  Divider,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import { Add, Remove } from '@material-ui/icons';
import clsx from 'clsx';
import { CustomRouterLink } from 'components';

const useStyles = makeStyles((theme) =>({
  menuItem: {
    backgroundColor: theme.palette.primary.main,
    color: 'white',
    '&:hover': {
      backgroundColor: theme.palette.primary.dark,
    },
    fontSize: '14px',
    height: '40px',
    width: '200px',
    padding: '10px',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  menuItemCenter: {
    backgroundColor: theme.palette.primary.main,
    color: 'white',
    '&:hover': {
      backgroundColor: theme.palette.primary.dark,
    },
    fontSize: '14px',
    height: '40px',
    width: '200px',
    padding: '10px',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center'
  },
  root: {
    minWidth: '180px',
    maxWidth: '200px',
  }
}));

const SubMenuItemRoot = props => {
  const classes = useStyles();

  const { handleClick, title, noChildren, open, className, href, onOutSiteClick } = props;

  return (
    <div className={classes.root}>
      <Divider />
      <MenuItem
        button
        className={noChildren ? clsx(classes.menuItemCenter, className) : clsx(classes.menuItem, className)}
        component={noChildren ? CustomRouterLink : null}
        onClick={(event) => {
          handleClick(event, !open);
          if(noChildren) onOutSiteClick(event, false);
        }}
        to={href}
      >
        {title}
        {
          noChildren === true ? null :
            open === true ? <Remove /> : <Add />
        }
      </MenuItem>
    </div>
  );
};

SubMenuItemRoot.propTypes = {
  className: PropTypes.string,
  handleClick: PropTypes.func,
  href: PropTypes.string,
  noChildren: PropTypes.bool,
  onOutSiteClick: PropTypes.func,
  open: PropTypes.bool,
  title: PropTypes.string,
};

export default SubMenuItemRoot;
