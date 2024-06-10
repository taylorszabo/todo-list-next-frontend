import React from 'react';
import { TodoList as TodoListType } from '../types';
import TodoList from "@/app/components/TodoList";

interface TodoListsProps {
    todoLists: TodoListType[];
    onUpdate: () => void;
}

const TodoLists: React.FC<TodoListsProps> = ({ todoLists, onUpdate }) => {
    return (
        <div className="container mx-auto p-4">
            {todoLists.map(todoList => (
                <TodoList key={todoList.id} todoList={todoList} onUpdate={onUpdate} />
            ))}
        </div>
    );
};

export default TodoLists;

