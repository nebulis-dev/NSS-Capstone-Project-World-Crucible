import { Link, useNavigate, useParams } from "react-router-dom"
import { useState, useEffect } from "react"
import { useForm } from "react-hook-form"
import { getGroup, editGroup, getUsersWorlds } from "../../../api/dataTranslation"
import { UserAuth } from "../../assets/currentUser"

export function GroupEditor() {
    const { groupId } = useParams()
    const navigate = useNavigate()
    const { user } = UserAuth()
    const [group, setGroup] = useState(null)
    const [worlds, setWorlds] = useState([])
    const { register, handleSubmit, reset } = useForm()

    useEffect(() => {
        getGroup(groupId).then(setGroup)
    }, [groupId])

    useEffect(() => {
        if (!user) return
        getUsersWorlds(user.id).then(setWorlds)
    }, [user])

    useEffect(() => {
        if (!group) return
        reset({
            name: group.name,
            description: group.description,
            worldId: group.worldId
        })
    }, [group, reset])

    const onSubmit = (data) => {
        editGroup(groupId, {
            ...data,
            worldId: Number(data.worldId)
        }).then(() => {
            navigate(`/worldProfile/${data.worldId}/groupProfile/${groupId}`)
        })
    }

    if (!group) return <p>Loading...</p>

    return (
        <>
            <h1>Edit {group.name}</h1>
            <form onSubmit={handleSubmit(onSubmit)}>
                <label>
                    Name
                    <input {...register("name")} />
                </label>

                <label>
                    Description
                    <textarea {...register("description")} />
                </label>

                <label>
                    World
                    <select {...register("worldId")}>
                        {worlds.map(world => (
                            <option key={world.id} value={world.id}>
                                {world.name}
                            </option>
                        ))}
                    </select>
                </label>

                <button type="submit">Confirm</button>
                <Link to={`/worldProfile/${group.worldId}/groupProfile/${group.id}`}>
                    <button type="button">Cancel</button>
                </Link>
            </form>
        </>
    )
}