import { Component, OnInit, ChangeDetectorRef, OnDestroy  } from '@angular/core';
import {MatToolbarModule} from '@angular/material/toolbar';
import { Router } from '@angular/router';
import { onAuthUIStateChange, CognitoUserInterface, AuthState } from '@aws-amplify/ui-components';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, OnDestroy{
  title = 'last-man';
  user: CognitoUserInterface | undefined;
  authState: AuthState;

  navLinks: any[];
  activeLinkIndex = -1;
  constructor(private router: Router, private ref: ChangeDetectorRef) {
    this.navLinks = [
        {
            label: 'info',
            link: './info',
            index: 0
        }, {
            label: 'players',
            link: './players',
            index: 1
        }, {
            label: 'stats',
            link: './stats',
            index: 2
        }, {
          label: 'gameweek',
          link: './gameweek',
          index: 3
        },{
          label: 'login',
          link: './login',
          index: 4
      }
    ];
}

ngOnInit(): void {
  onAuthUIStateChange((authState, authData) => {
    this.authState = authState;
    this.user = authData as CognitoUserInterface;
    this.ref.detectChanges();
  })

  this.router.events.subscribe((res) => {
      this.activeLinkIndex = this.navLinks.indexOf(this.navLinks.find(tab => tab.link === '.' + this.router.url));
  });
}

ngOnDestroy() {
  return onAuthUIStateChange;
}

}
