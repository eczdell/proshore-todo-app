const API_URL = 'http://localhost:5000/api/todos';

export async function createTodo(data: { name: string; shortDescription: string; dateTime: string }) {
  const res = await fetch(API_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error('Failed to create todo');
  return res.json();
}

export async function fetchTodos(filter?: string) {
  const url = filter ? `${API_URL}?filter=${filter}` : API_URL;
  const res = await fetch(url);
  if (!res.ok) throw new Error('Failed to fetch todos');
  return res.json();
}

export async function updateTodo(id: string, data: Partial<{ name: string; shortDescription: string; dateTime: string; done: boolean }>) {
  const res = await fetch(`${API_URL}/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error('Failed to update todo');
  return res.json();
}

export async function deleteTodo(id: string) {
  const res = await fetch(`${API_URL}/${id}`, { method: 'DELETE' });
  if (!res.ok) throw new Error('Failed to delete todo');
  return res.json();
} 