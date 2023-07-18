/* import { render, screen } from '@testing-library/react';
import App from '../App';

test('renders learn react link', () => {
  render(<App />);
  const linkElement = screen.getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});
*/ 

import React from "react";
import { render, fireEvent } from "@testing-library/react";
import App from "../App";

describe("App component", () => {
  test("should render the navigation items", () => {
    const { getByText } = render(<App />);
    expect(getByText("Home")).toBeInTheDocument();
    expect(getByText("About")).toBeInTheDocument();
    expect(getByText("Add Project")).toBeInTheDocument();
    expect(getByText("Log In")).toBeInTheDocument();
    expect(getByText("Sign Up")).toBeInTheDocument();
  });

  test('should open and close the side navigation menu', () => {
    const { getByTestId } = render(<App />);
    const navToggleButton = getByTestId('nav-toggle-button');
    const body = document.body;

    // Click the nav toggle button to open the side navigation menu
    fireEvent.click(navToggleButton);
    expect(body.classList.contains('nav-open')).toBe(true);

    // Click the nav toggle button again to close the side navigation menu
    fireEvent.click(navToggleButton);
    expect(body.classList.contains('nav-open')).toBe(false);
  });
});