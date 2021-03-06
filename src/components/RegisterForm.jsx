import React from "react";

const RegisterForm = ({ submitFormHandler }) => {
  return (
    <form onSubmit={submitFormHandler} id="register-form">
      <div className="ui one column centered grid">
        <div className="ui four column centered row">
          <div className="centered column"><label className="ui pointing below label"><i class="mail icon"></i>Email</label></div>
          <div className="column"><div className="ui input"><input className="ui input" name="email" type="email" id="email" placeholder="Search..."></input></div></div>
        </div>
        <div className="ui four column centered row">
          <div className="centered column"><label className="ui pointing below label">Password</label></div>
          <div className="column"><div className="ui input"><input className="ui input" name="password" type="password" id="password" placeholder="Search..."></input></div></div>
        </div>
        <div className="ui four column centered row">
          <div className="centered column"><label className="ui pointing below label">Confirm Password</label></div>
          <div className="column"><div className="ui input"><input className="ui input" name="password_confirmation" type="password" id="password_confirmation" placeholder="Search..."></input></div></div>
        </div>
        <div className="ui four column centered row">
          <div className="centered column">
          <button className="ui primary button" id="submit">Submit</button>
          </div>
        </div>
      </div>
    </form>
  );
};

export default RegisterForm;