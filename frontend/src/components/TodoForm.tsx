import React, { useState, useEffect } from 'react';
import { z } from 'zod';
import { useTodoContext } from '@src/context/TodoContext';
import { todoSchema } from '@src/utils/validation';
import { createTodo, updateTodo as apiUpdateTodo } from '@src/utils/api';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';

type Props = {
  onSuccess?: () => void;
  initialData?: {
    _id: string;
    name: string;
    shortDescription: string;
    dateTime: string;
    done?: boolean;
  };
  onUpdate?: (todo: any) => void;
};

function getDefaultDateTime() {
  const now = new Date();
  now.setSeconds(0, 0); // Remove seconds and ms for input compatibility
  return now.toISOString().slice(0, 16);
}

const initialForm = {
  name: '',
  shortDescription: '',
  dateTime: getDefaultDateTime(),
};

type FormState = typeof initialForm;

type Errors = Partial<Record<keyof FormState, string>>;

const TodoForm: React.FC<Props> = ({ onSuccess, initialData, onUpdate }) => {
  const [form, setForm] = useState<FormState>(initialForm);
  const [errors, setErrors] = useState<Errors>({});
  const { addTodo, updateTodo: updateCtxTodo } = useTodoContext();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  useEffect(() => {
    if (initialData) {
      setForm({
        name: initialData.name || '',
        shortDescription: initialData.shortDescription || '',
        dateTime: initialData.dateTime ? new Date(initialData.dateTime).toISOString().slice(0, 16) : getDefaultDateTime(),
      });
    } else {
      setForm(initialForm);
    }
  }, [initialData]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // Convert dateTime to ISO string for backend
    const formToSend = {
      ...form,
      dateTime: form.dateTime ? new Date(form.dateTime).toISOString() : '',
    };
    const parse = todoSchema.safeParse(formToSend);
    if (!parse.success) {
      const fieldErrors: Errors = {};
      parse.error.errors.forEach(err => {
        if (err.path[0]) fieldErrors[err.path[0] as keyof FormState] = err.message;
      });
      setErrors(fieldErrors);
      return;
    }
    setErrors({});
    try {
      if (initialData && initialData._id) {
        const updated = await apiUpdateTodo(initialData._id, parse.data);
        updateCtxTodo(initialData._id, updated);
        if (onUpdate) onUpdate(updated);
      } else {
        const todo = await createTodo(parse.data);
        addTodo(todo);
        if (onSuccess) onSuccess();
      }
      setForm(initialForm);
      if (onSuccess && !initialData) onSuccess();
    } catch (err) {
      alert('Failed to save todo');
    }
  };

  return (
    <Box
      component="form"
      onSubmit={handleSubmit}
      sx={{
        display: 'flex',
        flexDirection: 'column',
        gap: isMobile ? 3 : 2,
        mt: 1,
        px: { xs: 0, sm: 2 },
        py: { xs: 1, sm: 2 },
      }}
    >
      <TextField
        name="name"
        label="Name"
        value={form.name}
        onChange={handleChange}
        error={!!errors.name}
        helperText={errors.name}
        fullWidth
        size={isMobile ? 'medium' : 'small'}
        InputProps={{ style: isMobile ? { fontSize: 18 } : {} }}
        InputLabelProps={{ style: isMobile ? { fontSize: 16 } : {} }}
      />
      <TextField
        name="shortDescription"
        label="Short Description"
        value={form.shortDescription}
        onChange={handleChange}
        error={!!errors.shortDescription}
        helperText={errors.shortDescription}
        fullWidth
        multiline
        minRows={isMobile ? 3 : 2}
        size={isMobile ? 'medium' : 'small'}
        InputProps={{ style: isMobile ? { fontSize: 18 } : {} }}
        InputLabelProps={{ style: isMobile ? { fontSize: 16 } : {} }}
      />
      <TextField
        name="dateTime"
        label="Date & Time"
        type="datetime-local"
        value={form.dateTime}
        onChange={handleChange}
        error={!!errors.dateTime}
        helperText={errors.dateTime}
        fullWidth
        size={isMobile ? 'medium' : 'small'}
        InputLabelProps={{ shrink: true, style: isMobile ? { fontSize: 16 } : {} }}
        InputProps={{ style: isMobile ? { fontSize: 18 } : {} }}
      />
      <Button
        type="submit"
        variant="contained"
        color="primary"
        size={isMobile ? 'large' : 'medium'}
        sx={{ mt: isMobile ? 2 : 1, py: isMobile ? 1.5 : 1, fontSize: isMobile ? 18 : 16, borderRadius: 2 }}
        fullWidth={isMobile}
      >
        {initialData ? 'Update Todo' : 'Add Todo'}
      </Button>
    </Box>
  );
};

export default TodoForm; 