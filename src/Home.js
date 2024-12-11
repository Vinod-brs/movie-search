import { useState, createRef, useEffect, useMemo } from "react";
import { HttpGet } from "./core/httpHelper";
import { Card } from "./core/Card";
import { getImageUrl } from "./core/helpers";
import Modal from 'react-modal';
Modal.setAppElement(document.getElementById('root'));

export const Home = () => {
 
  const [moviesList, setMoviesList] = useState([]);
  const [page, setPage] = useState(0);
  const [modalIsOpen, setIsOpen] = useState(false);
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [totalMovies, setTotalMovies] = useState(0);
  const [block, setBlock] = useState(false);
  const [toggleFlag, setToggleFlag] = useState(false);

  const [Load, setLoad] = useState(null);
  const [Nothing, setNothing] = useState(null);
  const [Search, setSearch] = useState(null);
  let searchRef = createRef();

  const MoviesList = () => {
    return (
      !!moviesList.length && moviesList.map((movie, index) => {
        return (
          <Card
            handleMovieClick={handleMovieClick}
            key={index}
            movie={movie}
            setShowModal={setIsOpen}
            setSelectedMovie={setSelectedMovie}
          />
        )
      })
    )
  }

  // eslint-disable-next-line
  const MemoizedMoviesList = useMemo(() => MoviesList, [moviesList]);

  useEffect(() => {
    
    const handleScroll = () => {
      if ((window.innerHeight + window.scrollY) >= document.body.scrollHeight) {
        if(!block) {
          setPage(p => p + 1);
        }
      }
    }
    window.addEventListener('scroll', handleScroll);
    return() => {
      window.removeEventListener('scroll', handleScroll);
    }
  }, [block], )


  useEffect(() => {
    if(totalMovies && totalMovies === moviesList.length) {
      setBlock(true);
    }
    // eslint-disable-next-line
  }, [totalMovies, moviesList, block])

  useEffect(() => {
    const searchMovies = async () => {
      let searchQuery = searchRef?.current?.value
      if(searchQuery) {
        let queryParams = {
          s: searchQuery,
          page: page,
          y: ''
        }
        let movielList = await HttpGet(queryParams);
        if(movielList?.Response === 'False') {
          setMoviesList([]);
          setLoad(null);
          setNothing('s');
        } else {
          if(!totalMovies) {
            setTotalMovies(Number(movielList?.totalResults));
            setLoad(null);
          }
          if(moviesList) {
            setMoviesList(mList => [...mList, ...movielList?.Search]);
          } else {
            setMoviesList(movielList?.Search);
          }
        }
      } else {
        setPage(1);
        setMoviesList([]);
        setLoad(null);
        setSearch('s');
      }
    }
    if(page) {
      if(totalMovies === 0 || moviesList.length !== totalMovies) {
        searchMovies();
      }
    }
    // eslint-disable-next-line
  }, [page, toggleFlag])

  const getMovieDetails = async(movie) => {
    let queryParams = {
      i: movie?.imdbID,
    }
    let movieDetails = await HttpGet(queryParams);
    setIsOpen(true);
    setSelectedMovie(movieDetails);
  }

  const customStyles = {
    overlay: {
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: 'none',
      cursorEvents: 'none'
    },
    content: {
      position: 'absolute',
      top: '5%',
      left: '20%',
      right: '20%',
      bottom: '5%',
      border: '1px solid #ccc',
      background: '#fff',
      overflow: 'auto',
      WebkitOverflowScrolling: 'touch',
      borderRadius: '4px',
      outline: 'none',
      padding: '20px'
    }
  };

  const handleMovieClick = (movie) => {
    getMovieDetails(movie);
  }
  
  const handleButtonClick = (e) => {
    
    setLoad('s');
    setNothing(null);
    setSearch(null);
    e.preventDefault();
    setBlock(false);
    setTotalMovies(0);
    setMoviesList([]);
    setPage(1);
    setToggleFlag(!toggleFlag);
    
  }
const a = '  Search for movie name ...';
const [text, setText] = useState("");

  useEffect(() => {
    let i = 0;
    let b = '';
  function start () {

    
   const fr = setInterval(() => {
      if(i<a.length){
        b += a[i];
        setText(b+"_");
        
      }else{
        clearInterval(fr)
        let c=0;
        const timer = setInterval(() => {
          if(c%2 === 0){
            setText("  Search for movie name ...!");
           
          }else if(c === 15){
            clearInterval(timer)
            setTimeout( start, 120 );
          }
          else{
            setText("  Search for movie name ...");
          }
          c++;
        }, 180);
        
        i=-1;
        b = '';
      }
      i++;
    }, 120);
    
  }
  start();
    
  }, [])
  
     
    
  return (
    <>
      <div className="row m-0 justify-content-lg-center">
        <div className="col col-12 mt-4">
          <form onSubmit={handleButtonClick}>
            <div className="input-group mb-3">
              <input id="vv" name="search" ref={searchRef} type="text" className="form-control shadow-none w-100" placeholder={text} aria-label="Search for a Movie Name" aria-describedby="img-search" autoFocus />
            </div>
          </form>
        </div>
          {
            Load && 
            <div className="text-center mt-5 pt-5">
              <div className="spinner-grow text-info my-2 me-3 p-2" role="status"></div>
              <div className="spinner-border text-info p-4" role="status"></div>
              <div className="spinner-grow text-info my-2 ms-3 p-2" role="status"></div>
            </div>
          }
          {
            Nothing && <h2 className="text-center text-danger my-5 py-5 ">Movies Not Found</h2>
          }
          {
            Search && <h2 className="text-center text-success my-5 py-5 ">Search For Movies</h2>
          }

        <div className="col col-12">
          <MemoizedMoviesList />
        </div>
      </div>
      <Modal
        isOpen={modalIsOpen}
        defaultStyles={customStyles}
        contentLabel="Example Modal"
      >
        <div className='row w-100 m-0'>
          <div className='col col-11'>
            <h4>{selectedMovie?.Title}</h4>
          </div>
          <div className='col col-1'>
            <button className='border-0 bg-transparent' onClick={() => setIsOpen(false)}>X</button>
          </div>
        </div>
        <div className='row w-100 m-0 mt-3'>
          <div className='col col-5'>
            <img className='w-100' src={getImageUrl(selectedMovie?.Poster)} alt={selectedMovie?.Title} />
          </div>
          <div className='col col-7'>
            <p className='fw-bold'>Genre</p>
            <p>{selectedMovie?.Genre}</p>
            <p className='fw-bold'>Release</p>
            <p>{selectedMovie?.Released}</p>
            <p className='fw-bold'>Director</p>
            <p>{selectedMovie?.Director}</p>
            <p className='fw-bold'>Writer</p>
            <p>{selectedMovie?.Writer}</p>
            <p className='fw-bold'>Actors</p>
            <p>{selectedMovie?.Actors}</p>
            <p className='fw-bold'>Plot</p>
            <p>{selectedMovie?.Plot}</p>
            <p className='fw-bold'>Rating</p>
            <p>{selectedMovie?.imdbRating}</p>
          </div>
        </div>
      </Modal>
    </>
  )
  
}
