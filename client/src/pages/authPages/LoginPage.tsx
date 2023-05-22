import React, { useState } from 'react';
import { useForm } from '../../components/form/useForm';
import { useInputText } from '../../components/form/inputsHooks/toTextInputs/useInputText';
import InputText from '../../components/form/inputs/inputText/InputText';
import Form from '../../components/form/Form';
import { regPatterns } from '../../config/config';
import { dispatch } from '../../redux/store';
import { login } from '../../redux/slices/userSlice';
import { Link } from 'react-router-dom';
import { PATH_AUTH } from '../../routes/paths';
import { DefaultButton } from '../../components';
import InputPassword from '../../components/form/inputs/inputPassword/InputPassword';
import InputFile from '../../components/form/inputs/inputFile/InputFile';
import { useInputFiles } from '../../components/form/inputsHooks/toFileInputs/useInputFile';
import './authPages.scss';
import DragAndDrop from '../../components/form/inputs/dragAndDrop/DragAndDrop';

export default function LoginPage() {
  const onSubmit = () => {
    dispatch(login(form.textInputs.userName.value, form.textInputs.password.value));
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

    fileInputs: {
      test: useInputFiles({
        name: 'test',
        placeholder: 'test',
        multiple: true,
        required: true,
      }),
    },
  });
  console.log(1);

  return (
    <>
      <DragAndDrop
        isDrag={form.fileInputs.test.isDrag}
        handleDragLeave={(e: any) => form.fileInputs.test.handleDragLeave(e)}
        handleDragOver={(e: any) => form.fileInputs.test.handleDragOver(e)}
        handlerDrop={(e: any) => form.fileInputs.test.handlerDrop(e)}
      >
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
                <InputFile defaultProps={form.fileInputs.test} />
              </div>
              <div className="buttonsBlock">
                <DefaultButton text="Submit" bg events={{ onClick: form.submit }} />
              </div>
            </div>
          </Form>
        </div>
      </DragAndDrop>
    </>
  );
}
