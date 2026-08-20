import { useEffect, useState } from "react"
import { Link, useParams, useNavigate } from "react-router-dom"
import {
    getWorld,
    getWorldGroups,
    getWorldCharacters,
    getGroupGroupings,
    deleteCharacterGrouping,
    deleteGroup,
    unassignCharacterWorld,
    deleteWorld
} from "../../../api/dataTranslation"

export function WorldDelete() {
    const navigate = useNavigate()
    const { worldId } = useParams()
    const [world, setWorld] = useState(null)

    useEffect(() => {
        getWorld(worldId)
        .then(setWorld)
    }, [worldId])

    const onDelete = () => {
        Promise.all([
            getWorldGroups(worldId),
            getWorldCharacters(worldId)
        ])
        .then(([groups, characters]) => {
            const groupCleanup = groups.map(group =>
                getGroupGroupings(group.id).then(groupings =>
                    Promise.all(groupings.map(g => deleteCharacterGrouping(g.id)))
                    .then(() => deleteGroup(group.id))
                )
            )

            const characterCleanup = characters.map(character =>
                unassignCharacterWorld(character.id)
            )

            return Promise.all([...groupCleanup, ...characterCleanup])
        })
        .then(() => {
            return deleteWorld(worldId)
        })
        .then(() => {
            navigate("/worldCollection")
        })
    }

    if (!world) return <p>Loading...</p>

    return (
        <>
            <h1>Are you sure you want to delete {world.name}?</h1>
            
            <p>This will also delete every group in this world. Characters in this world will remain, but will no longer belong to a world or any groups.</p>

            <button className="btn-delete" onClick={onDelete}>I am sure</button>

            <Link to={`/worldProfile/${world.id}`}>
              <button>No</button>
            </Link>
        </>
    )
}