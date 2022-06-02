import React from "react";
import Image from "next/image";
import Label from "../ui/label";

const OrderDetails = ({}) => {
  return (
    <>
      <div>
        <Image src={"/order.png"} width={13.75} height={15.28} />
        <Label>My Orders</Label>
        <Label>Displaying 4 Orders</Label>
      </div>
    </>
  );
};
export default OrderDetails;
