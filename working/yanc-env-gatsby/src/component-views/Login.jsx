/* eslint-disable jsx-a11y/label-has-associated-control */
import React from "react";

let s = require("./login.module.scss");
s = s.default || s;

const View = ({
  identifier,
  onChangeIdentifier,
  password,
  onChangePassword,
  onSubmit,
  loading,
  error,
  t,
}) => (
  <form className="">
    {/* email */}
    <div className="mb-3 row">
      <label htmlFor={s.inputEmail} className="form-label">
        {t("login.email")}
      </label>
      <input
        value={identifier}
        onChange={onChangeIdentifier}
        disabled={loading}
        type="email"
        className="form-control"
        id={s.inputEmail}
        placeholder="id@email.com"
      />
    </div>
    {/* password */}
    <div className="mb-3 row">
      <label htmlFor={s.inputPassword} className="form-label">
        {t("login.password")}
      </label>
      <input
        value={password}
        onChange={onChangePassword}
        disabled={loading}
        type="password"
        className="form-control"
        id={s.inputPassword}
        placeholder="password"
      />
    </div>
    {/* submit button */}
    <div className="mb-3 row">
      <button onClick={onSubmit} disabled={loading} type="submit" className="btn btn-primary mb-3">
        {t("login.submit")}
      </button>
    </div>
    {/* status messages */}
    {loading && <p>Loading...</p>}
    {error && <p> {error} </p>}
  </form>
);

export default View;
