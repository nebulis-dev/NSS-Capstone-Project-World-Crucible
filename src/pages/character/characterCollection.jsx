import { Link, useParams, useLocation } from "react-router-dom"
import { useState, useEffect } from "react"
import { UserAuth } from "../../assets/currentUser"
import { getGroupCharacters, scopeGetter, getCollectionPath } from "../../../api/dataTranslation"

export function CharacterCollection () {
    const { worldId, groupId } = useParams()
    const location = useLocation()
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
        <h2>this is Character Collection Page</h2>

        {characters.map(character => (
            <Link key={character.id} to={`/characterProfile/${character.id}`} state={{ groupId, worldId}}>
                <button>{character.name}</button>
            </Link>
        ))}

        <Link to={"/characterCreation"}>
            <button>Create Character</button>
        </Link>

        <Link to={`/hub`}>
            <button>Go To Hub</button>
        </Link>

        <Link to={groupId ? `/worldProfile/${worldId}/groupProfile/${groupId}` : `/worldProfile/${worldId}`}>
            <button>Return</button>
        </Link>
    </>
    )
}