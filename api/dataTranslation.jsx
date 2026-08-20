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
        body: JSON.stringify(characterData)
    }).then(res => res.json())
}

export const createImage = (file) => {
    return new Promise((resolve, reject) => {
        const reader = new FileReader()
        reader.onload = () => resolve(reader.result)
        reader.onerror = reject
        reader.readAsDataURL(file)
    })
}

export const editCharacter = (characterId, characterData) => {
    return fetch(`${baseURL}/Characters/${characterId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(characterData)
    })
}

export const deleteCharacter = (characterId) => {
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

export const getCharacterGrouping = (characterId) => {
    return fetch (`${baseURL}/CharacterGroups?characterId=${characterId}`)
    .then(res => res.json())
}

export const getGroupGroupings = (groupId) => {
    return fetch(`${baseURL}/CharacterGroups?characterId=${groupId}`)
    .then(res => res.json())
}

export const getGroupCharacters = (groupId) => {
    return fetch(`${baseURL}/CharacterGroups?groupId=${groupId}`)
    .then(res => res.json())
    .then(links => Promise.all(links.map(link => getCharacter(link.characterId))))
}

export const createGroup = (groupData) => {
    return fetch(`${baseURL}/Groups/`, {
        method: "POST",
        headers: { "Content-Type" : "application.json" },
        body: JSON.stringify(groupData)
    }).then(res => res.json())
}

export const editGroup = (groupId, groupData) => {
    return fetch(`${baseURL}/Groups/${groupId}`, {
        method: "PATCH",
        headers: { "Content-Type" : "application.json" },
        body: JSON.stringify(groupData)
    })
}

export const deleteGroup = (groupId) => {
    return fetch(`${baseURL}/Groups/${groupId}`), {
        method: "DELETE"
    }
}

export const createCharacterGrouping = (characterId, groupId) => {
    return fetch(`${baseURL}/CharacterGroups`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ characterId, groupId })
    })
}

export const deleteCharacterGrouping = (groupingId) => {
    return fetch(`${baseURL}/CharacterGroups/${groupingId}`, {
        method: "DELETE"
    })
}

//World Stuff
export const getUsersWorlds = (userId) => {
    return fetch(`${baseURL}/Worlds?userId=${userId}`)
    .then(res => res.json())
}

export const getWorld = (worldId) => {
    return fetch(`${baseURL}/Worlds/${worldId}`)
    .then(res => res.json())
}

export const createWorld = (worldData) => {
    fetch(`${baseURL}/Worlds`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(worldData)
    }).then(res => res.json())
}

export const editWorld = (worldId, worldData) => {
    fetch(`${baseURL}/Worlds/${worldId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(worldData)
    })
}

export const deleteWorld = (worldId) => {
    fetch(`${baseURL}/Worlds/${worldId}`, { 
        method: "DELETE" 
    })
}

export const getWorldCharacters = (worldId) => {
    fetch(`${baseURL}/Characters?worldId=${worldId}`)
    .then(res => res.json())
}

export const unassignCharacterWorld = (characterId) => {
    fetch(`${baseURL}/Characters/${characterId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ worldId: null })
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

export function getGroupCollectionPath(worldId) {
    return `/worldProfile/${worldId}/groupCollection`
}

export function getParentPath(character) {
    return scopeGetter(character, {
        group: `/worldProfile/${character.worldId}/groupProfile/${character.groupId}`,
        world: `/worldProfile/${character.worldId}`,
        fallback: `/hub`
    })
}