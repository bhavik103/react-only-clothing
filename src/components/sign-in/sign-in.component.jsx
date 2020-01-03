import React, { Component } from "react";
import "./sign-in.styles.scss";
import FormInput from "../form-input/form-input.component";
import CustomButton from "../custom-button/custom-button.component";
import { auth } from "../../firebase/firebase.utils";
import SnackBar from "../snack-bar/snack-bar.component";
import firebase from "firebase/app";

class SignIn extends Component {
  constructor() {
    super();

    // ******** DEFINED STATE ********
    this.state = {
      email: "",
      password: "",
      Show: false,
      Showing: false
    };
  }

  // ******** EMAIL LOGIN ********
  handleSubmit = async event => {
    event.preventDefault();
    if (this.state.Showing) return;

    const { email, password } = this.state;

    try {
      await auth.signInWithEmailAndPassword(email, password);
      this.setState({ email: "", password: "" }, () => {
        this.setState({ Show: true, Showing: true });
        setTimeout(() => {
          this.setState({ Show: false, Showing: false });
        }, 2000);
      });
    } catch (error) {
      console.log("NOT LOGGED IN ", error);
    }

    this.setState({ email: "", password: "" });
  };

  // ******** GOOGLE LOGIN ********
  signInWithGoogle = () => {
    auth.signInWithPopup(new firebase.auth.GoogleAuthProvider()).then(() => {
      this.setState({ Show: true, Showing: true });
      setTimeout(() => {
        this.setState({ Show: false, Showing: false });
      }, 2000);
    });
  };

  // ******** INPUT CHANGE ********
  handleChange = event => {
    const { value, name } = event.target;
    this.setState({ [name]: value });
  };

  // ******** RENDER ********
  render() {
    return (
      <div className="sign-in">
        <h2>I already have an account</h2>
        <span>Sign in with your email and password</span>

        <form onSubmit={this.handleSubmit}>
          <FormInput
            name="email"
            type="email"
            value={this.state.email}
            label="Email"
            handleChange={this.handleChange}
            required
          />

          <FormInput
            name="password"
            type="password"
            value={this.state.password}
            label="Password "
            handleChange={this.handleChange}
            required
          />

          <div className="buttons">
            <CustomButton type="submit">Sign In</CustomButton>
            <CustomButton onClick={this.signInWithGoogle} isGoogleSignIn>
              Sign In With Google
            </CustomButton>
          </div>
        </form>
        <SnackBar Show={this.state.Show} msg={"Logged in successfully!"} />
      </div>
    );
  }
}
export default SignIn;
