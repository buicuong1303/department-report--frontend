import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Box from '@material-ui/core/Box';
import clsx from 'clsx';

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      aria-labelledby={`scrollable-auto-tab-${index}`}
      hidden={value !== index}
      id={`scrollable-auto-tabpanel-${index}`}
      role="tabpanel"
      {...other}
    >
      {value === index && (
        <Box p={3}>
          <div>{children}</div>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired
};

function a11yProps(index) {
  return {
    id: `scrollable-auto-tab-${index}`,
    'aria-controls': `scrollable-auto-tabpanel-${index}`
  };
}

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
    width: '100%',
    backgroundColor: theme.palette.background.paper
  },
  tabLabel: {
    fontSize: '12px'
  }
}));

// eslint-disable-next-line react/no-multi-comp
export default function BotBar(props) {
  const { canViewEmailData, canViewEpicData, canViewGlipData, canViewInboundCallData, canViewPhoneData, className, onChange, selected } = props;
  const classes = useStyles();

  const handleChange = (event, newValue) => {
    if(!onChange) return;
    onChange(newValue);
  };

  return (
    <div className={clsx(classes.root, className)}>
      <AppBar
        color="default"
        position="static"
      >
        <Tabs
          aria-label="scrollable auto tabs example"
          indicatorColor="primary"
          onChange={handleChange}
          scrollButtons="auto"
          textColor="primary"
          value={selected ? selected : 0}
          variant="scrollable"
        >
          <Tab
            disabled={!canViewGlipData}
            label="Glip"
            {...a11yProps(0)}
            className={classes.tabLabel}
          />
          <Tab
            disabled={!canViewEmailData}
            label="Email"
            {...a11yProps(1)}
            className={classes.tabLabel}
          />
          <Tab
            disabled={!canViewEpicData}
            label="Epic"
            {...a11yProps(2)}
            className={classes.tabLabel}
          />
          <Tab
            disabled={!canViewPhoneData}
            label="Phone"
            {...a11yProps(3)}
            className={classes.tabLabel}
          />
          <Tab
            disabled={!canViewInboundCallData}
            label="Inbound call"
            {...a11yProps(4)}
            className={classes.tabLabel}
          />
          {/* <Tab
            disabled={!canViewPunchData}
            label="Punch"
            {...a11yProps(5)}
            className={classes.tabLabel}
          /> */}
        </Tabs>
      </AppBar>
    </div>
  );
}
