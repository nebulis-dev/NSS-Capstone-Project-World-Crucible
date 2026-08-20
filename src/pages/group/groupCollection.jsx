import { Link, useParams } from "react-router-dom"
import { useState, useEffect } from "react"
import { UserAuth } from "../../assets/currentUser"
import { getWorldGroups } from "../../../api/dataTranslation"

export function GroupCollection () {
    const { user } = UserAuth()
    const { worldId } = useParams()
    const [groups, setGroups] = useState([])

    useEffect(() => {
        if(!user) return
        getWorldGroups(worldId)
        .then(setGroups)
    }, [worldId])

    return (
    <>
        <h2>this is Group Collection Page</h2>

        {groups.map(group => (
            <Link key={group.id} to={`/worldProfile/${worldId}/groupProfile/${group.id}`}>
                <button>{group.name}</button>
            </Link>
        ))}

        <Link to={`/worldProfile/${worldId}/groupCreation`}>
            <button>Create Group</button>
        </Link>

        <Link to={`/worldProfile/${worldId}`}>
            <button>Return</button>
        </Link>
    </>
    )
}