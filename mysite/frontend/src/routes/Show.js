
import Header from "../components/Header"
import "../App.css";
import MediaCard from "./MediaCard";
import Accordion from "../components/Accordion";

export default function Show(props) {
    let seasons = props.seasons.map(season => {
        let episodes = season.episodes.map(c =>
            <MediaCard
                id={c.id}
                title={c.title}
                linkUrl={`/episode?id=${c.id}`}
                thumbnailUrl={c.thumbnailUrl} />
        )
        

        return isOpen => {
            let arrow = isOpen ? <div className="symbol-open">&lt;</div> : <div className="symbol-closed">&gt;</div>;

            return (
            <div>
                <div className="season-header">
                    <h2>{season.title}</h2>
                    {arrow}
                </div>
                <div className="media-grid">{episodes}</div>
            </div>
        )}
    });

    return (
        <div>
            <Header />

            <main className="show-container content">
                <div className="media-header">
                    <h1>{props.title}</h1>
                    {props.favoriteElement}
                </div>
                <Accordion>
                    {seasons}
                </Accordion>
            </main>

        </div>
    )
}


