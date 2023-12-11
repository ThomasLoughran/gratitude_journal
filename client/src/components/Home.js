import { Link, Outlet } from "react-router-dom";

const Home = () => {
    return (
        <>
            <nav>
                <ul>
                    <li><Link to="/entries">All entries</Link></li>
                    <li><Link to="/entries/new">Create New Entry</Link></li>
                </ul>
            </nav>
            <Outlet />
        </>
    );
}

export default Home;