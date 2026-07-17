import { Link } from "react-router-dom"

export function CharacterProfile () {
    return (
    <>
        <h2>this is Character Profile Page</h2>
        <Link to={"/worldProfile"}>
            <button>Go to World</button>
        </Link>
        <Link to={"/characterCollection"}>
            <button>Go to Character Collection</button>
        </Link>
        <Link to={"/characterEditor"}>
            <button>Edit</button>
        </Link>
    </>
    )
}