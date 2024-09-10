/* eslint-disable no-case-declarations */
import { createSlice } from '@reduxjs/toolkit'

const anecdoteSlice = createSlice({
  name: 'anecdotes',
  initialState: [],
  reducers: {
    Vote(state, action) {
      const id = action.payload
      const a_vote = state.find(v => v.id === id)
      const updatedAnecdote = {...a_vote, votes: a_vote.votes+1}
      console.log(JSON.parse(JSON.stringify(state)))
      return state.map(anecdote =>
        anecdote.id != id ? anecdote : updatedAnecdote
      )},
    Add(state, action) {
      const content = action.payload
      state.push(content)},
    appendAnecdote(state, action) {
      state.push(action.payload)},
    setAnecdote(state, action) {
      return action.payload}
    },
})
export const { Add, Vote, appendAnecdote, setAnecdote } = anecdoteSlice.actions
export default anecdoteSlice.reducer