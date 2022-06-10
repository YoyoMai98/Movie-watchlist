import React, {useContext} from 'react'
import { GlobalContext } from '../../context/GlobalState'
import { MovieCard } from '../Movie/MovieCard'

export const Watched = () => {
  const {watched} = useContext(GlobalContext)

  return (
    <div className="movie-page">
      <div className="container">
        <div className="header">
          <h1 className="heading">My Watched</h1>
          <span className='count-pill'>
            {watched.length} {watched.length === 1? 'Movie' : 'Movies'}
          </span>
        </div>
        {watched.length > 0 ? (
          <div className="movie-grid">
            {watched.map(movie => (
              <MovieCard key={movie.id} movie={movie} type="watched" />
            ))}
          </div>
        ) : (
          <h3 className="no-movies">No movies in your list, add some!</h3>
        )
        }
      </div>
    </div>
  )
}
