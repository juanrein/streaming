import React, { useState } from "react";
import { useLoaderData } from "react-router-dom";
import { deleteFavorite, getMediaData, postFavorite } from "../api_requests";

import "../App.css";
import Movie from "./Movie";
import Show from "./Show";

export async function loader({ request }) {
    const url = new URL(request.url);
    const id = url.searchParams.get("id");
    return getMediaData(id);
}

function Media(props) {
    const mediaData = useLoaderData();

    let [isFavorite, setIsFavorite] = useState(mediaData.isFavorite);

    function handleFavorite(e) {
        postFavorite(mediaData.id)
            .then(res => {
                setIsFavorite(true);
            })
            .catch(e => {

            });
    }
    function handleRemoveFavorite(e) {
        deleteFavorite(mediaData.id)
            .then(res => {
                setIsFavorite(false);
            })
            .catch(e => {

            })
    }
    let favoriteElement;
    if (isFavorite) {
        favoriteElement = (<button
            className="watchlist-button-selected"
            onClick={handleRemoveFavorite}
        >
            Remove from watchlist
        </button>);
    }
    else {
        favoriteElement = (<button
            className="watchlist-button"
            onClick={handleFavorite}
        >
            Add to watchlist
        </button>);
    }

    if (mediaData.type === "movie") {
        return <Movie
            title={mediaData.title}
            favoriteElement={favoriteElement}
            url={mediaData.url}
        />
    }

    return <Show
        title={mediaData.title}
        favoriteElement={favoriteElement}
        seasons={mediaData.seasons} />

}

export default Media;