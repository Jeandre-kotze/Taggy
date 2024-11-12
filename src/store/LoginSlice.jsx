import { createSlice } from '@reduxjs/toolkit'

const initialState = { loggedIn: false,  }

const LoginSlice = createSlice({
    name: "AuthSlice",
    initialState,
    reducers: {
        setLoggedIn(state){
            state.loggedIn = !state.loggedIn;
        }
    }
    

}
)

export default LoginSlice