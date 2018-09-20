import { Component, OnInit } from '@angular/core';
import { BaseService } from '../../../core/service/base.service';
import { TodoItem } from '../../../core/model/todo-item.model';



@Component({
  selector: 'todo-list',
  templateUrl: './todo-list.component.html'
})
export class TodoListComponent implements OnInit {

  tmpTodoItem: TodoItem;
  tmpDate: string;
  enableAddBox: boolean = false;
  filter: string = "filter-active";

  constructor(private base: BaseService) { }

  ngOnInit() {
  }

  onDeleteItem(item: TodoItem) {
    this.base.deleteTodoItem(item);
  }

  resetTmpTodoItem() {
    this.tmpTodoItem = new TodoItem("");
    this.tmpDate = (new Date()).toISOString().substr(0, 10);
  }

  showAddBox() {
    this.enableAddBox = true;
    this.resetTmpTodoItem();
  }

  closeAddBox() {
    this.enableAddBox = false;
  }

  submitAddBox() {
    this.tmpTodoItem.date = new Date(this.tmpDate);
    this.base.pushTodoItem(this.tmpTodoItem);
    this.closeAddBox();
  }

}
