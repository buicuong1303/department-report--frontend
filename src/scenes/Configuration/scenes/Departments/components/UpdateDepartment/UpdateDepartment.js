import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/styles';
import {
  Divider,
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
import DepartmentInfor from '../DepartmentInfor';
import { cloneDeep } from 'lodash';

const useStyles = makeStyles((theme) => ({
  root: {},
  listAgent: {
    height: '96%',
    maxHeight: '272px',
    overflowY: 'auto',
    border: 'solid 1px #d9d9d9',
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
  dialogForm: {
    overflow: 'unset !important',
  },
  dialogContent: {
    overflow: 'unset !important',
    padding : theme.spacing(2),
  },
  department: {
    paddingTop: '35px !important',
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

const UpdateDepartment = (props) => {
  // eslint-disable-next-line
  const { className, openUpdate, agents, department, handleCloseUpdateDepartment, handleSubmitUpdateDepartment, showSnackBar, ...rest } = props;

  const classes = useStyles();

  const [formState, setFormState] = useState({
    name: '',
    isEmpty:true,
    oldAgents: [],
    newAgents: [],
    status: 'active'
  });

  const [checked, setChecked] = useState([]);

  const [dialogConfirm, setDialogConfirm] = useState(false);
  const handleConfirmDialog = () => {
    handleSubmitUpdateDepartment(department.id, formState);
    handleReset();
    setDialogConfirm(false);
  };
  const handleCloseDialog = () => setDialogConfirm(false);
  const handleSubmit = () => {
    if(!formState.isEmpty){
      setDialogConfirm(true);
    }
  };
  const handleReset = () => {
    setFormState({
      name: '',
      isEmpty: true,
      oldAgents: [],
      newAgents: [],
      status: 'active'
    });

    setChecked([]);

    handleCloseUpdateDepartment();
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
      newAgents: [
        ...newChecked,
      ]
    });
  };

  useEffect(() => {
    setFormState({
      name: department.name,
      oldAgents: department.agents,
      newAgents: department.agents,
      status: department.status
    });

    setChecked(department.agents);
  }, [department, openUpdate]);

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
          <DialogTitle id="form-dialog-title">Update Department</DialogTitle>

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
                  <DepartmentInfor
                    departmentInfor={{
                      name: formState.name,
                      isEmpty: formState.isEmpty,
                      status: formState.status,
                    }}
                    formStateAll={cloneDeep(formState)}
                    setFormStateAll={setFormState}
                  />
                </Grid>
              </Grid>
              <Grid
                item
                sm={6}
                xs={12}
              >
                <h4 className={classes.subTitle} >Agent List</h4>
                <List className={classes.listAgent}>
                  {
                    agents.length > 0 ?
                      agents.map((item) => {
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
                                checked={checked.map((agent) => agent.id).indexOf(item.id) !== -1}
                                disableRipple
                                edge="start"
                                inputProps={{ 'aria-labelledby': labelId }}
                                tabIndex={-1}
                              />
                            </ListItemIcon>
                            <ListItemText
                              id={labelId}
                              primary={item.firstName + ' ' + item.lastName}
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
        message="Save change department information"
        open={dialogConfirm}
      />
    </div>
  );
};

export default UpdateDepartment;

UpdateDepartment.propTypes = {
  agents: PropTypes.array,
  className: PropTypes.string,
  department: PropTypes.object,
  handleCloseUpdateDepartment: PropTypes.func,
  handleSubmitUpdateDepartment: PropTypes.func,
  openUpdate: PropTypes.bool,
};
