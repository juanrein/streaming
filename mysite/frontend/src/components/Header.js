import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { postLogin, postRegister, postLogout, getUserInfo } from "../api_requests";
import "./Header.css";

function Header(props) {
    let [searchText, setSearchText] = useState("");
    let [loggedIn, setLoggedIn] = useState(false);
    let [isLoginOpen, setIsLoginOpen] = useState(false);
    let [isRegisterOpen, setIsRegisterOpen] = useState(false);
    let [username, setUsername] = useState("");
    let [password, setPassword] = useState("");
    let [isProfileOpen, setIsProfileOpen] = useState(false);
    let [profileName, setProfileName] = useState("");

    useEffect(() => {
        console.log("useeffect start")
        getUserInfo()
            .then(userData => {
                console.log("getuserinfo success");
                setLoggedIn(true);
                setProfileName(userData["username"]);
            })
            .catch(e => {
                console.log("getuserinfo failed", e);
                setProfileName("");
            });
    }, []);

    const handleSearch = (e) => {
        e.preventDefault();
        console.log("searched", searchText);
    }

    const handleLogin = (e) => {
        e.preventDefault();
        setIsLoginOpen(true);
        setIsRegisterOpen(false);
    }

    const handleRegister = (e) => {
        e.preventDefault();
        setIsRegisterOpen(true);
        setIsLoginOpen(false);
    }

    const handleLogout = (e) => {
        e.preventDefault();
        postLogout()
            .then(res => {
                setLoggedIn(false);
                setProfileName("");
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
                console.log("postlogin success")
            })
            .catch(e => {
                console.error(e);
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
                console.log("register success")
            })
            .catch(e => {
                console.error(e);
            })
    }

    let userElement = "";
    if (!loggedIn) {
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
                    <div>
                        <div className="profile-icon" onClick={e => {
                            setIsProfileOpen(true)
                        }}></div>
                    </div>
                )}
                {loggedIn && isProfileOpen && (
                    <div className="profile-container-open">
                        <div className="profile-icon" onClick={e => {
                            setIsProfileOpen(!isProfileOpen);
                        }}></div>
                        <div className="user">
                            <div>{profileName}</div>
                        </div>
                        <div>
                            <Link to="/watchlist">Show watchlist</Link>
                        </div>
                        <div onClick={handleLogout} className="logout"><a href="">Logout</a></div>

                    </div>
                )}
            </nav>
        </header>
    );
}

export default Header;