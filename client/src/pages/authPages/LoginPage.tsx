import React, { useState } from 'react';
import { useForm } from '../../components/form/useForm';
import { useInputText } from '../../components/form/inputs/inputText/useInputText';
import InputText from '../../components/form/inputs/inputText/InputText';
import Form from '../../components/form/Form';
import { regPatterns } from '../../config/config';
import './loginPage.scss';
import { dispatch } from '../../redux/store';
import { login } from '../../redux/slices/userSlice';
import { Link } from 'react-router-dom';
import { PATH_AUTH } from '../../routes/paths';

export default function LoginPage() {
  const onSubmit = () => {
    dispatch(login(form.inputs.userName.value, form.inputs.password.value));
  };

  const form = useForm({
    submitFunction: onSubmit,

    inputs: {
      userName: useInputText({
        name: 'userName',
        placeholder: 'Name',
        inputValue: '',
        reg: regPatterns.userName,
        required: true,
      }),
      password: useInputText({
        name: 'password',
        placeholder: 'Password',
        inputValue: '',
        reg: regPatterns.password,
        required: true,
      }),
    },
  });

  return (
    <>
      <div className="loginPageComponent">
        <div className="pageName">Login</div>
        <div className="redirect">
          <span>
            New user?
            <Link to={PATH_AUTH.register}>Create an account</Link>
          </span>
        </div>

        <Form props={form} columnStyle>
          <InputText defaut={form.inputs.userName} />
          <InputText defaut={form.inputs.password} />
        </Form>
      </div>
    </>
  );
}
