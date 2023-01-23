import React, { useEffect, useState } from 'react'
import { Menu, Typography, Button } from 'antd'
import { Link } from 'react-router-dom'
import { NavLink } from 'react-router-dom'
import { MenuOutlined } from '@ant-design/icons'
import MenuItem from './navlinks.js'

const { Title } = Typography

const Navbar = () => {


  const [activeMenu, setActiveMenu] = useState(true);
  const [screenSize, setScreenSize] = useState(undefined);

  useEffect(() => {
    const handleResize = () => setScreenSize(window.innerWidth);

    window.addEventListener('resize', handleResize);

    handleResize();

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    if (screenSize <= 900) {
      setActiveMenu(false);
    } else {
      setActiveMenu(true);
    }
  }, [screenSize]);



  return (
    <div className="nav-container">
      <div className="logo-container">
        <Title level={2} className='logo'>
          <Link to='/'>Dashboard</Link>

          <Button className="menu-control-container" onClick={() => setActiveMenu(!activeMenu)}><MenuOutlined /></Button>
        </Title>
        {activeMenu && (
          <Menu theme='dark'>
            {
              MenuItem.map((item, index) => (
                <li className="nav_list" key={index}>
                  <NavLink path to={item.path}> {item.display} {item.icon} </NavLink>
                </li>
              ))
            }

          </Menu>
        )}
      </div>

    </div>
  )
}

export default Navbar
