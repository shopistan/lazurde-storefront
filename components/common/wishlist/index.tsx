import { FC, useState, useEffect } from "react";
import { Heart } from "components/icons";
import { getWishList, deleteWishList, addWishList } from "lib/utils/wishlist";
import FillHeart from "components/icons/FillHeart";

interface WishListProps {
  authToken?: string | "";
  itemId?: string | number;
}

const WishList: FC<WishListProps> = ({
  authToken = "eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYyNWRiMjliMGM0NjQ4MDM2YTI0NWZjMCIsInJvbGVzIjpbeyJpZCI6IjVlMTk2MjUwNWVmNjEyMDAwODlmM2IyMiJ9XSwicGVybWlzc2lvbnMiOltdLCJhY2NvdW50aWQiOiI2MjVkYjI5YWRlZTBlMjAwMDliMmRhNGQiLCJhY2NvdW50SWQiOm51bGwsInVzZXJUeXBlIjp7ImtpbmQiOiJSRUdJU1RFUkVEIn0sInRlbmFudElkIjoiNjFhNTEwZmEzN2JiNjQwMDA5YWNmNTVlIiwiaXNzdWVyIjoiNTczNzg1OTIzMjI0IiwiaWF0IjoxNjU0MTUzMzYxLCJleHAiOjE2NTQxNTUxNjF9.FLBjzjjR3g1zreH03aIE9B92H5y1HL6RfhwoePFbKeASfqq2RcyGqkKiexRTELDTPMOJEa9XXklsqfaegYS-fKrEXoIjjHv4KpolommWzaSINL5C__zljx7QZtF5sRtyYKPPlwEcuPtdMJTCERIfyDIHsMF4oehEVvN-cd6DwOA",
  itemId = "68",
}): JSX.Element => {
  const [active, setActive] = useState(false);
  useEffect(() => {
    const initializeWislist = async () => {
      const wishlistArray = await getwishlist();
      const isSelected = wishlistArray.data.items.find(
        (item: string) => item === itemId
      );

      isSelected && setActive(true);
    };
    initializeWislist();
  }, []);
  const getwishlist = async () => {
    const response = await getWishList(authToken);
    return response;
  };
  const addwishlist = async () => {
    const response = await addWishList(authToken, itemId);
  };

  const deletewishlist = async () => {
    const response = await deleteWishList(itemId, authToken);
  };
  return (
    <>
      {active == false && (
        <div
          onClick={() => {
            setActive(true);
            addwishlist();
          }}
        >
          <Heart fill="black" stroke="black" />
        </div>
      )}
      {active == true && (
        <div
          onClick={() => {
            setActive(false);
            deletewishlist();
          }}
        >
          <FillHeart />
        </div>
      )}
    </>
  );
};
export default WishList;
