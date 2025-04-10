import React, { useState } from "react";
import Form from "../components/Form";
import { forgotPassword } from "../api requests/user api's/user";
import { useNavigate } from "react-router-dom";

const ForgotPassword = () => {
  const [authenticatedUser, setAuthenticatedUser] = useState(null);

  const navigate = useNavigate();

  const handleForgotPassword = async (e) => {
    e.preventDefault();

    const userForgotPasswordDTO = {
      email: e.target.email.value,
      address: e.target.address.value,
      phone: e.target.phone.value,
    };

    try {
      const authenticatedUserDetails = await forgotPassword(
        userForgotPasswordDTO
      );
      setAuthenticatedUser(authenticatedUserDetails);
    } catch (err) {
      alert(err);
    }
  };

  return (
    <section id="forgot-password" className="forgot-password">
      <div className="section-title">
        <h1>Forgot Password</h1>
      </div>

      {authenticatedUser ? (
        <div className="user-details form">
          <fieldset className="fieldset">
            <legend>Profile Information</legend>

            <div className="email">
              <div className="field">
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={authenticatedUser?.email}
                  placeholder=""
                  autoFocus
                  disabled
                />
                <label htmlFor="email">Email</label>
              </div>
            </div>

            <div className="password">
              <div className="field">
                <input
                  type="text"
                  id="password"
                  name="password"
                  value={authenticatedUser?.password}
                  placeholder=""
                  disabled
                />
                <label htmlFor="password">Password</label>
              </div>
            </div>

            <div className="address">
              <div className="field">
                <input
                  type="text"
                  id="address"
                  name="address"
                  value={authenticatedUser?.address}
                  placeholder=""
                  disabled
                />
                <label htmlFor="address">Address</label>
              </div>
            </div>

            <div className="phone">
              <div className="field">
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={authenticatedUser?.phone}
                  placeholder=""
                  pattern="[0-9]*"
                  inputMode="numeric"
                  disabled
                />
                <label htmlFor="phone">Phone</label>
              </div>
            </div>

            <div className="actions">
              <button
                className="btn btn--4"
                onClick={() =>
                  navigate("/login", {
                    state: {
                      email: authenticatedUser.email,
                    },
                  })
                }
              >
                Go back
                <i className="fa-solid fa-arrow-left"></i>
              </button>
            </div>
          </fieldset>
        </div>
      ) : (
        <Form
          fields={[
            {
              type: "email",
              id: "email",
              name: "email",
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
          handleSubmit={handleForgotPassword}
          submitBtnText={"Retrieve Password"}
        />
      )}
    </section>
  );
};

export default ForgotPassword;
