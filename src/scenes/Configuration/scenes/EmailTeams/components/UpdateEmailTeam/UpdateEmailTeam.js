import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/styles';
import {
  Divider,
  TextField,
  Grid,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions
} from '@material-ui/core';
import { CustomButton, DialogConfirm } from 'components';
import { Cancel, Save } from '@material-ui/icons';
import { useDispatch, useSelector } from 'react-redux';
import { clearError } from 'scenes/Configuration/scenes/EmailTeams/EmailTeams.slice';

const useStyles = makeStyles(theme => ({
  root: {},
  dialogForm: {
    overflow: 'unset !important'
  },
  dialogContent: {
    overflow: 'unset !important',
    padding: theme.spacing(2)
  },
  displayName: {
    paddingTop: '40px !important'
  },
  subTitle: {
    textAlign: 'center'
  },
  text: {
    textAlign: 'center',
    marginTop: '10px',
    color: '#d9d9d9',
    fontSize: '14px'
  }
}));

const UpdateEmailTeam = props => {
  // eslint-disable-next-line
  const {
    // className,
    openUpdate,
    handleCloseUpdateEmailTeam,
    handleSubmitUpdateEmailTeam,
    emailTeam,
    // showSnackBar,
    // ...rest
  } = props;

  const classes = useStyles();

  const [formState, setFormState] = useState({
    displayName: '',
    emailAddress: '',
    status: 'active'
  });

  const status = ['Active', 'Inactive'];

  const [dialogConfirm, setDialogConfirm] = useState(false);
  const handleConfirmDialog = () => {
    handleSubmitUpdateEmailTeam(emailTeam.id, formState);
    setDialogConfirm(false);
  };

  const [formErrors, setFormErrors] = useState({
    displayName: {
      message: '',
      error: false
    },
    emailAddress: {
      message: '',
      error: false
    }
  });
  const message = useSelector(state => state.configuration.emailTeams.message);
  const dispatch = useDispatch();

  const handleCloseDialog = () => setDialogConfirm(false);

  const validateForm = () => {
    let isValidForm = true;
    let errors = {};

    if (!formState.displayName.trim()) {
      errors.displayName = {
        message: 'Display name is required',
        error: true
      };
      isValidForm = false;
    } else {
      errors.displayName = {
        message: '',
        error: false
      };
    }

    if (!formState.emailAddress.trim()) {
      errors.emailAddress = {
        message: 'Email is required',
        error: true
      };
      isValidForm = false;
    } else {
      const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      const isValid = re.test(String(formState.emailAddress.trim()).toLowerCase());
      if(isValid)
        errors.emailAddress = {
          message: '',
          error: false
        };
      else {
        isValidForm = false;
        errors.emailAddress = {
          message: 'Email invalid',
          error: true
        };
      }

    }

    if (isValidForm) {
      setDialogConfirm(true);
      dispatch(clearError());
      setFormErrors({
        displayName: {
          message: '',
          error: false
        },
        emailAddress: {
          message: '',
          error: false
        }
      });
    } else {
      setFormErrors({ ...formErrors, ...errors });
    }
  };

  const handleSubmit = () => {
    validateForm();
  };

  const handleReset = () => {
    setFormState({
      displayName: '',
      emailAddress: '',
      status: 'active'
    });
    setFormErrors({
      displayName: {
        message: '',
        error: false
      },
      emailAddress: {
        message: '',
        error: false
      }
    });
    handleCloseUpdateEmailTeam();
  };

  const handleChange = event => {
    event.persist();
    setFormState({
      ...formState,
      [event.target.name]:
        event.target.type === 'checkbox'
          ? event.target.checked
          : event.target.value
    });
  };
  useEffect(() => {
    setFormErrors({
      displayName: {
        message: '',
        error: false
      },
      emailAddress: {
        message: '',
        error: false
      }
    });
    // eslint-disable-next-line
  }, [openUpdate]);
  useEffect(() => {
    return () =>
      setFormErrors({
        displayName: {
          message: '',
          error: false
        },
        emailAddress: {
          message: '',
          error: false
        }
      });
  }, []);

  useEffect(() => {
    if (
      message &&
      message.includes(
        `Email Team with Display Name '${formState.displayName}' already exists`
      )
    )
      setFormErrors({
        ...formErrors,
        displayName: {
          message: 'Display Name already exists',
          error: true
        }
      });
    if (
      message &&
      message.includes(
        `Email Team with Email Address '${formState.emailAddress}' already exists`
      )
    )
      setFormErrors({
        ...formErrors,
        emailAddress: {
          message: 'Email address already exists',
          error: true
        }
      });
    // eslint-disable-next-line
  }, [message]);

  useEffect(() => {
    setFormState({
      displayName: emailTeam.displayName,
      emailAddress: emailTeam.emailAddress,
      status: emailTeam.status
    });
  }, [emailTeam, openUpdate]);

  //* UI
  return (
    <div>
      <Grid item sm={12} xs={12}>
        <Dialog
          aria-labelledby="form-dialog-title"
          className={classes.dialogForm}
          open={openUpdate}
        >
          <DialogTitle id="form-dialog-title">Update Email Team</DialogTitle>

          <Divider />

          <DialogContent className={classes.dialogContent}>
            <Grid container spacing={4}>
              <Grid item sm={12} xs={12}>
                <Grid container spacing={4}>
                  <Grid className={classes.displayName} item sm={12} xs={12}>
                    <TextField
                      error={formErrors['displayName'].error}
                      fullWidth
                      helperText={formErrors['displayName'].message}
                      label="Display Name"
                      name="displayName"
                      onChange={handleChange}
                      required
                      value={formState.displayName}
                      variant="outlined"
                    />
                  </Grid>
                  <Grid item sm={12} xs={12}>
                    <TextField
                      error={formErrors['emailAddress'].error}
                      fullWidth
                      helperText={formErrors['emailAddress'].message}
                      label="Email Address"
                      name="emailAddress"
                      onChange={handleChange}
                      required
                      value={formState.emailAddress}
                      variant="outlined"
                    />
                  </Grid>
                  <Grid item md={12} xs={12}>
                    <TextField
                      SelectProps={{ native: true }}
                      fullWidth
                      label="Status"
                      name="status"
                      onChange={handleChange}
                      select
                      value={formState.status}
                      variant="outlined"
                    >
                      {status.map(item => (
                        <option key={item} value={item.toLowerCase()}>
                          {item}
                        </option>
                      ))}
                    </TextField>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </DialogContent>

          <Divider />

          <DialogActions>
            <CustomButton
              content="Cancel"
              onClick={handleReset}
              type="gray-full"
              variant="contained"
            >
              <Cancel className={classes.icon} />
            </CustomButton>
            <CustomButton
              content="Save change"
              onClick={handleSubmit}
              type="blue-full"
              variant="contained"
            >
              <Save className={classes.icon} />
            </CustomButton>
          </DialogActions>
        </Dialog>
      </Grid>
      <DialogConfirm
        handleClose={handleCloseDialog}
        handleConfirm={handleConfirmDialog}
        message="Save change email team information"
        open={dialogConfirm}
      />
    </div>
  );
};

export default UpdateEmailTeam;

UpdateEmailTeam.propTypes = {
  className: PropTypes.string,
  openUpdate: PropTypes.bool,
  handleCloseUpdateEmailTeam: PropTypes.func,
  handleSubmitUpdateEmailTeam: PropTypes.func,
  emailTeam: PropTypes.object
};
