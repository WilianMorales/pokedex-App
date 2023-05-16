import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'baseStats'
})
export class BaseStatsPipe implements PipeTransform {

  transform(value: any, args?: any): any{
    if(value && value.length) {
      return value.map((stat: any) => {
        switch (stat.stat.name) {
          case 'hp':
            stat.stat.name = 'HP';
            break;
          case 'attack':
            stat.stat.name = 'Attack';
            break;
          case 'defense':
            stat.stat.name = 'Defence';
            break;
          case 'special-attack':
            stat.stat.name = 'Sp. Attack';
            break;
            case 'special-defense':
            stat.stat.name = 'Sp. Defence';
            break;
          default:
            stat.stat.name = 'Speed';
            break;
        }
        return stat
      })
    }
    return value;
  }

}
