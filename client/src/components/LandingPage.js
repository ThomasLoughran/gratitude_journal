import NavBar from "./NavBar";
import { Outlet } from "react-router-dom";
import logo from "../Images/logo.png";

const LandingPage = ({setCurrentUser, setJournalEntries, handleDeleteAccount}) => {
    return ( 
        <>  
        <section className="title">
           <img src={logo} className="logo"/>
        </section>
        
        <section className="page-body">
          <section className="nav-bar">
          

            <NavBar setJournalEntries = {setJournalEntries} setCurrentUser={setCurrentUser} handleDeleteAccount={handleDeleteAccount}/>
          </section>
          <section className="router-body">
            <Outlet />
          </section>
        </section>
      </>
     );
}
 
export default LandingPage;