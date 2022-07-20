/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Divider } from '@material-ui/core';
import { AuthGuard, Page } from 'components';
import { Header } from './components';
import permissionAuth from 'utils/permissionAuth';
import ImportPanel from './scenes/ImportPanel';
import ImportTracking from './scenes/ImportTracking';
import useRouter from 'utils/useRouter';

const useStyles = makeStyles((theme) => ({
  root: {
    fontSize:'14px',
    position:'relative',
    width: theme.breakpoints.values.lg,
    maxWidth: '100%',
    margin: '0 auto',
    padding: theme.spacing(3),
    display: 'flex',
    flexDirection: 'column',
    height: '100%',
    '& > *': {
      margin: theme.spacing(1),
      width: '100%',
    },
  },

  title: {},

  divider: {
    backgroundColor: '#3f51b5',
    border: 'none',
    height: '2px'
  },
}));

const Import = () => {
  const router = useRouter();
  const classes = useStyles();

  const [importFrame, setImportFrame] = useState('panel'); //* panel, tracking

  useEffect(() => {
    const { frame } = router.match.params;
    setImportFrame(frame);
  }, [router]);

  const renderFrame = (frame) => {
    if(frame === 'tracking') {
      return (<ImportTracking />);
    } else {
      return (<ImportPanel />);
    }
  };

  //* UI
  return (
    <AuthGuard
      requestPermissions={[
        permissionAuth.VALIDATE_DATA,
        permissionAuth.IMPORT_DATA,
      ]}
    >
      <Page
        className={classes.root}
        title="Import"
      >
        <Header
          className={classes.titleContent}
          titleName="Import"
        />

        <Divider className={classes.divider} />

        {renderFrame(importFrame)}
      </Page>
    </AuthGuard>
  );
};

Import.propTypes = {};

export default Import;
