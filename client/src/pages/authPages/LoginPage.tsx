import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import InputText from '../../components/form/inputs/inputText/InputText';
import Form from '../../components/form/Form';
import { regPatterns } from '../../config/config';
import { dispatch, store } from '../../redux/store';
import { login } from '../../redux/slices/userSlice';
import { Link } from 'react-router-dom';
import { PATH_AUTH } from '../../routes/paths';
import { DefaultButton } from '../../components';
import './authPages.scss';
import { InputPassword, useForm, useInputText } from '../../components/form';

export default function LoginPage() {
  const [reqError, setReqError] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);

  const onSubmit = async() => {
    setLoading(true)
    await dispatch(login(form.textInputs.userName.value, form.textInputs.password.value));

    const { user } = store.getState();
    setReqError(user.error.message);
    
    setLoading(false)
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
      <Helmet>
        <title>Login</title>
      </Helmet>

      <div className="loginPageComponent">
        <div className="pageName">Login</div>
        <div className="redirect">
          <span>
            New user?
            <Link to={PATH_AUTH.register}>Create an account</Link>
          </span>
        </div>

        <Form>
          <div className="authForm">
            <div className={'inputsBlock'}>
              <InputText defaultProps={form.textInputs.userName} />
              <InputPassword defaultProps={form.textInputs.password} />
            </div>
          {
            reqError && <div className='inputTextError'>{reqError}</div>
          }
            <div className="buttonsBlock">
              <DefaultButton text="Submit" bg events={{ onClick: form.submit }} isLoad={loading} />
            </div>
          </div>
        </Form>
      </div>
    </>
  );
}
