import React from 'react';
import { BrowserRouter as Router, Route, Link, } from 'react-router-dom'

import SearchIcon from '@material-ui/icons/Search';

import Search from "./Search";
import Appbar from "./Appbar"
import Table from "./Table"
import Modal from './Modal'

function App() {
  return (
    <div className="App">
     <Appbar/>
     <div>
     <SearchIcon style={{width:"80px",marginTop:"70px"}} />
    
     <text>Search</text>
     <Modal/>
     </div>
     <Table/>
    </div>
  );
}

export default App;
