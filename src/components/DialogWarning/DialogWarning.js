import React from 'react';
import PropTypes from 'prop-types';
import {
  Button,
  Dialog,
  DialogTitle,
  DialogActions,
  useMediaQuery,
  useTheme,
  DialogContentText,
  DialogContent
} from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';

const useStyles = makeStyles((theme) => ({
  root: {},
  icon: {
    height: '40px',
    width: '40px',
    margin: 'auto',
    display: 'block',
    color: theme.palette.error.main,
  },
  dialog: {
    textAlign: 'center',
    '& .MuiPaper-root.MuiDialog-paper.MuiDialog-paperScrollPaper.MuiDialog-paperWidthSm.MuiPaper-elevation24.MuiPaper-rounded': {
      minWidth: '400px',
    }
  },
  title: {
    fontSize: '18px',
    fontWeight: 'bold',
    color: '#e3942d',
  },
  warningBtn:{
    width: '90px',
    height: '90px',
    border: 'solid 3px #e3942d',
    borderRadius: '50%',
    color: '#e3942d',
    position: 'relative',
    margin: 'auto',
    marginTop: '20px',
  },
  dialogAction:{
    display: 'block',
  },
  gotItBtn: {
    backgroundColor: '#e3942d',
    '&:hover': {
      backgroundColor: '#ab6d1a',
    }
  }
}));

const DialogWarning = (props) => {
  const classes = useStyles();
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));

  // eslint-disable-next-line
  const { open, className, title, message, handleClose, ...rest } = props;

  return (
    <div
      className={className}
      {...rest}
    >
      <Dialog
        aria-labelledby="responsive-dialog-title"
        className={classes.dialog}
        fullScreen={fullScreen}
        // onClose={handleClose}
        open={open}
      >
        <Button className={classes.warningBtn}>
          <i
            aria-hidden="true"
            className="fa fa-exclamation"
            style={{fontSize: '30px'}}
          />
        </Button>

        <DialogTitle
          
          id="responsive-dialog-title"
        >
          <div className={classes.title}>
            {title}
          </div>
        </DialogTitle>

        <DialogContent hidden={message ? false : true}>
          <DialogContentText>
            {message}
          </DialogContentText>
        </DialogContent>

        <DialogActions
          className={classes.dialogAction}
        >
          <Button 
            autoFocus
            className={classes.gotItBtn}
            color="primary"
            onClick={handleClose}
            variant="contained"
          >
            I got it
          </Button>

        </DialogActions>
      </Dialog>
    </div>
  );
}

DialogWarning.propTypes = {
  className: PropTypes.string,
  handleClose: PropTypes.func.isRequired,
  message: PropTypes.string,
  open: PropTypes.bool.isRequired,
  title: PropTypes.string.isRequired
};

export default DialogWarning;
