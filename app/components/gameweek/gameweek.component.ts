import { Component, OnInit } from '@angular/core';
import {DataService} from '../../shared/services/data.service';

@Component({
  selector: 'app-gameweek',
  templateUrl: './gameweek.component.html',
  styleUrls: ['./gameweek.component.css']
})
export class GameweekComponent implements OnInit {

  constructor(private dataService: DataService) { }
  currentRound = {matches: [], round: ''};
  teams;
  deadline;

  ngOnInit(): void {
    this.dataService.getGameweekData().then(resp => {
      this.currentRound = resp['currentRound'];
      this.teams = resp['game']['contestants'];
      try{
        this.deadline = new Date(resp['currentRound']['submissionDeadline']).toLocaleString();
      }catch (e){
        console.log(e);
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

}
