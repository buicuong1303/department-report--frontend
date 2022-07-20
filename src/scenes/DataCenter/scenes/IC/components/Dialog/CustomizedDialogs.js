/* eslint-disable react/jsx-boolean-value */
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
  // eslint-disable-next-line no-unused-vars
  CustomDatePickerField,
  CustomSelectField,
  CustomTextField
} from 'components/CustomFields';

// import * as Yup from 'yup';
import { IS_COMPLETE_OPTIONS } from 'constants/global';
import { Grid } from '@material-ui/core';

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
  gridItem: {
    padding: '4px 5px'
  },
  select: {
    minWidth: '170px'
  }
}));

// const validationSchema = Yup.object().shape({
//   team: Yup.string().required('Required'),
//   agent: Yup.string().required('Required'),
//   action: Yup.string().required('Required'),
//   color: Yup.string().required('Required'),
//   assignedTo: Yup.string().required('Required'),
//   reply: Yup.string().required('Required'),
//   taskId: Yup.string().required('Required'),
// });
const initialValues = {
  team: '',
  taskId: '',
  action: '',
  taskName: '',
  agent: '',
  dateTime: null,
  assignedTo: '',
  isCompleted: false,
  color: '',
  reply: '',
  text: '',
  notes: '',
  fileName: ''
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
        // validationSchema={validationSchema}
      >
        {/* {(formikProps) => { */}
        {() => {
          return (
            <Dialog
              aria-labelledby="customized-dialog-title"
              className={classes.root}
              maxWidth="md"
              open={open}
            >
              <DialogTitle id="customized-dialog-title" onClose={handleClose}>
                Update Inbound Call
              </DialogTitle>

              <Form>
                <DialogContent dividers>
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
                      component={CustomTextField}
                      label="Task id"
                      name="taskId"
                      type="text"
                    />
                  </Grid>
                  <Grid className={classes.gridItem} item xs={4}>
                    <FastField
                      component={CustomTextField}
                      disable={true}
                      inputProps={{
                        readOnly: true
                      }}
                      label="Agent"
                      name="agent"
                      type="text"
                    />
                  </Grid>
                  <Grid className={classes.gridItem} item xs={4}>
                    <FastField
                      component={CustomTextField}
                      label="Date Time"
                      name="dateTimeIC"
                      type="datetime-local"
                      InputLabelProps={{
                        shrink: true
                      }}
                    />
                  </Grid>
                  <Grid className={classes.gridItem} item xs={4}>
                    <FastField
                      component={CustomTextField}
                      label="Assigned to"
                      name="assignedTo"
                      type="text"
                    />
                  </Grid>
                  <Grid className={classes.gridItem} item xs={4}>
                    <FastField
                      component={CustomSelectField}
                      label="Is completed"
                      name="isCompleted"
                      options={IS_COMPLETE_OPTIONS}
                      placeholder="Select team"
                      style={{ margin: '8px' }}
                    />
                  </Grid>
                  <Grid className={classes.gridItem} item xs={4}>
                    <FastField
                      component={CustomTextField}
                      inputProps={{
                        readOnly: true
                      }}
                      label="Task name"
                      multiline
                      name="taskName"
                      rowsMax={2}
                      type="text"
                    />
                  </Grid>
                  <Grid className={classes.gridItem} item xs={4}>
                    <FastField
                      component={CustomTextField}
                      label="Color"
                      name="color"
                      type="text"
                    />
                  </Grid>
                  <Grid className={classes.gridItem} item xs={6}>
                    <FastField
                      component={CustomTextField}
                      label="Reply"
                      name="reply"
                      type="text"
                    />
                  </Grid>
                  <Grid className={classes.gridItem} item xs={6}>
                    <FastField
                      component={CustomTextField}
                      label="Text"
                      multiline
                      name="text"
                      rowsMax={4}
                      type="text"
                    />
                  </Grid>
                  <Grid className={classes.gridItem} item xs={6}>
                    <FastField
                      component={CustomTextField}
                      label="Notes"
                      name="notes"
                      type="text"
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
