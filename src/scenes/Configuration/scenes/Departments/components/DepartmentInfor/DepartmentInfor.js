import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/styles';
import {
  TextField,
  Grid,
} from '@material-ui/core';

const useStyles = makeStyles(() => ({
  name: {
    paddingTop: '35px !important',
  },
}));

const DepartmentInfor = (props) => {
  // eslint-disable-next-line
  const { className, departmentInfor, formStateAll, setFormStateAll, ...rest } = props;

  const classes = useStyles();

  const [formState, setFormState] = useState({
    name: '',
    isEmpty: true,
    status: 'active'
  });

  const status = ['Active', 'Inactive'];
  const [debounceTimeout, setDebounceTimeout] = useState(null);

  const handleChange = (event) => {
    event.persist();
    if(event.target.value.trim()){
      setFormState({
        ...formState,
        isEmpty:false,
        [event.target.name]:
          event.target.type === 'checkbox'
            ? event.target.checked
            : event.target.value
      });
      const newFormStateAll = {
        ...formStateAll,
        isEmpty:false,
        [event.target.name]:
          event.target.type === 'checkbox'
            ? event.target.checked
            : event.target.value
      };
      if (debounceTimeout) clearTimeout(debounceTimeout);
      setDebounceTimeout(
        setTimeout(() => {
          setFormStateAll(newFormStateAll);
        }, 400)
      );
    }else{
      setFormState({
        ...formState,
        isEmpty:true,
        [event.target.name]:
          event.target.type === 'checkbox'
            ? event.target.checked
            : event.target.value
      });
      const newFormStateAll = {
        ...formStateAll,
        isEmpty:true,
        [event.target.name]:
          event.target.type === 'checkbox'
            ? event.target.checked
            : event.target.value
      };
      if (debounceTimeout) clearTimeout(debounceTimeout);
      setDebounceTimeout(
        setTimeout(() => {
          setFormStateAll(newFormStateAll);
        }, 400)
      );
    }
  };

  useEffect(() => {
    setFormState(departmentInfor);
  }, [departmentInfor]);

  //* UI
  return (
    <>
      <Grid
        className={classes.name}
        item
        sm={12}
        xs={12}
      >
        <TextField
          error = {formState.isEmpty}
          fullWidth
          helperText= {formState.isEmpty && 'Required'}
          label="Name"
          name="name"
          onChange={handleChange}
          required
          value={formState.name}
          variant="outlined"
        />
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
    </>
  );
};

export default DepartmentInfor;

DepartmentInfor.propTypes = {
  className: PropTypes.string,
  departmentInfor: PropTypes.object,
  formStateAll: PropTypes.object,
  setFormStateAll: PropTypes.func
};
