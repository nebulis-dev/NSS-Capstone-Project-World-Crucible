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

    useEffect(() => {
        if (!character) return

        getWorldGroups(character.worldId).then(setGroups)
        getGenders().then(setGenders)

        getCharacterGroups(character.id).then(existingLinks => {
            reset({
                name: character.name,
                biography: character.biography,
                characterImg: character.characterImg,
                genderId: character.genderId,
                groupIds: existingLinks.map(link => String(link.groupId))
            })
        })
    })

    if(!character) return <p>Loading...</p>

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