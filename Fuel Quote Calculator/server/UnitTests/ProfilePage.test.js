import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import ProfilePage from './ProfilePage';
import '@testing-library/jest-dom';
import { within } from '@testing-library/react';
import { act } from 'react-dom/test-utils';

describe('ProfilePage', () => {
  test('renders form initially', () => {
    render(<ProfilePage />);
    expect(screen.getByText('My Profile')).toBeInTheDocument();

    const form = screen.getByTestId('profile-form');
    expect(form).toBeInTheDocument();

    const { getByLabelText } = within(form);
    expect(getByLabelText(/Full Name:/)).toBeInTheDocument();
  });

  test('form submission saves data and displays saved data', async () => {
    render(<ProfilePage />);
    const fullNameInput = screen.getByLabelText(/Full Name:/);
    const address1Input = screen.getByLabelText(/Address 1:/);
    const address2Input = screen.getByLabelText(/Address 2/);
    const cityInput = screen.getByLabelText(/City:/);
    const stateSelect = screen.getByLabelText(/State:/);
    const zipcodeInput = screen.getByLabelText(/Zipcode:/);
    const submitButton = screen.getByRole('button', { name: /Save/ });

    await act(async () => {
      await userEvent.type(fullNameInput, 'John Doe');
      await userEvent.type(address1Input, '123 Main St');
      await userEvent.type(address2Input, 'Apt 4B');
      await userEvent.type(cityInput, 'New York');
      await userEvent.selectOptions(stateSelect, 'NY');
      await userEvent.type(zipcodeInput, '10001');
      await userEvent.click(submitButton);
    });

    const savedData = screen.queryByText(/John Doe/);
    expect(savedData).toBeInTheDocument();
  });


  test("clicking edit button shows form with saved data", async () => {
    render(<ProfilePage />);
  
    // Fill out and submit the form
    fireEvent.change(screen.getByLabelText(/Full Name/i), { target: { value: "John Doe" } });
    fireEvent.change(screen.getByLabelText(/Address 1/i), { target: { value: "123 Main St" } });
    fireEvent.change(screen.getByLabelText(/City/i), { target: { value: "Anytown" } });
    fireEvent.change(screen.getByLabelText(/State/i), { target: { value: "CA" } });
    fireEvent.change(screen.getByLabelText(/Zipcode/i), { target: { value: "12345" } });
    fireEvent.click(screen.getByText(/Save/i));
  
    // Click the "Edit" button
    const editButton = screen.getByText(/Edit/i);
    fireEvent.click(editButton);
  
    // Assert that the form is displayed and the saved data is present in the form fields
    const form = screen.getByTestId("profile-form");
    expect(form).toBeInTheDocument();
    expect(screen.getByLabelText(/Full Name/i)).toHaveValue("John Doe");
    expect(screen.getByLabelText(/Address 1/i)).toHaveValue("123 Main St");
    expect(screen.getByLabelText(/City/i)).toHaveValue("Anytown");
    expect(screen.getByLabelText(/State/i)).toHaveValue("CA");
    expect(screen.getByLabelText(/Zipcode/i)).toHaveValue("12345");
  });
});
