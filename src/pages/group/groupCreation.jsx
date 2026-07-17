import { Link } from "react-router-dom"

export function GroupCreation () {
    return (
    <>
        <h2>this is Group Creator Page</h2>
        <Link to={"/groupCollection"}>
            <button>Cancel</button>
        </Link>
        <Link to={"/groupCollection"}>
            <button>Create</button>
        </Link>
    </>
    )
}