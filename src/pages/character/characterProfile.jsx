import { Link } from "react-router-dom"
import { useParams } from "react-router-dom"
import { useState } from "react"
import { useEffect } from "react"

export function CharacterProfile () {
    const { characterId } = useParams()
    const [character, setCharacter] = useState(null)

    useEffect(() => {
        fetch(`http://localhost:8088/Characters/${characterId}`)
        .then(res => res.json())
        .then(setCharacter)
    }, [characterId])

    if(!character) return <p>Loading...</p>

    return (
    <>
        <h1>{character.name}</h1>
        <Link to={"/characterCollection"}>
            <button>Return</button>
        </Link>
        <Link to={`/characterEditor/${character.id}`}>
            <button>Edit</button>
        </Link>
    </>
    )
}