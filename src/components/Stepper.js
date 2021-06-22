import React from 'react';
import { useSelector, useDispatch } from "react-redux";
import { makeStyles } from '@material-ui/core/styles';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import SubscriptionParameters from './SubscriptionParameters';
import CreditCard from './CreditCard';
import Confirmation from './Confirmation';
import OrderDetail from './OrderDetail';
import isEmail from 'validator/lib/isEmail';

import { getCreditCardProperty, resetCreditCardData } from "../redux/slices/creditCardSlice";
import { resetSubscriptionData } from "../redux/slices/subscriptionSlice";
import { createSubscriptionOrder } from "../redux/slices/apiSlice";
import { getProperty } from "../redux/slices/subscriptionSlice";


const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
  },
  backButton: {
    marginRight: theme.spacing(1),
  },
  instructions: {
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1),
  },
}));

function getSteps() {
  return ['Select Subscription parameters', 'Payment data', 'Confirmation'];
}

function getStepContent(stepIndex) {
  switch (stepIndex) {
    case 0:
      return <SubscriptionParameters />;
    case 1:
      return <CreditCard />;
    case 2:
      return <Confirmation />;
    default:
      return 'Unknown stepIndex';
  }
}

export default function HorizontalLabelPositionBelowStepper() {
  const classes = useStyles();
  const dispatch = useDispatch();

  const [activeStep, setActiveStep] = React.useState(0);
  const steps = getSteps();

  const isCreditCardValid = useSelector((state) => getCreditCardProperty(state, "creditCardValid")) || false;
  const email = useSelector((state) => getCreditCardProperty(state, "email"))
  const name = useSelector((state) => getCreditCardProperty(state, "name"))
  const cvc = useSelector((state) => getCreditCardProperty(state, "cvc"))
  const number = useSelector((state) => getCreditCardProperty(state, "number"))

  const isValidEmail = isEmail(email);
  const duration = useSelector((state) => getProperty(state, "duration"));
  const storage = useSelector((state) => getProperty(state, "storage"));
  const pricePerGB = useSelector((state) => getProperty(state, "pricePerGB"));
  const discount = useSelector((state) => getProperty(state, "discount"));

  const handleNext = () => {
    if (activeStep === steps.length - 1) {
      const postRequestData = { pricePerGB, storage, discount, duration, email, name, cardNumber: number, cvc };
      dispatch(createSubscriptionOrder({ url: "https://httpbin.org/post", data: postRequestData }));
    }
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleReset = () => {
    dispatch(resetSubscriptionData());
    dispatch(resetCreditCardData());
    setActiveStep(0);
  };

  return (
    <div className={classes.root}>
      <Stepper activeStep={activeStep} alternativeLabel>
        {steps.map((label) => (
          <Step key={label}>
            <StepLabel>{label}</StepLabel>
          </Step>
        ))}
      </Stepper>
      <div>
        {activeStep === steps.length ? (
          <div style={{ textAlign: 'center' }}>
            <Typography className={classes.instructions}>Subscription Activated</Typography>
            <Button variant="contained" color="secondary"
              onClick={handleReset}>Reset</Button>
          </div>
        ) : (
          <div>
            <div>{getStepContent(activeStep)}</div>
            <div><OrderDetail /></div>
            <div>
              <Button
                disabled={activeStep === 0}
                onClick={handleBack}
                className={classes.backButton}
              >
                Back
              </Button>
              <Button variant="contained" color="primary"
                disabled={(!isCreditCardValid && activeStep === 1) || (!isValidEmail && activeStep === steps.length - 1)}
                onClick={handleNext}>
                {activeStep === steps.length - 1 ? 'Finish' : 'Next'}
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}