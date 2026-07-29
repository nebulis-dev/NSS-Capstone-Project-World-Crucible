import { Link, useParams, useLocation } from "react-router-dom"
import { useState, useEffect } from "react"
import { getGroup } from "../../../api/dataTranslation"

export function GroupProfile () {
    const { groupId, worldId } = useParams()
    const location = useLocation()
    const [group, setGroup] = useState(null)

    useEffect(() => {
        getGroup(groupId)
        .then(setGroup)
    }, [groupId])

    if(!group) return <p>Loading...</p>

    return (
    <>
        <h1>{group.name}</h1>
        <p>{group.description}</p>
        <Link to={`/worldProfile/${worldId}/groupProfile/${groupId}/characterCollection`}>
            <button>Group Characters</button>
        </Link>

        <Link to={`/worldProfile/${worldId}`}>
            <button>Go to World</button>
        </Link>
        <Link to={`/worldProfile/${worldId}/groupCollection`}>
            <button>Return</button>
        </Link>
        <Link to={`/groupEditor/${groupId}`}>
            <button>Edit</button>
        </Link>
    </>
    )
}