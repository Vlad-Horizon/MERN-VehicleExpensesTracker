import React, { useState } from 'react';
import { DefaultButton, InputText } from '../../components';
import { useInputText } from '../../hooks';
import { dispatch } from '../../redux/store';
import { login } from '../../redux/slices/userSlice';

export default function LoginPage() {
  const [isSubmit, setIsSubmit] = useState<boolean>(false);
  const userName = useInputText({
    name: 'userName',
    label: 'Name',
    inputValue: '',
    reg: /^[A-Z][a-z]*$/,
    required: true,
    submit: isSubmit,
  });
  const password = useInputText({
    name: 'password',
    label: 'Password',
    inputValue: '',
    reg: /^[\.]{1,30}$/,
    required: true,
    submit: isSubmit,
  });

  const onSubmit = async () => {
    setIsSubmit(true);
    dispatch(login(userName.value, password.value));
  };

  return (
    <>
      <InputText
        name={userName.name}
        value={userName.value}
        viewName={userName.label}
        error={userName.error}
        errorText={userName.errorText}
        events={{
          onChange: userName.onChange,
        }}
      />
      <InputText
        name={password.name}
        value={password.value}
        viewName={password.label}
        error={password.error}
        errorText={password.errorText}
        events={{
          onChange: password.onChange,
        }}
      />
      <DefaultButton events={{ onClick: () => onSubmit() }} text="Submit" bg style={{ marginTop: '10px' }} />
    </>
  );
}
