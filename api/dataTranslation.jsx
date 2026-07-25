const baseURL = "http://localhost:8088"

export const getCharacter = (characterId) => {
    return fetch(`${baseURL}/Characters/${characterId}`).then((res) => res.json())
}

export const createCharacter = (characterData) => {
    return fetch(`${baseURL}/Characters`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(characterData),
    }).then((res) => res.json())
}

export const editCharacter = (characterId, characterData) => {
    return fetch(`${baseURL}/Characters/${characterId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(characterData)
    })
}

export const getWorldGroups = (worldId) => {
    return fetch(`${baseURL}/Groups?worldId=${worldId}`).then((res) => res.json())
}

export const getGenders = () => {
    return fetch(`${baseURL}/Genders`).then((res) => res.json())
}

export const getCharacterGroups = (characterId) => {
    return fetch(`${baseURL}/CharacterGroups?characterID=${characterId}`).then((res) => res.json())
}

export const createCharacterGroups = (characterId, groupId) => {
    return fetch(`${baseURL}/CharacterGroups`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ characterId, groupId })
    })
}

export const deleteCharacterGroup = (characterGroupId) => {
    return fetch(`${baseURL}/CharacterGroups/${characterGroupId}`, {
        method: "DELETE"
    })
}