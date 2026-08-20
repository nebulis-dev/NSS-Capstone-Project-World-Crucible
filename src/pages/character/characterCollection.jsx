import { Link, useParams, } from "react-router-dom"
import { useState, useEffect } from "react"
import { UserAuth } from "../../assets/currentUser"
import { getGroupCharacters, scopeGetter, getParentPath } from "../../../api/dataTranslation"

export function CharacterCollection () {
    const { worldId, groupId } = useParams()
    const { user } = UserAuth()
    const [characters, setCharacters] = useState([])

    useEffect(() => {
        if (!user) return

        if (groupId) {
            getGroupCharacters(groupId)
            .then(setCharacters)
            return
        }

        const url = scopeGetter({ worldId }, {
            world: `http://localhost:8088/Characters?worldId=${worldId}`,
            fallback: `http://localhost:8088/Characters?userId=${user.id}`
        })

        fetch(url)
        .then(res => res.json())
        .then(setCharacters);
    }, [worldId, groupId, user])

    return (
    <>
        <h2>Character Collection</h2>
        <div className="character-grid">
        {characters.map(character => (
            <Link key={character.id} 
            to={`/characterProfile/${character.id}`} 
            state={{ groupId, worldId}}
            className="character-card"
            >
                <img
                    src={character.characterImg}
                    alt={character.name}
                    className="character-card__image"
                />
                <span className="character-card_name">{character.name}</span>
            </Link>
        ))}
        </div>

        <Link to={
            worldId
                ? groupId
                    ?`/worldProfile/${worldId}/groupProfile/${groupId}/characterCreation`
                    : `/worldProfile/${worldId}/characterCreation`
                : "/characterCreation"
        }>
            <button>Create Character</button>
        </Link>

        <Link to={`/hub`}>
            <button>Go To Hub</button>
        </Link>

        <Link to={getParentPath({ worldId, groupId })}>
            <button>Return</button>
        </Link>
    </>
    )
}