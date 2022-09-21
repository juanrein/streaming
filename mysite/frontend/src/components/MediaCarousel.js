import {Carousel} from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css"
import "./MediaCarousel.css"
import { Link } from "react-router-dom";
import { postFavorite } from "../api_requests";

function MediaCarousel(props) {
    const handleFavButtonClick = (e, id) => {
        e.preventDefault();

        postFavorite(id)
        .then(res => {
            console.log("added to favorite");
        })
        .catch(e => console.error(e));

    }

    let carousel_items = props.carouselData.map((c) => {
        return (
            <div key = {c.id} className="carousel-item">
                <Link to={`/media?id=${c.id}`}>
                    <img src={c.thumbnailUrl} />
                </Link>
                <a 
                    href="/"
                    className="fav-button"
                    onClick={e => handleFavButtonClick(e, c.id)}
                >
                </a>
            </div>
        )
    })

    return (
        <div className="carousel-container">
            <div className="carousel-header">
                <h2>{props.headerText}</h2>
                <Link to={`/category?id=${props.carouselId}`}>See all</Link>
            </div>
            <Carousel
                showStatus={false}
                centerMode={true}
                centerSlidePercentage={45}
                showIndicators={false}
                showThumbs={false}
            >
                {carousel_items}
            </Carousel>
        </div>
    )
}

export default MediaCarousel;