import React, {useState} from 'react';
import {Link} from 'react-router-dom';
import './Navbar.css';


function Navbar() {
  const [click, setClick] = useState(false);


  const handleClick = () => setClick(!click);
  const closeMobileMenu = () => setClick(false);


 
  return (
    <>
       <nav className="navbar">
         <div className="navbar-container">
           <Link to="/" className="navbar-logo">
             ShareIT <i className=' fab fa-typo3'/>
              </Link>
              <div className='menu-icon' onClick={handleClick}>
            <i className={click ? 'fas fa-times' : 'fas fa-bars'} />
          </div>
          <ul className={click ? 'nav-menu active' : 'nav-menu'}>
            <li className='nav-item'>
              <Link to='/' className='nav-links' onClick={closeMobileMenu}>
                EMPLOYEES
              </Link>
            </li>
            <li className='nav-item'>
              <Link
                to='/teams'
                className='nav-links'
                onClick={closeMobileMenu}
              >
                TEAMS
              </Link>
            </li>
            <li className='nav-item'>
              <Link
                to='/daysoff'
                className='nav-links'
                onClick={closeMobileMenu}
              >
                DAYS OFF
              </Link>
            </li>

            <li className='nav-item'>
              <Link
                to='/reports'
                className='nav-links'
                onClick={closeMobileMenu}
              >
                REPORTS
              </Link>
            </li>
            <li className='nav-item'>
              <Link
                to='/company'
                className='nav-links'
                onClick={closeMobileMenu}
              >
                COMPANY
              </Link>
            </li>
            <li className='nav-item'>
              <Link
                to='/logout'
                className='nav-links'
                onClick={closeMobileMenu}
              >
                Log Out
              </Link>
            </li>
        </ul>
        </div>
      </nav>
    </>
  );
}

export default Navbar;

