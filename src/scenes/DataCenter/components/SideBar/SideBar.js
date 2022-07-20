import React from 'react';
import { makeStyles, Tabs, Tab } from '@material-ui/core';
import Glip from '../../scenes/Glip';
import Email from '../../scenes/Email';
import Epic from '../../scenes/Epic';
import Phone from '../../scenes/Phone';
import InboundCall from '../../scenes/IC';
import Punch from '../../scenes/Punch';
import clsx from 'clsx';
import validatePermission from 'utils/validatePermission';
import permissionAuth from 'utils/permissionAuth';

const useStyle = makeStyles(theme => ({
  root: {
    display: 'flex',
    width: '100%'
  },
  sideBar: {
    position: 'relative',
    height: '100%'
  },
  tab: {
    listStyle: 'none',
    padding: '0',
    margin: '0'
  },
  tabLabel: {
    textAlign: 'left',
    border: '1px solid #d6d6d6',
    color: theme.palette.primary.dark,
    cursor: 'pointer',
    minWidth: '200px',
    [theme.breakpoints.down('md')]: {
      padding: '0px'
    },
    [theme.breakpoints.down('sm')]: {
      display: 'none'
    }
  },

  active: {
    backgroundColor: theme.palette.primary.main,
    color: '#ffff'
  },
  rootItem: {
    padding: '0px 8px',
    [theme.breakpoints.down('md')]: {
      padding: '0px 3px'
    },
    [theme.breakpoints.down('sm')]: {
      padding: '0px 3px'
    }
  },
  content: {
    flex: '1'
  }
}));

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      aria-labelledby={`vertical-tab-${index}`}
      hidden={value !== index}
      id={`vertical-tabpanel-${index}`}
      role="tabpanel"
      {...other}
    >
      {value === index && <div>{children}</div>}
    </div>
  );
}
function a11yProps(index) {
  return {
    id: `vertical-tab-${index}`,
    'aria-controls': `vertical-tabpanel-${index}`
  };
}
// eslint-disable-next-line react/no-multi-comp
const SideBar = ({
  canViewEmailData,
  canViewEpicData,
  canViewGlipData,
  canViewInboundCallData,
  canViewPhoneData,
  className,
  selected,
  onChange,
  userPermissions,
}) => {
  const classes = useStyle();
  const handleChange = (event, newValue) => {
    if (!onChange) return;
    onChange(newValue);
  };

  return (
    <div className={clsx(classes.root, className)}>
      <div className={clsx(classes.sideBar, classes.rootItem)}>
        <Tabs
          aria-label="Vertical tabs example"
          className={classes.tabs}
          onChange={handleChange}
          orientation="vertical"
          value={selected ? selected : 0}
          variant="scrollable"
        >
          <Tab
            disabled={!canViewGlipData}
            label="Monday report"
            {...a11yProps(0)}
            className={classes.tabLabel}
          />
          <Tab
            disabled={!canViewEmailData}
            label="Email report"
            {...a11yProps(1)}
            className={classes.tabLabel}
          />
          <Tab
            disabled={!canViewEpicData}
            label="Epic report"
            {...a11yProps(2)}
            className={classes.tabLabel}
          />
          <Tab
            disabled={!canViewPhoneData}
            label="Phone report"
            {...a11yProps(3)}
            className={classes.tabLabel}
          />
          <Tab
            disabled={!canViewInboundCallData}
            label="Inbound call report"
            {...a11yProps(4)}
            className={classes.tabLabel}
          />
          {/* <Tab
            disabled={!canViewPunchData}
            label="Punch report"
            {...a11yProps(5)}
            className={classes.tabLabel}
          /> */}
        </Tabs>
      </div>
      <div
        className={clsx(classes.rootItem, classes.content)}
        style={{ overflow: 'hidden' }}
      >
        <TabPanel
          index={0}
          value={selected}
        >
          <Glip
            canDelete={
              !validatePermission(userPermissions, [
                permissionAuth.DELETE_GLIP_DATA
              ])
            }
            canUpdate={
              !validatePermission(userPermissions, [
                permissionAuth.UPDATE_GLIP_DATA
              ])
            }
          />
        </TabPanel>

        <TabPanel index={1} value={selected}>
          <Email
            canDelete={
              !validatePermission(userPermissions, [
                permissionAuth.DELETE_EMAIL_DATA
              ])
            }
            canUpdate={
              !validatePermission(userPermissions, [
                permissionAuth.UPDATE_EMAIL_DATA
              ])
            }
          />
        </TabPanel>

        <TabPanel index={2} value={selected}>
          <Epic
            canDelete={
              !validatePermission(userPermissions, [
                permissionAuth.DELETE_EPIC_DATA
              ])
            }
            canUpdate={
              !validatePermission(userPermissions, [
                permissionAuth.UPDATE_EPIC_DATA
              ])
            }
          />
        </TabPanel>

        <TabPanel index={3} value={selected}>
          <Phone
            canDelete={
              !validatePermission(userPermissions, [
                permissionAuth.DELETE_PHONE_DATA
              ])
            }
            canUpdate={
              !validatePermission(userPermissions, [
                permissionAuth.UPDATE_PHONE_DATA
              ])
            }
          />
        </TabPanel>

        <TabPanel index={4} value={selected}>
          <InboundCall
            canDelete={
              !validatePermission(userPermissions, [
                permissionAuth.DELETE_INBOUND_CALL_DATA
              ])
            }
            canUpdate={
              !validatePermission(userPermissions, [
                permissionAuth.UPDATE_INBOUND_CALL_DATA
              ])
            }
          />
        </TabPanel>

        <TabPanel index={5} value={selected}>
          <Punch
            canDelete={
              !validatePermission(userPermissions, [
                permissionAuth.DELETE_PUNCH_DATA
              ])
            }
            canUpdate={
              !validatePermission(userPermissions, [
                permissionAuth.UPDATE_PUNCH_DATA
              ])
            }
          />
        </TabPanel>
      </div>
    </div>
  );
};

export default SideBar;
