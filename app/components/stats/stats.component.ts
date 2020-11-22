import { Component, OnInit } from '@angular/core';
import {DataService} from '../../shared/services/data.service';
import {ActivatedRoute} from '@angular/router';
import { NgxSpinnerService  } from 'ngx-spinner';
import {ResourceService} from '../../shared/services/resource.service';

@Component({
  selector: 'app-stats',
  templateUrl: './stats.component.html',
  styleUrls: ['./stats.component.css']
})
export class StatsComponent implements OnInit {

  constructor(private spinner: NgxSpinnerService, private route: ActivatedRoute,
              private dataService: DataService, private resourceService: ResourceService) {

  this.eventObservable = this.route.snapshot.data['resolvedEventInfo'];
  }
  eventinfo = {stats: '', currentWeek: '', startWeek: ''};
  eventObservable;
  currentWeekStats = {startCount: '', endCount: ''};
  selectionList;

  ngOnInit(): void {
    // this.spinner.show();
    this.eventObservable.subscribe( resp => {
      // this.spinner.hide();
      this.eventinfo = resp.data;
      const currentWeek = this.eventinfo['currentWeek'];
      this.currentWeekStats =  this.eventinfo.stats[currentWeek];
      this.selectionList = this.currentWeekStats['selections'];
    });
  }

  sortTeamByCount(prop: any): any{
    if (! this.selectionList){
      return;
    }
    return this.selectionList.sort((a, b) =>
      b['count'] > a['count'] ? 1 : a['count'] === b['count'] ? 0 : -1);
  }
  getEliminatedPlayers(): any{
   return parseInt(this.currentWeekStats.startCount, 0) -  parseInt(this.currentWeekStats.endCount, 0);
  }

  getTeamLogo(team): any{
    return this.resourceService.getTeamLogoFromName(team);
  }
}
