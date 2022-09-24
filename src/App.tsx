import React from 'react';
import Layout from './components/Layout';
import { AppContextProvider } from './context/AppContext';

const App = () => {
  return (
    <div className="wrapper">
      <AppContextProvider>
        <Layout />
      </AppContextProvider>
    </div>
  );
};

export default App;
