export async function getUsers() {
    const UsersResponse = await fetch("http://localhost:8088/Users")
    const Users = await UsersResponse.json()
    return Users
}

export async function registerUser(newUser) {
    const response = await fetch("http://localhost:8088/Users", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(newUser)
    })
    return response
}