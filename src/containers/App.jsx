import React from 'react';
import '../styles/materialize.css';
import '../styles/App.css';


import Header from '../components/Header';
import Navigation from './Navigation';

function App() {
  return (
    <div>
      <Navigation />
      <Header />
    </div>
  );
}

export default App;
