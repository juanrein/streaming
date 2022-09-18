import { useRouteError } from "react-router-dom";
import Header from "../components/Header";

export default function ErrorPage() {
    const error = useRouteError();
    console.log(error);

    return (
        <div>
            <Header />
            <h1>Error occured</h1>
            <p className="error-message">
                {error}
            </p>
        </div>
    )
}