import { connect } from "react-redux";
import LandingPage from "./LandingPage";
import {
	loginUser,
	signupUser,
} from './actions/authActions';

const mapDispatchToProps = (dispatch) => {
  return {
	  handleLoginClick: () => dispatch(loginUser()),
	  handleSignupClick: () => dispatch(signupUser()),
  };
};

export default connect(null, mapDispatchToProps)(LandingPage);
