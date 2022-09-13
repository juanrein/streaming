import { useState } from "react";
import "./Header.css";

function Header(props) {
    let [searchText, setSearchText] = useState("");
    let [loggedIn, setLoggedIn] = useState(false);

    const handleSearch = (e) => {
        e.preventDefault();
        console.log("searched", searchText);
    }

    const handleLogin = (e) => {
        e.preventDefault();
        console.log("handle login");
        setLoggedIn(true);
    }

    const handleRegister = (e) => {
        e.preventDefault();
        console.log("handle Register");
    }

    const handleLogout = (e) => {
        e.preventDefault();
        console.log("handle logout");
        setLoggedIn(false);
    }

    let userElement;
    if (loggedIn) {
        userElement = (
            <div className="user">
                <div>Username</div>
                <div onClick={handleLogout} className="logout"><a href="">Logout</a></div>
            </div>
        )
    }
    else {
        userElement = (
            <div className="buttons">
                <div onClick={handleLogin} className="login"><a href="">Login</a></div>
                <div onClick={handleRegister} className="register"><a href="">Register</a></div>
            </div>
        )
    }
    return (
        <header>
            <nav>
                <div className="icon"><a href="">Streaming app</a></div>
                <div className="search-bar">
                    <form onSubmit={handleSearch}>
                        <input
                            onChange={e => setSearchText(e.target.value)}
                            value={searchText}
                            type="search"
                            name="search"
                            id="search"
                        />
                        <input type="submit" value="search" />
                    </form>
                </div>
                {userElement}
            </nav>
        </header>
    );
}

export default Header;