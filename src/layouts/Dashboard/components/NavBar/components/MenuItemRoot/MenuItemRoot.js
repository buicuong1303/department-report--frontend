/* eslint-disable react/no-multi-comp */
import React from 'react';
import { makeStyles } from '@material-ui/styles';
import {
  ListItem,
  ListItemText,
} from '@material-ui/core';
import { Add, Remove } from '@material-ui/icons';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { CustomRouterLink } from 'components';

const useStyles = makeStyles(theme => ({
  listItem: {
    '& span': {
      color: 'white'
    },
    '& span, & svg': {
      fontSize: '18px',
      fontWeight: 'bold'
    },
    marginRight: '10px',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  listItemCenter: {
    '& span': {
      color: 'white'
    },
    '& span, & svg': {
      fontSize: '18px',
      fontWeight: 'bold'
    },
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center'
  },
  root: {
    minWidth: '180px',
    width: '200px',
    '&:hover': {
      backgroundColor: theme.palette.primary.dark,
      cursor: 'pointer',
      borderBottom: '1px solid #ffffff',
      '& > a': {
        borderBottom: 'none'
      }
    },
    padding: '0px 16px',
    display: 'flex',
    flexDirection: 'row',
    height: '100%'
  }
}));

const MenuItemRoot = (props) => {
  const classes = useStyles();
  const { handleClick, title, open, noChildren, className, href } = props;

  return (
    <ListItem
      className={clsx(classes.root, className)}
      component={noChildren ? CustomRouterLink : null}
      onClick={(event) => {
        handleClick(event, !open);
      }}
      to={href}
    >
      <ListItemText
        className={noChildren ? classes.listItemCenter : classes.listItem}
        primary={title}
      />

      {
        noChildren === true ? null :
          open === true ? <Remove /> : <Add />
      }

    </ListItem>
  );
};

MenuItemRoot.propTypes = {
  className: PropTypes.string,
  handleClick: PropTypes.func,
  href: PropTypes.string,
  noChildren: PropTypes.bool,
  open: PropTypes.bool,
  title: PropTypes.string,
};

export default MenuItemRoot;
