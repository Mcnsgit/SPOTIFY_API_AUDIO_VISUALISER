import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { bindActionCreators } from 'redux';
import { fetchSearchData } from '../../../redux/actions/searchActions'; // Import the correct action
import withUiActions from '../../../hoc/uiHoc.jsx';
import MenuItem from './menuItem.jsx';
import './SideMenu.scss';

const menuItems = [
  { name: 'Search', view: 'search', id: 'search' },
  { name: 'Visualizer', view: 'visualizer', id: 'visualizer' },
  { name: 'Browse', view: 'browse', id: 'browse' },

];

const LeftSideMenu = () => {
  const dispatch = useDispatch();
  const [activeItem, setActiveItem] = useState(null);

  const handleItemClick = (item) => {
    setActiveItem(item.id);
    dispatch(setView(item.view));
  };

  
  return (
    <ul className="side-menu-container">
      {menuItems.map((item) => (
        <MenuItem
          key={item.id}
          title={item.name}
          active={activeItem === item.id}
          className={`side-menu-item ${activeItem === item.id ? 'active' : ''}`}
          onClick={() => handleItemClick(item)}
        >
          {item.name}
        </MenuItem>
      ))}
    </ul>
  );
};

export default LeftSideMenu;