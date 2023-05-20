import React, { useState } from 'react';
import { useForm } from '../../components/form/useForm';
import { useInputText } from '../../components/form/inputs/inputText/useInputText';
import InputText from '../../components/form/inputs/inputText/InputText';
import Form from '../../components/form/Form';
import { regPatterns } from '../../config/config';
import './loginPage.scss';
import authService from '../../services/authService';
import { Link, useNavigate } from 'react-router-dom';
import { PATH_AUTH } from '../../routes/paths';

export default function RegistrPage() {
  const navigate = useNavigate();
  const onSubmit = async () => {
    const res = await authService.register({
      userName: form.inputs.userName.value,
      password: form.inputs.password.value,
    });

    if (res.code === 200) {
      navigate('/Auth/Login');
    }
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
        <div className="pageName">Registration</div>
        <div className="redirect">
          <span>
            Already have an account?
            <Link to={PATH_AUTH.login}>Sign in</Link>
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
