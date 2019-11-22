import React, { useState, useEffect } from "react";
import { Route, Redirect } from "react-router-dom";

// import api from "../services/api";

export default function RouteWrapper({
  component: Component,
  isPrivate,
  ...rest
}) {
  const [loading, setLoading] = useState(true);
  const [signed, setSigned] = useState(false);

  useEffect(() => {
    async function checkAuth() {
      const token = localStorage.getItem("token");

      if (token) {
        // const { data } = await api.post("/verify", { token });
        // setSigned(data.token);

        setSigned(true);
      }

      setLoading(false);
    }

    checkAuth();
  }, []);

  if (loading) {
    return <h1>Carregando...</h1>;
  }

  if (!signed && isPrivate) {
    return <Redirect to="/" />;
  }

  if (signed && !isPrivate) {
    return <Redirect to="/events" />;
  }

  return <Route {...rest} render={props => <Component {...props} />} />;
}
