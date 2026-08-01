import { Link, useParams, useLocation } from "react-router-dom"
import { useState, useEffect } from "react"
import { getCharacter, getGenders, getCollectionPath } from "../../../api/dataTranslation"

export function CharacterProfile () {
    const location = useLocation()
    const { characterId } = useParams()
    const [character, setCharacter] = useState(null)
    const [genders, setGenders] = useState([])

    useEffect(() => {
        getCharacter(characterId)
        .then(setCharacter)
    }, [characterId])

    useEffect(() => {
        getGenders()
        .then(setGenders)
    }, [])

    if(!character) return <p>Loading...</p>

    const gender = genders.find(gender => gender.id === character.genderId)

    return (
    <>
        <h1>{character.name}</h1>

        <img src={character.characterImg} alt={character.name} width="424" height="599"/>

        <p>{character.biography}</p>

        {gender && <p>Gender: {gender.gender}</p>}

        <Link to={getCollectionPath(location.state ?? character)}>
            <button>Return</button>
        </Link>
        <Link to={`/characterEditor/${character.id}`}>
            <button>Edit</button>
        </Link>
        <Link to={`/characterDelete/${character.id}`}>
            <button>Delete</button>
        </Link>
    </>
    )
}