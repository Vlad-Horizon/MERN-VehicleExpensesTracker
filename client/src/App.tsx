import React from 'react';
import ContextMenuProvider from './hooks/ContextMenu';

// routes
import Router from './routes';

// components
// import LoadingScreen from './components/LoadingScreen';

// scss
import './styles/nullifier.scss'
import './styles/root.scss'

// ----------------------------------------------------------------------
// disable default context menu
const preventContextMenu = (e: React.MouseEvent<HTMLDivElement>) => {
  e.preventDefault();
}

// ----------------------------------------------------------------------

function App() {
  return (
    <div id='innerRoot'
      onContextMenu={(e) => preventContextMenu(e)}
    >
      <ContextMenuProvider>
        <Router />
        {/* <LoadingScreen /> */}
      </ContextMenuProvider>
    </div>
  );
}

export default App;
