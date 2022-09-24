import Header from "../components/Header"
import "../App.css";

export default function Movie(props) {
    return (
        <div>
            <Header />
            <main className="movie-container">
                

                <video controls>
                    <source src={props.url} />
                </video>

                <div className="media-header">
                    <h1>{props.title}</h1>
                    {props.favoriteElement}
                </div>
            </main>
        </div>
    )
}