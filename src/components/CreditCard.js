import React, { useEffect } from 'react';
import { useSelector, useDispatch } from "react-redux";
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import FormControl from '@material-ui/core/FormControl';

import { getCreditCardProperty, setCreditCardProperty } from "../redux/slices/creditCardSlice";

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: '25ch',
  },
}));

export default function CreditCard() {
  const dispatch = useDispatch();
  const classes = useStyles();
  const name = useSelector((state) => getCreditCardProperty(state, "name"));
  const number = useSelector((state) => getCreditCardProperty(state, "number"));
  const cvc = useSelector((state) => getCreditCardProperty(state, "cvc"));
  const expiry = useSelector((state) => getCreditCardProperty(state, "expiry"));

  useEffect(() => {
    if (number && cvc  && expiry && name) {
      dispatch(setCreditCardProperty({ name: 'creditCardValid', value: true }))
    }
    else {
      dispatch(setCreditCardProperty({ name: 'creditCardValid', value: false }))
    }
  }, [name, number, cvc, expiry, dispatch]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    dispatch(setCreditCardProperty({ name, value }))
  }
  return (
    <div className={classes.root}>
      <form style={{ marginTop: "32px" }}>
        <FormControl>
          <TextField
            style={{ margin: 10 }}
            type="text"
            name="name"
            value={name}
            label="Name"
            required
            variant="outlined"
            onChange={handleInputChange}
            placeholder="Name"
          />
          <TextField
            style={{ margin: 10 }}
            type="tel"
            name="cvc"
            value={cvc}
            label="CCV"
            required
            variant="outlined"
            onChange={handleInputChange}
            placeholder="xxx"
          />
        </FormControl>
        <FormControl>
          <TextField
            style={{ margin: 10 }}
            type="tel"
            name="number"
            value={number}
            label="Card Number"
            required
            variant="outlined"
            onChange={handleInputChange}
            placeholder="xxxxxxxxxxxxxxxx"
          />
          <TextField
            style={{ margin: 10 }}
            type="tel"
            name="expiry"
            value={expiry}
            label="Expiry"
            required
            variant="outlined"
            onChange={handleInputChange}
            placeholder="xx/xx"
          />
        </FormControl>
      </form>
    </div>
  );
}