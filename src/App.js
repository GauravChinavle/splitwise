import React from 'react';
import SplitWise from './components/SplitWise';
import Copyright from './components/Copyright';
import './App.scss'
import { BrowserRouter as Router } from "react-router-dom";

export default function App() {
  return (
    <Router>
    <SplitWise/>
    <Copyright/>
    </Router>
  );
}
