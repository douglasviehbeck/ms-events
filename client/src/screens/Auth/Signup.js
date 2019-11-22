import React, { useState } from "react";
import { Form, Input } from "@rocketseat/unform";
import * as Yup from "yup";

// import api from '../../services/api';

import { Container } from "./styles";

const schema = Yup.object().shape({
  name: Yup.string().required("O nome deve ser preenchido"),
  email: Yup.string()
    .email("O email é inválido")
    .required("O email deve ser preenchido"),
  cpf: Yup.string().required("O cpf deve ser preenchido"),
  password: Yup.string()
    .min(6, "A senha deve ter no mínimo 6 caracteres")
    .required("A senha deve ser preenchida"),
  confirmPassword: Yup.string().when("password", (password, field) =>
    password
      ? field.required().oneOf([Yup.ref("password")], "As senhas não conferem")
      : field
  )
});

const simpleSchema = Yup.object().shape({
  email: Yup.string()
    .email("O email é inválido")
    .required("O email deve ser preenchido"),
  password: Yup.string()
    .min(6, "A senha deve ter no mínimo 6 caracteres")
    .required("A senha deve ser preenchida"),
  confirmPassword: Yup.string().when("password", (password, field) =>
    password
      ? field.required().oneOf([Yup.ref("password")], "As senhas não conferem")
      : field
  )
});

export default function Signup({ history }) {
  const [simpleRegister, setSimpleRegister] = useState(false);

  async function handleSubmit() {
    // await api.post('/users');

    history.push("/");
    alert("Conta criada com sucesso");
  }

  return (
    <Container>
      <input
        type="checkbox"
        onClick={() => setSimpleRegister(!simpleRegister)}
      />
      <span>Cadastro simplificado</span>

      <Form
        schema={simpleRegister ? simpleSchema : schema}
        onSubmit={handleSubmit}
      >
        {!simpleRegister && (
          <>
            <Input name="name" placeholder="Nome *" />
            <Input name="cpf" placeholder="CPF *" />
          </>
        )}
        <Input name="email" placeholder="E-mail *" />
        <Input name="password" type="password" placeholder="Senha *" />
        <Input
          name="confirmPassword"
          type="password"
          placeholder="Confirmar senha *"
        />
        <button type="submit">Criar conta</button>
        <small onClick={() => history.push("/")}>Já tem uma conta?</small>
      </Form>
    </Container>
  );
}
