
import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  AbstractControl,
  ValidationErrors,
  ValidatorFn
} from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})

export class RegisterComponent implements OnInit {

  public formRegister!: FormGroup;

  constructor(
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.formInit();
  }

  // Validar que las contraseñas coincidan
  passwordMatchValidator: ValidatorFn = (
    control: AbstractControl
  ): ValidationErrors | null => {

    const password = control.get('password')?.value;
    const confirmPassword = control.get('confirmPassword')?.value;

    if (!password || !confirmPassword) {
      return null;
    }

    return password === confirmPassword
      ? null
      : { passwordMismatch: true };

  };

  // Inicializar formulario
  formInit(): void {

    this.formRegister = this.fb.group({

      nombre: ['', [
        Validators.required,
        Validators.minLength(3)
      ]],

      email: ['', [
        Validators.required,
        Validators.email
      ]],

      password: ['', [
        Validators.required,
        Validators.minLength(8)
      ]],

      confirmPassword: ['', [
        Validators.required
      ]]

    }, {
      validators: this.passwordMatchValidator
    });

  }

  // Registrar usuario
  registrarUsuario(): void {

    if (this.formRegister.invalid) {

      this.formRegister.markAllAsTouched();

      return;

    }

    const data = this.formRegister.value;

    console.log('Datos del registro:', {
      nombre: data.nombre,
      email: data.email,
      password: data.password
    });

    alert(
      '¡Registro exitoso! Bienvenido al Racing Team, ' +
      data.nombre
    );

    this.formRegister.reset();

  }

}

