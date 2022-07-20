/* eslint-disable react/jsx-max-props-per-line */
import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import MuiDialogContent from '@material-ui/core/DialogContent';
import MuiDialogActions from '@material-ui/core/DialogActions';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/styles';
import { Formik, Form, FastField } from 'formik';
import {
  CustomDatePickerField,
  CustomTextField
} from 'components/CustomFields';
import { Grid } from '@material-ui/core';

// import * as Yup from 'yup';

const styles = theme => ({
  root: {
    margin: 0,
    padding: theme.spacing(2)
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
    display: 'flex',
    justifyContent: 'flex-start',
    flexWrap: 'wrap',
    overflowY: 'auto',
    padding: '20px 50px',
    '&::-webkit-scrollbar': {
      width: '5px'
    },
    '&::-webkit-scrollbar-track': {
      boxShadow: 'inset 0 0 5px grey'
    },
    '&:-webkit-scrollbar-thumb': {
      background: theme.palette.primary.main
    }
  }
}))(MuiDialogContent);

const DialogActions = withStyles(theme => ({
  root: {
    margin: 0,
    padding: theme.spacing(1)
  }
}))(MuiDialogActions);

const useStyles = makeStyles(theme => ({
  root: {
    [theme.breakpoints.down('md')]: {
      padding: '0px 5px'
    }
  },
  textField: {
    margin: '5px'
  },
  select: {
    minWidth: '170px'
  },
  gridItem: {
    padding: '4px 5px'
  }
}));

// const validationSchema = Yup.object().shape({
//   originPath: Yup.string().required('Required'),
//   agent: Yup.string().required('Required'),
//   received: Yup.string().required('Required'),
//   subjectOrTitle: Yup.string().required('Required'),
//   senderOrCreated: Yup.string().required('Required'),
//   recipientsIntoCc: Yup.string().required('Required')
// });

export default function CustomizedDialogs(props) {
  const initialValues = {
    originPath: '',
    agent: '',
    sent: null,
    received: null,
    subjectOrTitle: '',
    senderOrCreated: '',
    recipientsIntoLine: '',
    recipientInCcLine: ''
  };
  const { open, onClose, onSubmit, recordEditing } = props;
  const classes = useStyles();
  const handleClose = () => {
    if (!onClose) return;
    onClose(false);
  };
  const handleSubmit = values => {
    const updateValue = {};
    if (JSON.stringify(values) !== JSON.stringify(recordEditing)) {
      Object.keys(recordEditing).forEach(key => {
        if (values[key] !== recordEditing[key]) {
          updateValue[key] = values[key];
        }
      });
    }
    if (!onSubmit) return;
    onSubmit(updateValue);
  };
  return (
    <div>
      <Formik
        enableReinitialize
        initialValues={recordEditing || initialValues}
        onSubmit={handleSubmit}
        // validationSchema={validationSchema}
      >
        {/* {formikProps => { */}
        {() => {
          return (
            <Dialog
              aria-labelledby="customized-dialog-title"
              className={classes.root}
              maxWidth="md"
              open={open}
            >
              <DialogTitle id="customized-dialog-title" onClose={handleClose}>
                Update Email
              </DialogTitle>

              <Form>
                <DialogContent dividers>
                  <Grid className={classes.gridItem} item xs={12}>
                    <FastField
                      component={CustomTextField}
                      label="Origin Path"
                      multiline
                      name="originalPath"
                      rowsMax={4}
                      type="text"
                    />
                  </Grid>

                  <Grid className={classes.gridItem} item xs={4}>
                    <FastField
                      component={CustomTextField}
                      disable
                      label="Agent"
                      name="agent"
                      type="text"
                    />
                  </Grid>

                  <Grid className={classes.gridItem} item xs={4}>
                    <FastField
                      component={CustomDatePickerField}
                      label="Sent"
                      name="sent"
                    />
                  </Grid>
                  <Grid className={classes.gridItem} item xs={4}>
                    <FastField
                      component={CustomDatePickerField}
                      label="Received"
                      name="received"
                    />
                  </Grid>
                  <Grid className={classes.gridItem} item xs={6}>
                    <FastField
                      component={CustomTextField}
                      label="Subject or title"
                      multiline
                      name="subjectOrTitle"
                      rowsMax={4}
                      type="text"
                    />
                  </Grid>
                  <Grid className={classes.gridItem} item xs={6}>
                    <FastField
                      component={CustomTextField}
                      label="Sender or created"
                      name="senderOrCreated"
                      type="text"
                    />
                  </Grid>
                  <Grid className={classes.gridItem} item xs={4}>
                    <FastField
                      component={CustomTextField}
                      label="Recipients into line"
                      multiline
                      name="recipientsIntoLine"
                      rowsMax={4}
                      type="text"
                    />
                  </Grid>
                  <Grid className={classes.gridItem} item xs={4}>
                    <FastField
                      component={CustomTextField}
                      item
                      label="Recipients into cc"
                      name="recipientInCcLine"
                      type="text"
                      xs={4}
                    />
                  </Grid>
                </DialogContent>
                <DialogActions>
                  <Button autoFocus color="primary" type="submit">
                    Save
                  </Button>
                </DialogActions>
              </Form>
            </Dialog>
          );
        }}
      </Formik>
    </div>
  );
}
