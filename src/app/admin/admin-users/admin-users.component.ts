import { Component, OnInit } from '@angular/core';
import { NavModel } from 'src/app/shared/nav/nav.model';
import { User } from 'src/app/core/models/User';
import { UsersService } from 'src/app/core/services/users.service';
import { first } from 'rxjs';
import { DataTableActions } from 'src/app/shared/mytable/table.model';

@Component({
  selector: 'app-admin-users',
  templateUrl: './admin-users.component.html',
  styleUrls: ['./admin-users.component.css']
})
export class AdminUsersComponent implements OnInit {

  usersList: User[] = [];
  headersUsersList: string[] = [];
  actions: DataTableActions[] = [];

  constructor(private userService: UsersService) {
    this.actions.push({
      label: 'Delete',
      actionIdToReturn: 'delete',
      icon: 'bi bi-trash'
    });
  }

  ngOnInit(): void {
    this.userService.getAllUsers().subscribe(
      (users: User[]) => {
        this.usersList = users;
        this.headersUsersList = Object.getOwnPropertyNames(users[0]);
      }
    );
  }

  eventcatcher(value: any): void {
    //From value we can get the actionIdToReturn
    console.log(value);
    /*
    let user: User = JSON.parse(JSON.stringify(value));
    let id: number = user.id;

    this.userService.deleteUser(id).pipe(first()).subscribe(
      (user: User) => {
        this.usersList = this.usersList.filter((u) => u.id !== id);
      }
    );
    */
  }


}
