import { Link, Outlet } from "react-router-dom";
import { useEffect, useContext, useState } from "react";
import { UserContext } from "../containers/JournalContainer";
import { Sidebar, Menu, MenuItem, SidebarProps } from 'react-pro-sidebar';
import { FiHome } from "react-icons/fi";
import { RxHamburgerMenu } from "react-icons/rx";
import { FaPlus } from "react-icons/fa";
import { MdAccountCircle } from "react-icons/md";
import { IoIosJournal } from "react-icons/io";
import { CiLogin, CiLogout } from "react-icons/ci";
import { RiDeleteBin5Fill } from "react-icons/ri";


const NavBar = ({ setJournalEntries, setCurrentUser, handleDeleteAccount }) => {
  const [collapsed, setCollapsed] = useState(true);

  const handleToggleSidebar = () => {
    setCollapsed(!collapsed);
  }

  const { currentUser } = useContext(UserContext) || {};

  const renderSignOut = () => {
    if (currentUser === null) {
      return <> </>
    } else {
         return (
        <>
          <MenuItem
            icon={<CiLogout />}
            onClick={handleLogout}
          >
            Sign Out
          </MenuItem>
          <MenuItem
            icon={<RiDeleteBin5Fill />}
            onClick= {() =>{
              handleDeleteAccount (currentUser.id)
             }}
          >
            Delete Account
          </MenuItem>
        </>
      );
    }
  }

  const renderDeleteAccount = (() =>{
   handleDeleteAccount (currentUser.id)
  });

  const handleLogout = () => {
    alert("You have successfully signed out!");
    console.log("Logout logic");
    setCurrentUser(null);
    setJournalEntries([]);
  };
 
 //attempt 1.3
  useEffect(() => {
    // + event listener to handle scrolling and update the sidebar position
    const handleScroll = () => {
      const sidebar = document.querySelector('.sidebar');
      if (sidebar) {
        const scrollTop = window.scrollY;
        sidebar.style.top = `${scrollTop}px`;
      }
    };
    window.addEventListener('scroll', handleScroll);
    // -r event listener when component unmounts
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [collapsed]);


  return (
   <>
    <section>
      {currentUser && (
      <Sidebar
        className="sidebar"
        style={({
          width: collapsed ? '120px' : '100%',
          display: 'flex',
          border: 'none'
        })}
        collapsed={collapsed}>
        <RxHamburgerMenu
          onClick={handleToggleSidebar}
          style={({ marginLeft: '30px' })}>
        </RxHamburgerMenu>

        <Menu
          menuItemStyles={{
            button: {
              [`&.active`]: {
                backgroundColor: '#13395e',
                color: '#b6c8d9',
              },
            },
          }}
        >
          <MenuItem
            icon={<FiHome />}
            component={<Link to="/" />}>
            Home
          </MenuItem>

          <MenuItem
            icon={<CiLogin />}
            component={<Link to="/sign-in" />}>
            Sign In
          </MenuItem>

          <MenuItem
            icon={<MdAccountCircle />}
            component={<Link to="/users/new" />}>
            Create Account
          </MenuItem>

          <MenuItem
            icon={<IoIosJournal />}
            component={<Link to="/entries" />}>
            My Entries
          </MenuItem>

          <MenuItem
            icon={<FaPlus />}
            component={<Link to="/entries/new" />}>
            Create New Journal Entry
          </MenuItem>
          {renderSignOut()}

        </Menu>
      </Sidebar>
      )}
      </section>
      </>
  );
}

export default NavBar;
