import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import {
    createBrowserRouter,
    RouterProvider,
} from "react-router-dom";
import ErrorPage from "./routes/ErrorPage";
import Category, { loader as categoryLoader } from './routes/Category';
import Media, { loader as mediaLoader } from './routes/Media';
import Watchlist, { loader as watchlistLoader } from './routes/Watchlist';
import Episode, { loader as episodeLoader } from './routes/Episode';


const routes = [
    {
        path: "/",
        element: <App />,
        errorElement: <ErrorPage />,
    },
    {
        path: "category",
        element: <Category />,
        loader: categoryLoader,
        errorElement: <ErrorPage />,
    },
    {
        path: "media",
        element: <Media />,
        loader: mediaLoader,
        errorElement: <ErrorPage />,
    },
    {
        path: "episode",
        element: <Episode />,
        loader: episodeLoader,
        errorElement: <ErrorPage />,
    },
    {
        path: "watchlist/",
        element: <Watchlist />,
        loader: watchlistLoader,
        errorElement: <ErrorPage />,
    }
]



//appends /streaming_app/ to route names in <Link to="...">
const router = createBrowserRouter(routes,  {basename: "/streaming_app/"});


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <React.StrictMode>
        <RouterProvider router={router} />
    </React.StrictMode>);
