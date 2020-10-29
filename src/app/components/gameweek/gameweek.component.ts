import { Component, OnInit } from '@angular/core';
import {DataService} from '../../shared/services/data.service';
import {ResourceService} from '../../shared/services/resource.service';

@Component({
  selector: 'app-gameweek',
  templateUrl: './gameweek.component.html',
  styleUrls: ['./gameweek.component.css']
})
export class GameweekComponent implements OnInit {

  constructor(private dataService: DataService, private resourceService: ResourceService) { }
  currentRound = {matches: [], round: ''};
  teams;
  deadline;
  retryCount = 0;

  ngOnInit(): void {
    this.loadGameweekData();
  }

  loadGameweekData(): void{
    this.dataService.getGameweekData().then(resp => {
      console.log(resp);
      if (resp) {
        this.currentRound = resp['currentRound'];
        this.teams = resp['game']['contestants'];
        try{
          this.deadline = this.getDateTime(resp['currentRound']['submissionDeadline']);
        }catch (e){
          console.log(e);
        }
      }
      else{
        if (this.retryCount < 2){
          console.log('Retry fetch data:' + this.retryCount);
          this.retryCount ++;
          this.loadGameweekData();
        }
      }
     });
  }
  getTeamName(teamRef): string{
    const team = this.teams.filter(item => item.contestantReference === teamRef)[0];
    if (team){
      return team.name;
    }
    return '';
  }

  getTeamLogo(team): any {
    return this.resourceService.getTeamLogo(team);
  }

  getDateTime(timeString): string{
    return new Date(timeString).toLocaleString();
  }

}
