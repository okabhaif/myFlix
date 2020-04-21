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
        <Row>
          <Col lg={8} sm={12}>

            <div className="profile-view">
              <h3 className="update-title mt-5"> Current Information:  </h3>


              <div className="user-username mt-3">
                <span className="label"> Username: </span>
                <span className="value"> {user.Username} </span>
              </div>


              <div className="user-password mt-3">
                <span className="label"> Password: </span>
                <span className="value"> ############## </span>
              </div>



              <div className="user-title mt-3">
                <span className="label"> Registered Email: </span>
                <span className="value"> {user.Email} </span>
              </div>


              <div className="user-title mt-3 mb-3">
                <span className="label"> DOB: </span>
                <span className="value"> {user.DOB.substr(0, 10)} </span>
              </div>



            </div>
          </Col>
          <Col>
            <div className="profile-view update">
              <h3 className="update-title mt-5"> Update your information here:  </h3>
              <Button type="button" className="btn-block update-username mt-3" variant="dark" size="md" onClick={() => this.showUpdateModal({
                inputType: 'text',
                inputName: 'username',
                updateField: 'Username',
                inputPlaceholder: 'Please set a new Username here',
                initial: user.username

              })}>Update Username</Button> <br />

              <Button type="button" className="update-password btn-block" variant="dark" size="md" onClick={() => this.showUpdateModal({
                inputType: 'password',
                inputName: 'password',
                updateField: 'Password',
                inputPlaceholder: 'Please set a new Password here',
                initial: user.password

              })}>Update Password</Button><br />

              <Button type="button" className="update-email btn-block" variant="dark" size="md" onClick={() => this.showUpdateModal({
                inputType: 'email',
                inputName: 'email',
                updateField: 'Email',
                inputPlaceholder: 'Please set a new email here',
                initial: user.email

              })}>Update Email</Button><br />

              <Button type="button" className="update-DOB btn-block" variant="dark" size="md" onClick={() => this.showUpdateModal({
                inputType: 'date',
                inputName: 'DOB',
                updateField: 'DOB',
                inputPlaceholder: 'Please update your DOB here',
                initial: user.DOB

              })}>Update DOB</Button><br />

              <Link to={`/unregister`}>

                <Button type="button" className="nav-to-unregister btn-block mb-3" variant="dark" size="md">Delete my account</Button>
              </Link>
            </div>


          </Col>
        </Row>

      </Container >,
      <Container>
        <div className="profile-view favourites-list mt-3">
          <h3 className="label"> {user.Username}'s Favourite Movies: </h3>
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