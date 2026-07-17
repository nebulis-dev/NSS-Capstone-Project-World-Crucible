import { Link } from "react-router-dom"

export function GroupCollection () {
    return (
    <>
        <h2>this is Group Collection Page</h2>
        <Link to={"/groupCreation"}>
            <button>Create Group</button>
        </Link>
        <Link to={"/groupProfile"}>
            <button>Group Profile</button>
        </Link>
        <Link to={"/groupCollection"}>
            <button>Return</button>
        </Link>
    </>
    )
}