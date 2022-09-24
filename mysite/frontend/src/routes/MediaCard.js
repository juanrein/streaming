import { Link } from "react-router-dom"

export default function MediaCard(props) {
    return (
        <div key={props.id} className="media-card">
            <h3>{props.title}</h3>
            <Link to={props.linkUrl}>
                <img src={props.thumbnailUrl} alt="thumbnail" />
            </Link>
            {props.children}
        </div>
    )
}