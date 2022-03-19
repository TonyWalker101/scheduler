import React, { useState } from "react";
import InterviewerList from "components/InterviewerList";
import Button from "components/Button"

export default function Form(props) {
  
  const [student, setStudent] = useState(props.student || "");
  const [interviewer, setInterviewer] = useState(props.interviewer || null);
  const [error, setError] = useState("");

  const reset = () => {
    setStudent("");
    setInterviewer(null);
    return;
  }

  const cancel = () => {
    reset();
    setError("");
    props.onCancel();
    return;
  };

  const validate = () => {
    // if (interviewer && student !== "") {
    //   props.onSave(student, interviewer);
    // }
    if (student === "") {
      setError("Student name cannot be blank");
      return;
    } 

    setError("");
    props.onSave(student, interviewer);
    return;
  };

  return (

    <main className="appointment__card appointment__card--create">
      <section className="appointment__card-left">
        <form autoComplete="off" onSubmit={event => event.preventDefault()}>
          <input
            data-testid="student-name-input"
            className="appointment__create-input text--semi-bold"
            value={student}
            type="text"
            placeholder="Enter Student Name"
            onChange={(event) => setStudent(event.target.value)}
          />
        </form>
        <section className="appointment__validation">{error}</section>
        <InterviewerList 
          interviewer={interviewer}
          interviewers={props.interviewers}
          setInterviewer={(id) => setInterviewer(id)}
        />
      </section>
      <section className="appointment__card-right">
        <section className="appointment__actions">
          <Button danger onClick={cancel}>Cancel</Button>
          <Button confirm onClick={() => validate()}>Save</Button>
        </section>
      </section>
    </main>
  );
}