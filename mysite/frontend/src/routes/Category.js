
import { useLoaderData, Link } from "react-router-dom";

import "../App.css"
import Header from "../components/Header";
import { getCategoryData } from "../api_requests";

export async function loader({ request }) {
    const url = new URL(request.url);
    const id = url.searchParams.get("id");
    return getCategoryData(id);
}

function Category(props) {
    const data = useLoaderData();

    return (
        <div id="category-container">
            <Header />
            <main>
                <h1>{data.category}</h1>
                <div className="media-grid">
                    {data.items.map(c => <div key={c.id} className="media-container">
                        <Link to={`/media?id=${c.id}`}>
                            <img src={c.thumbnailUrl} alt="thumbnail" />
                        </Link>

                    </div>)}
                </div>
            </main>

        </div>
    )
}

export default Category;