import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Todo } from 'src/app/list-todos/list-todos.component';
import { API_URL, TODO_API_JPA_URL } from 'src/app/app.constants';

@Injectable({
  providedIn: 'root',
})
export class TodoDataService {
  constructor(private httpClient: HttpClient) {}

  retrieveEntireTodoList(username) {
    return this.httpClient.get<Todo[]>(
      `${TODO_API_JPA_URL}/users/${username}/todos`
    );
  }

  retrieveTodo(username, id) {
    return this.httpClient.get<Todo>(
      `${TODO_API_JPA_URL}/users/${username}/todos/${id}`
    );
  }

  deleteTodo(username, id) {
    return this.httpClient.delete(
      `${TODO_API_JPA_URL}/users/${username}/todos/${id}`
    );
  }

  updateTodo(username, id, todo) {
    // === to comare objects
    // == to compare primitives
    return id > -1
      ? this.httpClient.put<Todo>(
          `${TODO_API_JPA_URL}/users/${username}/todos/${id}`,
          todo
        )
      : this.httpClient.post<Todo>(
          `${TODO_API_JPA_URL}/users/${username}/todos`,
          todo
        );
  }
}
