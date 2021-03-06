import React, { Component } from "react";
import DisplayCooperResult from "./components/DisplayCooperResult";
import InputFields from './components/InputFields';
import LoginForm from './components/LoginForm';
import RegisterForm from './components/RegisterForm';
import DisplayPerformanceData from './components/DisplayPerformanceData';
import { authenticate } from './modules/auth';
import { register } from './modules/register';
import './App.css';


class App extends Component {
  state = {
    distance: "",
    gender: "female",
    age: "",
    renderLoginForm: false,
    renderRegisterForm: false,
    registered: false,
    authenticated: false,
    messageColor: "ui green message", 
    message: "",
    entrySaved: false,
    renderIndex: false
  };

  onChangeHandler = e => {
    this.setState({ [e.target.name]: e.target.value, entrySaved: false });
  };

  onLogin = async e => {
    e.preventDefault();
    const response = await authenticate(
      e.target.email.value,
      e.target.password.value
    );
    if (response.authenticated) {
      this.setState({ messageColor: "ui green message", authenticated: true });
    } else {
      this.setState({ messageColor: "ui red message", message: "Something went wrong! :("});
    }
  };

  onRegister = async e => {
    e.preventDefault();
    const response = await register(
      e.target.email.value,
      e.target.password.value,
      e.target.password_confirmation.value
    );
    if (response.registered) {
      this.setState({ registered: true });
      this.setState({ messageColor: "ui green message", message: "Your user was created! :D"});
      console.log(response)
    } else {
      // this.setState({ message: response.message });
      this.setState({ messageColor: "ui red message", message: "Something went wrong! :("});
      console.log(response)
    }
  };

  render() {
    const { renderLoginForm, renderRegisterForm, authenticated, message, registered, messageColor } = this.state;
    let renderBackButton;
    let renderButtons;
    let renderLogout;
    let renderInputForms;
    let renderMessage;
    let performanceDataIndex;

    switch(true) {
      case renderLoginForm && !authenticated:
        renderInputForms = <LoginForm submitFormHandler={this.onLogin} />;
        break;
      case renderRegisterForm && !authenticated:
        renderInputForms = <RegisterForm submitFormHandler={this.onRegister} />;
        break; 
      case !renderLoginForm && !authenticated:
        renderButtons = (
          <>
            <button
              className="ui primary button" id="login" onClick={() => this.setState({ renderLoginForm: true })}>Login</button>
            <button className="ui primary button" id="register" onClick={() => this.setState({ renderRegisterForm: true })}>Register</button>
          </>
        );
        break;
      case authenticated:
        renderMessage = (<div class={messageColor}><p id="loginMessage">Logged in as: {JSON.parse(sessionStorage.getItem("credentials")).uid}</p></div>);
        renderLogout = (<div className=" column">
                          <a className="ui primary button" id="logoutButton" 
                          onClick={() => this.setState({ authenticated: false, registered: false, renderLoginForm: false,
                            renderRegisterForm: false,renderBackButton: false, message: "", renderButtons: true })}>Logout</a>
                        </div>);
        if (this.state.renderIndex) {
          performanceDataIndex = (
            <>
              <button className="ui primary button" onClick={() => this.setState({ renderIndex: false })}>Hide past entries</button>
              <div className="break"></div>
              <DisplayPerformanceData
                updateIndex={this.state.updateIndex}
                indexUpdated={() => this.setState({ updateIndex: false })}
              />
            </>
          )
        } else {
          performanceDataIndex = (
            <button className="ui primary button"  id="show-index" onClick={() => this.setState({ renderIndex: true })}>Show past entries</button>
          )
        }
        break;
    }

    if((renderLoginForm || renderRegisterForm) && !authenticated){
      renderBackButton = (
        <>
          <a className="ui primary button" id="backButton" onClick={() => this.setState({ renderRegisterForm: false, renderLoginForm: false, registered: false, message: "" })}>Back</a>
        </>
      );}

    if(registered || message){
      renderMessage = (
        <>
          <div className={messageColor}><p id="message">{message}</p></div>
        </>
      )
    }

    if(authenticated){
      renderInputForms = (
        <>
            <InputFields onChangeHandler={this.onChangeHandler} />
        </>
      )
    }

    return (
      <>
        <div class="cover">
  
          <nav className="ui fluid two item menu">
          {renderButtons}
          {renderLogout}
          {renderBackButton}
          </nav>
          <div className="container">
            {renderMessage}
          </div>
          <div className="container">
            {renderInputForms}
          </div>
          <div className="container">
          <DisplayCooperResult
            distance={this.state.distance}
            gender={this.state.gender}
            age={this.state.age}
            authenticated={this.state.authenticated}
            entrySaved={this.state.entrySaved}
            entryHandler={() => this.setState({ entrySaved: true, updateIndex: true })}/>
            </div>
            <div className="container" id="index">
            {performanceDataIndex}
            </div>
          </div>
      </>
    );
  }
}

export default App;