import { createSlice } from '@reduxjs/toolkit'

const notificationSlice = createSlice({
    name: 'notification',
    initialState: '',
    reducers: {
        Set_notification(state, action) {
            const content = action.payload
            return content
        },
        Clear_notification() {
            return ''
        }
    }
})
  
export const { Set_notification, Clear_notification } = notificationSlice.actions
export const setNotification = (content, time) => {
    return dispatch => {
        dispatch(Set_notification(content))
        setTimeout(() =>
            dispatch(Clear_notification()), time*1000
        )
    }
}
export default notificationSlice.reducer