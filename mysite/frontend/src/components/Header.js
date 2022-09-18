import { useState } from "react";
import { Link } from "react-router-dom";
import { postLogin, postRegister, postLogout } from "../api_requests";
import "./Header.css";

function Header(props) {
    let [searchText, setSearchText] = useState("");
    let [loggedIn, setLoggedIn] = useState(false);
    let [isLoginOpen, setIsLoginOpen] = useState(false);
    let [isRegisterOpen, setIsRegisterOpen] = useState(false);
    let [username, setUsername] = useState("");
    let [password, setPassword] = useState("");
    let [isProfileOpen, setIsProfileOpen] = useState(false);

    const handleSearch = (e) => {
        e.preventDefault();
        console.log("searched", searchText);
    }

    const handleLogin = (e) => {
        e.preventDefault();
        console.log("handle login");
        setIsLoginOpen(true);
        setIsRegisterOpen(false);
    }

    const handleRegister = (e) => {
        e.preventDefault();
        console.log("handle Register");
        setIsRegisterOpen(true);
        setIsLoginOpen(false);
    }

    const handleLogout = (e) => {
        e.preventDefault();
        console.log("handle logout");
        postLogout()
        .then(res => {
            console.log(res);
            setLoggedIn(false);
        })
        .catch(e => console.error(e));
    }

    /**
     * Login user
     */
    const handleLoginFormSubmit = (e) => {
        e.preventDefault();
        
        postLogin(username, password)
        .then(res => {
            setIsLoginOpen(false);
            setIsRegisterOpen(false);
            setIsProfileOpen(true);
            setLoggedIn(true);
        })
        .catch(e => {
            console.log("login failed");
        })
    }

    const handleRegisterFormSubmit = (e) => {
        e.preventDefault();

        postRegister(username, password)
        .then(res => {
            setIsLoginOpen(false);
            setIsRegisterOpen(false);
            setIsProfileOpen(true);
            setLoggedIn(true);
        })
        .catch(e => {
            console.log("registration failed");
        })
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
                <div className="icon"><Link to="/">Streaming app</Link></div>
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
                {isLoginOpen && (
                    <form id="login-form" onSubmit={handleLoginFormSubmit}>
                        <label htmlFor="username">Username</label>
                        <input id="username" type="text" value={username} onChange={(e) => setUsername(e.target.value)} />
                        <label htmlFor="password">Password</label>
                        <input id="password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
                        <input type="submit" value={"login"} />
                    </form>
                )}
                {isRegisterOpen && (
                    <form id="register-form" onSubmit={handleRegisterFormSubmit}>
                        <label htmlFor="username">Username</label>
                        <input id="username" type="text" value={username} onChange={(e) => setUsername(e.target.value)} />
                        <label htmlFor="password">Password</label>
                        <input id="password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
                        <input type="submit" value={"register"} />
                    </form>
                )}
                {loggedIn && !isProfileOpen && (
                    <div className="profile-container">
                        <div className="profile-icon" onClick={e => {
                            setIsProfileOpen(true)
                        }}></div>
                    </div>
                )}
                {loggedIn && isProfileOpen && (
                    <div className="profile-container">
                        <div className="profile-icon" onClick={e => {
                            isProfileOpen(true)
                        }}></div>
                        <Link to="/watchlist">Show watchlist</Link>
                    </div>
                )}
            </nav>
        </header>
    );
}

export default Header;