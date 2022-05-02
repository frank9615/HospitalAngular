import { Component, OnInit } from '@angular/core';
import { NavModel } from 'src/app/shared/nav/nav.model';
import { User } from 'src/app/core/models/User';
import { UsersService } from 'src/app/core/services/users.service';
import { first } from 'rxjs';

@Component({
  selector: 'app-admin-users',
  templateUrl: './admin-users.component.html',
  styleUrls: ['./admin-users.component.css']
})
export class AdminUsersComponent implements OnInit {

  usersList: User[] = [];
  headersUsersList: string[] = [];

  constructor(private userService: UsersService) {
  }

  ngOnInit(): void {
    this.userService.getAllUsers().subscribe(
      (users: User[]) => {
        this.usersList = users;
        this.headersUsersList = Object.getOwnPropertyNames(users[0]);
      }
    );
  }

  deleteItem(value: string): void {
    let user: User = JSON.parse(JSON.stringify(value));
    let id: number = user.id;

    this.userService.deleteUser(id).pipe(first()).subscribe(
      (user: User) => {
        this.usersList = this.usersList.filter((u) => u.id !== id);
      }
    );
  }


}
