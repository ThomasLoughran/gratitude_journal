import { Link, Outlet } from "react-router-dom";
import { useContext } from "react";
import { UserContext } from "../containers/JournalContainer";

const NavBar = () => {
  const { currentUser } = useContext(UserContext) || {};


  if (!currentUser) {
    return null;
  }

  const handleLogout = () => {
    alert("You have successfully signed out!")
    console.log("Logout logic");
  };

  return (
    <>
      <nav>
        <div className="navbar-container">

          <div className="logo">
            <Link to="/">Gratitude Journal</Link>
          </div>

          <div className="menu">
            <label htmlFor="menu-toggle">&#9776; Menu</label>

            <ul>
              <li>
                <Link to="/">Home</Link>
              </li>

              <li>
                <Link to="/entries">My Entries</Link>
              </li>

              <li>
                <Link to="/entries/new">Create New Entry</Link>
              </li>

              {currentUser && (
                <li>
                  <button onClick={handleLogout}>
                    <Link to="/">Sign Out</Link>
                  </button>
                </li>
              )}
            </ul>
          </div>
        </div>
      </nav>
      <Outlet />
    </>
  );
};

export default NavBar;
