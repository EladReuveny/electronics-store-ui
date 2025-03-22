import React from "react";
import { Link } from "react-router-dom";

const Form = ({
  fields = [],
  handleSubmit,
  submitBtnText = "",
  links = [],
}) => {
  return (
    <form className="form" onSubmit={(e) => handleSubmit(e)}>
      <fieldset className="fieldset">
        <legend>User Details</legend>
        {fields.map((field, index) => (
          <div key={index} className="field">
            <input
              type={field.type}
              id={field.id}
              name={field.name}
              placeholder=""
              required
              autoFocus={index === 0 && true}
            />
            <label htmlFor={field.id}>
              {field.id.charAt(0).toUpperCase() + field.id.slice(1)}
            </label>
          </div>
        ))}
        <button type="submit" className="btn btn--2">
          {submitBtnText}
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
