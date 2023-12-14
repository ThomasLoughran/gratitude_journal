import { Link, Outlet } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { UserContext } from "../containers/JournalContainer";
import { Sidebar, Menu, MenuItem, SidebarProps } from 'react-pro-sidebar';
import {HomeOutlinedIcon} from "@mui/material"
import { FiHome } from "react-icons/fi";
import { RxHamburgerMenu } from "react-icons/rx";
import { FaPlus } from "react-icons/fa";
import { IoIosJournal } from "react-icons/io";
import { CiLogin } from "react-icons/ci";
import { CiLogout } from "react-icons/ci";



const NavBar = ({ setJournalEntries }) => {

  const [collapsed, setCollapsed] = useState(true);
  
  const handleToggleSidebar = () => { 
    setCollapsed(!collapsed);
  }

  const { currentUser } = useContext(UserContext) || {};

  if (!currentUser) {
    return null;
  }

  const renderSignOut = () => {
    if (currentUser === null) {
      return <> </>
    } else {
      return <MenuItem
        icon={<CiLogout />}
        component={<Link to="/" onClick={handleLogout} />}>Sign Out</MenuItem>
    }
  }

  const handleLogout = () => {
    alert("You have successfully signed out!")
    console.log("Logout logic");
    setJournalEntries([]);
  };

  return (
    <>
      <Sidebar 
      className="sidebar"
      style={({width: collapsed ? '60px': '900px', display: "flex"})}
      collapsed={collapsed}>
        <RxHamburgerMenu onClick={handleToggleSidebar}
        style={({marginLeft:'30px'})}
        ></RxHamburgerMenu>
        <Menu
          // className="sidebar"
          // style={({width: collapsed ? '60px': '300px', display: "flex", background:'#E1E8ED'})}

          menuItemStyles={{
            button: {
              // the active class will be added automatically by react router
              // so we can use it to style the active menu item
              [`&.active`]: {
                backgroundColor: '#13395e',
                color: '#b6c8d9',
              },
            },
          }}
        >

          <MenuItem 
          //  style={{ width: collapsed ? '60px': '12000px'}}
          icon={<FiHome />}>Home</MenuItem>
          <MenuItem
          //  style={{ width: collapsed ? '60px': '12000px'}}
            icon={<IoIosJournal />}
            component={<Link to="/entries" />}> My Entries</MenuItem>
          <MenuItem
          //  style={{ width: collapsed ? '60px': '12000px'}}
            icon={<FaPlus />}
            component={<Link to="/entries/new" />}>Create New Journal Entry</MenuItem>
          <MenuItem
          //  style={{ width: collapsed ? '60px': '12000px'}}
            icon={<CiLogin />}
            component={<Link to="/sign-in" />}> Sign In</MenuItem>
          {renderSignOut()}

        </Menu>
      </Sidebar>
      <Outlet />
    </>
  );
}

export default NavBar;

//   return (
//     <>
//       <nav className="navbar-container">

//         <div className="logo">
//           <Link to="/">Gratitude Journal</Link>
//         </div>

//         <div className="menu">
//           <label htmlFor="menu-toggle">&#9776; Menu</label>

//           <ul>
//             <li>
//               <Link to="/">Home</Link>
//             </li>

//             <li>
//               <Link to="/entries">My Entries</Link>
//             </li>

//             <li>
//               <Link to="/entries/new">Create New Entry</Link>
//             </li>

//             {currentUser && (
//               <li>
//                 <button onClick={handleLogout}>
//                   <Link to="/">Sign Out</Link>
//                 </button>
//               </li>
//             )}
//           </ul>
//         </div>
//       </nav>
//       <Outlet />
//     </>
//   );
// };