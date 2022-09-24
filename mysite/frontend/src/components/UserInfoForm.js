import { useState } from "react";

export default function UserInfoForm(props) {
    let [username, setUsername] = useState("");
    let [password, setPassword] = useState("");

    let [isOpen, setIsOpen] = useState(false);

    function handleSubmit(e) {
        e.preventDefault();
        props.onSubmit(username, password);
    }

    if (!isOpen) {
        return <button
            onClick={() => setIsOpen(true)}
            className="auth-button">{props.submitText}</button>
    }

    return (
        <div className="form-container">
            <div className="form-container-inner">
                <button
                    className="close-button"
                    onClick={e => setIsOpen(false)}>X</button>
                <form
                    onSubmit={handleSubmit}
                >
                    <h2>{props.title}</h2>

                    <label htmlFor="username">Username
                        <input
                            className="input-normal"
                            id="username"
                            type="text"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)} />
                    </label>

                    <label htmlFor="password">Password
                        <input
                            className="input-normal"
                            id="password"
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)} />
                    </label>

                    <input type="submit" className="submit-button" value={props.submitText} />
                </form>
            </div>

        </div>
    )
}