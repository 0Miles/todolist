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

  editable: boolean = false;

  ngOnInit() {
  }

  onSubmit(value) {
    this.todo.content = value.content;
    this.todo.date = value.date;
    this.editable = false;
    this.edit.emit();
  }

}
