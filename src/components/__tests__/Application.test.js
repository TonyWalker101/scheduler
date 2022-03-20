import React from "react";

import { render, cleanup, waitForElement, fireEvent, getByText, prettyDOM, getAllByTestId, getByAltText, getByPlaceholderText, queryByText } from "@testing-library/react";

import Application from "components/Application";

import axios from "axios";

afterEach(cleanup);

describe("Application", () => {

  it("defaults to Monday and changes the schedule when a new day is selected", async () => {
  
    const { getByText } = render(<Application />);

    await waitForElement(() => getByText("Monday"))
    
    fireEvent.click(getByText("Tuesday"));
    expect(getByText("Leopold Silvers")).toBeInTheDocument();
  });

  it("loads data, books an interview and reduces the spots remaining for the first day by 1", async () => {
  
    const { container, debug } = render(<Application />);

    await waitForElement(() => getByText(container, "Archie Cohen"))

    const appointments = getAllByTestId(container, "appointment");
    const appointment = appointments[0];

    fireEvent.click(getByAltText(appointment, "Add"));

    fireEvent.change(getByPlaceholderText(appointment, /enter student name/i), {
      target: { value: "Lydia Miller-Jones" }
    });
    fireEvent.click(getByAltText(appointment, "Sylvia Palmer"));

    fireEvent.click(getByText(appointment, "Save"));

    expect(getByText(appointment, "Saving")).toBeInTheDocument();

    await waitForElement(() => getByText(container, "Lydia Miller-Jones"));

    const day = getAllByTestId(container, "day").find(day =>
      queryByText(day, "Monday")
    );

    expect(getByText(day, "no spots remaining")).toBeInTheDocument();

  });

  it("loads data, cancels an interview and increases the spots remaining for Monday by 1", async () => {
  
    // render the Application
    const { container, debug } = render(<Application />);

    // wait until the text Archie Cohen is displayed
    await waitForElement(() => getByText(container, "Archie Cohen"))

    const appointment = getAllByTestId(container, "appointment").find(appointment => queryByText(appointment, "Archie Cohen"));

    // Click the Delete button on the booked interview
    fireEvent.click(getByAltText(appointment, "Delete"));

    //Check that the confirmation message is shown
    expect(getByText(appointment, "Are you sure you want to delete this interview?")).toBeInTheDocument();

    // Click the Confirm button
    fireEvent.click(getByText(appointment, "Confirm"));

    //Check that the element with the text Deleting is displayed
    expect(getByText(appointment, "Deleting")).toBeInTheDocument();
    
    //Wait until the element with the Add button is displayed
    await waitForElement(() => getByAltText(appointment, "Add"));

    // Check that the DaylistItem shows 2 spots remaining
    const day = getAllByTestId(container, "day").find(day =>
      queryByText(day, "Monday")
    );

    expect(getByText(day, "2 spots remaining")).toBeInTheDocument();

  });

  it("loads data, edits an interview and keeps the spots remaining for Monday the same", async () => {
  
    // render the Application
    const { container, debug } = render(<Application />);

    // wait until the text Archie Cohen is displayed
    await waitForElement(() => getByText(container, "Archie Cohen"))

    const appointment = getAllByTestId(container, "appointment").find(appointment => queryByText(appointment, "Archie Cohen"));

    // Click the Edit button on the booked interview
    fireEvent.click(getByAltText(appointment, "Edit"));

    //Edit the appointment by choosing a new interviewer
    fireEvent.click(getByAltText(appointment, "Tori Malcolm"));

    //Click save
    fireEvent.click(getByText(appointment, "Save"));
    
    //Check that the element with the text Saving is displayed
    expect(getByText(appointment, "Saving")).toBeInTheDocument();
    
    // Wait for element with updated appointment to appear
    await waitForElement(() => getByText(appointment, "Tori Malcolm"));

    // Check that the DaylistItem shows 1 spot remaining
    const day = getAllByTestId(container, "day").find(day =>
      queryByText(day, "Monday")
    );

    expect(getByText(day, "1 spot remaining")).toBeInTheDocument();

  });

  it("shows the save error when failing to save an appointment", async () => {
    axios.put.mockRejectedValueOnce();

    // render the Application
    const { container, debug } = render(<Application />);

    // wait until the text Archie Cohen is displayed
    await waitForElement(() => getByText(container, "Archie Cohen"))

    const appointment = getAllByTestId(container, "appointment").find(appointment => queryByText(appointment, "Archie Cohen"));

    // Click the Edit button on the booked interview
    fireEvent.click(getByAltText(appointment, "Edit"));

    //Edit the appointment by choosing a new interviewer
    fireEvent.click(getByAltText(appointment, "Tori Malcolm"));

    //Click save
    fireEvent.click(getByText(appointment, "Save"));
    
    //Check that the element with the text Saving is displayed
    expect(getByText(appointment, "Saving")).toBeInTheDocument();

    // Wait for element with save error message to appear
    await waitForElement(() => getByText(appointment, "Oops! An error occured while trying to save this interview."));

    // Exit out of error message
    fireEvent.click(getByAltText(appointment, "Close"));

    // Wait until the text Archie Cohen is displayed
    await waitForElement(() => getByText(container, "Archie Cohen"))

    // Check that the DaylistItem still shows 1 spot remaining
    const day = getAllByTestId(container, "day").find(day =>
      queryByText(day, "Monday")
    );

    expect(getByText(day, "1 spot remaining")).toBeInTheDocument();
  });

  it("shows the delete error when failing to delete an existing appointment", async () => {
    axios.delete.mockRejectedValueOnce();

    // render the Application
    const { container, debug } = render(<Application />);

    // wait until the text Archie Cohen is displayed
    await waitForElement(() => getByText(container, "Archie Cohen"))

    const appointment = getAllByTestId(container, "appointment").find(appointment => queryByText(appointment, "Archie Cohen"));

    // Click the Delete button on the booked interview
    fireEvent.click(getByAltText(appointment, "Delete"));

    //Check that the confirmation message is shown
    expect(getByText(appointment, "Are you sure you want to delete this interview?")).toBeInTheDocument();

    // Click the Confirm button
    fireEvent.click(getByText(appointment, "Confirm"));

    //Check that the element with the text Deleting is displayed
    expect(getByText(appointment, "Deleting")).toBeInTheDocument();
    
    // Wait for element with delete error message to appear
    await waitForElement(() => getByText(appointment, "Oops! An error occured while trying to delete this interview."));

    // Exit out of error message
    fireEvent.click(getByAltText(appointment, "Close"));

    // Wait until the text Archie Cohen is displayed
    await waitForElement(() => getByText(container, "Archie Cohen"));

    // Check that the DaylistItem still shows 1 spot remaining
    const day = getAllByTestId(container, "day").find(day =>
      queryByText(day, "Monday")
    );

    expect(getByText(day, "1 spot remaining")).toBeInTheDocument();

  });

});