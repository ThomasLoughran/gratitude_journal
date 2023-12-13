import { Link } from "react-router-dom";
import { useContext } from "react";
import { UserContext } from "../containers/JournalContainer";

const NavBar = () => {
  const { currentUser } = useContext(UserContext) || {};

  if (!currentUser) {
    return null;
  }

  const handleLogout = () => {
    // finish this bit
    console.log("Logout logic");
  };

  return (
    <nav>
      <div className="navbar-container">
        <div className="logo">
          <Link to="/">Gratitude Journal</Link>
        </div>
        <div className="menu">
          <input type="checkbox" id="menu-toggle" />
          <label htmlFor="menu-toggle">&#9776; Menu</label>
          <ul>
            <li>
              <Link to="/entries">All entries</Link>
            </li>
            <li>
              <Link to="/entries/new">Create New Entry</Link>
            </li>
            {currentUser && (
              <li>
                <button onClick={handleLogout}>Logout</button>
              </li>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
