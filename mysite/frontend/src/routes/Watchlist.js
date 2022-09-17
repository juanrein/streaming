import { Link, useLoaderData } from "react-router-dom";
import { getWatchlistData } from "../api_requests";
import Header from "../components/Header";
import img0 from "../temp/desperado.jpg";
import img1 from "../temp/forrest_gump.jpg";
import img2 from "../temp/kunniottomat_paskiaiset.jpg";
export async function loader({ params }) {
    return getWatchlistData()
}

export default function Watchlist(props) {
    let data = useLoaderData();

    const handleFavButtonClick = (e) => {
        e.preventDefault();
        console.log("delete from watchlist")
    }
    return (
        <div>
            <Header />
            <h1>Watchlist</h1>
            {data.map(c =>
                <div key={c.id} className="media-container">
                    <Link to={`/streaming_app/media/${c.id}`}>
                        <img src={c.thumbnailUrl} />
                    </Link>
                    <a
                        href="/"
                        className="fav-button"
                        onClick={e => handleFavButtonClick(e, c.id)}
                    >
                    </a>
                </div>)}
        </div>
    );
}