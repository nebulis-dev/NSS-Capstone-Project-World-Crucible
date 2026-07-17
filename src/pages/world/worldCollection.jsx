import { Link } from "react-router-dom"

export function WorldCollection () {
    return (
    <>
        <h2>this is the World Collection Page</h2>
        <Link to={"/worldProfile"}>
            <button>World Profile</button>
        </Link>
        <Link to={"/worldCreation"}>
            <button>World Creator</button>
        </Link>
        <Link to={"/"}>
            <button>Return</button>
        </Link>
    </>
    )
}