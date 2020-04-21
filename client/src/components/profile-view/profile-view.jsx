import React from 'react';
import { connect } from 'react-redux';

import { Link } from "react-router-dom";
import PropTypes from 'prop-types';

import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import './profile-view.scss';
import MoviesList from '../movie-list/movie-list.jsx'
import { UpdateUserModal } from '../update-view/update-user-modal.jsx';
import { setUpdateData, setShowModal } from '../../actions/actions';



class ProfileView extends React.Component {

  showUpdateModal(data) {
    console.log(data, this)
    data.show = true;
    this.props.setShowModal(data)
  }

  closeModal() {
    this.props.setShowModal({
      show: false
    });
  }

  submitUpdate({
    field,
    value
  }) {
    this.props.handleUpdateUser({
      [field]: value
    });
    this.closeModal();
  }

  render() {
    const { user, movies, deleteMovie, showUpdateModal } = this.props;
    const favMovies = movies.filter(movie => user.FavouriteMovies.includes(movie._id));
    return [

      <Container>
        <Col lg={8} sm={12}>
          <div className="user-view p-5">


            <div className="user-username mt-3">
              <span className="label"> Username: </span>
              <span className="value"> {user.Username} </span>
            </div>
            <Button type="button" className="update-username" variant="dark" size="sm" onClick={() => this.showUpdateModal({
              inputType: 'text',
              inputName: 'username',
              updateField: 'Username',
              inputPlaceholder: 'Please set a new Username here',
              initial: user.username

            })}>Update Username</Button>

            <div className="user-password mt-3">
              <span className="label"> Password: </span>
              <span className="value"> ############## </span>
            </div>
            <Button type="button" className="update-password" variant="dark" size="sm" onClick={() => this.showUpdateModal({
              inputType: 'password',
              inputName: 'password',
              updateField: 'Password',
              inputPlaceholder: 'Please set a new Password here',
              initial: user.password

            })}>Update Password</Button>


            <div className="user-title mt-3">
              <span className="label"> Registered Email: </span>
              <span className="value"> {user.Email} </span>
            </div>
            <Button type="button" className="update-email" variant="dark" size="sm" onClick={() => this.showUpdateModal({
              inputType: 'email',
              inputName: 'email',
              updateField: 'Email',
              inputPlaceholder: 'Please set a new email here',
              initial: user.email

            })}>Update Email</Button>

            <div className="user-title mt-3">
              <span className="label"> DOB: </span>
              <span className="value"> {user.DOB.substr(0, 10)} </span>
            </div>
            <Button type="button" className="update-DOB" variant="dark" size="sm" onClick={() => this.showUpdateModal({
              inputType: 'date',
              inputName: 'DOB',
              updateField: 'DOB',
              inputPlaceholder: 'Please update your DOB here',
              initial: user.DOB

            })}>Update DOB</Button>

          </div>

          <Link to={`/unregister`}>

            <Button type="button" className="nav-to-unregister" variant="dark" size="sm">Delete my account</Button>
          </Link>
        </Col>
      </Container >,
      <Container>
        <div className="favourites-list">
          <span className="label"> {user.Username}'s Favourite Movies: </span>
          <span className="value"> <MoviesList movies={favMovies} deleteMovie={deleteMovie} /> </span>
        </div>

        {this.props.modalData && this.props.modalData.show && <UpdateUserModal
          inputType={this.props.modalData.inputType}
          inputName={this.props.modalData.inputName}
          inputPlaceholder={this.props.modalData.inputPlaceholder}
          show={this.props.setShowModal}
          onSubmit={data => this.submitUpdate(data)}
          initial={this.props.modalData.initial}
          closeModal={() => this.closeModal()} />}


      </Container>]

      ;
  }
}
let mapStateToProps = state => {
  console.log(state);
  return { modalData: state.modalData }
}

export default connect(mapStateToProps, { setUpdateData, setShowModal })(ProfileView);

ProfileView.propTypes = {
  showUpdateModal: PropTypes.func,
  closeModal: PropTypes.func,
  submitUpdate: PropTypes.func,
  modalData: PropTypes.string,
  user: PropTypes.object.isRequired,
  user: PropTypes.shape({
    _id: PropTypes.string,
    FavouriteMovies: PropTypes.array,
    Username: PropTypes.string,
    Password: PropTypes.string,
    Email: PropTypes.string,
    DOB: PropTypes.string
  }),
  movie: PropTypes.array,
  favMovies: PropTypes.func,
  deleteMovie: PropTypes.func.isRequired

};