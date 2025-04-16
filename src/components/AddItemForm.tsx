import React, { useState } from 'react';
import { Box, Button, TextField, Typography } from '@mui/material';

type AddItemFormProps = {
  onAddItem: (item: { name: string; quantity: number }) => void;
};

const AddItemForm: React.FC<AddItemFormProps> = ({ onAddItem }) => {
  const [name, setName] = useState('');
  const [quantity, setQuantity] = useState<string>('0');// ✔️ empty string means the field starts empty


  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
  
    if (!name.trim()) {
      alert('Please enter an item name.');
      return;
    }
  
    if (quantity === '' || isNaN(Number(quantity)) || Number(quantity) < 0) {

      alert('Please enter a valid quantity greater than 0.');
      return;
    }
  
    onAddItem({ name, quantity: Number(quantity) });

    setName('');
    setQuantity('');
  };
  

  return (
    <Box
      component="form"
      onSubmit={handleSubmit}
      sx={{ display: 'flex', gap: 2, alignItems: 'center', marginBottom: 4 }}
    >
      <Typography variant="h6">Add New Item:</Typography>
      <TextField
        label="Item Name"
        variant="outlined"
        value={name}
        onChange={(e) => setName(e.target.value)}
        required
      />
      <TextField
  label="Quantity"
  type="number"
  required
  placeholder="0"
  value={quantity}
  onChange={(e) => {
    const val = e.target.value;

    // If user presses backspace (clears), make it blank
    if (val === '') {
      setQuantity('');
    } else {
      setQuantity(val); // Keep as string while typing
    }
  }}
/>




      <Button type="submit" variant="contained" color="primary">
        Add
      </Button>
    </Box>
  );
};

export default AddItemForm;
