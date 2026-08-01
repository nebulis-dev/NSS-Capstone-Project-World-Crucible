import { useNavigate, useParams, Link} from "react-router-dom"
import { useState, useEffect } from "react"
import { useForm, Controller } from "react-hook-form"
import { UserAuth } from "../../assets/currentUser"
import { createCharacter,
         getUsersWorlds,
         getGenders,
         getWorldGroups,
         createCharacterGrouping,
         createCharacterImage,
         getCollectionPath
        } from "../../../api/dataTranslation"
import { GroupDropdown } from "../../components/groupDropdownLogic"

export function CharacterCreation () {
    const navigate = useNavigate()
    const { worldId: worldIdParam, groupId: groupIdParam } = useParams()
    const { user } = UserAuth()
    const [worlds, setWorlds] = useState([])
    const [groups, setGroups] = useState([])
    const [genders, setGenders] = useState([])
    const [imagePreview, setImagePreview] = useState([])
    const { register, control, handleSubmit, watch, resetField, setValue, } = useForm({
        defaultValues: { 
            name: "",
            biography: "", 
            characterImg: "", 
            genderId: "", 
            worldId: worldIdParam ?? "", 
            groupIds: groupIdParam ? [groupIdParam] : [] }
    })

    const selectedWorldId = watch("worldId")

    useEffect(() => {
        if (!user) return
        getUsersWorlds(user.id)
        .then(setWorlds)
        getGenders()
        .then(setGenders)
    }, [user])

    useEffect(() => {
        if(!selectedWorldId) {
            setGroups([])
            resetField("groupIds", { defaultValue: [] })
            return
        }

        getWorldGroups(selectedWorldId)
        .then(setGroups)
        resetField("groupIds", { defaultValue: [] })
    }, [selectedWorldId, resetField])

    const handleImageChange = async (e) => {
        const file = e.target.files[0]
        if (!file) return
        
        const superCharacterImage64 = await createCharacterImage(file)
        setValue("characterImg", superCharacterImage64)
        setImagePreview(superCharacterImage64)
    }

    const onSubmit = (data) => {
        const { groupIds, worldId, ...characterFields } = data
        const selectedGroupIds = groupIds.map(Number)

        createCharacter({
            ...characterFields,
            userId: user.id,
            worldId: worldId ? Number(worldId) : null,
            genderId: Number(characterFields.genderId)
        }).then(newCharacter => {
            Promise.all(
                selectedGroupIds.map(groupId => createCharacterGrouping(newCharacter.id, groupId))
            ).then(() => {
                navigate(`/characterProfile/${newCharacter.id}`)
            })
        })
    }

    return (
        <>
            <h1>Create Character</h1>
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
                        <option value="" disabled>Select a gender</option>
                        {genders.map(gender => (
                            <option key={gender.id} value={gender.id}>
                                {gender.gender}
                            </option>
                        ))}
                    </select>
                </label>

                <label>
                    World
                    <select {...register("worldId")}>
                        <option value="">No world</option>
                        {worlds.map(world => (
                            <option key={world.id} value={world.id}>
                                {world.name}
                            </option>
                        ))}
                    </select>
                </label>

                <label>
                    Groups
                    <Controller
                        name="groupIds"
                        control={control}
                        render={({ field }) => (
                            <GroupDropdown
                                groups={groups}
                                value={field.value}
                                onChange={field.onChange}
                                disabled={!selectedWorldId}
                            />
                        )}
                    />  
                </label>

                <button type="submit">Create</button>

                <Link to={getCollectionPath({ worldId: worldIdParam, groupId: groupIdParam})}>
                    <button>Cancel</button>
                </Link>
            </form>
        </>
    )
}