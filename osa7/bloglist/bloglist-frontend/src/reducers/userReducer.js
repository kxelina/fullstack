import { createSlice } from '@reduxjs/toolkit'
import loginService from '../services/login'
import blogService from '../services/blogs'

const userSlice = createSlice({
  name: 'user',
  initialState: null,
  reducers: {
    set_User(state, action) {
      return action.payload
    },
    clear_User() {
      return null
    }
  }
})

export const { set_User, clear_User } = userSlice.actions

export const loginUser = (credentials) => {
  return async dispatch => {
    const user = await loginService.login(credentials)
    window.localStorage.setItem('loggedBlogappUser', JSON.stringify(user))
    blogService.setToken(user.token)
    dispatch(set_User(user))
  }
}

export const logoutUser = () => {
  return dispatch => {
    window.localStorage.removeItem('loggedBlogappUser')
    blogService.setToken(null)
    dispatch(clear_User())
  }
}

export const initializeUser = () => {
  return dispatch => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      blogService.setToken(user.token)
      dispatch(set_User(user))
    }
  }
}

export default userSlice.reducer