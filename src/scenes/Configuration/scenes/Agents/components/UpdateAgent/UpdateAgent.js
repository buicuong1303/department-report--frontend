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
  DialogActions,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Checkbox,
} from '@material-ui/core';
import { CustomButton, DialogConfirm } from 'components';
import { Cancel, Save } from '@material-ui/icons';
import { useDispatch, useSelector } from 'react-redux';
import { clearError } from '../../Agents.slice';

const useStyles = makeStyles((theme) => ({
  root: {},
  listDepartment: {
    flex: 1,
    overflowY: 'auto',
    border: 'solid 1px #d9d9d9',
    '&::-webkit-scrollbar': {
      width: '5px'
    },
    '&::-webkit-scrollbar-track': {
      boxShadow: 'inset 0 0 5px grey'
    },
    '&::-webkit-scrollbar-thumb': {
      background: theme.palette.primary.main
    }
  },
  dialogForm: {
    overflow: 'unset !important',
  },
  dialogContent: {
    overflow: 'unset !important',
    padding : theme.spacing(2),
  },
  firstName: {
    paddingTop: '35px !important',
  },
  departments: {
    display: 'flex',
    flexDirection: 'column'
  },
  subTitle: {
    textAlign: 'center',
  },
  text: {
    textAlign: 'center',
    marginTop: '10px',
    color: '#d9d9d9',
    fontSize: '14px'
  }
}));

const UpdateAgent = (props) => {
  // eslint-disable-next-line
  const { className, openUpdate, agent, departments, handleCloseUpdateAgent, handleSubmitUpdateAgent, showSnackBar, ...rest } = props;

  const classes = useStyles();

  const [formState, setFormState] = useState({
    firstName: '',
    lastName: '',
    firstNameSpecial: '',
    originalName: '',
    oldDepartments: agent.departments,
    newDepartments: [],
    isPrimary: false,
    status: 'active'
  });
  const message = useSelector(state => state.configuration.agents.message);
  const dispatch = useDispatch();
  
  const status = ['Active', 'Inactive'];
  const isPrimary = ['True', 'False'];
  const [checked, setChecked] = useState([]);
  const [formErrors, setFormErrors] = useState({
    firstName: {
      message: '',
      error: false
    },
    originalName: {
      message: '',
      error: false
    }
  });

  const [dialogConfirm, setDialogConfirm] = useState(false);
  const handleConfirmDialog = () => {
    handleSubmitUpdateAgent(agent.id, formState);
    setDialogConfirm(false);
  };
  const handleCloseDialog = () => {
    setDialogConfirm(false);
  };

  const validateForm = () => {
    let isValidForm = true;
    let errors = {};

    if (!formState.firstName.trim()) {
      errors.firstName = {
        message: 'Original name is required',
        error: true
      };
      isValidForm = false;
    } else {
      errors.firstName = {
        message: '',
        error: false
      };
    }

    if (formState.isPrimary && !formState.originalName.trim()) {
      errors.originalName = {
        message: 'Original name is required',
        error: true
      };
      isValidForm = false;
    } else {
      errors.originalName = {
        message: '',
        error: false
      };
    }

    if (isValidForm) {
      setDialogConfirm(true);
      dispatch(clearError());
      setFormErrors({
        firstName: {
          message: '',
          error: false
        },
        originalName: {
          message: '',
          error: false
        }
      });
    } else {
      setFormErrors({ ...formErrors, ...errors });
    }
  };

  useEffect(() => {
    if (message && message.includes('already exists'))
      setFormErrors({
        ...formErrors,
        firstName: {
          message: 'Agent already exists',
          error: true
        }
      });
  // eslint-disable-next-line
  }, [message]);


  useEffect(() => {
    setFormErrors({
      firstName: {
        message: '',
        error: false
      },
      originalName: {
        message: '',
        error: false
      }
    });
  // eslint-disable-next-line
  }, [openUpdate]);

  const handleSubmit = () => {
    validateForm();
  };

  const handleReset = () => {
    setFormState({
      firstName: '',
      lastName: '',
      firstNameSpecial: '',
      originalName: '',
      oldDepartments: agent.departments,
      newDepartments: [],
      isPrimary: false,
      status: 'active'
    });
    setFormErrors({
      firstName: {
        message: '',
        error: false
      },
      originalName: {
        message: '',
        error: false
      }
    });
    setChecked([]);

    handleCloseUpdateAgent();
  };

  const handleToggle = (value) => () => {
    const currentIndex = checked.map((item) => item.id).indexOf(value.id);
    const newChecked = [...checked];

    if (currentIndex === -1) {
      newChecked.push(value);
    } else {
      newChecked.splice(currentIndex, 1);
    }

    setChecked(newChecked);
    setFormState({
      ...formState,
      newDepartments: [
        ...newChecked,
      ]
    });
  };

  const handleChange = (event) => {
    event.persist();
    setFormState({
      ...formState,
      [event.target.name]:
        event.target.type === 'checkbox'
          ? event.target.checked
          : event.target.name === 'isPrimary'
            ? event.target.value === 'true'
            : event.target.value
    });
  };
  useEffect(() => {
    return () =>  setFormErrors({
      firstName: {
        message: '',
        error: false
      },
      originalName: {
        message: '',
        error: false
      }
    });
  }, []);
  useEffect(() => {
    setFormState({
      firstName: agent.firstName,
      lastName: agent.lastName,
      firstNameSpecial: agent.firstNameSpecial,
      originalName: agent.originalName,
      oldDepartments: agent.departments,
      newDepartments: agent.departments,
      isPrimary: agent.isPrimary,
      status: agent.status,
    });

    setChecked(agent.departments);
  }, [agent, openUpdate]);

  //* UI
  return (
    <div>
      <Grid
        item
        sm={12}
        xs={12}
      >
        <Dialog
          aria-labelledby="form-dialog-title"
          className={classes.dialogForm}
          open={openUpdate}
        >
          <DialogTitle id="form-dialog-title">Update Agent</DialogTitle>

          <Divider />

          <DialogContent className={classes.dialogContent}>
            <Grid
              container
              spacing={4}
            >
              <Grid
                item
                sm={6}
                xs={12}
              >
                <Grid
                  container
                  spacing={4}
                >
                  <Grid
                    className={classes.firstName}
                    item
                    sm={12}
                    xs={12}
                  >
                    <TextField
                      fullWidth
                      label="First Name"
                      name="firstName"
                      onChange={handleChange}
                      required
                      value={formState.firstName}
                      variant="outlined"
                      error={formErrors['firstName'].error}
                      helperText={formErrors['firstName'].message}
                    />
                  </Grid>
                  <Grid
                    className={classes.lastName}
                    item
                    sm={12}
                    xs={12}
                  >
                    <TextField
                      fullWidth
                      label="Last Name"
                      name="lastName"
                      onChange={handleChange}
                      required
                      value={formState.lastName}
                      variant="outlined"
                    />
                  </Grid>
                  <Grid
                    className={classes.firstNameSpecial}
                    item
                    sm={12}
                    xs={12}
                  >
                    <TextField
                      fullWidth
                      label="First Name Special"
                      name="firstNameSpecial"
                      onChange={handleChange}
                      required
                      value={formState.firstNameSpecial}
                      variant="outlined"
                    />
                  </Grid>
                  <Grid
                    item
                    sm={12}
                    xs={12}
                  >
                    <TextField
                      fullWidth
                      label="Original Name"
                      name="originalName"
                      onChange={handleChange}
                      required
                      value={formState.originalName}
                      variant="outlined"
                      error={formErrors['originalName'].error}
                      helperText={formErrors['originalName'].message}
                    />
                  </Grid>
                  <Grid
                    item
                    sm={12}
                    xs={12}
                  >
                    <TextField
                      SelectProps={{ native: true }}
                      fullWidth
                      label="Is Primary"
                      name="isPrimary"
                      onChange={handleChange}
                      select
                      value={formState.isPrimary}
                      variant="outlined"
                    >
                      {isPrimary.map(item => (
                        <option
                          key={item}
                          value={item.toLowerCase()}
                        >
                          {item}
                        </option>
                      ))}
                    </TextField>
                  </Grid>
                  <Grid
                    item
                    md={12}
                    xs={12}
                  >
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
                        <option
                          key={item}
                          value={item.toLowerCase()}
                        >
                          {item}
                        </option>
                      ))}
                    </TextField>
                  </Grid>
                </Grid>
              </Grid>
              <Grid
                item
                sm={6}
                xs={12}
                className={classes.departments}
              >
                <h4 className={classes.subTitle} >Department List</h4>
                <List className={classes.listDepartment}>
                  {
                    departments.length && formState.isPrimary > 0 ?
                      departments.map((item) => {
                        const labelId = `checkbox-list-label-${item.name}`;
                        return (
                          <ListItem
                            button
                            dense
                            key={item.id}
                            onClick={handleToggle(item)}
                            role={undefined}
                          >
                            <ListItemIcon>
                              <Checkbox
                                checked={checked.map((dep) => dep.id).indexOf(item.id) !== -1}
                                disableRipple
                                edge="start"
                                inputProps={{ 'aria-labelledby': labelId }}
                                tabIndex={-1}
                              />
                            </ListItemIcon>
                            <ListItemText
                              id={labelId}
                              primary={item.name}
                            />
                          </ListItem>
                        );
                      })
                      : <h3 className={classes.text}>No records to display</h3>
                  }
                </List>
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
        message="Save change agent information"
        open={dialogConfirm}
      />
    </div>
  );
};

export default UpdateAgent;

UpdateAgent.propTypes = {
  agent: PropTypes.object,
  className: PropTypes.string,
  departments: PropTypes.array,
  handleCloseUpdateAgent: PropTypes.func,
  handleSubmitUpdateAgent: PropTypes.func,
  openUpdate: PropTypes.bool,
};
