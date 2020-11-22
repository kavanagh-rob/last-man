import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { Observable } from 'rxjs';
import {environment} from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(private http: HttpClient) {}

  extractBody(res: any): any {
    const body = res.data;
    return JSON.parse(res.body) || {};
  }

  extractData(res: any): any {
    const body = res.data;
    return res.data || {};
  }
  handleErrorPromise(error: Response | any): void {
    console.error(error.message || error);
  }

  getGameweekData(): any {
    return this.http.get(`${environment.liveUrl}/gameweek`)
      .toPromise()
      .then(this.extractBody)
      .catch(this.handleErrorPromise);
  }

  getEventinfo(): any {
    return this.http.get(`${environment.liveUrl}/eventinfo`)
      .toPromise()
      .then(this.extractData)
      .catch(this.handleErrorPromise);
  }

  getPlayers(): any {
    const playersResquestData: any = {};
    playersResquestData.table_name = 'last-man';
    return this.http.post(`${environment.dataUrl}/tableinfo`, playersResquestData)
      .toPromise()
      .then(this.extractData)
      .catch(this.handleErrorPromise);
  }

}
