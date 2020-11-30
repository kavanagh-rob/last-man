import { Component, OnInit } from '@angular/core';
import {DataService} from '../../shared/services/data.service';

@Component({
  selector: 'app-prizes',
  templateUrl: './prizes.component.html',
  styleUrls: ['./prizes.component.css']
})
export class PrizesComponent implements OnInit {
  constructor(private dataService: DataService) { }
  eventinfo = {weeks: [], startWeek: null, results: [], prizeList: null};
  prizeList = [{place: '', reward: ''}];

  ngOnInit(): void {
    this.dataService.getEventinfo().then(resp => {
      this.eventinfo = resp;
      if (this.eventinfo.prizeList){
        this.prizeList = this.eventinfo.prizeList;
      }
    });
  }

}
