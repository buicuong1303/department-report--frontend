import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/styles';
import { AuthGuard, Page } from '../../components';
import {Divider} from '@material-ui/core';
import { Header } from './components';
import useRouter from 'utils/useRouter';
import './Export.style.scss';
import permissionAuth from 'utils/permissionAuth';

//* scenes
import ExportPanel from './scenes/ExportPanel';
import ExportTracking from './scenes/ExportTracking';

const useStyles = makeStyles((theme) => ({
  root: {
    display:'flex',
    flexDirection:'column',
    padding: '24px',
    width: theme.breakpoints.values.lg,
    height: '100%',
    maxWidth: '100%',
    margin: '0 auto',
    '& > *': {
      margin: theme.spacing(1),
      width: '100%',
    },
  },
  header:{
    display:'flex'
  },
  contentPaper:{
    flex:'1',
    width:'100%',
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1),
    display: 'flex',
    flexDirection: 'column',
  },
  divider: {
    backgroundColor: '#3f51b5',
    border: 'none',
    height: '2px'
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

const Export = () => {
  const classes = useStyles();
  const router = useRouter();

  const [frame, setFrame] = useState('panel'); //* panel, tracking

  useEffect(() => {
    const { frame } = router.match.params;
    setFrame(frame);
  }, [router]);

  const renderFrame = (frame) => {
    if(frame === 'tracking') {
      return (<ExportTracking />);
    } else {
      return (<ExportPanel />);
    }
  };

  //* UI
  return (
    <AuthGuard
      requestPermissions={[
        'and',
        [
          permissionAuth.GET_DAILY_REPORT,
          permissionAuth.GET_WEEKLY_REPORT,
          permissionAuth.GET_AGENT_REPORT,
          permissionAuth.GET_TEAM_CHAT_REPORT,
          permissionAuth.VIEW_ALL_PUNCH_DATA
        ],
        [
          permissionAuth.VIEW_ALL_DEPARTMENT,
        ],
        [
          permissionAuth.VIEW_AGENTS_OF_DEPARTMENT,
        ]
      ]}
    >
      <Page
        className={classes.root}
        title="Export"
      >
        <Header
          className={classes.header}
          titleName={'Export'}
        />
        <Divider className={classes.divider} />

        {renderFrame(frame)}
      </Page>
    </AuthGuard>
  );
};

Export.propTypes = {};

export default Export;
