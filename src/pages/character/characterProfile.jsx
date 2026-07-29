import { Link, useParams, useLocation } from "react-router-dom"
import { useState, useEffect } from "react"
import { getCharacter, getGenders } from "../../../api/dataTranslation"
import { getCollectionPath } from "../../../api/dataTranslation"

export function CharacterProfile () {
    const { characterId } = useParams()
    const location = useLocation()
    const [character, setCharacter] = useState(null)

    useEffect(() => {
        getCharacter(characterId)
        .then(setCharacter)
    }, [characterId])

    if(!character) return <p>Loading...</p>

    return (
    <>
        <h1>{character.name}</h1>
        <img src={character.characterImg} alt={character.name} width="424" height="599"/>
        <p>{character.biography}</p>

        <Link to={getCollectionPath(location.state ?? character)}>
            <button>Return</button>
        </Link>
        <Link to={`/characterEditor/${character.id}`}>
            <button>Edit</button>
        </Link>
    </>
    )
}