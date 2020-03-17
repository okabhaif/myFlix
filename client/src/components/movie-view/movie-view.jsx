import React from 'react';
import Button from 'react-bootstrap/Button';

export class MovieView extends React.Component {
  constructor() {
    super();
  }

  render() {
    const { movie } = this.props;

    return (
      <div>
        <div className="movie-view">
          <img className="movie-poster" src={movie.ImagePath} />

          <div className="movie-title">
            <span className="label"> Title: </span>
            <span className="value"> {movie.Title} </span>
          </div>

          <div className="movie-description">
            <span className="label"> Description: </span>
            <span className="value"> {movie.Description} </span>
          </div>

          <div className="movie-genre">
            <span className="label"> Genre: </span>
            <span className="value"> {movie.Genre.Name} </span>
          </div>

          <div className="movie-director">
            <span className="label"> Director: </span>
            <span className="value"> {movie.Director.Name} </span>
          </div>
        </div>

        <div>
          <Button variant="dark" className="nav-to-home" type="button" size="sm" onClick={this.props.resetMovie} >Home</Button>
        </div>
      </div>


    );
  }
}

