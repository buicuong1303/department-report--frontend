import React from 'react';
import { makeStyles } from '@material-ui/styles';
const useStyles = makeStyles(() => ({
  fileitem: {
    padding: '5px 0px',
    paddingLeft:'150px',
    borderBottom: '1px solid #d6d6d6',
    display: 'flex',
    alignItems:'center',
    width:'100%',
    '&:hover': {
      background: '#F8F4F4'
    },
  },
  icon: {
    fontSize: '20px',
    paddingRight: '3px',
  },
  header: {
    display: 'flex',
    width: '100%',
    backgroundColor: '#cccc',
  },
  dataItem: {
    textAlign: 'left',
    paddingLeft: '2px',
  },
  databtn:{
    textAlign: 'left',
    paddingLeft: '2px',
  }
}));
const TotalManagaWorkingTime = (props) => {
  const classes = useStyles();
  return (
    <div className={classes.fileitem}>
      <div
        className={classes.dataItem}
        style={{ flex: '4', textAlign:'center', fontSize:'20px'}}
      >
        {'Total: '}
      </div>
      <div
        className={classes.dataItem}
        style={{ flex: '2'}}
      >
        {'9 hours 12 mins'}
      </div>
      <div
        className={classes.dataItem}
        style={{ flex: '2'}}
      >
        {'9 hours 12 mins'}
      </div>
      <div
        className={classes.dataItem}
        style={{ flex: '2'}}
      >
        {'9 hours 12 mins'}
      </div>
      <div
        className={classes.databtn}
        style={{ flex: '2' }}
      />
    </div>
  );
};

export default TotalManagaWorkingTime;
