import React from "react";
import { useNavigate } from "react-router-dom";
import { registerUser } from "../api requests/user api's/user";
import Form from "../components/Form";
import useAuth from "../hooks/useAuth";

const Register = () => {
  const navigate = useNavigate();

  const { login } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const user = {
      email: e.target.email.value,
      password: e.target.password.value,
      address: e.target.address.value,
      phone: e.target.phone.value,
    };

    try {
      const registeredUser = await registerUser(user);
      login(registeredUser);
      navigate("/products");
    } catch (e) {
      alert(e.response?.data);
      console.error("Error registering user:", e);
    }
  };

  return (
    <section className="register" id="register">
      <div className="section-title">
        <h1>Sign Up</h1>
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
          {
            type: "text",
            id: "address",
            name: "address",
          },
          {
            type: "tel",
            id: "phone",
            name: "phone",
          },
        ]}
        handleSubmit={handleSubmit}
        submitBtnText="Sign Up"
        links={[
          {
            to: "/login",
            text: "Sign In",
            for: "login",
            question: "Already have an account?",
          },
        ]}
      />
    </section>
  );
};

export default Register;
