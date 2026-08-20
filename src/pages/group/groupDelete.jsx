import { useEffect, useState } from "react"
import { Link, useParams, useNavigate } from "react-router-dom"
import {
    getGroup,
    getGroupGroupings,
    deleteGroup,
    deleteCharacterGrouping,
    getCollectionPath
} from "../../../api/dataTranslation"

export function GroupDelete() {
    const navigate = useNavigate()
    const { groupId, worldId } = useParams()
    const [group, setGroup] = useState(null)

    useEffect(() => {
        getGroup(groupId)
        .then(setGroup)
    }, [groupId])

    const onDelete = () => {
        getGroupGroupings(groupId)
        .then(groupings => {
            return Promise.all(
                groupings.map(grouping => deleteCharacterGrouping(grouping.id))
            )
        })
        .then(() => {
            return deleteGroup(groupId)
        })
        .then(() => {
            navigate(getCollectionPath({ worldId }))
        })
    }

    if (!group) return <p>Loading...</p>

    return (
        <>
            <h1>Are you sure you want to delete {group.name}?</h1>

            <button className="btn-delete" onClick={onDelete}>I am sure</button>

            <Link to={`/worldProfile/${group.worldId}/groupProfile/${group.id}`}>
              <button>No</button>
            </Link>
        </>
    )
}