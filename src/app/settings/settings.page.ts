import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.page.html',
  styleUrls: ['./settings.page.scss'],
})
export class SettingsPage implements OnInit {

  private form : FormGroup;

  constructor(private formBuilder: FormBuilder ) {
    
   }

  ngOnInit() {
    //this.buildForm();
  }

  buildForm(){
    this.form = this.formBuilder.group({
      serverUrl: [''],
      pat: [''],
      client_id: [''],
      client_secret: [''],
      oauth_token: [''],
      authType: ['oauth']
    });
  }

}
