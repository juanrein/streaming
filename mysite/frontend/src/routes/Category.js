import img0 from "../temp/desperado.jpg";
import img1 from "../temp/forrest_gump.jpg";
import img2 from "../temp/kunniottomat_paskiaiset.jpg";
import img3 from "../temp/media0.jpg";
import img4 from "../temp/media1.jpg";
import img5 from "../temp/media2.jpg";
import { useLoaderData, Link } from "react-router-dom";

import "./Category.css"
import Header from "../components/Header";

export async function loader({ params }) {
    let id = params.category_id;
    try {
        const response = await fetch(`http://localhost:8000/streaming_app/category/${id}`);
        if (response.ok && response.status === 200) {
            let categoryData = await response.json();
            return categoryData;
        }
    } catch (error) {

    }

    return {
        "category": "section 1",
        "id": id,
        "items": [
            {
                "id": 0,
                "thumbnailUrl": img0
            },
            {
                "id": 1,
                "thumbnailUrl": img1
            },
            {
                "id": 2,
                "thumbnailUrl": img2
            }
        ]
    }
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
                    <Link to={`/media/${c.id}`}>
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