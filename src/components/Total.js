import React from "react";
import { useSelector } from "react-redux";
import { getProperty } from "../redux/slices/subscriptionSlice";

const Total = () => {
  const duration = useSelector((state) => getProperty(state, "duration"));
  const storage = useSelector((state) => getProperty(state, "storage"));
  const pricePerGB = useSelector((state) => getProperty(state, "pricePerGB"));
  const discount = useSelector((state) => getProperty(state, "discount"));
  const discountList = [true, 'true'];
  const total = duration * storage * pricePerGB;
  return (
    <div className="total-container">
      <div>
        <h3>Total</h3>
        <p>Subscription {duration} Months {`${pricePerGB}$`} Per/GB </p>
        <p>Storage {storage} GB</p>
        {discountList.includes(discount) ? (
          <>
            <del
              style={{ color: "red" }}
            >{`${total} $`}</del>
            &nbsp;
            {` ${total * 0.9} $`} (10% Discount)
          </>
        ) : (
          <>{`${total} $`}</>
        )}
      </div>
    </div>
  );
};

export default Total;