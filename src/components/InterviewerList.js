import React from "react";
import "components/InterviewerList.scss";
import InterviewListItem from "./InterviewListItem";

export default function InterviewerList(props) {

  const interviewersArray = props.interviewers.map(interviewer => {
    return (
      <InterviewListItem 
        key={interviewer.id}
        name={interviewer.name}
        avatar={interviewer.avatar}
        selected={interviewer.id === props.interviewer}
        setInterviewer={() => props.setInterviewer(interviewer.id)}
      />)
      
  })

  return (
    <section className="interviewers">
      <h4 className="interviewers__header text--light">
        interviewer
      </h4>
      <ul className="interviewers__list">
        {interviewersArray}
      </ul>
    </section>
  );
}