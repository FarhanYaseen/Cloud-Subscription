import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchSubscriptionDetails, getAPIProperty } from "../redux/slices/apiSlice";
import Stepper from "../components/Stepper";
import Loader from "../components/Loader";

const PaymentPage = () => {
  const dispatch = useDispatch();
  const loading = useSelector((state) => getAPIProperty(state, "loading"));
  useEffect(() => {
    dispatch(
      fetchSubscriptionDetails({ url: "https://cloud-storage-prices-moberries.herokuapp.com/", path: 'prices' })
    );
  }, [dispatch]);
  return (
    <div className="flex-container">
      <div>
        {loading ?
          <Loader /> :
          <Stepper />
        }
      </div>
    </div>
  )
};

export default PaymentPage;
