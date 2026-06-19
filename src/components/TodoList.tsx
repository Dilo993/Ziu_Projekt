import { useState } from 'react';
import { 
  Box, 
  TextField, 
  Button, 
  List, 
  ListItem, 
  ListItemButton, 
  ListItemText, 
  IconButton, 
  Paper, 
  Stack, 
  Typography 
} from '@mui/material';
import { Delete as DeleteIcon, CheckCircle, RadioButtonUnchecked } from '@mui/icons-material';

interface Task {
  id: number;
  text: string;
  completed: boolean;
}

export default function TodoList() {
  const [tasks, setTasks] = useState<Task[]>([
    { id: 1, text: 'Zaimplementować interfejs responsywny (Lab 6)', completed: true },
    { id: 2, text: 'Przetestować czytnik ekranu NVDA (Lab 10)', completed: false }
  ]);
  const [input, setInput] = useState('');

  const handleAddTask = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;
    setTasks([...tasks, { id: Date.now(), text: input.trim(), completed: false }]);
    setInput('');
  };

  const toggleTask = (id: number) => {
    setTasks(tasks.map(t => t.id === id ? { ...t, completed: !t.completed } : t));
  };

  const deleteTask = (id: number) => {
    setTasks(tasks.filter(t => t.id !== id));
  };

  return (
    <Box>
      <Box component="form" onSubmit={handleAddTask} sx={{ mb: 4 }}>
        <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
          <TextField
            fullWidth
            label="Nowe zadanie do wykonania..."
            variant="outlined"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            slotProps={{
              htmlInput: { 'aria-label': 'Treść nowego zadania' }
            }}
          />
          <Button 
            type="submit" 
            variant="outlined" 
            size="large" 
            sx={{ 
              minWidth: 150,
              color: '#003cd6',
              borderColor: '#003cd6',
              backgroundColor: 'background.paper',
              fontWeight: 600,
              '&:hover': {
                borderColor: '#002699',
                backgroundColor: 'background.paper',
              }
            }}
          >
            Dodaj zadanie
          </Button>
        </Stack>
      </Box>

      {tasks.length === 0 ? (
        <Typography align="center" color="text.secondary" sx={{ py: 4 }}>
          Brak aktywnych zadań w planie dnia.
        </Typography>
      ) : (
        <List sx={{ width: '100%', bgcolor: 'background.paper' }} aria-label="Lista bieżących zadań studenckich">
          {tasks.map((task) => (
            <ListItem
              key={task.id}
              disablePadding
              secondaryAction={
                <IconButton 
                  edge="end" 
                  aria-label={`Usuń zadanie: ${task.text}`} 
                  onClick={() => deleteTask(task.id)}
                  color="error"
                >
                  <DeleteIcon />
                </IconButton>
              }
              component={Paper}
              elevation={1}
              sx={{ mb: 1.5, overflow: 'hidden' }}
            >
              <ListItemButton 
                onClick={() => toggleTask(task.id)} 
                role="checkbox" 
                aria-checked={task.completed}
              >
                <IconButton 
                  color={task.completed ? "success" : "default"} 
                  sx={{ mr: 1 }} 
                  tabIndex={-1}
                  aria-label={task.completed ? `Oznacz zadanie jako niewykonane: ${task.text}` : `Oznacz zadanie jako wykonane: ${task.text}`}
                >
                  {task.completed ? <CheckCircle /> : <RadioButtonUnchecked />}
                </IconButton>
                
                <ListItemText
                  primary={
                    <Typography
                      variant="body1"
                      sx={{
                        textDecoration: task.completed ? 'line-through' : 'none',
                        color: 'text.primary',
                        fontWeight: task.completed ? 400 : 500
                      }}
                    >
                      {task.text}
                    </Typography>
                  }
                />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      )}
    </Box>
  );
}