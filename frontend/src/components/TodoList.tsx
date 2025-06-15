import React, { useEffect, useState } from 'react';
import { useTodoContext } from '@src/context/TodoContext';
import { fetchTodos, updateTodo, deleteTodo } from '@src/utils/api';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Checkbox from '@mui/material/Checkbox';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import TablePagination from '@mui/material/TablePagination';
import TodoForm from './TodoForm';

const PAGE_SIZE = 5;

const TodoList = () => {
  const { todos, setTodos, filter, setFilter, updateTodo: updateCtxTodo, deleteTodo: deleteCtxTodo } = useTodoContext();
  const [editTodo, setEditTodo] = useState(null);
  const [page, setPage] = useState(0);
  const [total, setTotal] = useState(0);

  // Fetch todos for current page and filter
  useEffect(() => {
    (async () => {
      // Simulate backend pagination: fetch all, then slice (replace with backend pagination if available)
      const allTodos = await fetchTodos(filter);
      setTotal(allTodos.length);
      setTodos(allTodos.slice(page * PAGE_SIZE, (page + 1) * PAGE_SIZE));
    })();
  }, [filter, setTodos, page]);

  const handleDone = async (todo: any) => {
    if (!todo._id) return;
    const updated = await updateTodo(todo._id, { done: !todo.done });
    updateCtxTodo(todo._id, updated);
  };

  const handleDelete = async (todo: any) => {
    if (!todo._id) return;
    await deleteTodo(todo._id);
    deleteCtxTodo(todo._id);
  };

  const handleEdit = (todo: any) => {
    setEditTodo(todo);
  };

  const handleEditClose = () => setEditTodo(null);
  const handleEditSuccess = () => setEditTodo(null);

  const handleChangePage = (_event: any, newPage: number) => setPage(newPage);

  return (
    <Box>
      <Box display="flex" justifyContent="flex-end" mb={1}>
        <ToggleButtonGroup
          value={filter}
          exclusive
          onChange={(_e, val) => {
            if (val) {
              setFilter(val);
              setPage(0);
            }
          }}
          size="small"
          color="primary"
        >
          <ToggleButton value="all">All</ToggleButton>
          <ToggleButton value="done">Done</ToggleButton>
          <ToggleButton value="upcoming">Upcoming</ToggleButton>
        </ToggleButtonGroup>
      </Box>
      <TableContainer component={Paper} sx={{ border: 1, borderColor: 'divider', borderRadius: 2 }}>
        <Table size="small" aria-label="todo table">
          <TableHead>
            <TableRow>
              <TableCell sx={{ fontWeight: 700, fontSize: 16 }}>Name</TableCell>
              <TableCell sx={{ fontWeight: 700, fontSize: 16 }}>Description</TableCell>
              <TableCell sx={{ fontWeight: 700, fontSize: 16 }}>Date & Time</TableCell>
              <TableCell align="center" sx={{ fontWeight: 700, fontSize: 16 }}>Done</TableCell>
              <TableCell align="center" sx={{ fontWeight: 700, fontSize: 16 }}>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {todos.length === 0 ? (
              <TableRow>
                <TableCell colSpan={5} align="center">
                  <Typography variant="body1" color="text.secondary">
                    No todos found.
                  </Typography>
                </TableCell>
              </TableRow>
            ) : (
              todos.map((todo) => (
                <TableRow key={todo._id} hover selected={todo.done} sx={todo.done ? { opacity: 0.6 } : {}}>
                  <TableCell sx={{ fontWeight: 500 }}>{todo.name}</TableCell>
                  <TableCell>{todo.shortDescription}</TableCell>
                  <TableCell sx={{ whiteSpace: 'nowrap' }}>{new Date(todo.dateTime).toLocaleString()}</TableCell>
                  <TableCell align="center">
                    <Checkbox
                      checked={todo.done}
                      onChange={() => handleDone(todo)}
                      color="primary"
                    />
                  </TableCell>
                  <TableCell align="center">
                    <Tooltip title="Edit">
                      <IconButton onClick={() => handleEdit(todo)} size="small" color="primary">
                        <EditIcon fontSize="small" />
                      </IconButton>
                    </Tooltip>
                    <Tooltip title="Delete">
                      <IconButton onClick={() => handleDelete(todo)} size="small" color="error">
                        <DeleteIcon fontSize="small" />
                      </IconButton>
                    </Tooltip>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
        <TablePagination
          component="div"
          count={total}
          page={page}
          onPageChange={handleChangePage}
          rowsPerPage={PAGE_SIZE}
          rowsPerPageOptions={[PAGE_SIZE]}
        />
      </TableContainer>
      <Dialog open={!!editTodo} onClose={handleEditClose} maxWidth="sm" fullWidth>
        <DialogTitle>Edit Todo</DialogTitle>
        <DialogContent>
          {editTodo && (
            <TodoForm
              initialData={editTodo}
              onSuccess={handleEditSuccess}
              onUpdate={handleEditSuccess}
            />
          )}
        </DialogContent>
      </Dialog>
    </Box>
  );
};

export default TodoList; 