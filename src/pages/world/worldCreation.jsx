import { Link, useNavigate } from "react-router-dom"
import { useState } from "react"
import { useForm } from "react-hook-form"
import { UserAuth } from "../../assets/currentUser"
import { createWorld, createImage } from "../../../api/dataTranslation"

export function WorldCreation() {
    const navigate = useNavigate()
    const { user } = UserAuth()
    const [imagePreview, setImagePreview] = useState(null)
    const { register, handleSubmit, setValue } = useForm({
        defaultValues: { name: "", description: "", worldImg: "" }
    })

    const handleImageChange = (e) => {
        const file = e.target.files[0]
        if (!file) return

        createImage(file).then(base64 => {
            setValue("worldImg", base64)
            setImagePreview(base64)
        })
    }

    const onSubmit = (data) => {
        createWorld({
            ...data,
            userId: user.id
        }).then(newWorld => {
            navigate(`/worldProfile/${newWorld.id}`)
        })
    }

    return (
        <>
            <h1>Create World</h1>
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

                <button type="submit">Create</button>
                
                <Link to="/worldCollection">
                    <button type="button">Cancel</button>
                </Link>
            </form>
        </>
    )
}