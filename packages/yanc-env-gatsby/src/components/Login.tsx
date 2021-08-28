import React, { useState } from "react";
import { navigate } from "gatsby";
import { WithT } from "i18next";

import View from "../component-views/Login";

interface Props extends WithT {
  isAuthenticated: () => boolean;
  login: (identifier: string, password: string) => any;
  redirectPath: string;
  isPopup?: boolean;
}

const Login: React.FC<Props> = ({ isAuthenticated, login, redirectPath, isPopup = false, t }) => {
  const [identifier, setIdentifier] = useState("");
  const [password, setPassword] = useState("");
  const [loginState, setLoginState] = useState({ loading: false, error: "" });

  if (isAuthenticated()) {
    navigate(redirectPath, { replace: true });
  }

  return (
    <View
      identifier={identifier}
      onChangeIdentifier={onChangeIdentifier}
      password={password}
      onChangePassword={onChangePassword}
      onSubmit={onSubmit}
      loading={loginState.loading}
      error={loginState.error}
      t={t}
    />
  );

  async function onSubmit() {
    setLoginState({ loading: true, error: "" });
    const res = await login(identifier, password);
    if (res.status === 200) {
      setLoginState({ loading: false, error: "" });
    } else {
      setLoginState({ loading: false, error: "error" });
    }
  }

  function onChangeIdentifier(e: React.FormEvent<HTMLInputElement>) {
    setIdentifier(e.currentTarget.value);
  }
  function onChangePassword(e: React.FormEvent<HTMLInputElement>) {
    setPassword(e.currentTarget.value);
  }
};

export { Login };
