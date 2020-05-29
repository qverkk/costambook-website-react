const initialState = {
    authToken: localStorage.token,
    user: localStorage.userId,
    registerStatus: null,
    loginError: null,
    postUploadResponse: null
}
export default (state = initialState, action) => {
    switch (action.type) {
        case 'LOGIN_USER':
            console.log("Login user!")
            const {token, userId} = action.payload
            return {...state, authToken: token, user: userId}
        case 'REGISTER_USER':
            console.log("Registered user!")
            return {...state, registerStatus: action.payload}
        case 'LOGOUT_USER':
            localStorage.removeItem("token")
            localStorage.removeItem("userId")
            return {...state, authToken: null, user: null}
        case 'ERROR':
            return {...state, loginError: action.payload.error}
        case 'HIDE_ERROR':
            return {...state, loginError: null}
        case 'POST_UPLOAD_RESPONSE':
            return {...state, postUploadResponse: action.payload.response}
        default:
            return state
    }
}