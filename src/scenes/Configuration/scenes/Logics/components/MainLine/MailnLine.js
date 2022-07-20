import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Button, Grid, makeStyles, TextField } from '@material-ui/core';
import { AddCircleOutline, RemoveCircleOutline } from '@material-ui/icons';
import { cloneDeep } from 'lodash';
import { DialogDelete, TextFieldNumberFormat } from 'components';

const useStyles = makeStyles((theme) => ({
  item: {
    padding: `${theme.spacing(2)}px ${theme.spacing(1)}px`
  },

  buttonDeleteMainLine: {
    color: '#d10000',
    backgroundColor: '#ffffff',
    '&:hover': {
      color: '#ffffff',
      backgroundColor: '#d10000',
    }
  },

  buttonAddMainLine: {
    color: '#2b8432',
    backgroundColor: '#ffffff',
    '&:hover': {
      color: '#ffffff',
      backgroundColor: '#2b8432',
    }
  },
}));

const MainLine = (props) => {
  // eslint-disable-next-line
  const { canCreateLogic, canDeleteLogic, canUpdateLogic, deleteMainlineDispatch, errorMainLines, mainLines, handleChangeMainLine, validateMainLine, ...rest} = props;

  const classes = useStyles();

  //* state control render main line form
  const [mainLineState, setMainLineState] = useState(mainLines);

  //* Dialog Delete
  const [dialogDeleteValue, setDialogDeleteValue] = useState({ open: false, id: '', title: '', message: '' });
  const handleOpenDialogDelete = (id, title, message) => setDialogDeleteValue({ open: true, id: id, title: title, message: message });
  const handleCloseDialogDelete = () => setDialogDeleteValue({ ...dialogDeleteValue, open: false });
  const handleSubmitDialogDelete = () => {
    deleteMainlineDispatch(dialogDeleteValue.id);
    setDialogDeleteValue({ ...dialogDeleteValue, open: false });
  };

  const handleChange = (event) => {
    let indexChange = '';
    if (event.index !== undefined) indexChange = Number(event.index);
    else indexChange = Number(event.target.getAttribute('data-index'));

    const newData = mainLineState.map((item, index) => {
      if (indexChange === index) return {
        ...item,
        [event.target.name]:
        event.target.type === 'checkbox'
          ? event.target.checked
          : event.target.value
      };
      return item;
    });

    setMainLineState(newData); //* set state in main line form
    handleChangeMainLine(newData); //* set state in logic form
  };


  const hasError = (errorMainLines, field, index) => {
    const error = errorMainLines.filter(item => {
      return item.name === field && item.index === index;
    });
    return error.length > 0 ? error[0].message : null;
  };

  const handleAddMainLine = () => {
    const newData = cloneDeep(mainLineState);
    newData.push({key: '',value: ''});
    setMainLineState(newData); //* set state in main line form
    handleChangeMainLine(newData); //* set state in logic form
  };

  const handleRemoveMainLine = (id, name, index) => {
    if (id) handleOpenDialogDelete( id, `Do you really want to delete main line '${name}'`, 'You won\'t be able to revert it');
    else {
      const newData = cloneDeep(mainLineState);
      newData.splice(index, 1);
      setMainLineState(newData); //* set state in main line form
      handleChangeMainLine(newData); //* set state in logic form
    }
  };

  useEffect(() => {
    setMainLineState(mainLines);
  }, [mainLines]);

  //* UI
  return (
    <Grid
      className={classes.content}
      container
      spacing={3}
    >
      {
        mainLineState.map((mainLine, index) => {
          return <Grid
            className={classes.container}
            container
            key={index}
          >
            <Grid
              container
              item
              md={11}
              xs={10}
            >
              <Grid
                className={classes.item}
                item
                md={7}
                sm={6}
                xs={12}
              >
                <TextField
                  InputProps={{
                    inputComponent: TextFieldNumberFormat,
                    readOnly: !canUpdateLogic,
                  }}
                  className={classes.textField}
                  error={!(!hasError(errorMainLines,'key', index))}
                  fullWidth
                  helperText={hasError(errorMainLines,'key', index) ? hasError(errorMainLines,'key', index) : null}
                  inputProps={{
                    isPhoneNumber: true,
                    dataIndex: index,
                    name: 'key'
                  }}
                  label="Main Line Number"
                  name="key"
                  onChange={handleChange}
                  required
                  value={mainLine.key}
                  variant="outlined"
                />
              </Grid>
              <Grid
                className={classes.item}
                item
                md={5}
                sm={6}
                xs={12}
              >
                <TextField
                  InputProps={{
                    readOnly: !canUpdateLogic
                  }}
                  className={classes.textField}
                  error={!(!hasError(errorMainLines, 'value', index))}
                  fullWidth
                  helperText={hasError(errorMainLines, 'value', index) ? hasError(errorMainLines, 'value', index) : null}
                  inputProps={{'data-index': index}}
                  label="Main Line Name"
                  name="value"
                  onChange={handleChange}
                  required
                  value={mainLine.value}
                  variant="outlined"
                />
              </Grid>
            </Grid>
            <Grid
              container
              item
              md={1}
              style={{margin: 'auto'}}
              xs={2}
            >
              <Grid
                item
                xs={12}
              >
                {
                  index === mainLineState.length - 1
                    ?
                    <>
                      {
                        mainLineState.length > 1 &&
                        canDeleteLogic &&
                        canUpdateLogic &&
                        <Button
                          className={classes.buttonDeleteMainLine}
                          onClick={() => handleRemoveMainLine(mainLine.id, mainLine.key, index)}
                          style={{ minWidth: 'unset'}}
                        >
                          <RemoveCircleOutline />
                        </Button>
                      }
                      {
                        errorMainLines.length === 0 &&
                        canCreateLogic &&
                        canUpdateLogic &&
                        <Button
                          className={classes.buttonAddMainLine}
                          onClick={() => handleAddMainLine()}
                          style={{ minWidth: 'unset'}}
                        >
                          <AddCircleOutline />
                        </Button>
                      }
                    </>
                    :
                    <>
                      {
                        canDeleteLogic &&
                        canUpdateLogic &&
                        <Button
                          className={classes.buttonDeleteMainLine}
                          onClick={() => handleRemoveMainLine(mainLine.id, mainLine.key, index)}
                          style={{ minWidth: 'unset'}}
                        >
                          <RemoveCircleOutline />
                        </Button>
                      }
                    </>
                }
              </Grid>
            </Grid>
          </Grid>;
        })
      }
      {
        canDeleteLogic &&
        <DialogDelete
          handleClose={handleCloseDialogDelete}
          handleConfirm={handleSubmitDialogDelete}
          message={dialogDeleteValue.message}
          open={dialogDeleteValue.open}
          title={dialogDeleteValue.title}
        />
      }
    </Grid>
  );
};

MainLine.propTypes = {
  canCreateLogic: PropTypes.bool,
  canDeleteLogic: PropTypes.bool,
  canUpdateLogic: PropTypes.bool,
  deleteMainlineDispatch: PropTypes.func,
  errorMainLines: PropTypes.array,
  handleChangeMainLine: PropTypes.func,
  mainLines: PropTypes.array,
  validateMainLine: PropTypes.func,
};

export default MainLine;
