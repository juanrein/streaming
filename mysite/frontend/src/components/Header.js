import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { postLogin, postRegister, postLogout, getUserInfo } from "../api_requests";
import "../App.css";
import Search from "./Search";
import UserInfoForm from "./UserInfoForm";

function Header(props) {

    let [loggedIn, setLoggedIn] = useState(false);


    let [isProfileOpen, setIsProfileOpen] = useState(false);
    let [profileName, setProfileName] = useState("");

    useEffect(() => {
        getUserInfo()
            .then(userData => {
                setLoggedIn(true);
                setProfileName(userData["username"]);
            })
            .catch(e => {
                setProfileName("");
            });
    }, []);



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
    const handleLoginFormSubmit = (username, password) => {
        postLogin(username, password)
            .then(res => {
                setLoggedIn(true);
            })
            .catch(e => {
                console.error(e);
            })
    }

    const handleRegisterFormSubmit = (username, password) => {
        postRegister(username, password)
            .then(res => {
                setLoggedIn(true);
            })
            .catch(e => {
                console.error(e);
            })
    }

    let userElement = "";
    if (!loggedIn) {
        userElement = (
            <div className="buttons">
                <UserInfoForm
                    title="login"
                    submitText="login"
                    onSubmit={handleLoginFormSubmit} />

                <UserInfoForm
                    title="register"
                    submitText="register"
                    onSubmit={handleRegisterFormSubmit} />
            </div>
        )
    }


    let profileElement = "";
    if (loggedIn && isProfileOpen) {
        profileElement = 
        <div>
            <div className="profile-icon-placeholder"></div>
            <div className="profile-container-open">
                <div className="profile-icon" onClick={e => {
                    setIsProfileOpen(!isProfileOpen);
                }}></div>
                <div className="user">
                    <div>{profileName}</div>
                </div>
                <div>
                    <Link className="show-watchlist-button" to="/watchlist">Show watchlist</Link>
                </div>
                <button onClick={handleLogout} className="auth-button logout">Logout</button>

            </div>
        </div>
    }
    else if (loggedIn && !isProfileOpen) {
        profileElement = <div>
            <div className="profile-icon" onClick={e => {
                setIsProfileOpen(true)
            }}></div>
        </div>
    }

    return (
        <header>
            <nav>
                <div className="icon"><Link to="/">Streaming app</Link></div>

                <Search />

                {userElement}

                {profileElement}
            </nav>
        </header>
    );
}

export default Header;