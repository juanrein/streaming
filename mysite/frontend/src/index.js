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
import Media, {loader as mediaLoader} from './routes/Media';
import Watchlist, {loader as watchlistLoader} from './routes/Watchlist';

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <ErrorPage />
  },
  {
    path: "/category/:category_id",
    element: <Category />,
    loader: categoryLoader
  },
  {
    path: "/media/:media_id",
    element: <Media />,
    loader: mediaLoader
  },
  {
    path: "/watchlist",
    element: <Watchlist />,
    loader: watchlistLoader
  }
]);


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>);
