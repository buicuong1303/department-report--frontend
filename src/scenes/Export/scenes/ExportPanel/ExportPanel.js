import React, { useEffect, useState } from 'react';
import { TabPanel } from './components';
import permissionAuth from 'utils/permissionAuth';
import { useSelector } from 'react-redux';
import validatePermission from 'utils/validatePermission';
import { makeStyles } from '@material-ui/core/styles';
import { Tab, Tabs, Paper } from '@material-ui/core';

//* scenes
import ExportData from './scenes/ExportData';
import ManageWorkingTime from './scenes/ManageWorkingTime';

const useStyles = makeStyles((theme) => ({
  root: {

  },
  contentPaper:{
    flex:'1',
    width:'100%',
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1),
    display: 'flex',
    flexDirection: 'column',
  },

  tabExport: {
    height:'30px',
    minHeight:'20px',
    width: '100%',
    borderTopLeftRadius:'5px',
    borderBottomLeftRadius:'5px',
    border:'2px solid #3f51b5'
  },
  tabManage: {
    height:'30px',
    minHeight:'20px',
    width: '100%',
    borderTopRightRadius:'5px',
    borderBottomRightRadius:'5px',
    border:'2px solid #3f51b5'
  },
  mainTab:{
    marginTop: theme.spacing(2),
    minHeight:'20px',
    height:'30px',
  },
  tabPanel:{
    flex:'1',
    width:'100%',
  },
  btnAdd: {
    borderRadius: '3px !important',
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1),
    maxWidth: '40px',
    maxHeight: '40px',
  },

}));

const ExportPanel = () => {
  const userPermissions = useSelector(state => state.session.userInfo.permissions);
  const classes = useStyles();

  const [value, setValue] = useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  useEffect(() => {
    switch (true) {
      case userPermissions.indexOf(permissionAuth.GET_DAILY_REPORT) !== -1:
        setValue(0);
        break;
      case userPermissions.indexOf(permissionAuth.GET_WEEKLY_REPORT) !== -1:
        setValue(0);
        break;
      case userPermissions.indexOf(permissionAuth.GET_AGENT_REPORT) !== -1:
        setValue(0);
        break;
      case userPermissions.indexOf(permissionAuth.GET_TEAM_CHAT_REPORT) !== -1:
        setValue(0);
        break;
      case userPermissions.indexOf(permissionAuth.VIEW_ALL_PUNCH_DATA) !== -1:
        setValue(1);
        break;
      default:
    }
    // eslint-disable-next-line
  }, [userPermissions]);

  return (
    <>
      <Paper
        className={classes.contentPaper}
        variant="outlined"
      >
        <Tabs
          centered
          className={classes.mainTab}
          indicatorColor="primary"
          onChange={handleChange}
          textColor="primary"
          value={value}
        >
          <Tab
            className={classes.tabExport}
            disabled={
              validatePermission(
                userPermissions,
                [
                  'and',
                  [
                    permissionAuth.GET_DAILY_REPORT,
                    permissionAuth.GET_WEEKLY_REPORT,
                    permissionAuth.GET_AGENT_REPORT,
                    permissionAuth.GET_TEAM_CHAT_REPORT,
                  ],
                  [
                    permissionAuth.VIEW_ALL_DEPARTMENT,
                  ],
                  [
                    permissionAuth.VIEW_AGENTS_OF_DEPARTMENT,
                  ]
                ]
              )
            }
            label="Export Data"
          />
          <Tab
            className={classes.tabManage}
            disabled={
              validatePermission(userPermissions, [permissionAuth.VIEW_ALL_PUNCH_DATA])
            }
            label="Manage Working Time"
          />
        </Tabs>

        <TabPanel
          className={classes.tabPanel}
          index={0}
          value={value}
        >
          <ExportData
            canGetAgentReport={!validatePermission(userPermissions, [permissionAuth.GET_AGENT_REPORT])} //* ok -> false
            canGetDailyReport={!validatePermission(userPermissions, [permissionAuth.GET_DAILY_REPORT])} //* ok -> false
            canGetTeamChatReport={!validatePermission(userPermissions, [permissionAuth.GET_TEAM_CHAT_REPORT])} //* ok -> false
            canGetWeeklyReport={!validatePermission(userPermissions, [permissionAuth.GET_WEEKLY_REPORT])} //* ok -> false
            userPermissions={userPermissions}
          />
        </TabPanel>
        <TabPanel
          className={classes.tabPanel}
          index={1}
          value={value}
        >
          <ManageWorkingTime
            canCreatePunch={!validatePermission(userPermissions, [permissionAuth.CREATE_PUNCH_DATA])} //* ok -> false
            canUpdatePunch={!validatePermission(userPermissions, [permissionAuth.UPDATE_PUNCH_DATA])} //* ok -> false
            userPermissions={userPermissions}
          />
        </TabPanel>
      </Paper>
    </>
  );
};

export default ExportPanel;
