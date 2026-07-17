import { Link } from "react-router-dom"

export function GroupEditor () {
    return (
    <>
        <h2>this is Group Edit Page</h2>
        <Link to={"/groupProfile"}>
            <button>Cancel</button>
        </Link>
        <Link to={"/groupProfile"}>
            <button>Confirm</button>
        </Link>
     </>
    )
}