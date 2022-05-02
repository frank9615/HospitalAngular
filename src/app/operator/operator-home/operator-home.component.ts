import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NavModel } from 'src/app/shared/nav/nav.model';

@Component({
  selector: 'app-operator-home',
  templateUrl: './operator-home.component.html',
  styleUrls: ['./operator-home.component.css']
})
export class OperatorHomeComponent implements OnInit {

  navbarlinks: NavModel[] = [];
  titlelink: string;

  constructor(private route: Router) {
    this.navbarlinks.push({ header: "Nuovo Paziente", link: "patientregistration" });
    this.navbarlinks.push({ header: "Nuovo Triage", link: "triageregistration" });
    this.titlelink = "/operator/users";
  }

  ngOnInit(): void {
    this.route.navigate(['/operator/patientregistration']);
  }

}
