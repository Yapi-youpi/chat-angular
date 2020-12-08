import { Component, OnInit } from '@angular/core';
import { AuthService } from "../shared/auth.service";
import {FormControl, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-reg',
  templateUrl: './reg.component.html',
  styleUrls: ['./reg.component.scss']
})
export class RegComponent implements OnInit {
  public form: FormGroup
  constructor(
    public authService: AuthService
  ) { }

  ngOnInit(): void {
    this.form = new FormGroup({
      loginForm: new FormControl('', Validators.required)
    });
  }

}
