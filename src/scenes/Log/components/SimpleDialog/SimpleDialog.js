import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { PropTypes } from 'prop-types';
import ReactJson from 'react-json-view';
import { withStyles } from '@material-ui/core/styles';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import MuiDialogContent from '@material-ui/core/DialogContent';
import MuiDialogActions from '@material-ui/core/DialogActions';
import { Typography, Dialog } from '@material-ui/core';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import moment from 'moment';
import Button from '@material-ui/core/Button';

const useStyles = makeStyles(theme => ({
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    borderRadius: '3px',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3)
  },
  content: {
    padding: '5px 0px'
  },
  label: {
    fontWeight: 'bold'
  }
}));

SimpleDialog.propTypes = {
  data: PropTypes.object.isRequired
};

const styles = theme => ({
  root: {
    margin: 0,
    padding: theme.spacing(2),
    minWidth: '500px',
    maxWidth: '600px'
  },
  closeButton: {
    position: 'absolute',
    right: theme.spacing(1),
    top: theme.spacing(1),
    color: theme.palette.grey[500]
  }
});

const DialogTitle = withStyles(styles)(props => {
  const { children, classes, onClose, ...other } = props;
  return (
    <MuiDialogTitle className={classes.root} disableTypography {...other}>
      <Typography variant="h6">{children}</Typography>
      {onClose ? (
        <IconButton
          aria-label="close"
          className={classes.closeButton}
          onClick={onClose}
        >
          <CloseIcon />
        </IconButton>
      ) : null}
    </MuiDialogTitle>
  );
});

const DialogContent = withStyles(theme => ({
  root: {
    padding: theme.spacing(2)
  }
}))(MuiDialogContent);
const DialogActions = withStyles(theme => ({
  root: {
    margin: 0,
    padding: theme.spacing(1)
  }
}))(MuiDialogActions);

export default function SimpleDialog({ open, onClose, data }) {
  const classes = useStyles();

  const handleClose = () => {
    onClose();
  };

  const body = (
    <div>
      {data ? (
        <Dialog
          onClose={handleClose}
          aria-labelledby="customized-dialog-title"
          open={open}
        >
          <DialogTitle id="customized-dialog-title" onClose={handleClose}>
            Detail
          </DialogTitle>
          <DialogContent dividers>
            <Typography gutterBottom>
              <label className={classes.label}>{'Message: '}</label>{' '}
              {data.message}
            </Typography>
            <Typography gutterBottom>
              <label className={classes.label}>{'User: '}</label>{' '}
              {data.fullName}
            </Typography>
            <Typography gutterBottom>
              <label className={classes.label}>{'DateTime: '}</label>
              {moment(data.lastModifiedTime).format('MM/DD/YYYY HH:mm:ss')}
            </Typography>
            <Typography gutterBottom>
              <label className={classes.label}>{'Ip: '}</label>
              {data.ip}
            </Typography>
            <Typography gutterBottom>
              <label className={classes.label}>{'Log Type: '}</label>
              {data.logType}
            </Typography>
            {Object.keys(data.data? data.data : {}).length > 0 ? (
              <>
                <Typography>
                  <label className={classes.label}>{'Data: '}</label>
                </Typography>
                <ReactJson
                  displayDataTypes={false}
                  enableClipboard={false}
                  iconStyle="square"
                  src={data.data}
                />
              </>
            ) : (
              ''
            )}
          </DialogContent>
          <DialogActions>
            <Button autoFocus onClick={handleClose} color="secondary">
              Close
            </Button>
          </DialogActions>
        </Dialog>
      ) : (
        ''
      )}
    </div>
  );

  return <div>{body}</div>;
}
