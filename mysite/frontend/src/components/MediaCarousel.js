import {Carousel} from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css"
import "./MediaCarousel.css"

function MediaCarousel(props) {
    const handleFavButtonClick = (e, id) => {
        e.preventDefault();
        props.handleFavButtonClick(id);
    }

    const handleImageClick = (e, id) => {
        e.preventDefault();
        props.handleImageClick(id);
    }

    const handleShowAll = (e) => {
        e.preventDefault();
        props.handleShowAll(props.carouselId);
    }

    let carousel_items = props.carouselData.map((c) => {
        return (
            <div key = {c.id} className="carousel-item">
                <a href="/" onClick={e => handleImageClick(e, c.id)}>
                    <img src={c.thumbnailUrl} />
                </a>
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
                <a href="" onClick={handleShowAll}>See all</a>
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