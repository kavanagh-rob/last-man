import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { MatTabsModule } from '@angular/material/tabs';
import { MatCardModule } from '@angular/material/card';
import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { GameweekComponent } from './components/gameweek/gameweek.component';
import { LeaderboardComponent } from './components/leaderboard/leaderboard.component';
import { ContactComponent } from './components/contact/contact.component';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { FormsModule } from '@angular/forms';
import { InfoComponent } from './components/info/info.component';
import {MatToolbarModule} from '@angular/material/toolbar';
import { DataResolver } from './shared/resolvers/data-resolver';
import { EventResolver } from './shared/resolvers/event-resolver';
import { NgxSpinnerModule } from 'ngx-spinner';
import { StatsComponent } from './components/stats/stats.component';
import { LivescoresComponent } from './components/livescores/livescores.component';


const appRoutes: Routes = [
  {
    path: '',
    resolve: {
      resolvedGameweek: DataResolver,
      resolvedEventInfo: EventResolver
    },
    children: [
      { path: '',
        redirectTo: '/players',
        pathMatch: 'full'
      },
      {
        path: 'info',
        component: InfoComponent
      },
      {
        path: 'players',
        component: LeaderboardComponent
      },
      {
        path: 'gameweek',
        component: GameweekComponent
      },
      {
        path: 'stats',
        component: StatsComponent
      },
      {
        path: 'contact',
        component: ContactComponent
      },
    ]
  },
  { path: '',
    redirectTo: '/players',
    pathMatch: 'full'
  },
  { path: 'pageNotFound', component: PageNotFoundComponent },
  { path: '**', redirectTo: 'players'},

];

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    PageNotFoundComponent,
    GameweekComponent,
    LeaderboardComponent,
    ContactComponent,
    InfoComponent,
    StatsComponent,
    LivescoresComponent
  ],
  imports: [
    RouterModule.forRoot(
      appRoutes,
      { enableTracing: false }
       // <-- debugging purposes only
    ),
    RouterModule.forChild( appRoutes),
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    MatTabsModule,
    MatToolbarModule,
    MatCardModule,
    Ng2SearchPipeModule,
    FormsModule,
    NgxSpinnerModule
  ],
  providers: [DataResolver, EventResolver],
  bootstrap: [AppComponent]
})
export class AppModule { }
