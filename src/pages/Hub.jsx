import { Link } from "react-router-dom"
import { UserAuth } from "../assets/currentUser"

export function Hub () {
    const { user } = UserAuth()
    return (
    <>
        <div className="hub">
            <h1 className="hub-title">Welcome to your Crucible, {user.userName}!</h1>
            <div className="hub-links">
                <Link to={"/characterCollection"} className="hub-link">
                    Character Gallery
                </Link>
                <Link to={"/worldCollection"} className="hub-link">
                    World Gallery
                </Link>
            </div>
        </div>
    </>
    )
}