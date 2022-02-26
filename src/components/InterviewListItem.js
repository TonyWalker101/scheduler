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
      src="https://i.imgur.com/LpaY82x.png"
      alt="Sylvia Palmer"
    />
      {props.selected && 'Sylvia Palmer'}
    </li>
  );
}