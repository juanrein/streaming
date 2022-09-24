import { useRouteError } from "react-router-dom";
import { ApiError } from "../api_requests";
import Header from "../components/Header";
import "../App.css";

export default function ErrorPage() {
    const error = useRouteError();

    let errorElement;
    if (error instanceof ApiError) {
        console.error("erropage, apierror: ", error.data);

        let { message, statusCode, statusText } = error.data
        errorElement =
            <div>
                <p>error message: {message}</p>
                <p>status code: {statusCode}</p>
                <p>status text: {statusText}</p>

            </div>
    }
    else {
        console.error("network error: ", error);
        errorElement = <p>{error.message}</p>
    }
    return (
        <div id="error-page">
            <Header />
            <main>
                <div id="error-content">
                    <h1>Error occured</h1>
                    {errorElement}
                </div>
            </main>

        </div>
    )
}