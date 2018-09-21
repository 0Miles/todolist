import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { TodoItem } from '../../../core/model/todo-item.model';

@Component({
  selector: 'todo-item',
  templateUrl: './todo-item.component.html',
  styles: []
})
export class TodoItemComponent implements OnInit {

  @Input() todo: TodoItem;
  @Output() delete: EventEmitter<TodoItem> = new EventEmitter();
  @Output() edit: EventEmitter<boolean> = new EventEmitter();

  tmpContent: string;
  tmpDate: string;
  enableEditBox: boolean = false;

  ngOnInit() {
  }

  resetTmp() {
    this.tmpContent = this.todo.content, 
    this.tmpDate = this.todo.date.substr(0, 10);
  }

  showEditBox() {
    this.enableEditBox = true;
    this.resetTmp();
  }

  closeEditBox() {
    this.enableEditBox = false;
  }

  submitEditBox() {
    this.todo.content = this.tmpContent;
    this.todo.date = this.tmpDate;
    this.closeEditBox();
    this.edit.emit();
  }

  submitDelete() {
    this.delete.emit(this.todo);
  }

}
