import React from "react";
import { useLoaderData } from "react-router-dom";
import Header from "../components/Header";
import forest from "../temp/Forest.mp4";
import "./Media.css";

export async function loader({params}) {
    let id = params.media_id;
    try {
        const response = await fetch(`http://localhost:8000/streaming_app/media/${id}`);
        if (response.ok && response.status === 200) {
            let mediaData = await response.json();
            return mediaData;
        }
    } catch (error) {

    }

    return {
        "url": forest
    };
    
}

function Media(props) {
    const mediaData = useLoaderData();
    return (
        <div>
            <Header />
            <h1>Media</h1>
            <video width={320} height={240} controls>
                <source src={mediaData.url} />
            </video>
        </div>
    )
}

export default Media;