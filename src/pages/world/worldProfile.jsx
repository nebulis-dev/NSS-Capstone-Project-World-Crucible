import { Link } from "react-router-dom"

export function WorldProfile () {
    return (
    <>
        <h2>this is World Profile Page</h2>
        <Link to={"/worldCollection"}>
            <button>Return</button>
        </Link>
        <Link to={"/groupCollection"}>
            <button>Group Collection</button>
        </Link>
        <Link to={"/characterCollection"}>
            <button>Character Collection</button>
        </Link>
    </>
    )
}