import {Carousel} from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css"
import "../App.css"
import { Link } from "react-router-dom";

function MediaCarousel(props) {
    let carousel_items = props.carouselData.map((c) => {
        return (
            <div key = {c.id} className="carousel-item">
                <Link to={`/media?id=${c.id}`}>
                    <img src={c.thumbnailUrl} alt="media" />
                </Link>
            </div>
        )
    })

    return (
        <div className="carousel-container">
            <div className="carousel-header">
                <h2>{props.headerText}</h2>
                <Link className="see-all-link" to={`/category?id=${props.carouselId}`}>See all</Link>
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