import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { Observable } from 'rxjs';
import {environment} from '../../../environments/environment';
import { map, publishReplay, refCount } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(private http: HttpClient) {}

  gameweekData: Observable<object>;

  extractBody(res: any): any {
    const body = res.data;
    return JSON.parse(res.body) || {};
  }

  extractData(res: any): any {
    const body = res.data;
    return res.data || {};
  }

  extractLambdaData(res: any): any {
    return res || {};
  }

  handleErrorPromise(error: Response | any): void {
    console.error(error.message || error);
  }

  async getGameweekDataAsync(): Promise<any> {
    // Cache it once if configs value is false
    let gameweekObserv;
    gameweekObserv = this.http.get(`${environment.liveUrl}/gameweek`).pipe(
      map(data => {
        if (data && data['body']) {
          return JSON.parse(data['body']);
        } else {
          console.log('error found');
          return null;
        }
      }),
      publishReplay(1), // this tells Rx to cache the latest emitted
      refCount()
    );
    return gameweekObserv;
  }

  getGameweekData(): Observable<object> {
    // Cache it once if configs value is false
    return this.http.get(`${environment.liveUrl}/gameweek`).pipe(
      map(data => {
        if (data && data['body']) {
          return JSON.parse(data['body']);
        } else {
          console.log('error found');
          return null;
        }
      }),
      );
  }

  getLiveScoresData(): any {
    return this.http.get(`${environment.liveUrl}/livescores`)
      .toPromise()
      .then(this.extractLambdaData)
      .catch(this.handleErrorPromise);
  }


 async getEventInfoAsync(): Promise<any> {
    return this.http.get(`${environment.liveUrl}/eventinfo`);
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

  postUserForm(userInfo): any {
    return this.http.post(`${environment.liveUrl}/userinfo`, userInfo)
    .toPromise()
    .then(this.extractData)
    .catch(this.handleErrorPromise);
  }

}
