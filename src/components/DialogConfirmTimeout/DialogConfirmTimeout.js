import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import {
  Button,
  Dialog,
  DialogTitle,
  DialogActions,
  useMediaQuery,
  useTheme,
  DialogContent,
  DialogContentText
} from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';

const useStyles = makeStyles((theme) => ({
  root: {},
  dialogForm: {
    textAlign: 'center',
    '& .MuiPaper-root.MuiDialog-paper.MuiDialog-paperScrollPaper.MuiDialog-paperWidthSm.MuiPaper-elevation24.MuiPaper-rounded': {
      minWidth: '400px',
    }
  },
  title: {
    fontSize: '18px !important',
    fontWeight: 'bold',
    // color: '#1976d2',
    color: theme.palette.primary.main,
  },
  contentTimer: {
    fontWeight: '900',
    fontSize: '25px',
    height: '30px',
    margin: 'auto',
    color: theme.palette.primary.main,
  },
  warningBtn:{
    width: '90px',
    height: '90px',
    border: `solid 3px ${theme.palette.primary.main}`,
    borderRadius: '50%',
    color: theme.palette.primary.main,
    position: 'relative',
    margin: 'auto',
    marginTop: '20px',
  },
  confirmBtn:{
    width: '90px',
    height: '90px',
    border: `solid 3px ${theme.palette.primary.main}`,
    borderRadius: '50%',
    color: theme.palette.primary.main,
    position: 'relative',
    margin: 'auto',
    marginTop: '20px',
  },
  dialogAction:{
    display: 'block',
  },
  cancelBtn: {
    backgroundColor: theme.palette.cancel.main,
    '&:hover': {
      backgroundColor: theme.palette.cancel.dark,
    }
  },
  submitBtn: {
    backgroundColor: theme.palette.primary.main,
    '&:hover': {
      backgroundColor: theme.palette.primary.dark
    }
  }
}));

const DialogConfirm = (props) => {
  const theme = useTheme();
  const classes = useStyles();
  const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));

  // eslint-disable-next-line
  const { open, className, handleClose, stopUpdating, continueToUpdate,...rest } = props;

  const [timer, setTimer] = useState(null);
  const [isTimerRunning, setIsTimerRunning] = useState(false);

  const handleNo = () => {
    setIsTimerRunning(false);
    stopUpdating();
  }

  const handleYes = () => {
    setIsTimerRunning(false);
    continueToUpdate();
  }
  
  const startTimerRunning = (IsTimerRunning) => {
    setIsTimerRunning(IsTimerRunning);
    setTimer(15000);
  }

  useEffect(() => {
    let interval = null;
    if(isTimerRunning && timer > 0) {
      interval = setInterval(() => {
        setTimer(timer => timer - 1000);
      }, 1000);   
    } else {
      clearInterval(interval);
      handleClose();
      if (timer === 0) {
        stopUpdating();
      }
    }
    return () => clearInterval(interval);
    // eslint-disable-next-line
  }, [isTimerRunning, timer])

  useEffect(() => {
    startTimerRunning(open);
  }, [open]);

  return (
    <div
      className={className}
      {...rest}
    >
      <Dialog
        aria-labelledby="responsive-dialog-title"
        className={classes.dialogForm}
        fullScreen={fullScreen}
        open={open}
      >
        <Button className={classes.warningBtn}>
          <i
            style={{fontSize: '30px', fontWeight: '900'}}
          >?</i>
        </Button>

        <DialogTitle
          id="responsive-dialog-title"
        >
          <div className={classes.title}>
            {'Need more time for this task?'}
          </div>
        </DialogTitle>

        <DialogContent>
          <DialogContentText className={classes.contentTimer}>
            {timer/1000}
          </DialogContentText>
        </DialogContent>

        <DialogActions
          className={classes.dialogAction}
        >
          <Button
            autoFocus
            className={classes.cancelBtn}
            color="primary"
            hidden={!handleClose}
            onClick={handleNo}
            variant="contained"
          >
            No !!!
          </Button>
          <Button 
            autoFocus
            className={classes.submitBtn}
            color="secondary"
            onClick={handleYes}
            variant="contained"
          >
            Yes
          </Button>

        </DialogActions>
      </Dialog>
    </div>
  );
}

DialogConfirm.propTypes = {
  className: PropTypes.string,
  continueToUpdate: PropTypes.func.isRequired,
  handleClose: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired,
  stopUpdating: PropTypes.func.isRequired,
};

export default DialogConfirm;
