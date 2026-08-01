import { Link } from "react-router-dom"
import { useState, useEffect } from "react"
import { UserAuth } from "../../assets/currentUser"
import { getUsersWorlds } from "../../../api/dataTranslation"

export function WorldCollection () {
    const { user } = UserAuth()
    const [worlds, setWorlds] = useState([])

    useEffect(() => {
        if (!user) return
        getUsersWorlds(user.id)
        .then(setWorlds)
    }, [user])

    return (
    <>
        <h2>this is the World Collection Page</h2>

        {worlds.map(world => (
            <Link key={world.id} to={`/worldProfile/${world.id}`}>
                <button>{world.name}</button>
            </Link>
        ))}

        <Link to={"/worldCreation"}>
            <button>World Creator</button>
        </Link>

        <Link to={"/hub"}>
            <button>Return</button>
        </Link>
    </>
    )
}