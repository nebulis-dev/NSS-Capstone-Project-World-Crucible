import { Link } from "react-router-dom"
import { UserAuth } from "../assets/currentUser"

export function Hub () {
    const { user } = UserAuth()
    return (
    <>
        <h1>Welcome to your Hub page, {user.userName}!</h1>
        <Link to={"/characterCollection"}>
            <button>Character Gallery</button>
        </Link>
        <Link to={"/worldCollection"}>
            <button>World Gallery</button>
        </Link>
        <Link to={"/"}>
            <button>Log Out?</button>
        </Link>
    </>
    )
}