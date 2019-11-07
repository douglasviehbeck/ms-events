import React from 'react';
import { Form, Input } from '@rocketseat/unform';
import * as Yup from 'yup';

import { Container } from './styles';

const schema = Yup.object().shape({
    name: Yup.string().required('O nome deve ser preenchido'),
    email: Yup.string().email('O email é inválido').required('O email deve ser preenchido'),
    cpf: Yup.string().required('O cpf deve ser preenchido'),
    password: Yup.string().min(6, 'A senha deve ter no mínimo 6 caracteres').required('A senha deve ser preenchida'),
    confirmPassword: Yup.string().when('password', (password, field) => (password ? field.required().oneOf([Yup.ref('password')], 'As senhas não conferem') : field))
})

export default function Signin({ history }) {
    function handleSubmit() {
        history.push('/app');
    }

    return (<Container>
        <Form schema={schema} onSubmit={handleSubmit}>
            <Input name="name" placeholder="Nome *" />
            <Input name="email" placeholder="E-mail *" />
            <Input name="cpf" placeholder="CPF *" />
            <Input name="password" type="password" placeholder="Senha *" />
            <Input name="confirmPassword" type="password" placeholder="Confirmar senha *" />
            <button type="submit">Criar conta</button>
            <small onClick={() => history.push('/')}>
                Já tem uma conta?
            </small>
        </Form>
    </Container>)
}