import React from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { getUsers, registerUser } from "../assets/userManagement";
import { UserAuth } from "../assets/currentUser";

export function Register() {
    const navigate = useNavigate()
    const { login } = UserAuth()
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();

    const onSubmit = async (data) => {
        const currentUsers = await getUsers()
        
        const userNameTaken = currentUsers.some(
            (user) => user.userName === data.userName
        )

        if (userNameTaken) {
            console.log("Invalid: Username already taken")
            alert("That Username is already taken, Sorry!")
            return
        }

        const newUser = {
            id: currentUsers.length + 1,
            userName: data.userName,
            password: data.password
        }

        const response = await registerUser(newUser)

        if (response.ok) {
            console.log(data.userName + " has successfully registered an account!")
            navigate("/hub")
            login(newUser)
        } else {
            console.log("something went wrong")
            alert("Sorry, there seems to be an issue on our end")
        }

    }

    return (
        <>
            <h2>Registration Form</h2>

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

