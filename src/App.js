import React from 'react';
import logo from './logo.svg';

import SearchIcon from '@material-ui/icons/Search';
import { BrowserRouter as Router, Route, Link, } from 'react-router-dom'
import Home from './Components/Home'
import Home2 from './ProductComponent/Components/Home'


function App() {
  return (
    <div className="App">
    <Router>
   
      <Route exact path='/' component={Home}/>
      <Route exact path='/product' component={Home2}/>
     
    
    </Router>
    </div>
  );
}

export default App;
