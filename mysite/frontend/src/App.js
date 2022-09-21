import React from "react"
import { getContent } from "./api_requests";

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
        getContent()
            .then(data => {
                this.setState({
                    isLoaded: true,
                    data: data
                });
            })
            .catch(e => {
                this.setState({
                    isLoaded: false,
                    error: e
                });
            });
    }


    render() {
        let carousels;
        if (this.state.isLoaded) {
            carousels = this.state.data.sections.map(sectionData => (
                <MediaCarousel
                    key={sectionData.id}
                    carouselData={sectionData.items}
                    headerText={sectionData.title}
                    carouselId={sectionData.id}
                />
            ))
        }
        let errors = "";
        if (!this.state.isLoaded && this.state.error) {
            errors = <div className="error-message">{this.state.error.message}</div>
        }

        return (
            <div>
                <Header />
                <main id="main-element">
                    {carousels}
                    {errors}
                </main>
            </div>
        );
    }

}

export default App;
