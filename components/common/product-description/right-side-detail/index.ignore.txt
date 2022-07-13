import * as React from "react";
import {
  act,
  fireEvent,
  render,
  screen,
  waitFor,
} from "@testing-library/react";
import ContextProvider, { AppContext } from "lib/context";
import RightSideDetail from "./index";

test("right side details page with props", async () => {
  const fetchingReviews = jest.fn();
  const setIsRatingError = jest.fn();
  const setIsloading = jest.fn();

  const productData = {
    Size: 1,
    Color: "red",
    sku: "21046110629-ksa",
    itemId: "246",
    hasStock: true,
  };
  await act(async () => {
    render(
      <ContextProvider>
        <RightSideDetail
          totalRating={0}
          productData={[productData]}
          fetchingReviews={fetchingReviews}
          setIsRatingError={setIsRatingError}
          isRatingError={""}
          priceListId={"10000"}
          setIsloading={setIsloading}
        />
      </ContextProvider>
    );

    const addButton = screen.getByText("Add To Cart");
    fireEvent.click(addButton);

    // const reviewButton = screen.getByText("write a review");
    // fireEvent.click(reviewButton);
  });
});

// test("right side details page with props", async () => {
//   const fetchingReviews = jest.fn();
//   const setIsRatingError = jest.fn();
//   const setIsloading = jest.fn();

//   const productData = {
//     Size: 1,
//     Color: "red",
//     sku: "21046110629-ksa",
//     itemId: "246",
//     hasStock: false,
//   };
//   await act(async () => {
//     render(
//       <ContextProvider>
//         <RightSideDetail
//           totalRating={0}
//           productData={[productData]}
//           fetchingReviews={fetchingReviews}
//           setIsRatingError={setIsRatingError}
//           isRatingError={""}
//           priceListId={"10000"}
//           setIsloading={setIsloading}
//         />
//       </ContextProvider>
//     );
// const button = screen.getByText("Notify me when available");
// fireEvent.click(button);
//   });
// });

test("right side details page empty props", () => {
  const fetchingReviews = jest.fn();
  const setIsRatingError = jest.fn();
  const setIsloading = jest.fn();

  render(
    <ContextProvider>
      <RightSideDetail
        totalRating={0}
        productData={[]}
        fetchingReviews={fetchingReviews}
        setIsRatingError={setIsRatingError}
        isRatingError={""}
        priceListId={"10000"}
        setIsloading={setIsloading}
      />
    </ContextProvider>
  );
});

// test("right side details page arabic props", async () => {
//   const fetchingReviews = jest.fn();
//   const setIsRatingError = jest.fn();
//   const setIsloading = jest.fn();

//   const productData = {
//     Size: 1,
//     Color: "red",
//     sku: "21046110629-ksa",
//     itemId: 246,
//     hasStock: true,
//   };

//   await act(async () => {
//     render(
//       <AppContext.Provider value={{ appState: { lang: "ar" } }}>
//         <RightSideDetail
//           totalRating={0}
//           productData={[productData]}
//           fetchingReviews={fetchingReviews}
//           setIsRatingError={setIsRatingError}
//           isRatingError={""}
//           priceListId={"10000"}
//           setIsloading={setIsloading}
//         />
//       </AppContext.Provider>
//     );
//   });
// });
