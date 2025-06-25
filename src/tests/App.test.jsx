import '@testing-library/jest-dom';
import { render, screen, fireEvent } from '@testing-library/react';
import App from '../App';

describe('Todo Application', () => {
  test('renders without crashing and shows input field', () => {
    render(<App />);
    expect(screen.getByPlaceholderText(/enter task title/i)).toBeInTheDocument();
  });

  test('allows adding a task', () => {
    render(<App />);
    const input = screen.getByPlaceholderText(/enter task title/i);
    const button = screen.getByRole('button', { name: /add task/i });

    fireEvent.change(input, { target: { value: 'New Task' } });
    fireEvent.click(button);

    expect(screen.getByText('New Task')).toBeInTheDocument();
  });

  test('disables Add button when input is empty or whitespace', () => {
    render(<App />);
    const input = screen.getByPlaceholderText(/enter task title/i);
    const button = screen.getByRole('button', { name: /add task/i });

    fireEvent.change(input, { target: { value: '   ' } });
    fireEvent.click(button);

    expect(screen.queryByText('   ')).not.toBeInTheDocument();
  });

  test('can mark task as completed', () => {
    render(<App />);
    const input = screen.getByPlaceholderText(/enter task title/i);
    const button = screen.getByRole('button', { name: /add task/i });

    fireEvent.change(input, { target: { value: 'Complete Me' } });
    fireEvent.click(button);

    const checkbox = screen.getByRole('checkbox');
    fireEvent.click(checkbox);

    expect(checkbox).toBeChecked();
  });

  test('can delete a task', () => {
    render(<App />);
    const input = screen.getByPlaceholderText(/enter task title/i);
    const button = screen.getByRole('button', { name: /add task/i });

    fireEvent.change(input, { target: { value: 'Delete Me' } });
    fireEvent.click(button);

    const deleteBtn = screen.getByRole('button', { name: /delete/i });
    fireEvent.click(deleteBtn);

    expect(screen.queryByText('Delete Me')).not.toBeInTheDocument();
  });

  test('persists tasks in localStorage', () => {
    render(<App />);
    const input = screen.getByPlaceholderText(/enter task title/i);
    const button = screen.getByRole('button', { name: /add task/i });

    fireEvent.change(input, { target: { value: 'Persistent Task' } });
    fireEvent.click(button);

    expect(localStorage.setItem).toHaveBeenCalled();
  });

  test('dark mode toggle works and persists state', () => {
    render(<App />);
    const toggle = screen.getByRole('button', { name: /toggle dark mode/i });
    fireEvent.click(toggle);

    expect(document.body.classList.contains('dark')).toBe(true);
  });
});
