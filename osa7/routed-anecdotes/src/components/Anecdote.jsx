import { useParams } from 'react-router-dom'

const Anecdote = ({ anecdotes }) => {
  const { id } = useParams()
  const anecdote = anecdotes.find(a => a.id === Number(id))

  return (
	<div>
	  <h2>{anecdote.content}</h2>
	  <p>has {anecdote.votes} votes</p>
	</div>
  )
}

export default Anecdote