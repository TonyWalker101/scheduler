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
    
    const days = updateSpots(appointments);

    return axios.put(`/api/appointments/${id}`, {interview})
    .then( () => setState({...state,appointments,days}))
  }

  function cancelInterview(id) {

    const appointment = {
      ...state.appointments[id],
      interview: null
    };

    const appointments = {
      ...state.appointments,
      [id]: appointment
    };

    return axios.delete(`/api/appointments/${id}`)
    .then( () => {

      const days = updateSpots(appointments);

      setState({
        ...state,
        days,
        appointments
      })
    })
    
  }

  function updateSpots(appointments) {
    
    const newDays = [];
    
    const getSpotsForDay= (day) => {
      
      let counter = 0;

      day.appointments.forEach(appointmentID => {

        if(appointments[appointmentID].interview === null) {
          counter++;
        }
      })
      return counter;

    }

    state.days.forEach(day => {
      newDays.push({...day, spots: getSpotsForDay(day)})
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