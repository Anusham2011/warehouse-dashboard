import React from 'react';
import {
  List,
  ListItem,
  ListItemText,
  IconButton,
  Typography,
  Paper,
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';


type Item = {
  id: number;
  name: string;
  quantity: number;
};

type ItemListProps = {
  items: Item[];
  onDelete: (id: number) => void;
  onEdit: (item: Item) => void;
};

const ItemList: React.FC<ItemListProps> = ({ items, onDelete, onEdit }) => {

  return (
    <Paper elevation={3} sx={{ padding: 2 }}>
      <Typography variant="h6" gutterBottom>
        Warehouse Items
      </Typography>
      <List>
        {items.map((item) => (
          <ListItem
            key={item.id}
            secondaryAction={
              <>
    <IconButton edge="end" onClick={() => onEdit(item)}>
  <EditIcon />
</IconButton>
    <IconButton edge="end" onClick={() => onDelete(item.id)}>
      <DeleteIcon />
    </IconButton>
  </>
}
          >
            <ListItemText
              primary={item.name}
              secondary={`Quantity: ${item.quantity}`}
            />
          </ListItem>
        ))}
      </List>
    </Paper>
  );
};

export default ItemList;
