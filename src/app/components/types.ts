export interface TodoListItem {
    id: number;
    createdAt: string;
    updatedAt: string;
    content?: string;
    completed: boolean;
}

export interface TodoList {
    id: number;
    todoListItems: TodoListItem[];
}

