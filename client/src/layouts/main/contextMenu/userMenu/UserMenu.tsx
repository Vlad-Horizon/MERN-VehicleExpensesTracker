import React from 'react';
import { DefaultButton } from '../../../../components';
import { logout } from '../../../../redux/slices/userSlice';
import { dispatch, store } from '../../../../redux/store';

// scss
import './userMenu.scss';

export default function UserMenu() {
  const { user } = store.getState();
  const userName = user.user.userName;

  return (
    <div className="userMenuContainer">
      <div className="userInfo">
        <div className="userName">
          <span>{`User: `}</span>
          {userName}
        </div>
      </div>

      <div className="buttonsBlock">
        <DefaultButton text="Logout" events={{ onClick: () => dispatch(logout()) }} />
      </div>
    </div>
  );
}
