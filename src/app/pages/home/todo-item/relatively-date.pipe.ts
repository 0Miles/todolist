import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'relativelyDate'
})
export class RelativelyDatePipe implements PipeTransform {

  transform(value: Date | string): string {
    if(typeof(value)==='string') {
      value = new Date(value);
    }
    const today: Date = new Date();

    const todayWeek: number = today.getDay();
    const todayYear: number = today.getFullYear();
    const todayNumber: number = Math.floor(+today / 86400000);
    
    const targetDate: number = value.getDate();
    const targetMonth: number = value.getMonth();
    const targetYear: number = value.getFullYear();
    const targetNumber: number = Math.floor(+value / 86400000);

    const sundayNumber: number = Math.floor(new Date().setDate(today.getDate() - todayWeek) / 86400000);

    const dateDifference: number = targetNumber - todayNumber;
    const sundayDifference: number = targetNumber - sundayNumber;

  
    if (dateDifference < 3 && dateDifference > -3) {
      switch (dateDifference) {
        case 0: return "今天";
        case 1: return "明天";
        case 2: return "後天";
        case -1: return "昨天";
        case -2: return "前天";
      }
    }
    switch (sundayDifference) {
      case 0: return "星期日";
      case 1: return "星期一";
      case 2: return "星期二";
      case 3: return "星期三";
      case 4: return "星期四";
      case 5: return "星期五";
      case 6: return "星期六";
      case -1: return "上星期六";
      case -2: return "上星期五";
      case -3: return "上星期四";
      case -4: return "上星期三";
      case -5: return "上星期二";
      case -6: return "上星期一";
    }
    if (todayYear === targetYear) {
      return `${targetMonth + 1}月${targetDate}日`;
    } else {
      return `${targetYear}年${targetMonth + 1}月${targetDate}日`;
    }
  }

}
