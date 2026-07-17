import { Link } from "react-router-dom"

export function CharacterCollection () {
    return (
    <>
        <h2>this is Character Collection Page</h2>
        <Link to={"/characterCreation"}>
            <button>Create Character</button>
        </Link>
        <Link to={"/characterProfile"}>
            <button>Character Profile</button>
        </Link>
        <Link to={"/"}>
            <button>Go To Hub</button>
        </Link>
        <Link to={"/worldProfile"}>
            <button>Go To World</button>
        </Link>
    </>
    )
}