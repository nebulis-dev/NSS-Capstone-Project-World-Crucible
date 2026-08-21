import { Link } from "react-router-dom"

export function StartPage () {
    return (
    <>
        <div className="start">
            <h1 className="start-title">Welcome to Crucible!</h1>
            <div className="hub-links">
                <Link to={"/register"} className="start-accReg">
                    New Here?
                </Link>
                <Link to={"/login"} className="hub-accLog">
                    Old Here?
                </Link>
            </div>
        </div>
    </>
    )
}