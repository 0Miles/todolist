import { TodoItem } from "./todo-item.model";

export class TodoCategory {
    id: string;
    title: string;
    color: string;
    childCategory?: Array<TodoCategory>;
    todoItems?: Array<TodoItem>;
}