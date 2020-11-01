import { Component, OnInit } from '@angular/core';
import {DataService} from '../../shared/services/data.service';

@Component({
  selector: 'app-leaderboard',
  templateUrl: './leaderboard.component.html',
  styleUrls: ['./leaderboard.component.css']
})
export class LeaderboardComponent implements OnInit {

  constructor(private dataService: DataService) { }
  eventinfo = {weeks: [], startWeek: null, results: []};
  playerList = [{name: '', week1Pick: '', week2Pick: '', week3Pick: ''}];

  ngOnInit(): void {
    this.dataService.getPlayers().then(resp => {
      this.playerList = resp.Items;
      console.log(this.playerList);
     });
    this.dataService.getEventinfo().then(resp => {
      this.eventinfo = resp;
    });
  }

  getPickForWeek(pick, index): any{
    if (index + Number.parseInt(this.eventinfo.startWeek, 0) === Number.parseInt(pick.gameweek, 0)) {
      return pick.team;
    }
  }

  getPlayerPick(playerInfo, weekIndex): any {
    if (playerInfo.picks){
      const selection = playerInfo.picks.filter(pick => Number.parseInt(pick.gameweek, 0) === weekIndex);
      if (selection.length === 1) {
        return selection[0].team;
      }
    }
  }

  getResultClass(playerInfo, weekIndex): any {
    const team = this.getPlayerPick(playerInfo, weekIndex);
    if (this.eventinfo.results[weekIndex]){
      return this.getTeamResult(team, weekIndex) ? 'winningPick' : 'losingPick';
    }
  }

  getTeamResult(team, weekIndex): any {
    if (team){
      return (this.eventinfo.results[weekIndex].filter(result => result.toLowerCase() === team.toLowerCase()).length === 1);
    }
  }

  sortPlayerByWeek(prop: string): any{
    if (! this.playerList){
      return;
    }
    const raceNumberProp = 'raceNumber';
    const horseNumberProp = 'horseNumber';
    const sortByHorse = this.playerList.sort((a, b) =>
      a[horseNumberProp] > b[horseNumberProp] ? 1 : a[horseNumberProp] === b[horseNumberProp] ? 0 : -1);

    return  sortByHorse.sort((a, b) =>
      b[raceNumberProp] - a[raceNumberProp]);
  }

}
