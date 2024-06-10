import React, { useState, useEffect } from 'react';
import { TodoListItem } from '../types';

interface TodoFormProps {
    todo?: TodoListItem | null;
    onSave: (todo: TodoListItem) => void;
}

const TodoForm: React.FC<TodoFormProps> = ({ todo, onSave }) => {
    const [content, setContent] = useState(todo?.content || '');
    const [completed, setCompleted] = useState(todo?.completed || false);

    const handleSubmit = (event: React.FormEvent) => {
        event.preventDefault();
        const newTodo: TodoListItem = {
            id: todo?.id || 0,
            createdAt: todo?.createdAt || new Date().toISOString(),
            updatedAt: new Date().toISOString(),
            content,
            completed,
        };
        onSave(newTodo);
    };

    useEffect(() => {
        if (todo) {
            setContent(todo.content || '');
            setCompleted(todo.completed);
        }
    }, [todo]);

    return (
        <form onSubmit={handleSubmit}>
            <div className="mb-4">
                <label className="block text-gray-700">Content</label>
                <input
                    type="text"
                    className="w-full px-3 py-2 border rounded"
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    required
                />
            </div>
            <div className="mb-4">
                <label className="block text-gray-700">Completed</label>
                <input
                    type="checkbox"
                    className="mr-2 leading-tight"
                    checked={completed}
                    onChange={(e) => setCompleted(e.target.checked)}
                />
            </div>
            <button
                type="submit"
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            >
                Save
            </button>
        </form>
    );
};

export default TodoForm;
