import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ResourceService {

  constructor() { }

  getTeamLogo(team): any {
    return  this.getlogoMap()[team]['logo'];
  }

  getTeamLogoFromName(team): any {
    if (team){
      const teamCode = this.getTeamMap()[team.toLowerCase()];
      if (teamCode) {
        return this.getTeamLogo(teamCode);
      }
    }
  }

  getlogoMap(): any {
    return {
        ARS: { name: 'Arsenal', logo: 'https://resources.premierleague.com/premierleague/badges/50/t3.png'},
        BHA: { name: 'Brighton', logo: 'https://resources.premierleague.com/premierleague/badges/50/t36.png'},
        AVL: { name: 'Aston Villa', logo: 'https://resources.premierleague.com/premierleague/badges/50/t7.png'},
        CHE: { name: 'Chelsea', logo: 'https://resources.premierleague.com/premierleague/badges/50/t8.png'},
        FUL: { name: 'Fulham', logo: 'https://resources.premierleague.com/premierleague/badges/50/t54.png'},
        NEW: { name: 'Newcastle', logo: 'https://resources.premierleague.com/premierleague/badges/50/t4.png'},
        LEE: { name: 'Leeds', logo: 'https://resources.premierleague.com/premierleague/badges/50/t2.png'},
        WBA: { name: 'West Brom', logo: 'https://resources.premierleague.com/premierleague/badges/50/t35.png'},
        LEI: { name: 'Leicester', logo: 'https://resources.premierleague.com/premierleague/badges/50/t13.png'},
        TOT: { name: 'Tottenham', logo: 'https://resources.premierleague.com/premierleague/badges/50/t6.png'},
        LIV: { name: 'Liverpool', logo: 'https://resources.premierleague.com/premierleague/badges/50/t14.png'},
        CRY: { name: 'Crystal Palace', logo: 'https://resources.premierleague.com/premierleague/badges/50/t31.png'},
        MCI: { name: 'Man City', logo: 'https://resources.premierleague.com/premierleague/badges/50/t43.png'},
        EVE: { name: 'Everton', logo: 'https://resources.premierleague.com/premierleague/badges/50/t11.png'},
        SHU: { name: 'Sheffield Utd', logo: 'https://resources.premierleague.com/premierleague/badges/50/t49.png'},
        BUR: { name: 'Burnley', logo: 'https://resources.premierleague.com/premierleague/badges/50/t90.png'},
        WHU: { name: 'West Ham', logo: 'https://resources.premierleague.com/premierleague/badges/50/t21.png'},
        SOU: { name: 'Southampton', logo: 'https://resources.premierleague.com/premierleague/badges/50/t20.png'},
        WOL: { name: 'Wolves', logo: 'https://resources.premierleague.com/premierleague/badges/50/t39.png'},
        MUN: { name: 'Man United', logo: 'https://resources.premierleague.com/premierleague/badges/50/t1.png'}
      };
  }

  getTeamMap(): any {
    return {
      arsenal : 'ARS',
     'aston villa': 'AVL',
      brighton: 'BHA',
      chelsea: 'CHE',
      fulham: 'FUL',
      newcastle: 'NEW',
      leeds: 'LEE',
      'west brom': 'WBA',
      leicester: 'LEI',
      tottenham: 'TOT',
      'crystal palace': 'CRY',
      'man city': 'MCI',
      everton: 'EVE',
      'sheffield utd': 'SHU',
      burnley: 'BUR',
      'west ham': 'WHU',
      southampton: 'SOU',
      wolves: 'WOL',
      'man united': 'MUN',
      liverpool: 'LIV'
    };
  }

}
