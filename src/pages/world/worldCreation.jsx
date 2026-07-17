import { Link } from "react-router-dom"

export function WorldCreation () {
    return (
    <>
        <h2>this is World Creator Page</h2>
        <Link to={"/worldCollection"}>
            <button>Cancel</button>
        </Link>
    </>
    )
}