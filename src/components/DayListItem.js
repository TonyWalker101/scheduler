import React from "react";
import classNames from "classnames";
import "components/DayListItem.scss";

export default function DayListItem(props) {

  const DayListItemClass = classNames("day-list__item", {
    "day-list__item--selected": props.selected,
    "day-list__item--full": props.spots === 0
  });

  const formatSpots = () => {
    if (props.spots === 0) {
      return ("no spots remaining")
    }

    if (props.spots === 1) {
      return (`${props.spots} spot remaining`)
    }

    if (props.spots > 1) {
      return (`${props.spots} spots remaining`)
    }

  };

  return (
    <li 
      onClick={props.setDay} 
      className={DayListItemClass}
      data-testid="day"
    >
      <h2>{props.name}</h2> 
      <h3>{formatSpots()}</h3>
    </li>
  );
}