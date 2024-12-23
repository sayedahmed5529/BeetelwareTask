import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { User } from '../interfaces/user';
import { Dummy_DATA } from '../../../data/data';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  users :any[]=Dummy_DATA;

  constructor() { }
  
  getUsers(): Observable<User[]> {
    return of(this.users);
  }

  getUserById(id: number): Observable<User | undefined> {
    return of(this.users.find((user) => user.id === id));
  }

  updateUser(user: User): Observable<User> {
    const index = this.users.findIndex((u) => u.id === user.id);
    if (index !== -1) {
      this.users[index] = user;
    }
    return of(user);
  }
  deleteUser(id: number) {
    const index = this.users.findIndex((u) => u.id === id);
    if (index !== -1) {
      this.users[index].status = 'soft_deleted';
    }

  }

  
  addUser(user: User): Observable<any> {
    user.id = this.generateId(); // Generate an ID for the user
    this.users.push(user);
    return of(user); // Wrap the added user in an observable
  }
  
  private generateId(): number {
    return this.users.length > 0 ? Math.max(...this.users.map((u) => u.id)) + 1 : 1;
  }
}
