const baseURL = "http://localhost:8088"


//Character stuff
export const getCharacter = (characterId) => {
    return fetch(`${baseURL}/Characters/${characterId}`)
    .then(res => res.json())
}

export const createCharacter = (characterData) => {
    return fetch(`${baseURL}/Characters`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(characterData),
    }).then(res => res.json())
}

export const editCharacter = (characterId, characterData) => {
    return fetch(`${baseURL}/Characters/${characterId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(characterData)
    })
}

export const deleteCharacter = (characterData) => {
    return fetch(`${baseURL}/Characters/${characterId}`, {
        method: "DELETE"
    })
}

export const getGenders = () => {
    return fetch(`${baseURL}/Genders`)
    .then(res => res.json())
}

//Group Stuff
export const getGroup = (groupId) => {
    return fetch(`${baseURL}/Groups/${groupId}`)
    .then(res => res.json())
}

export const getWorldGroups = (worldId) => {
    return fetch(`${baseURL}/Groups?worldId=${worldId}`)
    .then(res => res.json())
}

export const getCharacterGroups = (characterId) => {
    return fetch(`${baseURL}/CharacterGroups?characterId=${characterId}`)
    .then(res => res.json())
}

export const getGroupCharacters = (groupId) => {
    return fetch(`${baseURL}/CharacterGroups?groupId=${groupId}`)
    .then(res => res.json())
    .then(links => Promise.all(links.map(link => getCharacter(link.characterId))))
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

//Scope/Navigation Stuff
export function scopeGetter({ groupId, worldId }, { group, world, fallback }) {
    if (groupId) {
        return group
    } else if (worldId) {
        return world
    } else {
        return fallback
    }
}

export function getCollectionPath(character) {
    return scopeGetter(character, {
        group: `/worldProfile/${character.worldId}/groupProfile/${character.groupId}/characterCollection`,
        world: `/worldProfile/${character.worldId}/characterCollection`,
        fallback: `/characterCollection`
    })
}