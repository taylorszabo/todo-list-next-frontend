"use client"
import React, { useEffect, useState } from 'react';
import axios from 'axios';

import TodoLists from "@/app/components/TodoLists";
import { TodoList as TodoListTypes} from './components/types';

const Home: React.FC = () => {
  const [todoLists, setTodoLists] = useState<TodoListTypes[]>([]);

  const fetchTodoLists = async () => {
    try {
      const response = await axios.get('http://localhost:3000/todos');
      setTodoLists(response.data);
    } catch (error) {
      console.error('Error fetching to-do lists', error);
    }
  };

  useEffect(() => {
    fetchTodoLists();
  }, []);

  return (
    <div>
      <h1 className="text-4xl font-bold text-center my-8">To-Do Lists</h1>
      <TodoLists todoLists={todoLists} onUpdate={fetchTodoLists} />
    </div>
  );
};

export default Home;

