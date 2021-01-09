import { Component, OnInit, ChangeDetectorRef, OnDestroy  } from '@angular/core';
import { onAuthUIStateChange, CognitoUserInterface, AuthState, FormFieldTypes  } from '@aws-amplify/ui-components';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit, OnDestroy{

  constructor(private ref: ChangeDetectorRef) {
    this.formFields = [
      {
        type: "email",
        label: "Custom email Label",
        placeholder: "custom email placeholder",
        required: true,
      },
      {
        type: "password",
        label: "Custom Password Label",
        placeholder: "custom password placeholder",
        required: true,
      },
      {
        type: "phone_number",
        label: "Custom Phone Label",
        placeholder: "custom Phone placeholder",
        required: false,
      },
    ];
   }
  user: CognitoUserInterface | undefined;
  authState: AuthState;
  formFields: FormFieldTypes;


  ngOnInit(): void {
    onAuthUIStateChange((authState, authData) => {
      this.authState = authState;
      this.user = authData as CognitoUserInterface;
      this.ref.detectChanges();
    })
  
  }
  
  ngOnDestroy() {
    return onAuthUIStateChange;
  }

}
