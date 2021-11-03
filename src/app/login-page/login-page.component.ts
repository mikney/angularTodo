import {Component, OnInit} from "@angular/core";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {AuthServices} from "../services/auth.services";
import {Router} from "@angular/router";


@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss']
})

export class LoginPageComponent implements OnInit {
  //@ts-ignore
  form: FormGroup
  constructor(
    private authS: AuthServices,
    private route: Router
  ) {
  }

  successed: boolean = false

  ngOnInit(): void {
    this.form = new FormGroup({
      email: new FormControl(null, [Validators.required, Validators.email]),
      password: new FormControl(null, [Validators.required, Validators.minLength(6)])
    })
  }

  submit() {
    if (this.form.valid) {
      this.authS.login({...this.form.value}).subscribe(() => {
        console.log()
        this.route.navigate([''])
      })
    }
    console.log(this.form.value)
  }
}
