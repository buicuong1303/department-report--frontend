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
// eslint-disable-next-line no-unused-vars
import { PHONE_OPTIONS, TEAM_OPTIONS } from 'constants/global';
import {
  CustomDatePickerField,
  // eslint-disable-next-line no-unused-vars
  CustomRadioField,
  CustomSelectField,
  CustomTextField
} from 'components/CustomFields';

import * as Yup from 'yup';

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
  }
}));

const validationSchema = Yup.object().shape({
  name: Yup.string().required('Required'),
  department: Yup.string().required('Required'),
  startLunch: Yup.string().required('Required'),
});
const initialValues = {
  name: '',
  team: '',
  checkIn: '',
  checkOut: '',
  startLunch: '',
  endLunch: '',
  lunchTime: '',
  totalLunch: '',
  totalWork: '',
  totalTime: '',
};
const handleSubmit = values => {
  console.log(values);
};

// eslint-disable-next-line no-unused-vars
export default function CustomizedDialogs({ open, onClose, onSubmit, recordEditing }) {
  const classes = useStyles();
  const handleClose = () => {
    if (!onClose) return;
    onClose(false);
  };

  return (
    <div>
      <Formik
        enableReinitialize
        initialValues={initialValues}
        onSubmit={handleSubmit}
        validationSchema={validationSchema}
      >
        {() => {
          return (
            <Dialog
              aria-labelledby="customized-dialog-title"
              className={classes.root}
              maxWidth="md"
              open={open}
            >
              <DialogTitle id="customized-dialog-title" onClose={handleClose}>
                Update Punch
              </DialogTitle>

              <Form>
                <DialogContent dividers>
                  <FastField
                    component={CustomDatePickerField}
                    label="Date"
                    name="date"
                  />
                  <FastField
                    component={CustomSelectField}
                    label="Team"
                    name="team"
                    options={TEAM_OPTIONS}
                    placeholder="Select team"
                    style={{ margin: '8px' }}
                  />
                  <FastField
                    component={CustomTextField}
                    label="Name"
                    name="name"
                    type="text"
                  />
                  <FastField
                    component={CustomTextField}
                    label="Check in"
                    name="checkIn"
                    type="time"
                  />
                  <FastField
                    component={CustomTextField}
                    label="Start lunch"
                    name="startLunch"
                    type="time"
                  />
                  <FastField
                    component={CustomTextField}
                    label="End lunch"
                    name="endLunch"
                    type="time"
                  />
                  <FastField
                    component={CustomTextField}
                    label="Lunch time"
                    name="lunchTime"
                    type="text"
                  />
                  <FastField
                    component={CustomTextField}
                    label="Check out"
                    name="checkOut"
                    type="time"
                  />
                  <FastField
                    component={CustomTextField}
                    label="Total lunch"
                    name="totalLucnh"
                    type="text"
                  />
                  <FastField
                    component={CustomTextField}
                    label="Total work"
                    name="totalWork"
                    type="text"
                  />
                  <FastField
                    component={CustomTextField}
                    label="Total time"
                    name="totalTime"
                    type="text"
                  />
                  <FastField
                    component={CustomTextField}
                    label="Date Time"
                    name="dateTime"
                    type="datetime-local"
                    InputLabelProps={{
                      shrink: true
                    }}
                  />
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
