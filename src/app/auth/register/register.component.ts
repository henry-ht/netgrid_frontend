import { NotificationService } from './../../core/services/notification.service';
import { RequestService } from './../../core/services/request.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Component } from '@angular/core';
import { faUserPlus, faPaperPlane } from '@fortawesome/free-solid-svg-icons';
import { MustMatch } from 'src/app/core/helpers/must-match.validator';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {
  iconRegister = faUserPlus;
  loadPage:boolean = false;
  iconSent  = faPaperPlane;


  RegisterForm:FormGroup;
  closeResult = '';

  constructor( private fb: FormBuilder, private request:RequestService, private noti:NotificationService) {
    this.RegisterForm = this.fb.group({
      email: ['', [
        Validators.required,
        Validators.email
      ]],
      password: ['', [
        Validators.required,
        Validators.minLength(6),
        Validators.maxLength(12),
      ]],
      name: ['', [
        Validators.required,
        Validators.minLength(6),
        Validators.maxLength(120),
      ]],
      accept_policies: [false, [
        Validators.required,
        Validators.pattern('true')
      ]],
      city: ['', [
        Validators.required,
        Validators.minLength(6),
        Validators.maxLength(12),
      ]],
      password_confirmation: ['', [
        Validators.required,
        Validators.minLength(6),
        Validators.maxLength(12),
      ]],
    }, {
      validator: MustMatch('password', 'password_confirmation')
    });

  }

  ngOnInit(): void {
  }

  isValid() {
    return this.RegisterForm.controls;
  }

  onSubmit(){
    this.loadPage = true;
    this.request.save('register', this.RegisterForm.value)
    .subscribe({
      next: (data:any)=> {
        if (data.status == true) {
          this.resetForm(this.RegisterForm);
          this.noti.success(data.message);
        }
      },
      error: () => { this.loadPage = false},
      complete: () => {this.loadPage = false}
    });

  }

  resetForm(formData: any): void {
    formData.reset();
  }
}
