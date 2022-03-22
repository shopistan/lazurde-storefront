
import React, { useState } from 'react';
import { render, screen, fireEvent } from "@testing-library/react";
// import TestComp from './../pages/test-component/index';

const addition = (a: number, b: number) => {
  return a + b;
};

test("simple addition test", () => {
  expect(addition(2, 2)).toBe(4);
});

// test("component test", () => {
//   render(<TestComp />);

//   expect(screen.getByText(/value/i).textContent).toBe("value 1")

//   fireEvent.click(screen.getByText('change button'))
  
//   expect(screen.getByText(/value/i).textContent).toBe("value 2")

// })