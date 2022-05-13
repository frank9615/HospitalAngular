import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { first } from 'rxjs';
import { Role } from 'src/app/core/models/Role';
import { User } from 'src/app/core/models/User';
import { UsersService } from 'src/app/core/services/users.service';

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.css']
})
export class EditUserComponent implements OnInit {
  id: number = 0;
  user: User;
  roles: string[] = [];

  constructor(private route: ActivatedRoute,
    private usersService: UsersService) {
    this.user = this.newUser();
    this.roles = Object.keys(Role);
  }

  ngOnInit(): void {
    this.route.paramMap.pipe(first()).subscribe(params => {
      this.id = Number(params.get('id'));

      if (this.id == 0) {
        this.newUser();
      } else {
        this.usersService.getUserById(this.id).pipe(first()).subscribe(
          (user: User) => {
            this.user = user;
          });
      }
    });
  }

  getRoles(): string[] {
    return this.roles.filter(role => { return this.user.role != role });
  }

  newUser(): User {
    let user = {
      id: 0,
      username: '',
      password: '',
      name: '',
      surname: '',
      role: Role.Operator,
    };
    this.user = user;
    return user;
  }

  saveUser(): void {
    console.log(this.user);
    if (this.user) {
      if (this.user.id == 0) {
        //add new user
        this.usersService.addUser(this.user).pipe(first()).subscribe(
          (user: User) => {
            this.user = user;
          });
      } else {
        //update user
        this.usersService.updateUser(this.user).pipe(first()).subscribe(
          (user: User) => {
            this.user = user;
          });
      }
    }
  }
}
