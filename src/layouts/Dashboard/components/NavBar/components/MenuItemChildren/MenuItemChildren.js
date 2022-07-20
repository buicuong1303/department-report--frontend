/* eslint-disable react/no-multi-comp */
import React from 'react';
import { makeStyles } from '@material-ui/styles';
import {
  Popper,
  MenuList,
  ClickAwayListener
} from '@material-ui/core';
import PropTypes from 'prop-types';
import SubMenuItem from '../SubMenuItem';

const useStyles = makeStyles(theme => ({
  menuList: {
    height: 'auto',
    padding: '0',
    backgroundColor: theme.palette.primary.main,
    width: '200px',
    minWidth: '180px',
    borderColor: theme.palette.primary.main
  },
  subListMenu: {
    marginLeft: '1px',
  },
}));

const MenuItemChildren = (props) => {
  const classes = useStyles();
  const { anchorEl, open, children, handleClick, onOutSiteClick, head } = props;

  return(
    <Popper
      anchorEl={anchorEl}
      className={head ? null : classes.subListMenu}
      disablePortal
      open={open}
      placement={head ? 'bottom-start' : 'right-start'}
      transition
    >
      <ClickAwayListener
        onClickAway={(event) => {
          handleClick(event, false);
        }}
      >
        <MenuList
          className={classes.menuList}
        >
          {children.map((item, index) => (
            <SubMenuItem
              children={item.children}
              href={item.href}
              index={index}
              isChoose={false}
              key={index}
              onOutSiteClick={onOutSiteClick}
              title={item.title}
            />
          ))}
        </MenuList>
      </ClickAwayListener>
    </Popper>
  );
};

MenuItemChildren.propTypes = {
  anchorEl: PropTypes.object,
  children: PropTypes.array,
  handleClick: PropTypes.func,
  head: PropTypes.bool,
  onOutSiteClick: PropTypes.func,
  open: PropTypes.bool,
};

export default MenuItemChildren;
