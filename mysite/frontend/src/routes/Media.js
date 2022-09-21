import React, { useState } from "react";
import { useLoaderData, Link } from "react-router-dom";
import { deleteFavorite, getMediaData, postFavorite } from "../api_requests";
import Header from "../components/Header";

import "./Media.css";

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
        return (
            <div>
                <Header />
                <div className="movie-container">
                    <h1>{mediaData.title}</h1>
                    {favoriteElement}

                    <video width={320} height={240} controls>
                        <source src={mediaData.url} />
                    </video>
                </div>
            </div>
        )
    }

    let seasons = mediaData.seasons.map(season => {
        let episodes = season.episodes.map(c =>
            <div key={c.id} className="media-container">
                <h2>{c.title}</h2>
                <Link to={`/episode?id=${c.id}`}>
                    <img src={c.thumbnailUrl} />
                </Link>
            </div>
        )
        return (
            <div>
                <h1>{season.title}</h1>
                <div>{episodes}</div>
            </div>
        )
    })
    return (
        <div>
            <Header />

            <div className="show-container">
                {favoriteElement}

                <h1>{mediaData.title}</h1>
                {seasons}
            </div>

        </div>
    )

}

export default Media;