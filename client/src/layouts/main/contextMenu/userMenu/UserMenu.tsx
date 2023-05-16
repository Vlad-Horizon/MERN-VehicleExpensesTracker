import React from 'react'

// scss
import './userMenu.scss'

export default function UserMenu() {
  const userName = 'Vlad Horizon';
  const userMain = 'Vlad.horizon.02032003@gmail.comhhhhhhhhhhhhhhhhhhhhh';
  const userNamePrefix = 'VH';

  return (
    <div className='userMenuContainer'>
      <div className='infoBlock'>
        <div className='userImageContainer'>
          <div className='userImage'>{userNamePrefix}</div>
        </div>
        <div className='userInfo'>
          <div className='userName'>{userName}</div>
          <div className='userText'>{userMain}</div>
        </div>
        <div className='userButtonsContainer'>
          <div className='userButton'>Settings</div>
          <div className='userButton'>Logout</div>
        </div>
      </div>
    </div>
  )
} 