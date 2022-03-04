
export default function getAppointmentsForDay(state, name) {
  
  const filteredNames = state.days.filter(day => day.name === name);

  const filteredAppointments = [];

  for (let days of filteredNames) {

    for (let i = 0; i < days.appointments.length; i++) {

      if(state.appointments[days.appointments[i]]) {
        filteredAppointments.push(state.appointments[days.appointments[i]])
      }
      
    }
  
  }

  return filteredAppointments;
};
