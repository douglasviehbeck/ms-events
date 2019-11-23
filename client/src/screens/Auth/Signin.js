import React from "react";
import { Form, Input } from "@rocketseat/unform";
import * as Yup from "yup";

// import api from "../../services/api";

import { Container } from "./styles";

const schema = Yup.object().shape({
  email: Yup.string()
    .email("O email é inválido")
    .required("O email deve ser preenchido"),
  password: Yup.string()
    .min(6, "A senha deve ter no mínimo 6 caracteres")
    .required("A senha deve ser preenchida")
});

export default function Signin({ history }) {
  async function handleSubmit(data) {
    // const response = await api.post("/authenticate", data);
    // localStorage.setItem("token", response.data.token);

    localStorage.setItem("token", true);
    window.location.reload();
  }

  return (
    <Container>
      <Form schema={schema} onSubmit={handleSubmit}>
        <Input name="email" placeholder="Email *" />
        <Input name="password" type="password" placeholder="Senha *" />
        <button type="submit">Entrar</button>
        <small onClick={() => history.push("/signup")}>
          Não possui uma conta?
        </small>
      </Form>
    </Container>
  );
}
