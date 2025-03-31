import React from "react";
import { useNavigate } from "react-router-dom";
import { loginUser } from "../api requests/user api's/user";
import Form from "../components/Form";
import useAuth from "../hooks/useAuth";

const Login = () => {
  const { login } = useAuth();

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const userLoginDTO = {
      email: e.target.email.value,
      password: e.target.password.value,
    };

    try {
      const authinticatedUserDetails = await loginUser(userLoginDTO);

      if (authinticatedUserDetails) {
        login(authinticatedUserDetails);
        navigate(-1);
      }
    } catch (e) {
      alert(e.response?.data);
      console.error("Error logging in user:", e);
    }
  };

  return (
    <section className="login" id="login">
      <div className="section-title">
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
