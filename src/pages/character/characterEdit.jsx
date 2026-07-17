import { Link } from "react-router-dom"

export function CharacterEditor () {
    return (
    <>
        <h2>this is Character Edit Page</h2>
        <Link to={"/characterProfile"}>
            <button>Cancel</button>
        </Link>
        <Link to={"/characterProfile"}>
            <button>Confirm</button>
        </Link>
     </>
    )
}