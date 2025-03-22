import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { registerUser } from "../api requests/user api's/user";
import { AuthContext } from "../context/AuthContext";
import Form from "../components/Form";

const Register = () => {
  const navigate = useNavigate();
  const { login } = useContext(AuthContext);

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
      alert(`User ${registeredUser.email} registered successfully!`);
      login(registeredUser);
      navigate("/products");
    } catch (e) {
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
