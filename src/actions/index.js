const url = "http://localhost:8090"

export const loginUserFetch = user => {
    return dispatch => {
        fetch(`${url}/user/login`, {
            method: 'POST',
            body: user,
            headers: {
                "Content-Type": "application/json"
            }
        })
            .then(response => response.json())
            .then(data => {
                console.log(data)
                localStorage.setItem("token", data.token)
                localStorage.setItem("userId", data.userId)
                dispatch(loginUser({
                    token: data.token,
                    userId: data.userId
                }))
                dispatch(hideError())
            })
            .catch(err => {
                dispatch(error({
                    error: "Incorrect details or cannot connect to the server..."
                }))
            })
    }
}
export const registerUserFetch = user => {
    return dispatch => {
        fetch(`${url}/user/register`, user, {
            headers: {
                "content-type": "application/json"
            }
        })
            .then(function (response) {
                console.log(response)
            })
            .catch(function (response) {
                console.log(response)
            })
    }
}
export const logoutUser = () => {
    return {
        type: 'LOGOUT_USER'
    }
}

export const uploadPost = data => {
    const token = localStorage.token
    return dispatch => {
        if (!data.description) {
            dispatch(postUpdate({
                response: "Description must be filled!"
            }))
            setTimeout(() => {
                dispatch(postUpdate({
                    response: null
                }))
            }, 5000);
            return
        }
        const uploadImageData = new FormData()
        if (data.file) {
            uploadImageData.append("imageFile", data.file, data.fileName)
        } else {
            uploadImageData.append("imageFile", null)
        }
        uploadImageData.append("description", data.description)
        fetch(`${url}/posts`, {
            method: 'POST',
            body: uploadImageData,
            headers: {
                "Authorization": token
            }
        })
            .then(response => response.json())
            .then(response => {
                if (response === true) {
                    dispatch(postUpdate({
                        response: "Success!"
                    }))
                } else {
                    dispatch(postUpdate({
                        response: "Failed to upload your post"
                    }))
                }
                setTimeout(() => {
                    dispatch(postUpdate({
                        response: null
                    }))
                }, 5000);
            })
            .catch(error => {
                console.log(error)
            })
    }
}

export const hideError = () => {
    return {
        type: 'HIDE_ERROR'
    }
}

const loginUser = data => ({
    type: 'LOGIN_USER',
    payload: data
})

const error = data => ({
    type: 'ERROR',
    payload: data
})

const postUpdate = data => ({
    type: 'POST_UPLOAD_RESPONSE',
    payload: data
})
