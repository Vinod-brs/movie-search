import React from "react";
import { getImageUrl } from "./helpers";

export const Card = (props) => {

  const { movie, handleMovieClick } = props;

  return (
    <>
      <div onClick={() => handleMovieClick(movie)} className="card col-12 col-sm-6 col-lg-3 float-start imgBlock border-0">
        <div className="imgFilm">
          <Image alt={movie?.Title} src={getImageUrl(movie?.Poster)} />
        </div>
        <div className="card-img-overlay d-flex align-items-center justify-content-center titlefilm">
          <h5 className="card-title">{movie?.Title}</h5>
        </div>
      </div>
    </>
  )
}

const Image = React.memo(function Image({ src, alt }) {
  return <img alt={alt} src={src} className="card-img-top image"/>
});