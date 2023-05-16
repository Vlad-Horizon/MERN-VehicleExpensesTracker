// контекстне меню

import React, {createContext, useContext, useState} from 'react'

interface ContextMenuContextState {
  contextMenuStatys: string;
  toggle: Function;
}

interface ContextMenuContextProps {
  children: React.ReactNode;
}

const ContextMenuContext = createContext<ContextMenuContextState>({
  contextMenuStatys: '',
  toggle: () => {},
});

export const useContextMenu = () => {
  return useContext<ContextMenuContextState>(ContextMenuContext);
}

function ContextMenuProvider({children}: ContextMenuContextProps) {
  const [contextMenuStatys, setContextMenuStatys] = useState<string>('');
  
  const toggle = (props: string) => {
    setContextMenuStatys(props);
  }

  return (
    <ContextMenuContext.Provider value={{
      contextMenuStatys: contextMenuStatys,
      toggle: toggle,
    }}>
      {children}
    </ContextMenuContext.Provider>
  )
}

export default ContextMenuProvider