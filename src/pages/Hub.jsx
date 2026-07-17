import { Link } from "react-router-dom"

export function Hub () {
    return (
    <>
        <h1>this is the Hub page</h1>
        <Link to={"/characterCollection"}>
            <button>Character Gallery</button>
        </Link>
        <Link to={"/worldCollection"}>
            <button>World Gallery</button>
        </Link>
    </>
    )
}