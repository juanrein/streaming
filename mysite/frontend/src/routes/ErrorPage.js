import { useRouteError } from "react-router-dom";

export default function ErrorPage() {
    const error = useRouteError();
    console.log(error);

    return (
        <div>
            <h1>Error occured</h1>
            <p>
                {error.statusCode || error.statusText}
            </p>
        </div>
    )
}