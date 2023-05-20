import React from 'react';
import DefaultButton from '../defaultButton/DefaultButton';
import './form.scss';

// ----------------------------------------------------------------------

interface Form {
  children: React.ReactNode;
  props: FormDefaultProps;
  columnStyle?: boolean;
}

export interface FormDefaultProps {
  submitFunction: Function;
  valid: boolean;
}

// ----------------------------------------------------------------------

export default function Form({ children, props, columnStyle = false }: Form) {
  const { submitFunction, valid } = props;

  const checkToSubmit = () => {
    if (!valid) return;
    submitFunction();
  };

  return (
    <>
      <div className="FormComponent">
        <div className={columnStyle ? 'inputsBlockColumn' : 'inputsBlock'}>{children}</div>
        <div className="buttonsBlock">
          <DefaultButton text="Submit" bg events={{ onClick: checkToSubmit }} />
        </div>
      </div>
    </>
  );
}
