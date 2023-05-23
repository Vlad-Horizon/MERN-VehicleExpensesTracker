import React, { useState } from 'react';
import Form from '../../components/form/Form';
import { regPatterns } from '../../config/config';
import './authPages.scss';
import authService from '../../services/authService';
import { Link, useNavigate } from 'react-router-dom';
import { PATH_AUTH } from '../../routes/paths';
import { DefaultButton } from '../../components';
import { useForm, useInputText, InputText, InputPassword } from '../../components/form';

export default function RegistrPage() {
  const navigate = useNavigate();
  const onSubmit = async () => {
    const res = await authService.register({
      userName: form.textInputs.userName.value,
      password: form.textInputs.password.value,
    });

    if (res.code === 200) {
      navigate('/Auth/Login');
    }
  };

  const form = useForm({
    submitFunction: onSubmit,

    textInputs: {
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
      <div className="registrPageComponent">
        <div className="pageName">Registration</div>
        <div className="redirect">
          <span>
            Already have an account?
            <Link to={PATH_AUTH.login}>Sign in</Link>
          </span>
        </div>

        <Form>
          <div className="authForm">
            <div className={'inputsBlock'}>
              <InputText defaultProps={form.textInputs.userName} />
              <InputPassword defaultProps={form.textInputs.password} />
            </div>
            <div className="buttonsBlock">
              <DefaultButton text="Submit" bg events={{ onClick: form.submit }} />
            </div>
          </div>
        </Form>
      </div>
    </>
  );
}
