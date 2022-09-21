
import { useLoaderData, Link } from "react-router-dom";

import "./Category.css"
import Header from "../components/Header";
import { getCategoryData } from "../api_requests";

export async function loader({request}) {
    const url = new URL(request.url);
    const id = url.searchParams.get("id");
    return getCategoryData(id);
}

function Category(props) {
    const data = useLoaderData();
    
    const handleFavButtonClick = (e, id) => {
        e.preventDefault();
        console.log("add to favourites", id);
    }

    return (
        <div id="category-container">
            <Header />
            <h1>{data.category}</h1>
            <div>
                {data.items.map(c => <div key={c.id} className="media-container">
                    <Link to={`/media?id=${c.id}`}>
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
        </div>
    )
}

export default Category;