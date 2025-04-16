import React, { useEffect, useState } from 'react';
import './App.css';
import ItemList from './components/ItemList';
import AddItemForm from './components/AddItemForm';
import { Container, TextField } from '@mui/material';






type Item = {
  id: number;
  name: string;
  quantity: number;
};

const API_URL = 'http://localhost:5000/items';

function App() {
  const [items, setItems] = useState<Item[]>([]);
  const [searchTerm, setSearchTerm] = useState('');


  // ✅ 1. Load items from API
  useEffect(() => {
    fetch(API_URL)
      .then((res) => res.json())
      .then((data) => {
        setItems(data);
        console.log('[GET] Loaded items:', data);
      })
      .catch((err) => console.error('Failed to load items:', err));
  }, []);

  // ✅ 2. Add new item to API
  const handleAddItem = (newItem: { name: string; quantity: number }) => {
    fetch(API_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newItem),
    })
      .then((res) => res.json())
      .then((createdItem) => {
        setItems((prev) => [...prev, createdItem]);
        console.log('[POST] Added:', createdItem);
      })
      .catch((err) => console.error('Failed to add item:', err));
  };
  

  // ✅ 3. Delete item from API
  const handleDeleteItem = (id: number) => {
    fetch(`${API_URL}/${id}`, {
      method: 'DELETE',
    })
      .then(() => {
        setItems((prev) => prev.filter((item) => item.id !== id));
        console.log('[DELETE] Removed item with id:', id);
      })
      .catch((err) => console.error('Failed to delete item:', err));
  };
  const filteredItems = searchTerm
  ? items.filter((item) =>
      item.name.toLowerCase().includes(searchTerm.toLowerCase())
    )
  : [];

  
  return (
      <Container maxWidth="md" sx={{ paddingY: 4 }}>
        <div style={{ marginBottom: '24px' }}>
          <h1>Amazon Robotics Dashboard (API)</h1>
        </div>
    
        <div style={{ marginBottom: '24px' }}>
          <AddItemForm onAddItem={handleAddItem} />
        </div>
    
        <div style={{ marginBottom: '24px' }}>
          <TextField
            label="Search Items"
            variant="outlined"
            fullWidth
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
    
        <div>
          <ItemList items={filteredItems} onDelete={handleDeleteItem} />
        </div>
      </Container>
    );
    
    
  
}

export default App;
