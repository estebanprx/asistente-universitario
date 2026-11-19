import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  public formlogin!: FormGroup;

  email: string = 'desarrollo@gmail.com';
  password: string = '123456';

  isLogin: boolean = true;
 
  constructor(
    private fb: FormBuilder,
    private router: Router,
  ) { }

  //metodo para inicializar el componente
  ngOnInit(): void {
      this.FormInit();
  }

  //Metodo para inicializar el formulario
  FormInit() {
    this.formlogin = this.fb.group({
      email: [''],
      password: ['']
    });
  }

  //metodo para iniciar sesion
  iniciarSesion() {
    const data = this.formlogin.value;
    if(data.email != this.email || data.password != this.password) {
      this.isLogin = false;

      setTimeout(() => {
        this.isLogin = true;
      }, 2000);
    }
    else{
      sessionStorage.setItem('login', 'true');
      setTimeout(() => {
        this.router.navigate(['/pages/dashboard']);
       }, 2000);
    }
  }
}

