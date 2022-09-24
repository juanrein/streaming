import { useState } from "react";
import { getSearchResults } from "../api_requests";
import { Link } from "react-router-dom";
export default function Search(props) {
    let [searchText, setSearchText] = useState("");
    let [results, setResults] = useState([]);

    const handleSearch = (e) => {
        e.preventDefault();
        getSearchResults(searchText)
            .then(res => {
                setResults(res.results);
            })
            .catch(e => {

            })
    }

    let searchResults = results
        .map(r => <div className="search-result">{r.title} <Link to={`/media?id=${r.id}`}>{r.title}</Link></div>);
    return (
        <div className="search-bar">
            <form onSubmit={handleSearch}>
                <input
                    onChange={e => {
                        setSearchText(e.target.value)
                        if (e.target.value.length < 2) {
                            setResults([]);
                        }
                    }}
                    onBlur={e => setResults([])}
                    value={searchText}
                    type="search"
                    name="search"
                    id="search"
                />
                <input type="submit" value="search" id="search-submit" />
            </form>
            <div className="search-results">
                {searchResults}
            </div>
        </div>
    )
}