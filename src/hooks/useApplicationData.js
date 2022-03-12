import { useState, useEffect } from "react";
import axios from "axios";

export default function useApplicationData() {

  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: {}
  });

  const setDay = day => setState({ ...state, day });

  useEffect(() => {
    const daysURL = `/api/days`;
    const appointmentsURL = `/api/appointments`;
    const interviewersURL = `/api/interviewers`;

    Promise.all([
      axios.get(daysURL),
      axios.get(appointmentsURL),
      axios.get(interviewersURL)
    ]).then((all) => {
      setState(prev => ({...prev, days: all[0].data, appointments: all[1].data, interviewers: all[2].data}))
    })

  }, []);

  function bookInterview(id, interview, mode) {

    const appointment = {
      ...state.appointments[id],
      interview: { ...interview }
    };

    const appointments = {
      ...state.appointments,
      [id]: appointment
    };

    const days = mode === "EDIT" ? updateSpots(0) : updateSpots(-1)

    return axios.put(`/api/appointments/${id}`, {interview})
    .then(setState({
      ...state,
      appointments,
      days
    }));
  }

  function cancelInterview(id) {

    return axios.delete(`/api/appointments/${id}`)
    .then( () => {

      const days = updateSpots(1);

      setState({
        ...state,
        days
      })
    })
    
  }

  function updateSpots(num) {

    const currentDayObject = state.days.find(x => x.name === state.day);

    const newDays = [...state.days];
    
    newDays.forEach(x => {
      return currentDayObject.name === x.name ? currentDayObject.spots += num : x
    })

    return newDays;

  }

  return {
    state,
    setDay,
    bookInterview,
    cancelInterview
  }

}