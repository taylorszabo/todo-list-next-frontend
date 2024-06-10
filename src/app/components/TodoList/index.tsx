import React, { useState } from 'react';
import { TodoList as TodoListType, TodoListItem } from '../types';
import axios from 'axios';
import TodoModal from "@/app/components/TodoModal";
import TodoForm from '../TodoForm';

interface TodoListProps {
    todoList: TodoListType;
    onUpdate: () => void;
}

const TodoList: React.FC<TodoListProps> = ({ todoList, onUpdate }) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [currentTodo, setCurrentTodo] = useState<TodoListItem | null>(null);

    const handleSave = async (todo: TodoListItem) => {
        if (todo.id === 0) {
            await axios.post('http://localhost:3000/todos/items', { ...todo, todoListId: todoList.id });
        } else {
            await axios.put(`http://localhost:3000/todos/items/${todo.id}`, todo);
        }
        setIsModalOpen(false);
        setCurrentTodo(null);
        onUpdate();
    };

    const handleDelete = async (id: number) => {
        await axios.delete(`http://localhost:3000/todos/items/${id}`);
        onUpdate();
    };

    return (
        <div className="border rounded-lg shadow-lg p-4 mb-4">
            <h2 className="text-2xl font-bold mb-2">Todo List {todoList.id}</h2>
            <ul className="list-disc pl-5">
                {todoList.todoListItems.map((item) => (
                    <li key={item.id} className={`mb-1 ${item.completed ? 'line-through text-gray-500' : ''}`}>
                        {item.content} {item.completed ? '(Completed)' : '(Pending)'}
                        <button
                            onClick={() => {
                                setCurrentTodo(item);
                                setIsModalOpen(true);
                            }}
                            className="ml-2 text-blue-500 hover:underline"
                        >
                            Edit
                        </button>
                        <button
                            onClick={() => handleDelete(item.id)}
                            className="ml-2 text-red-500 hover:underline"
                        >
                            Delete
                        </button>
                    </li>
                ))}
            </ul>
            <button
                onClick={() => {
                    setCurrentTodo(null);
                    setIsModalOpen(true);
                }}
                className="mt-2 bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
            >
                Add Todo
            </button>
            <TodoModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
                <TodoForm todo={currentTodo} onSave={handleSave} />
            </TodoModal>
        </div>
    );
};

export default TodoList;
