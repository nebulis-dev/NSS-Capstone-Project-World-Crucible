import { Link, useNavigate, useParams } from "react-router-dom"
import { useState, useEffect } from "react"
import { useForm, Controller } from "react-hook-form"
import {
    getCharacter,
    editCharacter,
    getWorld,
    getWorldGroups,
    getGenders,
    getCharacterGroups,
    createCharacterGrouping,
    deleteCharacterGrouping,
    createCharacterImage
} from "../../../api/dataTranslation"
import { GroupDropdown } from "../../components/groupDropdownLogic"

export function CharacterEditor() {
    const { characterId } = useParams()
    const navigate = useNavigate()
    const [character, setCharacter] = useState(null)
    const [world, setWorld] = useState(null)
    const [groups, setGroups] = useState([])
    const [genders, setGenders] = useState([])
    const [imagePreview, setImagePreview] = useState(null)
    const { register, control, handleSubmit, reset, setValue } = useForm()

    useEffect(() => {
        getCharacter(characterId)
        .then(setCharacter)
    }, [characterId])

    useEffect(() => {
        getGenders().then(setGenders)
    }, [])

    useEffect(() => {
        if (!character) return

        if (character.worldId) {
            getWorld(character.worldId).then(setWorld)
            getWorldGroups(character.worldId).then(setGroups)
        }

        getCharacterGroups(character.id).then(existingLinks => {
            reset({
                name: character.name,
                biography: character.biography,
                characterImg: character.characterImg,
                genderId: character.genderId,
                groupIds: existingLinks.map(link => String(link.groupId))
            })
            setImagePreview(character.characterImg)
        })
    }, [character, reset])

    const handleImageChange = (e) => {
        const file = e.target.files[0]
        if (!file) return

        createCharacterImage(file).then(base64 => {
            setValue("characterImg", base64)
            setImagePreview(base64)
        })
    }

    const onSubmit = (data) => {
        const { groupIds, ...characterFields } = data
        const selectedGroupIds = groupIds.map(Number)

        editCharacter(characterId, {
            ...characterFields,
            genderId: Number(characterFields.genderId)
        })
        .then(() => {
            getCharacterGroups(characterId).then(existingLinks => {
                const existingGroupIds = existingLinks.map(link => link.groupId)

                const toAdd = selectedGroupIds.filter(id => !existingGroupIds.includes(id))
                const toRemove = existingLinks.filter(link => !selectedGroupIds.includes(link.groupId))

                Promise.all([
                    ...toAdd.map(groupId => createCharacterGrouping(Number(characterId), groupId)),
                    ...toRemove.map(link => deleteCharacterGrouping(link.id))
                ])
                .then(() => {
                    navigate(`/characterProfile/${characterId}`)
                })
            })
        })
    }

    if (!character) return <p>Loading...</p>

    return (
        <>
            <h1>Edit {character.name}</h1>
            <form onSubmit={handleSubmit(onSubmit)}>
                <label>
                    Name
                    <input {...register("name")} />
                </label>

                <label>
                    Biography
                    <textarea {...register("biography")} />
                </label>

                <label>
                    Character Image
                    <input type="file" accept="image/*" onChange={handleImageChange} />
                </label>

                {imagePreview && (
                    <img src={imagePreview} alt="Preview" style={{ maxWidth: "200px" }} />
                )}

                <label>
                    Gender
                    <select {...register("genderId")}>
                        {genders.map(gender => (
                            <option key={gender.id} value={gender.id}>
                                {gender.gender}
                            </option>
                        ))}
                    </select>
                </label>

                <p>World: {character.worldId ? (world?.name ?? "Loading...") : "No world"}</p>

                <label>
                    Groups
                    <Controller
                        name="groupIds"
                        control={control}
                        render={({ field }) => (
                            <GroupDropdown
                                groups={groups}
                                value={field.value ?? []}
                                onChange={field.onChange}
                                disabled={!character.worldId}
                            />
                        )}
                    />
                </label>

                <button type="submit">Confirm</button>
                <Link to={`/characterProfile/${character.id}`}>
                    <button type="button">Cancel</button>
                </Link>
            </form>
        </>
    )
}