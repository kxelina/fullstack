import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { useContext } from "react"


import AnecdoteForm from './components/AnecdoteForm'
import Notification from './components/Notification'
import { getAnecdotes, createAnecdote, voteAnecdote } from './requests'
import NotificationContext from './NotificationContext'

const App = () => {
  const queryClient = useQueryClient()
  const dispatch = useContext(NotificationContext)[1]

  const newAnecdoteMutation = useMutation({
    mutationFn: createAnecdote,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['anecdotes'] })
    },
  })

  const voteAnecdoteMutation = useMutation({
    mutationFn: voteAnecdote,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['anecdotes'] })
    },
  })

  const addAnecdote = (anecdote) => {
    if (anecdote.content.length < 5) {
      dispatch({ type: 'SET_NOTIFICATION', payload: 'too short anecdote, must have length 5 or more' })
      setTimeout(() => {
        dispatch({ type: 'CLEAR_NOTIFICATION' })
      }, 5000)
      return
    }

    newAnecdoteMutation.mutate(anecdote, {
      onSuccess: () => {
        dispatch({ type: 'SET_NOTIFICATION', payload: `anecdote '${anecdote.content}' added` })
        setTimeout(() => {
          dispatch({ type: 'CLEAR_NOTIFICATION' })
        }, 5000)
      }
    })
  }

  const handleVote = (anecdote) => {
    console.log('vote', anecdote)
    voteAnecdoteMutation.mutate(anecdote, {
      onSuccess: () => {
        dispatch({ type: 'SET_NOTIFICATION', payload: `anecdote '${anecdote.content}' voted` })
        setTimeout(() => {
          dispatch({ type: 'CLEAR_NOTIFICATION' })
        }, 5000)
      }
    })
  }

  const result = useQuery({
    queryKey: ['anecdotes'],
    queryFn: getAnecdotes,
    retry: 1
  })

  console.log(JSON.parse(JSON.stringify(result)))

  if ( result.isLoading ) {
    return <div>loading data...</div>
  }

  if (result.isError) {
    return <div>anecdote service not available due to problems in server</div>
  }

  const anecdotes = result.data


  return (
    <div>
      <h3>Anecdote app</h3>
    
      <Notification />
      <AnecdoteForm addAnecdote={addAnecdote}/>
    
      {anecdotes.map(anecdote =>
        <div key={anecdote.id}>
          <div>
            {anecdote.content}
          </div>
          <div>
            has {anecdote.votes}
            <button onClick={() => handleVote(anecdote)}>vote</button>
          </div>
        </div>
      )}
    </div>
  )
}

export default App
