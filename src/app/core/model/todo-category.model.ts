import { TodoItem } from "./todo-item.model";

export class TodoCategory {
    id: string;
    title: string;
    color: string;
    childCategory?: Array<TodoCategory>;
    todoItems: Array<TodoItem>;

    constructor(title: string, color = '#CCCCCC', todoItems = []) {
        this.id = ([1e7].toString() + -1e3 + -4e3 + -8e3 + -1e11).replace(/[018]/g, c =>
            (+c ^ crypto.getRandomValues(new Uint8Array(1))[0] & 15 >> +c / 4).toString(16)
        );
        this.title = title;
        this.todoItems = todoItems;
    }
}