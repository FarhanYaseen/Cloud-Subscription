import React from 'react';
import { useSelector, useDispatch } from "react-redux";
import TextField from '@material-ui/core/TextField';

import { getCreditCardProperty, setCreditCardProperty } from "../redux/slices/creditCardSlice";

export default function Confirmation() {
  const dispatch = useDispatch();
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    dispatch(setCreditCardProperty({ name, value }))

  };
  const email = useSelector((state) => getCreditCardProperty(state, "email"));

  return (
    <div style={{ margin: '10px' }}>
      <TextField
        fullWidth
        type="email"
        name="email"
        value={email}
        label="Email"
        placeholder="Email"
        required
        variant="outlined"
        onChange={handleInputChange}
      />
    </div>
  );
}