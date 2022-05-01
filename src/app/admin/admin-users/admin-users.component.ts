import { Component, OnInit } from '@angular/core';
import { NavModel } from 'src/app/shared/nav/nav.model';
import { User } from 'src/app/core/models/User';
import { UsersService } from 'src/app/core/services/users.service';

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

}
