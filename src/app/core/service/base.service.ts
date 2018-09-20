import { Injectable } from '@angular/core';
import { TodoCategory } from '../model/todo-category.model';
import { TodoItem } from '../model/todo-item.model';

@Injectable()

export class BaseService {

  // todoListData: Array<TodoCategory>;
  todoListData: Array<TodoCategory> = [{ id: 'inbox', title: 'inbox', color: 'white', todoItems: [{ id: '477dcc78-acbe-4197-859e-a73ef4497d92', content: 'testest', completed: false, date: new Date(1537231236419) }, { id: 'b4969ac7-2e96-4e84-8ce1-c191102354ab', content: 'testest3', completed: true, date: new Date() }, { id: '6e48aebe-5e2b-4b13-bc05-e51930950fef', content: 'testest33', completed: false, date: new Date(1537922479769)}]}];

  activeCategory = this.todoListData[0];

  constructor() { }

  pushTodoItem(item: TodoItem, category: TodoCategory=this.activeCategory) {
    category.todoItems.push(item)
  }

  deleteTodoItem(item: TodoItem, category: TodoCategory = this.activeCategory) {
    category.todoItems.splice(category.todoItems.indexOf(item), 1);
  }

  clearCompleted(category: TodoCategory = this.activeCategory) {
    category.todoItems = category.todoItems.filter(todo => todo.completed == false)
  }
}
