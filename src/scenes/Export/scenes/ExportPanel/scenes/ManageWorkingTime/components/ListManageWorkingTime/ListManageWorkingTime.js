import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import ListManageWorkingTimeItem from '../ListManageWokingTimeItem';
// import TotalManagaWorkingTime from '../TotalManagaWorkingTime';
import { makeStyles } from '@material-ui/core';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import { CustomButton } from 'components';

const useStyles = makeStyles((theme) => ({
  root:{
    display:'flex',
    flexDirection:'column',
    height:'100%',
    width:'100%',
    // backgroundColor:'#B7A9A9',
  },
  icon:{
    fontSize:'20px',
    paddingRight:'3px'
  },
  header:{
    height:'50px',
    width:'100%',
    paddingLeft:'150px',
    display:'flex',
    backgroundColor:'#cccc',
    alignItems:'center',
  },
  headerItem:{
    textAlign:'left',
  },
  headerBtn:{
    textAlign:'center',
  },
  actionBtn:{
    height:'28px',
    width:'42px',
    borderColor:'#4354B2',
    borderRadius: '5px!important',
    backgroundColor:'transparent',
  },
  list:{
    flex:'1 0 0',
    width:'100%',
    overflow:'auto',
    '&::-webkit-scrollbar': {
      width: '5px'
    },
    '&::-webkit-scrollbar-track': {
      boxShadow: 'inset 0 0 5px grey'
    },
    '&:-webkit-scrollbar-thumb': {
      background: theme.palette.primary.main
    }
    // flex:'1',
  },
  fileitem: {
    padding: '5px 0px',
    paddingLeft:'150px',
    borderBottom: '1px solid #d6d6d6',
    display: 'flex',
    alignItems:'center',
    width:'100%',
    backgroundColor: theme.palette.primary.main,
    color: '#FFFFFF'
  },
  dataItem: {
    textAlign: 'left',
    paddingLeft: '2px',
  },
}));

const ListManageWorkingTime = (props) => {
  const classes = useStyles();
  const {canCreatePunch, canUpdatePunch, listItems, openAddDialog, openEditDialog} = props;

  const [totalItem, setTotalItem] = useState(
    {
      agent:{
        firstName:'',
        lastName: ''
      },
      punchDate:'',
      totalTime:'',
      totalLunch:'',
      totalWork:''
    }
  );

  useEffect(() => {
    if(listItems.length > 0){
      let plusTotalTime = 0;
      let plusTotalLunch = 0;
      let plusTotalWork = 0;

      listItems.forEach(item => {
        if(item.totalTime){
          const indexHour = item.totalTime.indexOf('hours');
          const indexMinute = item.totalTime.indexOf('mins');
          const hour = Number(item.totalTime.slice(0,indexHour - 1));
          const minute = Number(item.totalTime.slice(indexHour + 6 , indexMinute - 1));
          plusTotalTime = plusTotalTime + hour*60 + minute;
        }
        if(item.totalLunch){
          const indexHour = item.totalLunch.indexOf('hours');
          const indexMinute = item.totalLunch.indexOf('mins');
          const hour = Number(item.totalLunch.slice(0,indexHour - 1));
          const minute = Number(item.totalLunch.slice(indexHour + 6 , indexMinute - 1));
          plusTotalLunch = plusTotalLunch + hour*60 + minute;
        }
        if(item.totalWork){
          const indexHour = item.totalWork.indexOf('hours');
          const indexMinute = item.totalWork.indexOf('mins');
          const hour = Number(item.totalWork.slice(0,indexHour - 1));
          const minute = Number(item.totalWork.slice(indexHour + 6 , indexMinute - 1));
          plusTotalWork = plusTotalWork + hour*60 + minute;
        }
      });

      const totalTime = `${Math.floor(plusTotalTime/60)} hours ${plusTotalTime%60} mins`;
      const totalLunch = `${Math.floor(plusTotalLunch/60)} hours ${plusTotalLunch%60} mins`;
      const totalWork = `${Math.floor(plusTotalWork/60)} hours ${plusTotalWork%60} mins`;

      setTotalItem(
        {
          agent: {
            firstName:'',
            lastName: ''
          },
          punchDate: 'TOTAL',
          totalTime: totalTime,
          totalLunch: totalLunch,
          totalWork: totalWork
        }
      );
    }else{
      setTotalItem(
        {
          agent: {
            firstName:'',
            lastName: ''
          },
          punchDate: 'TOTAL',
          totalTime: '0 hours 0 mins',
          totalLunch: '0 hours 0 mins',
          totalWork: '0 hours 0 mins'
        }
      );
    }
  },[listItems]);

  return (
    <div className={classes.root}>
      <div
        className={classes.header}
        id="listItem"
      >
        <div
          className={classes.headerItem}
          style={{flex:'2', }}
        >Agent</div>
        <div
          className={classes.headerItem}
          style={{flex:'2', }}
        >Date</div>
        <div
          className={classes.headerItem}
          style={{flex:'2', }}
        >Total Time</div>
        <div
          className={classes.headerItem}
          style={{flex:'2', }}
        >Total Lunch</div>
        <div
          className={classes.headerItem}
          style={{flex:'2', }}
        >Total Work</div>
        <div
          className={classes.headerBtn}
          style={{flex:'2', }}
        >
          {
            canCreatePunch &&
            <CustomButton
              className={classes.actionBtn}
              color="primary"
              onClick={openAddDialog}
              variant="outlined"
              content="Create new"
              type="green"
            >
              <AddCircleIcon />
            </CustomButton>
          }
        </div>
      </div>
      <ul
        className={classes.list}
      >
        {listItems ?
          <>
            {listItems.map((item, index) => (
              <ListManageWorkingTimeItem
                Item={item}
                canUpdatePunch={canUpdatePunch}
                key={index}
                openEditDialog={openEditDialog}
              />
            ))}
          </> : ''
        }
      </ul>
      <div className={classes.fileitem}>
        <div
          className={classes.dataItem}
          style={{ flex: '2' }}
        >
          {totalItem.agent.firstName + ' ' + totalItem.agent.lastName}
        </div>
        <div
          className={classes.dataItem}
          style={{ flex: '2' }}
        >
          {totalItem.punchDate}
        </div>
        <div
          className={classes.dataItem}
          style={{ flex: '2' }}
        >
          {totalItem.totalTime}
        </div>
        <div
          className={classes.dataItem}
          style={{ flex: '2' }}
        >
          {totalItem.totalLunch}
        </div>
        <div
          className={classes.dataItem}
          style={{ flex: '2' }}
        >
          {totalItem.totalWork}
        </div>
        <div
          className={classes.dataItem}
          style={{ flex: '2' }}
        />
      </div>
      {/* <ListManageWorkingTimeItem
        Item={totalItem}
        canUpdatePunch={false}
      /> */}
    </div>
  );
};

ListManageWorkingTime.propTypes = {
  canCreatePunch: PropTypes.bool,
  canUpdatePunch: PropTypes.bool,
  listItems: PropTypes.array,
  openAddDialog: PropTypes.func,
  openEditDialog: PropTypes.func
};

export default ListManageWorkingTime;
