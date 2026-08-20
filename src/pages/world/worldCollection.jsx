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
        <h2>Your Worlds!</h2>

        <div className="world-list">
            {worlds.map(world => (
               <Link
               key={world.id}
                to={`/worldProfile/${world.id}`}
                className="world-card"
           >
                <img
                    src={world.worldImg}
                    alt={world.name}
                    className="world-card__image"
                />
                    <span className="world-card__name">{world.name}</span>
                </Link>
            ))}
        </div>

        <Link to={"/worldCreation"}>
            <button>World Creator</button>
        </Link>

        <Link to={"/hub"}>
            <button>Return</button>
        </Link>
    </>
    )
}