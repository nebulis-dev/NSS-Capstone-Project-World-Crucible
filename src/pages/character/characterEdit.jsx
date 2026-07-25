import { Link, useNavigate, useParams } from "react-router-dom"
import { useForm } from "react-hook-form"
import { useState, useEffect } from "react"
import { 
    getCharacter,
    createCharacter,
    editCharacter,
    getWorldGroups, 
    getGenders, 
    getCharacterGroups, 
    createCharacterGroups, 
    deleteCharacterGroup 
} from "../../../api/dataTranslation"

export function CharacterEditor  () {
    const { characterId } = useParams()
    const navigate = useNavigate()
    const [character, setCharacter] = useState(null)
    const [groups, setGroups] = useState([])
    const [genders, setGenders] = useState([])
    const { register, handleSubmit, reset } = useForm()

    useEffect(() => {
        getCharacter(characterId).then(setCharacter)
    }, [characterId])

    if(!character) return <p>Loading...</p>

    const Return = character.groupId ? `/worldProfile/${character.worldId}/groupProfile/${character.groupId}` : `/worldProfile/${character.worldId}`

    return (
    <>
        <h1>Edit {character.name}</h1>
        <Link to={`/characterProfile/${character.id}`}>
            <button>Confirm</button>
        </Link>
        <Link to={`/characterProfile/${character.id}`}>
            <button>Cancel</button>
        </Link>
    </>
    )
}