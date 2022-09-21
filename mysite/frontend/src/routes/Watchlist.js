import { Link, useLoaderData, useRevalidator } from "react-router-dom";
import { deleteFavorite, getWatchlistData } from "../api_requests";
import Header from "../components/Header";

import "./Watchlist.css";

export async function loader() {
    return getWatchlistData();
}

export default function Watchlist(props) {
    let data = useLoaderData();
    let revalidator = useRevalidator();

    function handleRemove(id) {
        deleteFavorite(id)
            .then(res => {
                revalidator.revalidate();
            })
            .catch(e => { });
    }

    return (
        <div>
            <Header />
            <div className="watchlist-media-container">
                <h1>Watchlist</h1>
                <div className="watchlist-items">
                    {data.favorites.map(c =>
                        <div key={c.id} className="watchlist-item">
                            <Link to={`/media?id=${c.id}`}>
                                <img src={c.thumbnailUrl} />
                            </Link>
                            <p>{c.title}</p>
                            <button
                                className="watchlist-button-selected"
                                onClick={e => handleRemove(c.id)}
                            >
                                Remove from watchlist
                            </button>
                        </div>)}
                </div>
            </div>


        </div>
    );
}