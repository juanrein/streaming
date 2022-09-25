import { useLoaderData, useRevalidator } from "react-router-dom";
import { deleteFavorite, getWatchlistData } from "../api_requests";
import Header from "../components/Header";

import "../App.css";
import MediaCard from "./MediaCard";

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
            <main>
                <h1 className="watchlist-header">Watchlist</h1>
                <div className="media-grid">
                    {data.favorites.map(c =>
                        <MediaCard
                            id={c.id}
                            title={c.title}
                            linkUrl={`/media?id=${c.id}`}
                            thumbnailUrl={c.thumbnailUrl} 
                        >
                            <button
                                className="watchlist-button-selected"
                                onClick={e => handleRemove(c.id)}
                            >
                                Remove from watchlist
                            </button>
                        </MediaCard>

                        )}
                </div>
            </main>


        </div>
    );
}