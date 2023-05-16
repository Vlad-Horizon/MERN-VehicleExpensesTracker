import React from 'react'
import { Clock, Folder, Logout, Mark } from '../../../../assets';
import { DefaultButton, Hr, RadioButton } from '../../../../components';

// scss
import './notificationMenu.scss'

export default function NotificationMenu() {
  const notifications = 0

  return (
    <div className='notificationMenuContainer'>
      <div className='header'>
        <div className='title'>Notifications</div>
        <div className='description'>You have {`${notifications}`} unread messages</div>
        <div className='svgContainer'>
          <div className='innerSvgContainer'>
            <RadioButton sx={{color: 'rgb(32, 101, 209)'}}>
              <Mark/>
            </RadioButton>
          </div>
        </div>
      </div>
      <Hr />
      <div className='notificationContent'>
        <div className="title">New</div>
          <div className='notificationButtonContainer'>
            <div className='notificationIco'>
              <Folder />
            </div>
            <div className='notificationTitle'>Title message</div>
            <div className='notificationBody'>Body this message</div>
            <div className='notificationTime'>
              <div className='svgContainer'>
                <Clock />
              </div>
              1 day age
            </div>
          </div>


          <div className='notificationButtonContainer notificationButtonContainer_new'>
            <div className='notificationIco'>
              <Folder />
            </div>
            <div className='notificationTitle'>Title message</div>
            <div className='notificationBody'>Body this message</div>
            <div className='notificationTime'>
              <div className='svgContainer'>
                <Clock />
              </div>
              1 day age
            </div>
          </div>
      </div>
      <Hr />
      <div className='buttonContainer'>
        <DefaultButton text='View all'/>
      </div>
    </div>
  )
} 