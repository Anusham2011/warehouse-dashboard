import React, { useState } from 'react';
import { Box, Button, TextField, Typography } from '@mui/material';

type AddItemFormProps = {
  onAddItem: (item: { name: string; quantity: number }) => void;
};

const AddItemForm: React.FC<AddItemFormProps> = ({ onAddItem }) => {
  const [name, setName] = useState('');
  const [quantity, setQuantity] = useState<number>(0);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || quantity <= 0) return;

    const newItem = {
      name,
      quantity,
    };

    onAddItem(newItem); // Let App.tsx handle the API call

    setName('');
    setQuantity(0);
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
        variant="outlined"
        value={quantity}
        onChange={(e) => setQuantity(parseInt(e.target.value))}
        required
      />
      <Button type="submit" variant="contained" color="primary">
        Add
      </Button>
    </Box>
  );
};

export default AddItemForm;
