import React from 'react'

export function Head() {
  return (
    <div>
      <header>
      <div className="d-flex bg-gradient">
        <div className="d-flex flex-grow-1">
          <nav className="courseTitle">
            <button className="navbar-brand border-0">
              <img src="data:image/png;base64,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" alt='logo' />
            </button>
          </nav>
          <div className="flex-grow-1">
            <div className="JsTitle ps-3 d-flex align-items-center">
              <img src="https://vinod-brs.github.io/react-clock-app/logo192.png" alt="logo" />
              <h3 className="mb-0">Reactjs Apps with APIs</h3>
            </div>
            <div className="d-flex ps-3 align-items-center">
              <div className="flex-grow-1">
                <h4 className='mb-0'>Movie search</h4>
                <p className="p-0 m-0 text-start"><b>Purpose: This app contains all movie details along with ratings.</b></p>
                
                <p className="p-0 m-0 text-start"> <a href="https://github.com/Vinod-brs/movie-search" target="_blank " > <img src="https://vinod-brs.github.io/Tic-Tac-Toe/assets/img/noun-link.png" className="link" alt="" /> Git Repository</a></p>
                <p className="p-0 mt-1 mb-1 text-start"> <a href="https://www.omdbapi.com" target="_blank " > <img src="https://vinod-brs.github.io/Tic-Tac-Toe/assets/img/noun-link.png" className="link" alt="" /> https://www.omdbapi.com</a></p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
    </div>
  )
}
