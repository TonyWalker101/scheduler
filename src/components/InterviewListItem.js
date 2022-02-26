import React from "react";
import "components/InterviewListItem.scss"
import classNames from "classnames";

export default function InterviewListItem(props) {

  const InterviewListItemClass = classNames("interviewers__item", {
    "interviewers__item--selected": props.selected,
  });

  return (
    <li 
      className={InterviewListItemClass}
      onClick={() => props.setInterviewer(props.id)}  
    >
    <img
      className="interviewers__item-image"
      src={props.avatar}
      alt={props.name}
    />
      {props.selected && props.name}
    </li>
  );
}