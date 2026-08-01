import { Link } from "react-router-dom"
import { useParams } from "react-router-dom"
import { useState } from "react"
import { useEffect } from "react"
import { getWorld } from "../../../api/dataTranslation"

export function WorldProfile () {
    const { worldId } = useParams()
    const [world, setWorld] = useState(null)

    useEffect(() => {
        getWorld(worldId)
        .then(setWorld)
    }, [worldId])

    if(!world) return <p>Loading...</p>

    return (
    <>
        <img src={world.worldImg} alt={world.name} width="728" height="90"/>
        <h2>this is {world.name} Profile Page</h2>
        <Link to={"/worldCollection"}>
            <button>Return</button>
        </Link>
        <Link to={`/worldProfile/${worldId}/groupCollection`}>
            <button>Group Collection</button>
        </Link>
        <Link to={`/worldProfile/${worldId}/characterCollection`}>
            <button>Character Collection</button>
        </Link>
    </>
    )
}