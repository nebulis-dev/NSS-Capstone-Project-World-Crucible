import React from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { getUsers } from "../assets/userManagement";
import { UserAuth } from "../assets/currentUser";

export function Login() {
    const navigate = useNavigate()
    const { login } = UserAuth()
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();

    const onSubmit = async (data) => {
        const currentUsers = await getUsers()

        const userNameMatch = currentUsers.find(
            (user) => user.userName === data.userName
        )

        if (userNameMatch) {
            console.log("Username found")
            if (userNameMatch.password === data.password) {
                console.log("Password found")
                login(userNameMatch)
                navigate("/hub")
            } else {
                console.log("Incorrect Password")
                alert("The Password is incorrect")
            }
        } else {
            console.log("No Username found")
            alert("That Username doesn't exist")
        }
    }

    return (
        <>
            <h2>Login Form</h2>

            <form className="App" onSubmit={handleSubmit(onSubmit)}>
                <input
                    type="text"
                    {...register("userName", { required: true })}
                    placeholder="Username"
                />
                {errors.userName && <span style={{ color: "red" }}>*Username* is mandatory</span>}

                <input
                    type="password"
                    {...register("password", { required: true })}
                    placeholder="Password"
                />
                {errors.password && <span style={{ color: "red" }}>*Password* is mandatory</span>}

                <input type="submit" style={{ backgroundColor: "#a1eafb" }} />
            </form>
        </>
    )
}

