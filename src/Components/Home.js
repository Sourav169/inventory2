import React,{useState,useEffect} from 'react';
import { BrowserRouter as Router, Route, Link, } from 'react-router-dom'

import SearchIcon from '@material-ui/icons/Search';

import Search from "./Search";
import Appbar from "./Appbar"
import Table from "./Table"
import Modal from './Newcustomer2'
import './Modal.css'

function App() {
  const [search,searchInput]=useState("")
  return (
    <div className="App">
     <Appbar/>
     <div>
       <div className="search">
       <SearchIcon style={{width:"80px",marginTop:"100px"}} />
       
       <input className="search-input" placeholder="Search" type = "text" onChange={(e)=>searchInput(e.target.value)} />
       </div>
     
     <Modal/>
     </div>
     <Table val={search}/>
    </div>
  );
}

export default App;
