import { Component, OnInit } from '@angular/core';
import {DataService} from '../../shared/services/data.service';
import {ResourceService} from '../../shared/services/resource.service';

@Component({
  selector: 'app-leaderboard',
  templateUrl: './leaderboard.component.html',
  styleUrls: ['./leaderboard.component.css']
})
export class LeaderboardComponent implements OnInit {

  constructor(private dataService: DataService, private resourceService: ResourceService) { }
  eventinfo = {weeks: [], startWeek: null, results: []};
  playerList = [{name: ''}];
  term: string;

  ngOnInit(): void {
    this.dataService.getPlayers().then(resp => {
      this.playerList = resp.Items;
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

}
