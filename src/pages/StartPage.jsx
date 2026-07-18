import { Link } from "react-router-dom"

export function StartPage () {
    return (
    <>
        <h1>Welcome to the Crucible!</h1>
        <Link to={"/register"}>
            <button>New Here?</button>
        </Link>
        <Link to={"/login"}>
            <button>Old Here?</button>
        </Link>
    </>
    )
}