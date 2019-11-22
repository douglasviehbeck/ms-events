import React from "react";
import { withRouter } from "react-router-dom";

import { Container } from "./styles";

function Header({ history }) {
  function handleLogout() {
    localStorage.removeItem("token");
    history.push("/");
  }

  return (
    <Container>
      <b>Bem vindo ao sistema</b>
      <span onClick={() => history.push("/events")}>Eventos</span>
      <span onClick={() => history.push("/certificates")}>Relatórios</span>
      <span onClick={handleLogout}>Sair</span>
    </Container>
  );
}

export default withRouter(Header);
