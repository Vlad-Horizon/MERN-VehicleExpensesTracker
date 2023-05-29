import React, { useState } from "react";
import { Helmet } from "react-helmet";
import Form from "../../components/form/Form";
import { regPatterns } from "../../config/config";
import "./authPages.scss";
import authService from "../../services/authService";
import { Link, useNavigate } from "react-router-dom";
import { PATH_AUTH } from "../../routes/paths";
import { DefaultButton } from "../../components";
import {
  useForm,
  useInputText,
  InputText,
  InputPassword,
} from "../../components/form";
import { dispatch, store } from "../../redux/store";
import { login } from "../../redux/slices/userSlice";

export default function RegistrPage() {
  const [reqError, setReqError] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  const navigate = useNavigate();
  const onSubmit = async () => {
    try {
      setLoading(true);

      const res = await authService.register({
        userName: form.textInputs.userName.value,
        password: form.textInputs.password.value,
      });

      if (res.code === 200) {
        await dispatch(
          login(form.textInputs.userName.value, form.textInputs.password.value)
        );
      }

      const { user } = store.getState();
      setReqError(user.error.message);

      setLoading(false);
    } catch (e) {
      setLoading(false);
      if ((e as any)?.message) {
        setReqError((e as any)?.message);
      }
    }
  };

  const form = useForm({
    submitFunction: onSubmit,

    textInputs: {
      userName: useInputText({
        name: "userName",
        placeholder: "Name",
        inputValue: "",
        reg: regPatterns.userName,
        required: true,
      }),
      password: useInputText({
        name: "password",
        placeholder: "Password",
        inputValue: "",
        reg: regPatterns.password,
        required: true,
      }),
    },
  });

  return (
    <>
      <Helmet>
        <title>Register</title>
      </Helmet>

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
            <div className={"inputsBlock"}>
              <InputText defaultProps={form.textInputs.userName} />
              <InputPassword defaultProps={form.textInputs.password} />
            </div>
            {reqError && <div className="inputTextError">{reqError}</div>}
            <div className="buttonsBlock">
              <DefaultButton
                text="Submit"
                bg
                events={{ onClick: form.submit }}
                isLoad={loading}
              />
            </div>
          </div>
        </Form>
      </div>
    </>
  );
}
