import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/styles';
import Paper from '@material-ui/core/Paper';
import {
  Backdrop,
  Card,
  CardContent,
  CardHeader,
  CircularProgress,
  Grid,
  TextField
} from '@material-ui/core';
import {
  AuthGuard,
  CustomButton,
  DialogConfirm,
  TextFieldNumberFormat
} from 'components';
import { Save, Sync } from '@material-ui/icons';
import MainLine from './components/MainLine/MailnLine';
import { useDispatch, useSelector } from 'react-redux';
import { useSnackbar } from 'notistack';
import {
  deleteMainLine,
  getConfigs,
  updateConfigs
} from './Logics.asyncActions';
import { cloneDeep } from 'lodash';
import apiStatus from 'utils/apiStatus';
import { clearStateConfigs } from './Logics.slice';
import validate from 'validate.js';
import permissionAuth from 'utils/permissionAuth';

const schema = {
  deskPhone: {
    presence: { allowEmpty: false, message: 'is required' }
  },

  serveDurationGlip: {
    presence: { allowEmpty: false, message: 'is required' },
    numericality: {
      greaterThan: 0
    }
  },

  startWork: {
    presence: { allowEmpty: false, message: 'is required' }
  },

  fullTime: {
    presence: { allowEmpty: false, message: 'is required' },
    numericality: {
      greaterThan: 0,
      lessThanOrEqualTo: 24
    }
  },

  partTime: {
    presence: { allowEmpty: false, message: 'is required' },
    numericality: {
      greaterThan: 0,
      lessThanOrEqualTo: 24
    }
  }
};

const useStyles = makeStyles(theme => ({
  root: {
    position: 'relative',
    height: '0px',
    display: 'flex',
    flexDirection: 'column',
    flex: '100%'
  },

  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: '#fff'
  },

  content: {
    width: '100%',
    margin: '0px !important',
    marginBottom: '86px !important',
    overflow: 'auto',
    '&::-webkit-scrollbar': {
      width: '5px'
    },
    '&::-webkit-scrollbar-track': {
      boxShadow: 'inset 0 0 5px grey'
    },
    '&:-webkit-scrollbar-thumb': {
      background: theme.palette.primary.main
    }
  },

  item: {
    padding: `${theme.spacing(2)}px ${theme.spacing(1)}px`
  },

  icon: {
    marginRight: '5px'
  },

  leftContent: {
    padding: `${theme.spacing(2)}px !important`
  },

  rightContent: {
    padding: `${theme.spacing(2)}px !important`,
    display: 'flex',
    flexDirection: 'row'
  },

  actionContent: {
    padding: `0px ${theme.spacing(2)}px !important`,
    marginBottom: theme.spacing(2),
    position: 'absolute',
    bottom: '0px',
    width: '100%'
  },

  actionList: {
    textAlign: 'center',
    padding: `${theme.spacing(2)}px 0px`
  },

  paper: {
    marginBottom: theme.spacing(2),
    color: theme.palette.text.secondary,
    display: 'flex'
  },

  card: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column'
  },

  cardHeader: {
    textAlign: 'left',
    borderBottom: 'solid 1px #eeeeee'
  },

  cardContent: {
    flex: 1
  },

  textField: {
    // marginBottom: theme.spacing(2),
  }
}));

const Logics = props => {
  // eslint-disable-next-line
  const {
    setTitle,
    canCreateLogic,
    canDeleteLogic,
    canUpdateLogic,
    // ...rest
  } = props;

  const classes = useStyles();
  const dispatch = useDispatch();
  const { enqueueSnackbar } = useSnackbar();

  const status = useSelector(state => state.configuration.logics.status);
  const error = useSelector(state => state.configuration.logics.error);
  const message = useSelector(state => state.configuration.logics.message);

  const backdrop = useSelector(state => state.configuration.logics.backdrop);

  const configs = useSelector(state => state.configuration.logics.configs);

  //* show notification
  const showSnackbar = (message, status) =>
    enqueueSnackbar(message, { variant: status });

  //* Backdrop
  const [openBackdrop, setOpenBackdrop] = useState(false);
  const handleToggleBackdrop = status => {
    if (status === apiStatus.PENDING) {
      setOpenBackdrop(true);
    } else {
      setTimeout(() => {
        if (status !== apiStatus.PENDING) {
          setOpenBackdrop(false);
        }
      }, 500);
    }
  };

  const [formState, setFormState] = useState({
    isValid: false,
    values: configs,
    touched: {},
    errors: {}
  });

  const [dialogConfirm, setDialogConfirm] = useState(false);
  const handleConfirmDialog = () => {
    dispatch(updateConfigs(formState));
    setDialogConfirm(false);
  };
  const handleCloseDialog = () => setDialogConfirm(false);
  const handleSubmit = () => {
    setDialogConfirm(true);
  };

  const handleValidate = event => {
    setFormState({
      ...formState,
      values: {
        ...formState.values,
        [event.target.name]: {
          ...formState.values[event.target.name],
          value:
            event.target.type === 'checkbox'
              ? event.target.checked
              : event.target.value
        }
      },
      touched: {
        ...formState.touched,
        [event.target.name]: true
      }
    });
  };

  const handleChange = event => {
    setFormState({
      ...formState,
      values: {
        ...formState.values,
        [event.target.name]: {
          ...formState.values[event.target.name],
          value:
            event.target.type === 'checkbox'
              ? event.target.checked
              : event.target.value
        }
      }
    });
    handleValidate(event);
  };

  const hasError = field =>
    formState.touched[field] && formState.errors[field] ? true : false;

  const validateMainLine = data => {
    let errors = [];
    // eslint-disable-next-line
    data.map((item, index) => {
      if (!item.key)
        errors.push({
          name: 'key',
          index: index,
          message: 'is required'
        });

      if (!item.value)
        errors.push({
          name: 'value',
          index: index,
          message: 'is required'
        });
    });
    return errors;
  };

  const handleChangeMainLine = mainLines => {
    const errorMainLines = validateMainLine(mainLines);

    // eslint-disable-next-line
    const { ['mainLines']: remove, ...rest } = formState.errors;

    setFormState({
      ...formState,
      values: {
        ...formState.values,
        mainLines: [...mainLines]
      },
      errors:
        errorMainLines.length > 0
          ? {
            ...formState.errors,
            mainLines: errorMainLines
          }
          : {
            ...rest
          }
    });
  };

  const deleteMainlineDispatch = id => {
    dispatch(deleteMainLine(id));
  };

  const handleReset = () => {
    setFormState(
      cloneDeep({
        isValid: false,
        values: configs,
        touched: {},
        errors: {}
      })
    );
  };

  useEffect(() => {
    setTitle('Manage Logics');
    dispatch(getConfigs());
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    setFormState(
      cloneDeep({
        ...formState,
        values: configs,
        errors: {}
      })
    );
    // eslint-disable-next-line
  }, [configs]);

  useEffect(() => {
    let errors = validate(
      {
        deskPhone: formState.values.deskPhone.value,
        serveDurationGlip: formState.values.serveDurationGlip.value,
        startWork: formState.values.startWork.value,
        fullTime: formState.values.fullTime.value,
        partTime: formState.values.partTime.value
      },
      schema
    );

    if (formState.errors.mainLines)
      if (formState.errors.mainLines.length > 0)
        errors = {
          ...errors,
          mainLines: formState.errors.mainLines
        };

    setFormState(formState => ({
      ...formState,
      isValid: errors ? false : true,
      errors: errors ? errors : {}
    }));
    // eslint-disable-next-line
  }, [formState.values]);

  useEffect(() => {
    if (status === apiStatus.SUCCESS) showSnackbar(message, status);
    if (status === apiStatus.ERROR) showSnackbar(message, status);
    // eslint-disable-next-line
  }, [status, error]);

  useEffect(() => {
    handleToggleBackdrop(backdrop);

    // eslint-disable-next-line
  }, [backdrop]);

  useEffect(() => {
    return () => dispatch(clearStateConfigs()); //* clear state when unmount
    // eslint-disable-next-line
  }, []);

  return (
    <AuthGuard requestPermissions={[permissionAuth.VIEW_ALL_LOGIC]}>
      <Paper
        className={classes.root}
        elevation={3}
      >
        <Grid
          className={classes.content}
          container
          spacing={3}
        >
          <Grid
            className={classes.leftContent}
            item
            sm={6}
            xs={12}
          >
            <Paper className={classes.paper}>
              <Card className={classes.card}>
                <CardHeader
                  className={classes.cardHeader}
                  title="Desk Phone"
                />
                <CardContent className={classes.cardContent}>
                  <Grid
                    container
                    spacing={3}
                  >
                    <Grid
                      className={classes.item}
                      item
                      md={12}
                      xs={12}
                    >
                      <TextField
                        InputProps={{
                          readOnly: !canUpdateLogic
                        }}
                        className={classes.textField}
                        error={hasError('deskPhone')}
                        fullWidth
                        helperText={
                          hasError('deskPhone')
                            ? formState.errors.deskPhone[0]
                            : null
                        }
                        label="Desk Phone"
                        name="deskPhone"
                        onChange={handleChange}
                        required
                        value={formState.values.deskPhone.value}
                        variant="outlined"
                      />
                    </Grid>
                  </Grid>
                </CardContent>
              </Card>
            </Paper>
            <Paper className={classes.paper}>
              <Card className={classes.card}>
                <CardHeader
                  className={classes.cardHeader}
                  title="Serve Duration Glip"
                />
                <CardContent className={classes.cardContent}>
                  <Grid
                    container
                    spacing={3}
                  >
                    <Grid
                      className={classes.item}
                      item
                      md={12}
                      xs={12}
                    >
                      <TextField
                        InputProps={{
                          inputComponent: TextFieldNumberFormat,
                          readOnly: !canUpdateLogic
                        }}
                        className={classes.textField}
                        error={hasError('serveDurationGlip')}
                        fullWidth
                        helperText={
                          hasError('serveDurationGlip')
                            ? formState.errors.serveDurationGlip[0]
                            : null
                        }
                        inputProps={{
                          isMinutes: true,
                          name: 'serveDurationGlip'
                        }}
                        label="Serve Duration Glip"
                        onChange={handleChange}
                        required
                        value={formState.values.serveDurationGlip.value}
                        variant="outlined"
                      />
                    </Grid>
                  </Grid>
                </CardContent>
              </Card>
            </Paper>
            <Paper className={classes.paper}>
              <Card className={classes.card}>
                <CardHeader
                  className={classes.cardHeader}
                  title="Working Time"
                />
                <CardContent className={classes.cardContent}>
                  <Grid
                    container
                    spacing={3}
                  >
                    <Grid
                      className={classes.item}
                      item
                      md={12}
                      xs={12}
                    >
                      <TextField
                        InputLabelProps={{
                          shrink: true
                        }}
                        className={classes.textField}
                        error={hasError('startWork')}
                        fullWidth
                        helperText={
                          hasError('startWork')
                            ? formState.errors.startWork[0]
                            : null
                        }
                        inputProps={{
                          step: 500
                        }}
                        label="Start Work"
                        name="startWork"
                        onChange={canUpdateLogic ? handleChange : null}
                        required
                        type="time"
                        value={formState.values.startWork.value}
                        variant="outlined"
                      />
                    </Grid>
                    <Grid
                      className={classes.item}
                      item
                      md={12}
                      xs={12}
                    >
                      <TextField
                        InputLabelProps={{
                          shrink: true
                        }}
                        className={classes.textField}
                        error={hasError('endWork')}
                        fullWidth
                        helperText={
                          hasError('endWork')
                            ? formState.errors.endWork[0]
                            : null
                        }
                        inputProps={{
                          step: 500
                        }}
                        label="End Work"
                        name="endWork"
                        onChange={canUpdateLogic ? handleChange : null}
                        required
                        type="time"
                        value={formState.values.endWork.value}
                        variant="outlined"
                      />
                    </Grid>
                    <Grid
                      className={classes.item}
                      item
                      md={6}
                      xs={12}
                    >
                      <TextField
                        InputProps={{
                          inputComponent: TextFieldNumberFormat,
                          readOnly: !canUpdateLogic
                        }}
                        className={classes.textField}
                        error={hasError('fullTime')}
                        fullWidth
                        helperText={
                          hasError('fullTime')
                            ? formState.errors.fullTime[0]
                            : null
                        }
                        inputProps={{
                          isHours: true,
                          name: 'fullTime'
                        }}
                        label="Full Time"
                        onChange={handleChange}
                        required
                        value={formState.values.fullTime.value}
                        variant="outlined"
                      />
                    </Grid>
                    <Grid
                      className={classes.item}
                      item
                      md={6}
                      xs={12}
                    >
                      <TextField
                        InputProps={{
                          inputComponent: TextFieldNumberFormat,
                          readOnly: !canUpdateLogic
                        }}
                        className={classes.textField}
                        error={hasError('partTime')}
                        fullWidth
                        helperText={
                          hasError('partTime')
                            ? formState.errors.partTime[0]
                            : null
                        }
                        inputProps={{
                          isHours: true,
                          name: 'partTime'
                        }}
                        label="Part Time"
                        onChange={handleChange}
                        required
                        value={formState.values.partTime.value}
                        variant="outlined"
                      />
                    </Grid>
                  </Grid>
                </CardContent>
              </Card>
            </Paper>

          </Grid>
          <Grid
            className={classes.rightContent}
            item
            sm={6}
            xs={12}
          >
            <Paper
              className={classes.paper}
              style={{ flex: 1 }}
            >
              <Card className={classes.card}>
                <CardHeader
                  className={classes.cardHeader}
                  title="Main Line"
                />
                <CardContent className={classes.cardContent}>
                  <MainLine
                    canCreateLogic={canCreateLogic}
                    canDeleteLogic={canDeleteLogic}
                    canUpdateLogic={canUpdateLogic}
                    deleteMainlineDispatch={deleteMainlineDispatch}
                    errorMainLines={
                      formState.errors.mainLines
                        ? cloneDeep(formState.errors.mainLines)
                        : []
                    }
                    handleChangeMainLine={handleChangeMainLine}
                    mainLines={cloneDeep(formState.values.mainLines)}
                    validateMainLine={validateMainLine}
                  />
                </CardContent>
              </Card>
            </Paper>
          </Grid>

          {canUpdateLogic && (
            <Grid
              className={classes.actionContent}
              item
              xs={12}
            >
              <Paper className={classes.actionList}>
                <CustomButton
                  content="Clear change"
                  onClick={handleReset}
                  type="orange-full"
                  variant="contained"
                >
                  <Sync className={classes.icon} />
                </CustomButton>
                <CustomButton
                  content="Save change"
                  disabled={!formState.isValid}
                  onClick={handleSubmit}
                  style={{ marginRight: '0px' }}
                  type="blue-full"
                  variant="contained"
                >
                  <Save className={classes.icon} />
                </CustomButton>
              </Paper>
            </Grid>
          )}
        </Grid>

        {canUpdateLogic && (
          <DialogConfirm
            handleClose={handleCloseDialog}
            handleConfirm={handleConfirmDialog}
            message="Save Change Configs"
            open={dialogConfirm}
          />
        )}

        <Backdrop
          className={classes.backdrop}
          open={openBackdrop}
        >
          <CircularProgress color="inherit" />
        </Backdrop>
      </Paper>
    </AuthGuard>
  );
};

Logics.propTypes = {
  canCreateLogic: PropTypes.bool,
  canDeleteLogic: PropTypes.bool,
  canUpdateLogic: PropTypes.bool,
  setTitle: PropTypes.func.isRequired
};

export default Logics;
