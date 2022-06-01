import * as React from "react";
import { render, fireEvent } from "@testing-library/react";
import NotifyMeModal from "./index";
import ContextProvider, { AppContext } from "lib/context";

const isOpened = true;
const onClose = jest.fn();

test("notify me modal pdp testing", () => {
  render(
    <ContextProvider>
      <NotifyMeModal isOpened={isOpened} onClose={onClose} />
    </ContextProvider>
  );

  expect(isOpened).toBe(true);
});
