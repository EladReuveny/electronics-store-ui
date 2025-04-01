import React, { useState } from "react";
import { Link } from "react-router-dom";

const Form = ({
  fields = [],
  handleSubmit,
  submitBtnText = "",
  links = [],
}) => {
  const [showPassword, setShowPassword] = useState(false);

  const toggleShowPassword = () => {
    setShowPassword((prev) => !prev);
  };

  return (
    <form className="form" onSubmit={(e) => handleSubmit(e)}>
      <fieldset className="fieldset">
        <legend>User Details</legend>
        {fields.map((field, index) => (
          <div key={index} className="field">
            <input
              type={
                field.type === "password" && showPassword ? "text" : field.type
              }
              id={field.id}
              name={field.name}
              placeholder=""
              required
              autoFocus={index === 0 && true}
              defaultValue={field.defaultValue ? field.defaultValue : ""}
            />
            <label htmlFor={field.id}>
              {field.id.charAt(0).toUpperCase() + field.id.slice(1)}
            </label>
            {field.type === "password" && (
              <i
                className={`fa-solid fa-eye${showPassword ? "-slash" : ""}`}
                onClick={toggleShowPassword}
              ></i>
            )}
          </div>
        ))}

        <button type="submit" className="btn btn--2">
          {submitBtnText}
          <i className="fa-solid fa-right-to-bracket"></i>
        </button>

        <div className="account-options">
          {links.map((link, index) => (
            <React.Fragment key={index}>
              {link.question && <p>{link.question}</p>}
              <Link
                to={link.to}
                className={`${
                  link.for === "forgot-password"
                    ? "forgot-password-link"
                    : "btn btn--1"
                }`}
              >
                {link.text}
              </Link>
            </React.Fragment>
          ))}
        </div>
      </fieldset>
    </form>
  );
};

export default Form;
