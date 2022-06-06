import Image from "next/image";
import React from "react";

const PaypalButton = ({ ...props }) => {
  return (
    <Image src="/public/paypal-logo.png" alt="" width="100%" height="100%" />
  );
};

export default PaypalButton;
