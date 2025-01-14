import { JsonPipe, NgForOf } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButton, MatMiniFabButton } from '@angular/material/button';
import { MatCheckbox } from '@angular/material/checkbox';
import { MatIcon } from '@angular/material/icon';
import { MatFormField, MatInput } from '@angular/material/input';
import { MatList, MatListItem } from '@angular/material/list';
import { Todo, TodoService } from '../../services/todo.service';

@Component({
  selector: 'app-todo',
  imports: [
    NgForOf,
    JsonPipe,
    MatInput,
    FormsModule,
    MatCheckbox,
    MatListItem,
    MatList,
    MatIcon,
    MatMiniFabButton,
    MatButton,
    MatFormField
  ],
  templateUrl: './todo.component.html',
  standalone: true,
  styleUrl: './todo.component.scss'
})
export class TodoComponent implements OnInit {
  todos: Todo[] = [];
  newTodo: string = '';

  constructor(private todoService: TodoService) {}

  ngOnInit(): void {
    this.getTodos();
  }

  private getTodos() {
    this.todoService.getTodos().subscribe(
      data => this.todos = data
    )
  }

  addTodo() {
    if (this.newTodo.trim()) {

      const todo: Todo = {
        title: this.newTodo,
        completed: false,
        userId: 1,
      };

      this.todoService.createTodo(todo).subscribe(
        item => {
          this.todos.unshift(item);
          this.newTodo = '';
        }
      )
    }
  }

  updateTodo(todo: Todo) {
    todo.completed = !todo.completed;

    this.todoService.updateTodo(todo).subscribe(
      data => console.log(data)
    )
  }

  deleteTodo(id: number | undefined) {
    if (id) {
      this.todoService.deleteTodo(id).subscribe(
        data => {
          this.todos = this.todos.filter(
            todo => todo.id !== id
          )
        }
      )
    }
  }
}
