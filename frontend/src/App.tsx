import React, { useState } from 'react';
import { TodoProvider } from '@src/context/TodoContext';
import TodoForm from '@src/components/TodoForm';
import TodoList from '@src/components/TodoList';
import Container from '@mui/material/Container';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';

const App: React.FC = () => {
  const [open, setOpen] = useState(false);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <TodoProvider>
      <CssBaseline />
      <Container maxWidth="md" sx={{ py: 6 }}>
        <Paper elevation={6} sx={{ p: 4 }}>
          <Box display="flex" flexDirection="column" alignItems="center" gap={2}>
            <Typography variant="h3" component="h1" color="primary" fontWeight={700} gutterBottom>
              ToDo App
            </Typography>
            <Typography variant="subtitle1" color="text.secondary">
              Organize your tasks and boost your productivity!
            </Typography>
          </Box>
          <Box mt={4} mb={2} display="flex" justifyContent="flex-end" alignItems="center">
            <Button variant="contained" color="primary" onClick={handleOpen} sx={{ ml: 2 }}>
              Add New
            </Button>
          </Box>
          <TodoList />
        </Paper>
        <Box mt={4} textAlign="center">
          <Typography variant="body2" color="text.disabled">
            &copy; {new Date().getFullYear()} ToDo App. All rights reserved.
          </Typography>
        </Box>
        <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
          <DialogTitle>Add New Todo</DialogTitle>
          <DialogContent>
            <TodoForm onSuccess={handleClose} />
          </DialogContent>
        </Dialog>
      </Container>
    </TodoProvider>
  );
};

export default App; 