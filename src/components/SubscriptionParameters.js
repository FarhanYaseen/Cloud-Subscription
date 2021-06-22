import React from "react";
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import { useSelector, useDispatch } from "react-redux";
import { getSubscriptionData } from "../redux/slices/apiSlice";
import { getProperty, setProperty } from "../redux/slices/subscriptionSlice";
import { storageList } from '../utils';

export default function SubscriptionParameters() {
  const dispatch = useDispatch();
  const { subscription_plans = [] } = useSelector((state) => getSubscriptionData(state, "prices"));
  const storage = useSelector((state) => getProperty(state, "storage"));
  const duration = useSelector((state) => getProperty(state, "duration"));
  const discount = useSelector((state) => getProperty(state, "discount"));
  const discountList = [true, 'true'];
  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "discount") {
      const { checked } = e.target;
      return dispatch(setProperty({ name, value: checked }));
    }
    dispatch(setProperty({ name, value }));
  }
  const handleSubscriptionDuration = (e, price) => {
    const { name, value } = e.target;
    dispatch(setProperty({ name, value }));
    dispatch(setProperty({ name: "pricePerGB", value: price }));

  }
  return (
    <FormControl component="fieldset">
      <FormLabel component="legend">Duration</FormLabel>
      <RadioGroup aria-label="duration" name="duration" value={duration} >
        {subscription_plans.map(({ duration_months, price_usd_per_gb }, index) => {
          return (
            <FormControlLabel
              value={duration_months}
              key={`${duration_months}-${index}`}
              control={<Radio onChange={(e) => handleSubscriptionDuration(e, price_usd_per_gb)} />}
              label={`${duration_months} months - ${price_usd_per_gb}$ PER/GB`}
            />
          );
        })}
      </RadioGroup>
      <FormLabel component="legend">Storage</FormLabel>
      <RadioGroup aria-label="storage" name="storage" value={storage} onChange={handleChange}>
        {storageList.map((value, index) => {
          return (
            <FormControlLabel
              value={value}
              key={`${value}-${index}`}
              control={<Radio />}
              label={value}
            />
          );
        })}
      </RadioGroup>
      <FormLabel component="legend">Upfront Payment</FormLabel>
      <FormControlLabel
        control={
          <Checkbox
            checked={discountList.includes(discount)}
            onChange={handleChange}
            name="discount"
            color="primary"
          />
        }
        label="Yes"
      />
    </FormControl>
  );
};
