import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FaEdit, FaTrash } from 'react-icons/fa';
import Navbar from '../Navbar'
import './index.css';

const LandingPage = () => {
  const [items, setItems] = useState([]);
  const [newItemName, setNewItemName] = useState('');
  const [filterText, setFilterText] = useState('');
  const [sortOrder, setSortOrder] = useState('asc');
  const [token, setToken] = useState('');

  useEffect(() => {
    const userToken = localStorage.getItem('token');
    console.log(userToken);
    if (userToken) {
      setToken(userToken);
      loadItems(userToken);
    }
  }, []);

  const loadItems = async (token) => {
    try {
      const response = await axios.get('http://localhost:5000/items', {
        headers: { Authorization: token },
      });
      console.log(response);
      setItems(response.data);
    } catch (error) {
      console.error('Failed to fetch items:', error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name === 'newItemName') setNewItemName(value);
    else if (name === 'filterText') setFilterText(value);
  };

  const handleAddItem = async () => {
    try {
      const newItem = { name: newItemName };
      const response = await axios.post('http://localhost:5000/items', newItem, {
        headers: { Authorization: token },
      });
      setItems([...items, response.data]);
      setNewItemName('');
    } catch (error) {
      console.error('Failed to add item:', error);
    }
  };

  const handleUpdateItem = async (id, newName) => {
    try {
      const updatedItem = { name: newName };
      await axios.put(`http://localhost:5000/items/${id}`, updatedItem, {
        headers: { Authorization: token },
      });
      loadItems(token);
    } catch (error) {
      console.error('Failed to update item:', error);
    }
  };

  const handleDeleteItem = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/items/${id}`, {
        headers: { Authorization: token },
      });
      loadItems(token);
    } catch (error) {
      console.error('Failed to delete item:', error);
    }
  };

  const filteredItems = items.filter(item =>
    item.name.toLowerCase().includes(filterText.toLowerCase())
  );

  const sortedItems = filteredItems.sort((a, b) => {
    return sortOrder === 'asc'
      ? a.name.localeCompare(b.name)
      : b.name.localeCompare(a.name);
  });

  return (
    <>
    <Navbar/>
    <div className="landingPage">
      <h2>Landing Page</h2>
      <input
        type="text"
        name="filterText"
        placeholder="Filter items"
        value={filterText}
        onChange={handleInputChange}
      />
      <button className="sortButton" onClick={() => setSortOrder('asc')}>Sort Asc</button>
      <button className="sortButton" onClick={() => setSortOrder('desc')}>Sort Desc</button>
      <div className="newItemContainer">
        <input
          type="text"
          name="newItemName"
          placeholder="New item name"
          value={newItemName}
          onChange={handleInputChange}
        />
        <button className="addButton" onClick={handleAddItem}>Add Item</button>
      </div>
      <table className="itemTable">
        <thead>
          <tr>
            <th>Item Name</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {sortedItems.map(item => (
            <tr key={item.id}>
              <td>{item.name}</td>
              <td>
                <button className="editButton" onClick={() => handleUpdateItem(item.id, prompt('New name', item.name))}>
                  <FaEdit />
                </button>
                <button className="deleteButton" onClick={() => handleDeleteItem(item.id)}>
                  <FaTrash />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
    </>
  );
};

export default LandingPage;
