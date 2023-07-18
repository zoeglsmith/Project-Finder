// created Jest test page

/* import { render, fireEvent } from '@testing-library/react';
import SignUpForm from './SignUp';

test('should submit form with correct user data', () => {
    // Render the Sign Up form
    const { getByLabelText, getByRole } = render(<SignUpForm />);
  
    // Fill in the form inputs
    const nameInput = getByLabelText('firstName');
    const lastNameInput = getByLabelText('lastName');
    const emailInput = getByLabelText('email');
    const passwordInput = getByLabelText('password');
    const degreeInput = getByLabelText('degree');
    const skillsInput = getByLabelText('skills');
    const interestInput = getByLabelText('interest');
    fireEvent.change(nameInput, { target: { value: 'John' } });
    fireEvent.change(lastNameInput, { target: { value: 'Doe' } });
    fireEvent.change(emailInput, { target: { value: 'johndoe@example.com' } });
    fireEvent.change(passwordInput, { target: { value: 'password123' } });
    fireEvent.change(degreeInput, { target: { value: 'info sci' } });
    fireEvent.change(skillsInput, { target: { value: 'computer' } });
    fireEvent.change(interestInput, { target: { value: 'computer' } });
  
    // Submit the form
    const submitButton = getByRole('button', { name: 'Submit' });
    fireEvent.click(submitButton);
  
    // Assert that the form was submitted with correct data
    // You can use expect() with various matchers to assert the expected behavior
    // For example:
    expect(submitButton).toBeDisabled();
    expect(nameInput).toHaveValue('John');
    expect(nameInput).toHaveValue('Doe');
    expect(emailInput).toHaveValue('johndoe@example.com');
    expect(passwordInput).toHaveValue('password123');
    expect(degreeInput).toHaveValue('infosci');
    expect(skillsInput).toHaveValue('computer');
    expect(interestInput).toHaveValue('computer');
  });
  */ 

  import React from "react";
  import { render, screen, fireEvent } from "@testing-library/react";
  import SignUp from "../SignUp";
  
  describe("SignUp", () => {
    it("should render the Student SignUp form by default", () => {
      render(<SignUp />);
      const signUpForm = screen.getByText("Student Sign Up");
      expect(signUpForm).toBeInTheDocument();
    });
  
    it("should switch to Staff SignUp form when Staff is selected", () => {
      render(<SignUp />);
      const staffRadioBtn = screen.getByLabelText("Staff");
      fireEvent.click(staffRadioBtn);
  
      const signUpForm = screen.getByText("Staff Sign Up");
      expect(signUpForm).toBeInTheDocument();
    });
  
    it("should submit the form with valid data", async () => {
      const mockFetch = jest.fn(() => Promise.resolve({ ok: true }));
      global.fetch = mockFetch;
  
      render(<SignUp />);
      const submitBtn = screen.getByText("Submit");
  
      fireEvent.change(screen.getByLabelText("First Name"), {
        target: { value: "John" },
      });
      fireEvent.change(screen.getByLabelText("Last Name"), {
        target: { value: "Doe" },
      });
      fireEvent.change(screen.getByLabelText("Email"), {
        target: { value: "johndoe@example.com" },
      });
      fireEvent.change(screen.getByLabelText("Password"), {
        target: { value: "password" },
      });
      fireEvent.change(screen.getByLabelText("Degree"), {
        target: { value: "Computer Science" },
      });
      fireEvent.change(screen.getByLabelText("Interest"), {
        target: { value: "Web Development" },
      });
      fireEvent.change(screen.getByLabelText("Skills"), {
        target: { value: "JavaScript" },
      });
  
      fireEvent.click(submitBtn);
  
      // wait for the fetch request to complete
      await Promise.resolve();
  
      expect(mockFetch).toHaveBeenCalledWith("http://localhost:8080/Student", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          firstName: "John",
          lastName: "Doe",
          email: "johndoe@example.com",
          password: "password",
          degree: "Computer Science",
          interest: "Web Development",
          skills: "JavaScript",
          department: "",
        }),
      });
    });
  
    it("should display an error message for incomplete form data", () => {
      render(<SignUp />);
      const submitBtn = screen.getByText("Submit");
  
      fireEvent.change(screen.getByLabelText("First Name"), {
        target: { value: "John" },
      });
      fireEvent.change(screen.getByLabelText("Last Name"), {
        target: { value: "Doe" },
      });
  
      fireEvent.click(submitBtn);
  
      const errorMsg = screen.getByText("Please fill in all the required fields.");
      expect(errorMsg).toBeInTheDocument();
    });
  });

  