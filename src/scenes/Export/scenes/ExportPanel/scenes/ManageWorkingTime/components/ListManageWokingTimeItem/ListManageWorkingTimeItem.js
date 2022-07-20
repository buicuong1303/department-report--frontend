import React from 'react';
import { makeStyles } from '@material-ui/styles';
// import { Button } from '@material-ui/core';
// import BorderColorIcon from '@material-ui/icons/BorderColor';
import { Edit } from '@material-ui/icons';
import { CustomButton } from 'components';
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
    textAlign: 'center',
  }
}));
const ListManageWorkingTimeItem = (props) => {
  const classes = useStyles();
  const { Item, canUpdatePunch, openEditDialog } = props;

  return (
    <div className={classes.fileitem}>
      <div
        className={classes.dataItem}
        style={{ flex: '2' }}
      >
        {Item.agent.firstName + ' ' + Item.agent.lastName}
      </div>
      <div
        className={classes.dataItem}
        style={{ flex: '2' }}
      >
        {Item.punchDate}
      </div>
      <div
        className={classes.dataItem}
        style={{ flex: '2' }}
      >
        {Item.totalTime}
      </div>
      <div
        className={classes.dataItem}
        style={{ flex: '2' }}
      >
        {Item.totalLunch}
      </div>
      <div
        className={classes.dataItem}
        style={{ flex: '2' }}
      >
        {Item.totalWork}
      </div>
      <div
        className={classes.databtn}
        style={{ flex: '2' }}
      >
        {
          canUpdatePunch &&
          <CustomButton
            color="primary"
            onClick={() => openEditDialog(Item)}
            variant="outlined"
            type="blue"
            style={{minWidth: '50px'}}
          >
            <Edit className={classes.icon} />
          </CustomButton>
        }
      </div>
    </div>
  );
};

export default ListManageWorkingTimeItem;
