import { Link } from "react-router-dom"

export function CharacterCreation () {
    return (
    <>
        <h2>this is Character Creator Page</h2>
        <Link to={"/characterCollection"}>
            <button>Cancel</button>
        </Link>
        <Link to={"/characterCollection"}>
            <button>Create</button>
        </Link>
    </>
    )
}