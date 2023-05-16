import React from 'react'
import { Link, Outlet } from 'react-router-dom';
import { Close, Logout, Magnifi, Notification, Parameters } from '../../assets';
import { useContextMenu } from '../../hooks/ContextMenu';
import Header from './header/Header';
import useWindowSize from '../../hooks/useWindowSize';
import usePageVisibilityChange from '../../hooks/usePageVisibilityChange';

// scss
import './mainLayout.scss'
import useWindowBlur from '../../hooks/useWindowBlur';

function MainLayout() {
  // const [contextMenuActiveButtonsStatys, setContextMenuActiveButtonsStatys] = useState<boolean>(false);
  const {contextMenuStatys, toggle} = useContextMenu();
  const windowSize = useWindowSize();

  // useWindowBlur(() => {hidnContextMenu();});

  // useEffect(() => {
  //   hidnContextMenu()
  // }, [windowSize])
  
  const hidnContextMenu = () => {    
    if (contextMenuStatys) {
      toggle('');
    }
  }

  const click = (e: React.MouseEvent<HTMLDivElement>) => {    
    if (contextMenuStatys) {
      const contextMenuActiveButtons = document.querySelectorAll('.mainButton_ContextMenu');
      const userMenu = document.querySelector('.userMenuContainer') as HTMLElement;
      const notificationMenu = document.querySelector('.notificationMenuContainer') as HTMLElement;

      const isTargetInActiveButton = Array.from(contextMenuActiveButtons).some((myElement) => {
        return myElement.contains(e.target as HTMLElement);
      });

      if (isTargetInActiveButton) return;
      
      if (
          userMenu && !userMenu.contains(e.target as HTMLElement) || 
          notificationMenu && !notificationMenu.contains(e.target as HTMLElement)
      ) {
        toggle('');
      }
    }
  }

  return (
    <div 
      className='mainLayout'
      onClick={(e) => click(e)}
    >

      {/* Header */}
      <Header />

      {/* Sidebar */}
      {/* <div className='sidebar'>
        <div className='innerSidebar'>

        </div>
      </div> */}

      {/* Content */}
      <div className='content'>
        <div className='innerContent'>
          <div className='contentContainer'>
            <Outlet />
          </div>
        </div>
      </div>
    </div>
  )
}

export default MainLayout