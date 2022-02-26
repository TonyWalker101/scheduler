import React from "react";
import "components/Appointment/styles.scss";

export default function Appointment(props) {

  // self created
  
  const formatTime = () => {
    if(props.time) {
      return `Appointment at ${props.time}`
    }
    if(!props.time) {
      return "No Appointments"
    }
  };
  
  return (
  <article className="appointment">
    {formatTime()}
  </article>);
}