import React, {useContext} from 'react'
import { Link } from 'react-router-dom'
import { GlobalContext } from '../../../context/GlobalState'

export const ResultCard = ({movie}) => {
  const {addMovieToWatchlist, addMovieToWatched, watchlist, watched} = useContext(GlobalContext)

  let storeMovie = watchlist.find(o => o.id === movie.id)
  let storeMovieWatched = watched.find(o => o.id === movie.id)

  const watchlistDisabled = storeMovie ? true : 
                            storeMovieWatched ? true : false
  const watchedDisabled = storeMovieWatched ? true : false

  return (
    <div className="result-card">
        <div className="poster-wrapper">
            <Link to={'/movie/'+movie.id}>
                {movie.poster_path ? 
                    <img src={`https://image.tmdb.org/t/p/w200${movie.poster_path}`} 
                        alt={`${movie.title} Poster`} /> :
                    <div className="filler-poster"></div>
                }
            </Link>
        </div>
        <div className="info">
            <div className="header">
                <Link to={'/movie/'+movie.id}
                    className="title"
                >{movie.title}</Link>
                <h4 className="release-date">
                    {movie.release_date ? movie.release_date.substring(0,4) : "-"}
                </h4>
            </div>

            <div className="controls">
                <button className='btn'
                    disabled={watchlistDisabled}
                    onClick={() => addMovieToWatchlist(movie)}
                >Add to Watchlist</button>
                
                <button className='btn'
                    disabled={watchedDisabled}
                    onClick={() => addMovieToWatched(movie)}
                >Add to Watched</button>
            </div>
        </div>
    </div>
  )
}
