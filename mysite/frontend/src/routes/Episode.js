import React from "react";
import { useLoaderData } from "react-router-dom";
import { getEpisodeData } from "../api_requests";
import Header from "../components/Header";

import "../App.css";

export async function loader({ request }) {
    const url = new URL(request.url);
    const id = url.searchParams.get("id");
    return getEpisodeData(id);
}

export default function Episode(props) {
    const episodeData = useLoaderData();
    return (
        <div>
            <Header />
            <main>
                
                <video controls>
                    <source src={episodeData.url} />
                </video>

                <h2>{episodeData.title}</h2>
            </main>

        </div>
    )
}
