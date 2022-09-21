import React from "react";
import { useLoaderData } from "react-router-dom";
import { getEpisodeData } from "../api_requests";
import Header from "../components/Header";

import "./Episode.css";

export async function loader({request}) {
    const url = new URL(request.url);
    const id = url.searchParams.get("id");
    return getEpisodeData(id);
}

export default function Episode(props) {
    const episodeData = useLoaderData();
    return (
        <div>
            <Header />
            <h1>{episodeData.title}</h1>
            <video width={320} height={240} controls>
                <source src={episodeData.url} />
            </video>
        </div>
    )
}
