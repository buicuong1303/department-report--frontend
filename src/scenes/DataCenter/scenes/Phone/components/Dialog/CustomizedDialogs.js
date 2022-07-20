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
import { PHONE_OPTIONS } from 'constants/global';
import { CustomRadioField, CustomTextField } from 'components/CustomFields';
import { Grid } from '@material-ui/core';
import * as Yup from 'yup';

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

const validationSchema = Yup.object().shape({
  // agent: Yup.string().required('Required'),
  callId: Yup.string().required('Required'),
  dateTimeCall: Yup.date().required('Required'),
  inOrOut: Yup.string().required('radio is required'),
  duration: Yup.lazy(value => {
    if (value) {
      let regex = /^(0[0-9]|1[0-9]|2[0-3]):[0-5][0-9](:[0-5][0-9])?$/;
      return Yup.string().test('is-valid-time', 'Time invalid', function(
        value
      ) {
        return regex.test(value);
      });
    }
  })
});
const initialValues = {
  agent: '',
  callId: '',
  dateTimeCall: '2017-06-01T08:30',
  duration: '',
  inOrOut: '',
  line: ''
};

export default function CustomizedDialogs({
  open,
  onClose,
  recordEditing,
  onSubmit
}) {
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
        validationSchema={validationSchema}
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
                Update Phone
              </DialogTitle>

              <Form>
                <DialogContent dividers>
                  <Grid item xs={4} className={classes.gridItem}>
                    <FastField
                      component={CustomTextField}
                      inputProps={{
                        readOnly: true
                      }}
                      label="Agent"
                      name="agent"
                      type="text"
                      disable={true}
                    />
                  </Grid>

                  <Grid item xs={4} className={classes.gridItem}>
                    <FastField
                      component={CustomTextField}
                      label="Call id"
                      name="callId"
                      type="text"
                    />
                  </Grid>
                  <Grid item xs={4} className={classes.gridItem}>
                    <FastField
                      component={CustomTextField}
                      label="Date Time"
                      name="dateTimeCall"
                      type="datetime-local"
                      InputLabelProps={{
                        shrink: true
                      }}
                    />
                  </Grid>
                  <Grid item xs={4} className={classes.gridItem}>
                    <FastField
                      component={CustomTextField}
                      label="Duration"
                      name="duration"
                      type="text"
                    />
                  </Grid>
                  <Grid item xs={4} className={classes.gridItem}>
                    <FastField
                      component={CustomTextField}
                      label="Line"
                      name="line"
                      type="text"
                    />
                  </Grid>
                  <Grid item xs={6} className={classes.gridItem}>
                    <FastField
                      component={CustomRadioField}
                      label="In/Out"
                      name="inOrOut"
                      options={PHONE_OPTIONS}
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
