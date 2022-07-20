import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/styles';
import * as Yup from 'yup';
// eslint-disable-next-line
import { Formik, Form, FieldArray, Field } from 'formik';
import { MuiPickersUtilsProvider } from '@material-ui/pickers';
import { useDispatch } from 'react-redux';
import DateFnsUtils from '@date-io/date-fns';
import {CustomTextField,CustomDatePickerField, CustomButton} from 'components';
import moment from 'moment';
// import { CustomMutilSelect } from '../CustomMutilSelect';
import {
  Dialog,
  colors,
  CardActions,
  CardContent,
  CardHeader,
  Divider,
  Card
} from '@material-ui/core';
import { updatePunchOfAgent } from '../../ManageWorkingTime.asyncActions';
import apiStatus from 'utils/apiStatus';
import { CustomPunchTextField } from '../CustomPunchTextField';
import { Cancel, Save } from '@material-ui/icons';

const useStyles = makeStyles((theme) => ({
  root: {
    margin: 'auto',
    width: '1000px'
  },
  button: {
    // marginLeft: '30%',
    // marginRight: '30%',
    justifyContent: 'center',
  },
  textField: {
    marginBottom: theme.spacing(1),
    marginLeft: '5%',
    // marginRight: '5%',
    width: '43%'
  },
  totalTextField:{
    marginBottom: theme.spacing(1),
    marginLeft: '5%',
    // marginRight: '5%',
    width: '43%',
    color:'#D69999'
  },
  dialogContent: {
    // backgroundColor: theme.palette.error.main,
    paddingBottom: theme.spacing(4),
    flexWrap:'wrap'
  },
  dialogTitle: {
    textAlign: 'center',
    fontSize: '20px'
  },
  formTextField: {
    marginTop:theme.spacing(1),
    marginBottom: theme.spacing(1),
    marginLeft: '5%',
    width: '43%',
  },
  status: {
    marginLeft: '10%'
  },
  menuItem: {
    '&:hover': {
      backgroundColor: colors.grey[500]
    },
  }
}));

const EditItem = (props) => {
  // eslint-disable-next-line
  const {change, punch, open,editDialogStatus,clearState, ...rest} =  props;
  const classes = useStyles();
  const dispatch = useDispatch();

  const [initialValues,setInitialValues] = useState({
    englishName:'',
    punchDate:new Date(),
    startLunch:'',
    checkIn:'',
    totalTime:'',
    totalWork:'',
    endLunch:'',
    checkOut:'',
    totalLunch:''
  });

  //*validate form
  const englishNameValidationSchema = Yup.string()
    .required('Required');

  const punchDateValidationSchema = Yup.string()
    .required('Required');

  // const startLunchValidationSchema = Yup.string()
  //   .required('Required');

  // const checkInValidationSchema = Yup.string()
  //   .required('Required');

  // const totalTimeValidationSchema = Yup.string()
  //   .required('Required');

  // const totalWorkValidationSchema = Yup.string()
  //   .required('Required');

  // const endLunchValidationSchema = Yup.string()
  //   .required('Required');

  // const checkOutValidationSchema = Yup.string()
  //   .required('Required');

  // const totalLunchValidationSchema = Yup.string()
  //   .required('Required');

  //* this is main validation schema which map and mix all schema was defined above
  const validationSchema = Yup.object().shape({
    englishName:englishNameValidationSchema,
    punchDate:punchDateValidationSchema,
    // startLunch:startLunchValidationSchema,
    // checkIn:checkInValidationSchema,
    // totalTime:totalTimeValidationSchema,
    // totalWork:totalWorkValidationSchema,
    // endLunch:endLunchValidationSchema,
    // checkOut:checkOutValidationSchema,
    // totalLunch:totalLunchValidationSchema,
  });

  //* Start handle form -------------------------------------------------------------------------------------------
  // eslint-disable-next-line
  let formikManagement = null;

  const [active, setActive] = useState({
    open: false,
    change:''
  });

  const handleClose = () => {
    setActive({
      ...active,
      open: false
    });
    // setSnackBarActive(false);
  };
  //*handle save
  const handleFormikSubmit = async () => {
    await formikManagement.validateForm();
    if(!moment(`${formikManagement.values.punchDate}`,'YYYY-MM-DD',true).isValid()){
      await formikManagement.setFieldValue(
        'punchDate',
        moment(formikManagement.values.punchDate,'dddMMMDDYYYYHHmmss GMTZZ').format('YYYY-MM-DD')
      );
    }

    if(moment(`${formikManagement.values.startLunch}`,'HH:mm:ss',true).isValid() ||
    moment(`${formikManagement.values.startLunch}`,'HH:mm',true).isValid()){
      await formikManagement.setFieldValue(
        'startLunch',
        moment(formikManagement.values.startLunch,'HH:mm:ss').format('HH:mm')
      );
    }else{
      await formikManagement.setFieldValue(
        'startLunch',
        'Not Check'
      );
    }

    if(moment(`${formikManagement.values.endLunch}`,'HH:mm:ss',true).isValid() ||
    moment(`${formikManagement.values.endLunch}`,'HH:mm',true).isValid()){
      await formikManagement.setFieldValue(
        'endLunch',
        moment(formikManagement.values.endLunch,'HH:mm:ss').format('HH:mm')
      );
    }else{
      await formikManagement.setFieldValue(
        'endLunch',
        'Not Check'
      );
    }

    if(moment(`${formikManagement.values.checkIn}`,'HH:mm:ss',true).isValid() ||
    moment(`${formikManagement.values.checkIn}`,'HH:mm',true).isValid()){
      await formikManagement.setFieldValue(
        'checkIn',
        moment(formikManagement.values.checkIn,'HH:mm:ss').format('HH:mm')
      );
    }else{
      await formikManagement.setFieldValue(
        'checkIn',
        'OFF'
      );
    }

    if(moment(`${formikManagement.values.checkOut}`,'HH:mm:ss',true).isValid() ||
    moment(`${formikManagement.values.checkOut}`,'HH:mm',true).isValid()){
      await formikManagement.setFieldValue(
        'checkOut',
        moment(formikManagement.values.checkOut,'HH:mm:ss').format('HH:mm')
      );
    }else{
      await formikManagement.setFieldValue(
        'checkOut',
        'OFF'
      );
    }
    // await formikManagement.setFieldValue(
    //   'checkIn',
    //   moment(formikManagement.values.checkIn,'HH:mm:ss').format('HH:mm')
    // );
    // await formikManagement.setFieldValue(
    //   'checkOut',
    //   moment(formikManagement.values.checkOut,'HH:mm:ss').format('HH:mm')
    // );
    const data = {
      id: punch.id,
      content:formikManagement.values
    };
    // console.log(formikManagement);
    if(formikManagement.isValid){
      dispatch(updatePunchOfAgent(data));
    }
  };

  //*Handle Change
  const handleChange = async () => {
    if(
      moment(`${formikManagement.values.checkIn}`,'HH:mm').isValid() &&
      moment(`${formikManagement.values.checkOut}`,'HH:mm').isValid()
    ){
      const timeStart = moment(formikManagement.values.checkIn,'HH:mm');
      const timeEnd = moment(formikManagement.values.checkOut,'HH:mm');
      const hourTime = Math.floor(timeEnd.diff(timeStart)/(60000*60));
      const minutesTime = (timeEnd.diff(timeStart)/(60000))- hourTime*60;
      await formikManagement.setFieldValue(
        'totalTime',
        `${hourTime} hours ${minutesTime} mins`
      );
      if(
        moment(`${formikManagement.values.startLunch}`,'HH:mm').isValid() &&
        moment(`${formikManagement.values.endLunch}`,'HH:mm').isValid()
      ){
        const timeLunchStart = moment(formikManagement.values.startLunch,'HH:mm');
        const timeLunchEnd = moment(formikManagement.values.endLunch,'HH:mm');
        const hourLunchTime = Math.floor(timeLunchEnd.diff(timeLunchStart)/(60000*60));
        const minutesLunchTime = (timeLunchEnd.diff(timeLunchStart)/(60000))- hourLunchTime*60;
        await formikManagement.setFieldValue(
          'totalLunch',
          `${hourLunchTime} hours ${minutesLunchTime} mins`
        );
        const totalTimeMoment = moment(`${hourTime}:${minutesTime}`,'HH:mm');
        const totalLunchMoment = moment(`${hourLunchTime}:${minutesLunchTime}`,'HH:mm');
        const hourWorkTime = Math.floor(totalTimeMoment.diff(totalLunchMoment)/(60000*60));
        const minutesWorkTime = (totalTimeMoment.diff(totalLunchMoment)/(60000))- hourWorkTime*60;
        await formikManagement.setFieldValue(
          'totalWork',
          `${hourWorkTime} hours ${minutesWorkTime} mins`
        );
      }
      else{
        await formikManagement.setFieldValue(
          'totalLunch',
          ''
        );
        await formikManagement.setFieldValue(
          'totalWork',
          `${hourTime} hours ${minutesTime} mins`
        );
      }
    }else{
      await formikManagement.setFieldValue(
        'totalLunch',
        ''
      );
      await formikManagement.setFieldValue(
        'totalTime',
        ''
      );
      await formikManagement.setFieldValue(
        'totalWork',
        ''
      );
    }
  };

  useEffect(() => {
    setActive({
      open: open,
      change: change
    });
    // eslint-disable-next-line
  }, [change]);

  useEffect(() => {
    if(editDialogStatus === apiStatus.SUCCESS){
      setActive({
        ...active,
        open: false
      });
      clearState();
    }
    // eslint-disable-next-line
  },[editDialogStatus]);
  useEffect(() => {
    if(punch){
      setInitialValues({
        englishName:punch.agent.originalName,
        punchDate:punch.punchDate,
        startLunch:punch.startLunch,
        checkIn:punch.checkIn,
        totalTime:punch.totalTime,
        totalWork:punch.totalWork,
        endLunch:punch.endLunch,
        checkOut:punch.checkOut,
        totalLunch:punch.totalLunch
      });
    }
    // eslint-disable-next-line
  },[punch]);

  return (
    <div>
      <Dialog
        {...rest}
        aria-labelledby="form-dialog-title"
        className = {classes.root}
        open={active.open ? active.open : false}
      >
        <MuiPickersUtilsProvider
          utils={DateFnsUtils}
        >
          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
          >
            {formik => {
              formikManagement = formik;
              // eslint-disable-next-line
              const { setFielValue, value } = formik;

              return (
                <Form >
                  <Card>
                    <CardHeader title= "Edit Item" />
                    <Divider/>
                    <CardContent
                      className= {classes.dialogContent}
                    >
                      <Field
                        className= {classes.textField}
                        component={CustomTextField}
                        inputProps={{
                          readOnly: true,
                        }}
                        label="Agent"
                        name="englishName"
                      />
                      <Field
                        className= {classes.textField}
                        component={CustomDatePickerField}
                        label="Date"
                        maxDate={new Date()}
                        name="punchDate"
                      />
                      <Field
                        InputLabelProps={{
                          shrink: true
                        }}
                        className= {classes.textField}
                        component={CustomPunchTextField}
                        formikManagement = {formikManagement}
                        inputProps={{
                          step: 500,
                        }}
                        label="Start Lunch"
                        margin="dense"
                        name="startLunch"
                        onChangeValue={() => handleChange()}
                        type="time"
                        variant="outline"
                      />
                      <Field
                        InputLabelProps={{
                          shrink: true
                        }}
                        className= {classes.textField}
                        component={CustomPunchTextField}
                        formikManagement = {formikManagement}
                        inputProps={{
                          step: 500,
                        }}
                        label="Check In"
                        margin="dense"
                        name="checkIn"
                        onChangeValue={() => handleChange()}
                        type="time"
                        variant="outline"
                      />
                      <Field
                        InputLabelProps={{
                          shrink: true
                        }}
                        className= {classes.textField}
                        component={CustomPunchTextField}
                        formikManagement = {formikManagement}
                        inputProps={{
                          step: 500
                        }}
                        label="End Lunch"
                        margin="dense"
                        name="endLunch"
                        onChangeValue={() => handleChange()}
                        type="time"
                        variant="outline"
                      />
                      <Field
                        InputLabelProps={{
                          shrink: true
                        }}
                        className= {classes.textField}
                        component={CustomPunchTextField}
                        formikManagement = {formikManagement}
                        inputProps={{
                          step: 500
                        }}
                        label="Check Out"
                        margin="dense"
                        name="checkOut"
                        onChangeValue={() => handleChange()}
                        type="time"
                        variant="outline"
                      />
                      <Field
                        className= {classes.totalTextField}
                        component={CustomTextField}
                        inputProps={
                          {readOnly: true}
                        }
                        label="Total Lunch"
                        margin="dense"
                        name="totalLunch"
                      />
                      <Field
                        className= {classes.totalTextField}
                        component={CustomTextField}
                        inputProps={
                          {readOnly: true}
                        }
                        label="Total Time"
                        margin="dense"
                        name="totalTime"
                      />
                      <Field
                        className= {classes.totalTextField}
                        component={CustomTextField}
                        inputProps={
                          {readOnly: true}
                        }
                        label="Total Work"
                        margin="dense"
                        name="totalWork"
                        style={{colors:'#939393'}}
                      />

                    </CardContent>
                  </Card>
                  <CardActions
                    className={classes.button}
                  >
                    <CustomButton
                      onClick={handleClose}
                      variant="contained"
                      content="Cancel"
                      type="gray-full"
                    >
                      <Cancel className={classes.icon} />
                    </CustomButton>
                    <CustomButton
                      color="primary"
                      // onClick={handleConfirm}
                      // type="submit"
                      onClick={handleFormikSubmit}
                      // disabled={activeButton.disableButton}
                      variant="contained"
                      content="Save change"
                      type="blue-full"
                    >
                      <Save className={classes.icon} />
                    </CustomButton>
                  </CardActions>
                </Form>
              );
            }}
          </Formik>
        </MuiPickersUtilsProvider>
      </Dialog>
      {/*
      <DialogConfirm
      handleClose={handleCloseDialog}
      handleConfirm={handleConfirmDialog}
      message="Update a application. Do you want to continue ?"
      open={dialogConfirm}
      /> */}
    </div>
  );
};

export default EditItem;
