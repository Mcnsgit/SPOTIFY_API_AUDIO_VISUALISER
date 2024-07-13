import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { bindActionCreators } from 'redux';
import { createSelector } from 'reselect';

import axios from '../../../utils/axios';
import { setModal } from '../../../redux/actions/uiActions';
import {
  fetchPlaylistsMenu,
  updatePlaylist
} from '../../../redux/actions/playlistActions';

import './modal.scss';
import track from '../../../assets/images/profile.png';

// Memoized selector
const selectPlaylistState = createSelector(
  (state) => state.playlistReducer,
  (playlistReducer) => playlistReducer.playlist || { images: [] }
);

const selectUiState = createSelector(
  (state) => state.uiReducer,
  (uiReducer) => ({
    show: uiReducer.modal,
    edit: uiReducer.mode !== 'new'
  })
);

const selectUserState = createSelector(
  (state) => state.userReducer,
  (userReducer) => ({
    id: userReducer.user.id
  })
);

const Modal = () => {
  const [header, setHeader] = useState('');
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [image, setImage] = useState(track);
  const [btn, setBtn] = useState('');
  const [error, setError] = useState(false);

  const dispatch = useDispatch();
  const playlist = useSelector(selectPlaylistState);
  const { show, edit } = useSelector(selectUiState);
  const { id } = useSelector(selectUserState);

  useEffect(() => {
    if (show) {
      initialize();
    }
  }, [show, edit, playlist]);

  const initialize = () => {
    if (edit) {
      setHeader('Edit Playlist Details');
      setTitle(playlist.name || '');
      setDescription(playlist.description || '');
      setImage(playlist.images.length ? playlist.images[0].url : track);
      setBtn('Save');
      setError(false);
    } else {
      setHeader('Create Playlist');
      setTitle('New Playlist');
      setDescription('');
      setImage(track);
      setBtn('Create');
      setError(false);
    }
  };

  const handleChange = (input, event) => {
    if (input === 'title') {
      setTitle(event.target.value);
    } else {
      setDescription(event.target.value);
    }
  };

  const validate = () => {
    if (!title.replace(/\s/g, '').length) {
      setError(true);
      return false;
    }
    return true;
  };

  const onCancel = () => {
    dispatch(setModal(false));
  };

  const onSubmitNew = () => {
    if (validate()) {
      axios
        .post(`/users/${id}/playlists`, {
          name: title,
          description,
        })
        .then(() => {
          dispatch(setModal(false));
          dispatch(fetchPlaylistsMenu());
        });
    }
  };

  const onSubmitPlaylist = () => {
    const changeTitle = playlist.name !== title;
    const changeDescription = playlist.description !== description;

    if (!changeTitle && !changeDescription) {
      return;
    }

    let updatedPlaylist = {};
    if (changeTitle) {
      updatedPlaylist.name = title;
    }
    if (description && changeDescription) {
      updatedPlaylist.description = description;
    }

    if (validate()) {
      axios.put(`/playlists/${playlist.id}`, updatedPlaylist).then(() => {
        dispatch(setModal(false));
        dispatch(updatePlaylist(updatedPlaylist));
        if (changeTitle) {
          dispatch(fetchPlaylistsMenu());
        }
      });
    }
  };

  return (
    <div>
      <div className={`playlist-Modal ${show ? 'active' : ''}`}>
        <div className="modal-content">
          <div className="modal-title">
            <h4>{header}</h4>
          </div>
          <div className="modal-body">
            <div className="title-input">
              <span>Name</span>
              <input
                value={title}
                onChange={(event) => handleChange('title', event)}
                placeholder="Playlist name"
                maxLength="100"
              />
              <div className="counter">{`${title.length}/100`}</div>
              <div className="description">
                <div className="image">
                  <span>Image</span> <img alt="track" src={image} />
                </div>
                <div className="text">
                  <span>Description</span>
                  <div className="counter">{`${description.length}/300`}</div>
                  <textarea
                    value={description}
                    onChange={(event) => handleChange('description', event)}
                    placeholder="Give your playlist a catchy description."
                    maxLength="300"
                  />
                </div>
              </div>
              <div className={`error-message ${error ? 'active' : ''}`}>
                <i className="fa fa-exclamation" aria-hidden="true" />
                <span>You must give your playlist a name.</span>
              </div>
              <div className="btn-section">
                <button className="cancel-btn" onClick={onCancel}>
                  Cancel
                </button>
                <button
                  className="save-btn"
                  onClick={edit ? onSubmitPlaylist : onSubmitNew}
                >
                  {btn}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className={`overlay ${show ? 'active' : ''}`} onClick={onCancel} />
    </div>
  );
};

export default Modal;