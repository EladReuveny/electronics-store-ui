import React from "react";
import { Link } from "react-router-dom";

const Form = ({
  fields = [],
  handleSubmit,
  submitBtnText = "",
  links = [],
}) => {
  return (
    <form className="form" onSubmit={handleSubmit}>
      <fieldset className="form__fieldset">
        <legend>User Details</legend>
        {fields.map((field, index) => (
          <div key={index} className="form__field">
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
        <div className="form__account-options">
          {links.map((link, _) => (
            <>
              {link.question && <p>{link.question}</p>}
              <Link to={link.to} className={`${link.for}-link`}>
                {link.text}
              </Link>
            </>
          ))}
        </div>
      </fieldset>
    </form>
  );
};

export default Form;
