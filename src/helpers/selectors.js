
function getAppointmentsForDay(state, name) {
  
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

function getInterview(state, interview) {
  
  if(interview) {
    
    for (let y in state.interviewers) {
      if(interview.interviewer === state.interviewers[y].id) {
        
        return {
          ...interview,
          interviewer: state.interviewers[y]
        };
      }
    }
  }
  
  return null;

};
function getInterviewersForDay(state, name) {
  
  const filteredNames = state.days.filter(day => day.name === name);

  const filteredInterviewers = [];

  for (let days of filteredNames) {

    for (let i = 0; i < days.appointments.length; i++) {

      if(state.interviewers[days.interviewers[i]]) {
        filteredInterviewers.push(state.interviewers[days.interviewers[i]])
      }
       
    }
  
  }

  return filteredInterviewers;
};

export { getAppointmentsForDay, getInterview, getInterviewersForDay }
