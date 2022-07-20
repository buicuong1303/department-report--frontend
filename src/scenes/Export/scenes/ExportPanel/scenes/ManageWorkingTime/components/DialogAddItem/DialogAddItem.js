import React, {useEffect, useState} from 'react';
import { makeStyles } from '@material-ui/styles';
import * as Yup from 'yup';
// eslint-disable-next-line
import { Formik, Form, FieldArray, Field } from 'formik';
import { MuiPickersUtilsProvider } from '@material-ui/pickers';
// import CustomTimePicker from '../CustomTimePicker';
import DateFnsUtils from '@date-io/date-fns';
import moment from 'moment';
import {CustomTextField,CustomDatePickerField, CustomButton} from 'components';
import {
  Dialog,
  colors,
  CardActions,
  CardContent,
  CardHeader,
  Divider,
  Card
} from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';
import { CustomPunchTextField } from '../CustomPunchTextField';
import { AddPunchOfAgent } from '../../ManageWorkingTime.asyncActions';
import apiStatus from 'utils/apiStatus';
import { Cancel, Save } from '@material-ui/icons';
import { CustomPunchSelectField } from '../CustomPunchSelectField';

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

const AddItem = (props) => {
  // eslint-disable-next-line
  const {status,change,punch,addDialogStatus, open, ...rest} =  props;
  const classes = useStyles();
  // eslint-disable-next-line
  const dispatch = useDispatch();

  const agents = useSelector(state => state.export.panel.manageWorkingTime.agents);

  const initialValues = {
    agentId:'',
    punchDate:new Date(),
    startLunch:'',
    checkIn:'',
    totalTime:'',
    totalWork:'',
    endLunch:'',
    checkOut:'',
    totalLunch:''
  };

  //*validate form
  const agentIdValidationSchema = Yup.string()
    .required('Required');

  const punchDateValidationSchema = Yup.string()
    .required('Required');

  // const startLunchValidationSchema = Yup.string()
  //   .required('Required');

  const checkInValidationSchema = Yup.string()
    .required('Required');

  const totalTimeValidationSchema = Yup.string()
    .required('Required');

  const totalWorkValidationSchema = Yup.string()
    .required('Required');

  // const endLunchValidationSchema = Yup.string()
  //   .required('Required');

  const checkOutValidationSchema = Yup.string()
    .required('Required');

  // const totalLunchValidationSchema = Yup.string()
  //   .required('Required');

  //* this is main validation schema which map and mix all schema was defined above
  const validationSchema = Yup.object().shape({
    agentId:agentIdValidationSchema,
    punchDate:punchDateValidationSchema,
    // startLunch:startLunchValidationSchema,
    checkIn:checkInValidationSchema,
    totalTime:totalTimeValidationSchema,
    totalWork:totalWorkValidationSchema,
    // endLunch:endLunchValidationSchema,
    checkOut:checkOutValidationSchema,
    // totalLunch:totalLunchValidationSchema,
  });

  //* Start handle form -------------------------------------------------------------------------------------------

  const [option,setOption] = useState([]);

  // eslint-disable-next-line
  let formikManagement = null;

  const [active, setActive] = useState({
    open: false,
    change:''
  });

  const handleClose = () => {
    setActive({
      ...active,
      open:false,
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
    if(moment(`${formikManagement.values.startLunch}`,'HH:mm:ss',true).isValid()||
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
    // await formikManagement.setFieldValue(
    //   'startLunch',
    //   moment(formikManagement.values.startLunch,'HH:mm:ss').format('HH:mm')
    // );
    // await formikManagement.setFieldValue(
    //   'endLunch',
    //   moment(formikManagement.values.endLunch,'HH:mm:ss').format('HH:mm')
    // );
    await formikManagement.setFieldValue(
      'checkIn',
      moment(formikManagement.values.checkIn,'HH:mm:ss').format('HH:mm')
    );
    await formikManagement.setFieldValue(
      'checkOut',
      moment(formikManagement.values.checkOut,'HH:mm:ss').format('HH:mm')
    );
    const data = {
      content: formikManagement.values
    };
    // console.log(formikManagement);
    if(formikManagement.isValid){
      dispatch(AddPunchOfAgent(data));
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
    const agentObject = [];
    agents.forEach(item => {
      agentObject.push({value:item.id, label:`${item.firstName} ${item.lastName}`});
    });
    setOption(agentObject);
    // eslint-disable-next-line
  },[agents]);

  useEffect(() => {
    setActive({
      open: open,
      change: change
    });
    // eslint-disable-next-line
  },[change]);

  useEffect(() => {
    if(addDialogStatus === apiStatus.SUCCESS){
      handleClose();
    }
    // eslint-disable-next-line
  },[addDialogStatus]);

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
            // enableReinitialize
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
                    <CardHeader title= "Add Item" />
                    <Divider/>
                    <CardContent
                      className= {classes.dialogContent}
                    >
                      <Field
                        className= {classes.textField}
                        component={CustomPunchSelectField}
                        inputProps={{
                          readOnly: true,
                        }}
                        label="Agent"
                        name="agentId"
                        options={option}
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
                          step: 500
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
                          step: 500
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
                        className= {classes.textField}
                        component={CustomTextField}
                        inputProps={
                          {readOnly: true}
                        }
                        label="Total Lunch"
                        margin="dense"
                        name="totalLunch"
                      />
                      <Field
                        className= {classes.textField}
                        component={CustomTextField}
                        inputProps={
                          {readOnly: true}
                        }
                        label="Total Time"
                        margin="dense"
                        name="totalTime"
                      />
                      <Field
                        className= {classes.textField}
                        component={CustomTextField}
                        inputProps={
                          {readOnly: true}
                        }
                        label="Total Work"
                        margin="dense"
                        name="totalWork"
                      />

                    </CardContent>
                  </Card>
                  <CardActions
                    className={classes.button}
                  >
                    <CustomButton
                      content="Cancel"
                      onClick={handleClose}
                      type="gray-full"
                      variant="contained"
                    >
                      <Cancel className={classes.icon} />
                    </CustomButton>
                    <CustomButton
                      color="primary"
                      content="Create new"
                      onClick={handleFormikSubmit}
                      type="blue-full"
                      variant="contained"
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
      {/* <StatusSnackBar
        message={snackBarValue.message}
        onClose={handleSnackBarClose}
        open={snackBarValue.isOpen}
        status={snackBarValue.status}
      />
      <DialogConfirm
      handleClose={handleCloseDialog}
      handleConfirm={handleConfirmDialog}
      message="Update a application. Do you want to continue ?"
      open={dialogConfirm}
      /> */}
    </div>
  );
};

export default AddItem;
