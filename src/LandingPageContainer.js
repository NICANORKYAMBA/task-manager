import { connect } from "react-redux";
import LandingPage from "./LandingPage";
import {
  loginUser,
  signupUser,
  signupUserWithGoogle,
  loginUserWithGoogle
} from './actions/authActions';

const mapDispatchToProps = (dispatch) => {
  return {
    handleLoginClick: () => dispatch(loginUser()),
    handleSignupClick: () => dispatch(signupUser()),
    handleGoogleSignupClick: () => dispatch(signupUserWithGoogle()),
    handleGoogleLoginClick: () => dispatch(loginUserWithGoogle())
  };
};

export default connect(null, mapDispatchToProps)(LandingPage);