import {Carousel} from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css"
import "./MediaCarousel.css"
import { Link } from "react-router-dom";
import { postFavorite } from "../api_requests";

function MediaCarousel(props) {
    const handleFavButtonClick = (e, id) => {
        e.preventDefault();

        let {success} = postFavorite(id);
        console.log(success);

    }

    let carousel_items = props.carouselData.map((c) => {
        return (
            <div key = {c.id} className="carousel-item">
                <Link to={`/streaming_app/media/${c.id}`}>
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
                <Link to={`/streaming_app/category/${props.carouselId}`}>See all</Link>
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