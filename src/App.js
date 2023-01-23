import React from "react";
import { Routes, Route } from "react-router-dom"
import Login from './pages/Login/Login'
import { Layout } from 'antd';
import Register from './pages/register/Register'
import Charts from './pages/chart/chart.js'
import Homepage from "./components/homepage";
import './index.css'

function App() {
  return (


    <div className="main">
      <Layout>
        <Routes>
          <>
            <Route path="/login" element={<Login />} />
            <Route path="/" element={<Register />} />
            <Route path="/chartHomepage" element={<Homepage />} />
          </>
        </Routes>
      </Layout>
    </div>


  );
}

export default App;

