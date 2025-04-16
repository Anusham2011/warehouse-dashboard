import React, { useState, useEffect } from 'react';
import { Box, Button, TextField, Typography } from '@mui/material';

type EditItemFormProps = {
  item: {
    id: number;
    name: string;
    quantity: number;
  };
  onUpdate: (updatedItem: { id: number; name: string; quantity: number }) => void;
  onCancel: () => void;
};

const EditItemForm: React.FC<EditItemFormProps> = ({ item, onUpdate, onCancel }) => {
  const [name, setName] = useState(item.name);
  const [quantity, setQuantity] = useState(item.quantity.toString());

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!name.trim() || isNaN(Number(quantity)) || Number(quantity) <= 0) {
      alert('Please enter a valid name and quantity.');
      return;
    }

    onUpdate({ id: item.id, name, quantity: Number(quantity) });
  };

  return (
    <Box
      component="form"
      onSubmit={handleSubmit}
      sx={{ display: 'flex', gap: 2, alignItems: 'center', marginBottom: 4 }}
    >
      <Typography variant="h6">Edit Item:</Typography>
      <TextField
        label="Item Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        required
      />
      <TextField
        label="Quantity"
        type="number"
        value={quantity}
        onChange={(e) => setQuantity(e.target.value)}
        required
      />
      <Button type="submit" variant="contained" color="primary">
        Update
      </Button>
      <Button variant="outlined" onClick={onCancel}>
        Cancel
      </Button>
    </Box>
  );
};

export default EditItemForm;
