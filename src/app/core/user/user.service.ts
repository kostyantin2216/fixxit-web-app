import { Observable } from 'rxjs/Rx';
import { User } from './user.model';
import { Injectable } from '@angular/core';
import "rxjs/Rx";

@Injectable()
export class UserService {

  private users: User[] = [];

  constructor() { }

  getIdForUser(user: User): Observable<number> {
    return Observable.of(this.users.push(user) - 1);
  }

  getUser(userId: number): Observable<User> {
    return Observable.of(this.users[userId]);
  }

}
