import React from "react"

import './App.css';
import Header from "./components/Header";
import MediaCarousel from "./components/MediaCarousel";

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            error: null,
            isLoaded: false,
            data: {}
        }
    }

    componentDidMount() {
        fetch("http://localhost:8000/streaming_app/content")
            .then(res => res.json())
            .then(data => {
                this.setState({
                    isLoaded: true,
                    data: data
                });
            })
            .catch(e => {
                this.setState({
                    isLoaded: false,
                    error: e.message
                });
            });
    }

    /**
     * add clicked item to favourites
     */
    handleFavButtonClick = (id) => {
        console.log("add", id, "to favourites");
    }

    /**
     * Clicked on show in carousel, show that item
     */
    handleImageClick = (id) => {
        console.log("handle", id, "show");
    }

    /**
     * show all the shows in selected carousel
     */
    handleShowAll = (id) => {
        console.log("show all in", id);
    }

    render() {
        let carousels;
        if (this.state.isLoaded) {
            carousels = this.state.data.sections.map(sectionData => (
                <MediaCarousel
                    carouselData={sectionData.items}
                    headerText={sectionData.title}
                    carouselId={sectionData.id}
                    handleFavButtonClick={this.handleFavButtonClick}
                    handleImageClick={this.handleImageClick}
                    handleShowAll={this.handleShowAll}
                />
            ))
        }
        
        return (
            <div>
                <Header />

                <main id="main-element">
                    {carousels}
                </main>
            </div>
        );
    }

}

export default App;
