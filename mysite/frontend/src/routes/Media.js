import React from "react";
import { useLoaderData, Link } from "react-router-dom";
import { getMediaData } from "../api_requests";
import Header from "../components/Header";

import "./Media.css";

export async function loader({ params }) {
    let id = params.media_id;
    return getMediaData(id);
}

function Media(props) {
    const mediaData = useLoaderData();
    if (mediaData.type === "movie") {
        return (
            <div>
                <Header />
                <h1>{mediaData.title}</h1>
                <video width={320} height={240} controls>
                    <source src={mediaData.url} />
                </video>
            </div>
        )
    }

    let seasons = mediaData.seasons.map(season => {
        let episodes = season.episodes.map(c =>
            <div key={c.id} className="media-container">
                <h2>{c.title}</h2>
                <Link to={`/episode/${c.id}`}>
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
            <h1>{mediaData.title}</h1>
            {seasons}
        </div>
    )

}

export default Media;