import { Link } from "react-router-dom"
import { useState, useEffect } from "react"

export function CharacterCollection () {
    const [characters, setCharacters] = useState([])

    useEffect(() => {
        fetch(`http://localhost:8088/Characters`)
        .then(res => res.json())
        .then(setCharacters);
    }, [])

    return (
    <>
        <h2>this is Character Collection Page</h2>

        {characters.map(character => (
            <Link key={character.id} to={`/characterProfile/${character.id}`}>
                <button>{character.name}</button>
            </Link>
        ))}

        <Link to={"/characterCreation"}>
            <button>Create Character</button>
        </Link>

        <Link to={`/`}>
            <button>Go To Hub</button>
        </Link>

        <Link to={`/worldProfile${character.worldId}`}>
            <button>Go To World</button>
        </Link>
    </>
    )
}