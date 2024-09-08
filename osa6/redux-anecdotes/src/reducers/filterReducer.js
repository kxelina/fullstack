import { createSlice } from '@reduxjs/toolkit'

const filterSlice = createSlice({
    name: 'filter',
    initialState: '',
    reducers: {
        Set_filter(state, action) {
            const content = action.payload
            return content
        }
    }
})
  
export const { Set_filter } = filterSlice.actions
export default filterSlice.reducer