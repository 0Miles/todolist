import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { TodoCategory } from '../../core/model/todo-category.model';
import { BaseService } from '../../core/service/base.service';

@Component({
  selector: 'todo-category',
  templateUrl: './todo-category.component.html',
  styles: []
})
export class TodoCategoryComponent implements OnInit {

  @Input() category: TodoCategory;
  @Output() changeActive: EventEmitter<TodoCategory> = new EventEmitter();
  @Output() delete: EventEmitter<TodoCategory> = new EventEmitter();

  categoryIndex: number;

  constructor(private base: BaseService) { }

  ngOnInit() {
  }

  changeActiveCategory() {
    this.changeActive.emit(this.category);
  }
  deleteCategory() {
    this.delete.emit(this.category);
  }

}
