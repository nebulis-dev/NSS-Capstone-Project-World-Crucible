import { Link, useNavigate, useParams } from "react-router-dom"
import { useState, useEffect } from "react"
import { useForm } from "react-hook-form"
import { getWorld, editWorld, createImage } from "../../../api/dataTranslation"

export function WorldEditor() {
    const { worldId } = useParams()
    const navigate = useNavigate()
    const [world, setWorld] = useState(null)
    const [imagePreview, setImagePreview] = useState(null)
    const { register, handleSubmit, reset, setValue } = useForm()

    useEffect(() => {
        getWorld(worldId).then(w => {
            setWorld(w)
            reset({ name: w.name, description: w.description, worldImg: w.worldImg })
            setImagePreview(w.worldImg)
        })
    }, [worldId, reset])

    const handleImageChange = (e) => {
        const file = e.target.files[0]
        if (!file) return

        createImage(file).then(base64 => {
            setValue("worldImg", base64)
            setImagePreview(base64)
        })
    }

    const onSubmit = (data) => {
        editWorld(worldId, data).then(() => {
            navigate(`/worldProfile/${worldId}`)
        })
    }

    if (!world) return <p>Loading...</p>

    return (
        <>
            <h1>Edit {world.name}</h1>
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
                    Banner Image
                    <input type="file" accept="image/*" onChange={handleImageChange} />
                </label>

                {imagePreview && (
                    <img src={imagePreview} alt="Preview" style={{ maxWidth: "400px" }} />
                )}

                <button type="submit">Confirm</button>
                <Link to={`/worldProfile/${world.id}`}>
                    <button type="button">Cancel</button>
                </Link>
            </form>
        </>
    )
}