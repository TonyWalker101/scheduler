import React from "react";
import "components/Appointment/styles.scss";
import Header from "./Header";
import Show from "./Show";
import Empty from "./Empty";
import Status from "./Status";
import Confirm from "./Confirm";
import useVisualMode from "hooks/useVisualMode";
import Form from "./Form";

const EMPTY = "EMPTY";
const SHOW = "SHOW";
const CREATE = "CREATE";
const SAVING = "SAVING";
const CONFIRM = "CONFIRM";
const DELETE = "DELETE";
const EDIT = "EDIT";

const deleteWarning = "Are you sure you want to delete this interview?";

export default function Appointment(props) {

  const { mode, transition, back } = useVisualMode(
    props.interview ? SHOW : EMPTY
  );
  
  function save(name, interviewer) {

    const interview = {
      student: name,
      interviewer
    };

    transition(SAVING);

    props.bookInterview(props.id, interview)
    .then(() => {
      transition(SHOW)
    });
  }

  function remove(id) {

    transition(DELETE);
    
    props.cancelInterview(id)
    .then(() => transition(EMPTY));
  }

  function confirmingDelete() {
    transition(CONFIRM);
  }

  function edit() {
    transition(EDIT)
  }
    
  return (
  <article className="appointment">
    <Header time={props.time}/>
      {mode === EMPTY && <Empty onAdd={() => transition(CREATE)} />}
      {mode === SHOW && (
      <Show
        student={props.interview.student}
        interviewer={props.interview && props.interview.interviewer}
        id={props.id}
        onDelete={confirmingDelete}
        onEdit={edit}
      />)}
      {mode === CREATE && <Form interviewer={props.interview && props.interview.interviewer} interviewers={props.interviewers} onCancel={() => back()} onSave={save}/>}
      {mode === EDIT && <Form student={props.interview.student} interviewer={props.interview && props.interview.interviewer.id} interviewers={props.interviewers} onCancel={() => back()} onSave={save}/>}
      {mode === SAVING && <Status message="Saving"/>}
      {mode === DELETE && <Status message="Deleting"/>}
      {mode === CONFIRM && <Confirm message={deleteWarning} onCancel={()=> back()} onConfirm={() => remove(props.id)}/>}
  </article>);
}