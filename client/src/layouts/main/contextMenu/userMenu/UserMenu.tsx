import React from 'react';
import { logout } from '../../../../redux/slices/userSlice';
import { dispatch } from '../../../../redux/store';

// scss
import './userMenu.scss';

export default function UserMenu() {
  const userName = 'Vlad Horizon';
  const userMain = 'Vlad.horizon.02032003@gmail.com';
  const userNamePrefix = 'VH';

  return (
    <div className="userMenuContainer">
      <div className="infoBlock">
        <div className="userImageContainer">
          <div className="userImage">{userNamePrefix}</div>
        </div>
        <div className="userInfo">
          <div className="userName">{userName}</div>
          <div className="userText">{userMain}</div>
        </div>
        <div className="userButtonsContainer">
          <div className="userButton">Settings</div>
          <div className="userButton" onClick={() => dispatch(logout())}>
            Logout
          </div>
        </div>
      </div>
    </div>
  );
}
