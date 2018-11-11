import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators } from '@angular/forms'
@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  public signupForm: FormGroup;

  constructor(private fb: FormBuilder) {
      this.createForm();
   }

  ngOnInit() {
  }

  private createForm():void{
    this.signupForm = this.fb.group({
      name: ['',[Validators.required]],
      zoteroAccount: ['',[Validators.required]],
      email: ['',[Validators.email]],
      password: ['',[Validators.required,Validators.minLength(4)]],
    })
  }

  private submit():void{
    //TODO call the auth service
    const {name,zoteroAccount,email,password} = this.signupForm.value;
    console.log(console.log('Email:'  + email + ', Password:' +password, 'zotkey:'  + zoteroAccount + ', name:' + name))
  }

}
