import React, {useEffect, useState, useContext} from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { GlobalContext } from '../../context/GlobalState'

export const MovieDetail = () => {
  const [loading, setLoading] = useState(true)
  const [movie, setMovie] = useState({})

  const navigate = useNavigate()
  const params = useParams()

  const {addMovieToWatchlist, addMovieToWatched, watchlist, watched} = useContext(GlobalContext)

  let storeMovie = watchlist.find(o => o.id === movie.id)
  let storeMovieWatched = watched.find(o => o.id === movie.id)

  const watchlistDisabled = storeMovie ? true : 
                            storeMovieWatched ? true : false
  const watchedDisabled = storeMovieWatched ? true : false

  useEffect(() => {
    const fetchMovie = async () => {
        const res = await fetch(`https://api.themoviedb.org/3/movie/${params.id}?api_key=${process.env.REACT_APP_TMDB_KEY}`)
        const data = await res.json()
        if(res.status === 404){
          navigate('/')
        }
        setMovie(data)
        setLoading(false)
    }
    fetchMovie()
  })
  return loading ? (
    <h3>Loading...</h3>
  ) : (
    <div className="container">
      <div className='selected_result'>
        <div className='inner-content'>
          <div>
            <h2>
              {movie.title}
              <span> ({movie.release_date})</span>
            </h2>
          </div>
          <div>
            <p className="rating">Rating: {movie.vote_average}</p>
          </div>
        </div>
        <div className="plot">
          {movie.poster_path ? 
            <img src={`https://image.tmdb.org/t/p/w200${movie.poster_path}`} 
                  alt={`${movie.title} Poster`} /> :
            <div className="filler-poster"></div>
          }
          <div className='plot_overview'>
            <p>
              {movie.overview}
              <a href={'https://www.imdb.com/title/' + movie.imdb_id}>View on IMDB</a>
            </p>
            <div className="controls">
              <button className='btn btn-add'
                      disabled={watchlistDisabled}
                      onClick={() => addMovieToWatchlist(movie)}
              >Add to Watchlist</button>    
              <button className='btn btn-add'
                    disabled={watchedDisabled}
                    onClick={() => addMovieToWatched(movie)}
              >Add to Watched</button>
            </div>
          </div>
        </div>
        <button className='btn close' onClick={()=>navigate(-1)}>GO BACK</button>
      </div>
    </div>
  )
}
