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
  TYPE_OPTIONS,
  FINAL_STATUS_OPTIONS,
  IS_COMPLETE_OPTIONS
} from 'constants/global';
import {
  CustomDatePickerField,
  CustomTextField,
  CustomSelectField
} from 'components/CustomFields';

import * as Yup from 'yup';
import Grid from '@material-ui/core/Grid';
import moment from 'moment';

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

export default function CustomizedDialogs({
  open,
  onClose,
  recordEditing,
  onSubmit
}) {

  const initialValues = {
    address: '',
    agent: '',
    clientName: '',
    clientSign: '',
    completedTime: '',
    createdBy: '',
    createdTime: '',
    dateGlipMaster: null,
    finalStatus: '',
    name: '',
    needFollowUp: '',
    note: '',
    notePersonal: '',
    phone: '',
    phonePersonal: '',
    pol: '',
    rate: '',
    reason: '',
    servedTime: '',
    serviceNeeded: '',
    services: '',
    taskName: '',
    team: '',
    type: '',
    typePersonal: '',
    whoAssign: ''
  };
  const classes = useStyles();
  const handleClose = () => {
    if (!onClose) return;
    onClose(false);
  };

  const createdTimeSchema = Yup.lazy(value => {
    if (value) {
      return Yup.mixed().test('is-time', 'value must be time', function(value) {
        return moment(value, 'HH:mm:ss').isValid();
      });
    } else {
      return Yup.string().required('In is required');
    }
  });

  const servedTimeSchema = Yup.lazy(value => {
    if (value) {
      return Yup.mixed().test(
        'is-greater',
        'value must be after or same created time',
        function(value) {
          const { createdTime } = this.parent;
          return moment(value, 'HH:mm:ss').isSameOrAfter(
            moment(createdTime, 'HH:mm:ss')
          );
        }
      );
    } else {
      return Yup.mixed().notRequired();
    }
  });

  const completedTimeSchema = Yup.lazy(value => {
    if (value) {
      return Yup.mixed().test(
        'is-greater',
        'value must be after or same served time',
        function(value) {
          const { servedTime, createdTime } = this.parent;
          if (servedTime)
            return moment(value, 'HH:mm:ss').isSameOrAfter(
              moment(servedTime, 'HH:mm:ss')
            );
          else {
            return moment(value, 'HH:mm:ss').isSameOrAfter(
              moment(createdTime, 'HH:mm:ss')
            );
          }
        }
      );
    } else {
      return Yup.mixed().notRequired();
    }
  });
  const validationSchema = Yup.object().shape({
    // services: Yup.string().required('Required'),
    name: Yup.string().required('Required'),
    createdTime: createdTimeSchema,
    servedTime: servedTimeSchema,
    completedTime: completedTimeSchema
  });
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
                Update Glip
              </DialogTitle>

              <Form>
                <DialogContent dividers>
                  <Grid className={classes.gridItem} item xs={6}>
                    <FastField
                      component={CustomTextField}
                      label="Task name"
                      name="taskName"
                      type="text"
                    />
                  </Grid>
                  <Grid className={classes.gridItem} item xs={6}>
                    <FastField
                      component={CustomTextField}
                      label="Reason"
                      name="reason"
                      type="text"
                    />
                  </Grid>

                  <Grid className={classes.gridItem} item xs={4}>
                    <FastField
                      component={CustomTextField}
                      label="Created By"
                      name="createdBy"
                      type="text"
                    />
                  </Grid>
                  <Grid className={classes.gridItem} item xs={4}>
                    <FastField
                      component={CustomTextField}
                      label="Who Assign"
                      name="whoAssign"
                      type="text"
                      disable={true}
                    />
                  </Grid>
                  <Grid className={classes.gridItem} item xs={4}>
                    <FastField
                      component={CustomTextField}
                      label="Name"
                      name="name"
                      type="text"
                    />
                  </Grid>

                  <Grid className={classes.gridItem} item xs={4}>
                    <FastField
                      component={CustomTextField}
                      label="Team"
                      name="team"
                      type="text"
                    />
                  </Grid>

                  <Grid className={classes.gridItem} item xs={4}>
                    <FastField
                      component={CustomSelectField}
                      label="Type"
                      name="type"
                      options={TYPE_OPTIONS}
                      placeholder="Select team"
                    />
                  </Grid>
                  <Grid className={classes.gridItem} item xs={4}>
                    <FastField
                      component={CustomSelectField}
                      label="Final status"
                      name="finalStatus"
                      options={FINAL_STATUS_OPTIONS}
                      placeholder="Select team"
                    />
                  </Grid>

                  <Grid className={classes.gridItem} item xs={3}>
                    <FastField
                      component={CustomDatePickerField}
                      label="Date"
                      name="dateGlipMaster"
                    />
                  </Grid>
                  <Grid className={classes.gridItem} item xs={3}>
                    <FastField
                      InputLabelProps={{
                        shrink: true
                      }}
                      component={CustomTextField}
                      inputProps={{
                        step: 500
                      }}
                      label="Time created"
                      name="createdTime"
                      type="time"
                      variant="outline"
                    />
                  </Grid>
                  <Grid className={classes.gridItem} item xs={3}>
                    <FastField
                      InputLabelProps={{
                        shrink: true
                      }}
                      component={CustomTextField}
                      inputProps={{
                        step: 500
                      }}
                      label="Time served"
                      name="servedTime"
                      type="time"
                      variant="outline"
                    />
                  </Grid>
                  <Grid className={classes.gridItem} item xs={3}>
                    <FastField
                      InputLabelProps={{
                        shrink: true
                      }}
                      component={CustomTextField}
                      inputProps={{
                        step: 500
                      }}
                      label="Time completed"
                      name="completedTime"
                      type="time"
                      variant="outline"
                    />
                  </Grid>

                  <Grid className={classes.gridItem} item xs={4}>
                    <FastField
                      component={CustomTextField}
                      label="Phone"
                      name="phone"
                      type="text"
                    />
                  </Grid>
                  <Grid className={classes.gridItem} item xs={4}>
                    <FastField
                      component={CustomSelectField}
                      label="Need follow"
                      name="needFollowUp"
                      options={IS_COMPLETE_OPTIONS}
                      style={{ margin: '8px' }}
                      type="text"
                    />
                  </Grid>
                  <Grid className={classes.gridItem} item xs={4}>
                    <FastField
                      component={CustomTextField}
                      label="Services"
                      name="services"
                      type="text"
                    />
                  </Grid>

                  <Grid className={classes.gridItem} item xs={6}>
                    <FastField
                      component={CustomTextField}
                      label="Note"
                      name="note"
                      type="text"
                    />
                  </Grid>
                  <Grid className={classes.gridItem} item xs={6}>
                    <FastField
                      component={CustomTextField}
                      label="Address"
                      name="address"
                      type="text"
                    />
                  </Grid>
                  <Grid className={classes.gridItem} item xs={4}>
                    <FastField
                      component={CustomTextField}
                      label="Client name"
                      name="clientName"
                      type="text"
                    />
                  </Grid>
                  <Grid className={classes.gridItem} item xs={4}>
                    <FastField
                      component={CustomTextField}
                      label="Type Personal"
                      name="typePersonal"
                      type="text"
                    />
                  </Grid>
                  <Grid className={classes.gridItem} item xs={4}>
                    <FastField
                      component={CustomTextField}
                      label="Rate"
                      name="rate"
                      type="text"
                    />
                  </Grid>
                  <Grid className={classes.gridItem} item xs={4}>
                    <FastField
                      component={CustomTextField}
                      label="Pol"
                      name="pol"
                      type="text"
                    />
                  </Grid>
                  <Grid className={classes.gridItem} item xs={4}>
                    <FastField
                      component={CustomTextField}
                      label="Phone personal"
                      name="phonePersonal"
                      type="text"
                    />
                  </Grid>
                  <Grid className={classes.gridItem} item xs={4}>
                    <FastField
                      component={CustomTextField}
                      label="Note personal"
                      name="notePersonal"
                      type="text"
                    />
                  </Grid>
                  <Grid className={classes.gridItem} item xs={4}>
                    <FastField
                      component={CustomTextField}
                      label="Service needed"
                      name="serverNeeded"
                      type="text"
                    />
                  </Grid>

                  <Grid className={classes.gridItem} item xs={3}>
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
