import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { loginUser } from "../api requests/user api's/user";
import { AuthContext } from "../context/AuthContext";
import Logo from "../components/Logo";
import Form from "../components/Form";

const Login = () => {
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const userLoginDTO = {
      email: e.target.email.value,
      password: e.target.password.value,
    };

    try {
      const authinticatedUserDetails = await loginUser(userLoginDTO);
      // Save authenticated user details in local storage or Redux store
      if (authinticatedUserDetails) {
        login(authinticatedUserDetails);
        navigate("/products");
      }
    } catch (e) {
      console.error("Error logging in user:", e);
    }
  };

  return (
    <section className="login" id="login">
      <div className="section__title">
        <h1>Sign In</h1>
      </div>

      <Form
        fields={[
          {
            type: "email",
            id: "email",
            name: "email",
          },
          {
            type: "password",
            id: "password",
            name: "password",
          },
        ]}
        handleSubmit={handleSubmit}
        submitBtnText={"Login"}
        links={[
          {
            to: "/",
            text: "Forgot Password?",
            for: "forgot-password",
          },
          {
            to: "/register",
            text: "Create an account",
            for: "register",
          },
        ]}
      />
    </section>
  );
};

export default Login;
