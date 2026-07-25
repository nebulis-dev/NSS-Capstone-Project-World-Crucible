import { Link } from "react-router-dom";

export function GroupProfile () {
    return (
    <>
        <h2>this is Group Profile Page</h2>
        <Link to={"/worldProfile/:worldId/groupProfile/:groupId/characterCollection"}>
            <button>Group Characters</button>
        </Link>
        <Link to={"/worldProfile"}>
            <button>Go to World</button>
        </Link>
        <Link to={"/groupCollection"}>
            <button>Return</button>
        </Link>
        <Link to={"/groupEditor"}>
            <button>Edit</button>
        </Link>
    </>
    )
}