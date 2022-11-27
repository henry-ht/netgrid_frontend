import { NotificationService } from './../../core/services/notification.service';
import { UserService } from './../../core/services/user.service';
import { RequestService } from './../../core/services/request.service';
import { Validators, FormGroup, FormBuilder } from '@angular/forms';
import { Component } from '@angular/core';
import { faEdit, faPaperPlane, faSyncAlt, faTrash } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent {

  faEdit        = faEdit;
  faPaperPlane  = faPaperPlane;
  faTrash       = faTrash;
  faSyncAlt     = faSyncAlt;

  loadPage:boolean = false;
  ProfileForm:FormGroup;
  userUpdate:any = {};

  constructor(private http:RequestService , private fb: FormBuilder, private userData:UserService, private noti:NotificationService) {
    this.ProfileForm = this.fb.group({
      email: ['', [
        // Validators.required,
        Validators.email
      ]],
      name: ['', [
        // Validators.required,
        Validators.minLength(3),
        Validators.maxLength(120),
      ]],
      city: ['', [
        // Validators.required,
        Validators.minLength(3),
        Validators.maxLength(150),
      ]],
      address: ['', [
        // Validators.required,
        Validators.minLength(3),
        Validators.maxLength(150),
      ]],
      birthdate: ['', [
        // Validators.required,
      ]],
    });
  }

  ngOnInit(): void {
    this.getUser();
  }

  getUser(){
    this.loadPage = true;
    this.http.get('profile')
    .subscribe({
      next: (data:any)=> {
        if(data.status == true){
          this.userUpdate = data.data;
          this.ProfileForm.patchValue(this.userUpdate);
        }
        this.loadPage = false;
      },
      error: () => { this.loadPage = false; },
    });
  }

  isValid() {
    return this.ProfileForm.controls;
  }

  clearForm(){
    this.ProfileForm.reset();
  }

  onSubmit(){
    this.loadPage = true;
    let send      = this.ProfileForm.value;
    for (let prop in send) {
      if (!send[prop] && prop) {
        delete send[prop];
      }
    }
    this.http.put('profile/'+this.userUpdate.id, send)
    .subscribe({
      next: (data:any)=> {
        if(data.status == true){
          this.noti.success(data.message);
          this.getUser();
        }
      },
      error: () => { this.loadPage = false; },
    });
  }

}
