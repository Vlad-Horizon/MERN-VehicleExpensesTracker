import React from 'react';
import { Logo, Notification } from '../../../assets';
import { RadioButton, Search } from '../../../components';
import { useContextMenu } from '../../../hooks/ContextMenu';
import { store } from '../../../redux/store';
import NotificationMenu from '../contextMenu/notificationMenu/NotificationMenu';
import UserMenu from '../contextMenu/userMenu/UserMenu';

// scss
import './header.scss';

function Header() {
  const { user } = store.getState();
  const userNamePrefix = user.user.userName.substring(0, 2);
  const { contextMenuStatys, toggle } = useContextMenu();

  return (
    <>
      <div className="header">
        <div className="innerHeader">
          <RadioButton sx={{ padding: '0', hover: 0 }}>
          VET
          </RadioButton>

          {/* <Search /> */}

          <div className="buttonContainer">
            {/* <RadioButton sx={{margin: 'auto'}} events={{onClick: () => toggle('notificationMenu')}} contextMenu={true}>
              <Notification />
            </RadioButton> */}

            <RadioButton sx={{ padding: '4px' }} events={{ onClick: () => toggle('userMenu') }} contextMenu={true}>
              {/* <img src="https://www.dropbox.com/s/iv3vsr5k6ib2pqx/avatar_default.jpg?dl=1" alt={userNamePrefix} /> */}
              <span className="userImg">{userNamePrefix}</span>
            </RadioButton>
          </div>
        </div>
      </div>

      {contextMenuStatys === 'userMenu' && <UserMenu />}
      {contextMenuStatys === 'notificationMenu' && <NotificationMenu />}
    </>
  );
}

export default Header;
