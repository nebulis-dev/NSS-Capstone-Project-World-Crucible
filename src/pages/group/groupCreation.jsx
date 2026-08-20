import { Link, useNavigate, useParams } from "react-router-dom"
import { useState, useEffect } from "react"
import { useForm } from "react-hook-form"
import { UserAuth } from "../../assets/currentUser"
import { createGroup, getUsersWorlds, getGroupCollectionPath } from "../../../api/dataTranslation"

export function GroupCreation() {
    const { worldId: worldIdParam } = useParams()
    const navigate = useNavigate()
    const { user } = UserAuth()
    const [worlds, setWorlds] = useState([])
    const { register, handleSubmit } = useForm({
        defaultValues: {
            name: "",
            description: "",
            worldId: worldIdParam ?? ""
        }
    })

    useEffect(() => {
        if (!user) return
        getUsersWorlds(user.id).then(setWorlds)
    }, [user])

    const onSubmit = (data) => {
        createGroup({
            ...data,
            worldId: Number(data.worldId)
        }).then(newGroup => {
            navigate(`/worldProfile/${newGroup.worldId}/groupProfile/${newGroup.id}`)
        })
    }

    return (
        <>
            <h1>Create Group</h1>
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
                        <option value="" disabled>Select a world</option>
                        {worlds.map(world => (
                            <option key={world.id} value={world.id}>
                                {world.name}
                            </option>
                        ))}
                    </select>
                </label>

                <button type="submit">Create</button>
                
                <Link to={getGroupCollectionPath(worldIdParam)}>
                    <button type="button">Cancel</button>
                </Link>
            </form>
        </>
    )
}