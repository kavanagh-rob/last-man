import { Component, OnInit } from '@angular/core';
import {DataService} from '../../shared/services/data.service';
import {ResourceService} from '../../shared/services/resource.service';
import { NgxSpinnerService  } from 'ngx-spinner';

@Component({
  selector: 'app-leaderboard',
  templateUrl: './leaderboard.component.html',
  styleUrls: ['./leaderboard.component.css']
})
export class LeaderboardComponent implements OnInit {

  constructor(private spinner: NgxSpinnerService, private dataService: DataService, private resourceService: ResourceService) { }
  eventinfo = {weeks: [], startWeek: null, results: []};
  playerList = [{name: '', 'exit-week': ''}];
  term: string;
  remainingPlayers = [];

  ngOnInit(): void {
    this.spinner.show();
    this.dataService.getPlayers().then(resp => {
      this.spinner.hide();
      this.playerList = resp.Items;
      this.getRemainingPlayers();
     });
    this.dataService.getEventinfo().then(resp => {
      this.eventinfo = resp;
    });
  }

  getPlayerPick(playerInfo, weekIndex): any {
    const weekPick = playerInfo['week' + weekIndex];
    return weekPick ? weekPick : null;
  }

  getResultClass(playerInfo, weekIndex): any {
    const team = this.getPlayerPick(playerInfo, weekIndex);
    if (this.eventinfo.results[weekIndex] && playerInfo['week' + weekIndex]){
      return this.getTeamResult(team, weekIndex) ? 'winningPick' : 'losingPick';
    }
  }

  getTeamResult(team, weekIndex): any {
    if (team){
      return (this.eventinfo.results[weekIndex].filter(result => result.toLowerCase() === team.toLowerCase()).length === 1);
    }
  }

  getTeamLogo(playerInfo, weekIndex): any{
    return this.resourceService.getTeamLogoFromName(this.getPlayerPick(playerInfo, weekIndex));
  }

  getRemainingPlayers(): any{
    this.remainingPlayers = this.playerList.filter(
      player => !player['exit-week'] || player['exit-week'] === '-');
  }

  sortPlayerByName(prop: any): any{
    if (! this.playerList){
      return;
    }
    const sortByName = this.playerList.sort((a, b) =>
      a['name'] > b['name'] ? 1 : a['name'] === b['name'] ? 0 : -1);

    return sortByName.sort((a, b) =>
    this.getExitWeek(a['exit-week']) >  this.getExitWeek(b['exit-week']) ? 1 :  this.getExitWeek(a['exit-week']) ===  this.getExitWeek(b['exit-week']) ? 0 : -1);
  }

  getExitWeek(exitWeek): number{
   if (!exitWeek || exitWeek === '-'){
    return 100;
   }else{
     return parseInt(exitWeek, 0);
   }
  }

}
