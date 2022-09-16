import React from "react"

import './App.css';
import Header from "./components/Header";
import MediaCarousel from "./components/MediaCarousel";
import img0 from "./temp/desperado.jpg";
import img1 from "./temp/forrest_gump.jpg";
import img2 from "./temp/kunniottomat_paskiaiset.jpg";
import img3 from "./temp/media0.jpg";
import img4 from "./temp/media1.jpg";
import img5 from "./temp/media2.jpg";

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
                // this.setState({
                //     isLoaded: false,
                //     error: e.message
                // });
                this.setState({
                    isLoaded: true,
                    data: {
                        "sections": [
                        {
                            "title": "section 1",
                            "id": 0,
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
                        },
                        {
                            "title": "section 2",
                            "id": 1,
                            "items": [
                                {
                                    "id": 3,
                                    "thumbnailUrl": img3
                                },
                                {
                                    "id": 4,
                                    "thumbnailUrl": img4
                                },
                                {
                                    "id": 5,
                                    "thumbnailUrl": img5
                                }
                            ]
                        }
                    ]}
                })
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
        console.log(this.state.data);
        if (this.state.isLoaded) {
            carousels = this.state.data.sections.map(sectionData => (
                <MediaCarousel
                    key={sectionData.id}
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
