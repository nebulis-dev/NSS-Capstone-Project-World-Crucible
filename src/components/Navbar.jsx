import { Link } from "react-router-dom"

export function Navbar() {
    return (
        <nav className="navbar">
            <Link to="/hub" className="navbar-logo">
                World Crucible
            </Link>
            <ul className="nav-links">
                <li>
                    <Link to="/worldCollection">
                        View all Worlds
                    </Link>
                </li>
                <li>
                    <Link to="/characterCollection">
                        View all Characters
                    </Link>
                </li>
            </ul>
            <Link to="/" className="navbar-logout">
                Logout
            </Link>
        </nav>
    )
}