import { useEffect, useState } from "react"
import { Link, useParams, useNavigate } from "react-router-dom"
import { 
    getCharacter,
    getCharacterGrouping, 
    deleteCharacter, 
    deleteCharacterGrouping, 
    getCollectionPath 
} from "../../../api/dataTranslation"

export function CharacterDelete() {
    const navigate = useNavigate()
    const { characterId, groupId, worldId } = useParams()
    const [character, setCharacter] = useState(null)

    useEffect(() => {
        getCharacter(characterId)
        .then(setCharacter)
    }, [characterId])

    const onDelete = () => {
        getCharacterGrouping(characterId)
        .then(groupings => {
            return Promise.all(
                groupings.map(grouping => deleteCharacterGrouping(grouping.id))
            )
        })
        .then(() => {
            return deleteCharacter(characterId)
        })
        .then(() => {
            navigate(getCollectionPath({ worldId, groupId }))
        })
    }

    if(!character) return <p>Loading...</p>

    return (
        <>
            <h1>Are you sure you want to delete {character.name}?</h1>

            <button className="btn-delete" onClick = {onDelete}>I am sure</button>

            <Link to={`/characterProfile/${character.id}`}>
              <button>No</button>
            </Link>
        </>
    )
}

