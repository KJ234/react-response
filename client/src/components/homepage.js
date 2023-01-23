import React, {useEffect} from 'react'
import Navbar from './sidebar/sidebar'
import Topnav from './topnav/topnav'
import Chart from '../pages/chart/chart'
import { useNavigate } from 'react-router-dom'

const Homepage = () => {
    const Navigate = useNavigate()

    useEffect(() => {
        const token = sessionStorage.getItem("token");
        if (!token) {
          Navigate("/login");
        }
      }, []);
    return (
        <div className="">
            <div className="navbar">
                <Navbar />
            </div>
            <div className="sidebar">
                <Topnav />
            </div>
            <div className="chart">
                <Chart />

            </div>
        </div>
    )
}

export default Homepage