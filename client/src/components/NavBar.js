import { Link, Outlet } from "react-router-dom";
import { useContext, useState } from "react";
import { UserContext } from "../containers/JournalContainer";
import { Sidebar, Menu, MenuItem, SidebarProps } from 'react-pro-sidebar';
import { FiHome } from "react-icons/fi";
import { RxHamburgerMenu } from "react-icons/rx";
import { FaPlus } from "react-icons/fa";
import { MdAccountCircle } from "react-icons/md";
import { IoIosJournal } from "react-icons/io";
import { CiLogin, CiLogout} from "react-icons/ci";


const NavBar = ({ setJournalEntries, setCurrentUser }) => {

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
    setCurrentUser(null);
    setJournalEntries([]);
  };

  return (
    <>
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
            icon={<FiHome />}
            component={<Link to="/" />}>
            Home
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
          {renderSignOut()}

        </Menu>
      </Sidebar>
      {/* <Outlet /> */}
    </>
  );
}

export default NavBar;