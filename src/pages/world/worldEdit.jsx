import { Link } from "react-router-dom"

export function WorldEditor () {
    return (
    <>
        <h2>this is World Edit Page</h2>
        <Link to={"/worldProfile"}>
            <button>Cancel</button>
        </Link>
        <Link to={"/worldProfile"}>
            <button>Confirm</button>
        </Link>
     </>
    )
}