import { ChangeDetectionStrategy, Component, signal} from "@angular/core";
import { data } from "src/app/data";

interface IData {
  name: string,
  amount: number,
  image: string,
  showProgress?: boolean,
  color?: string,
}
@Component ({
  selector: 'app-root',
  templateUrl: './root.component.html',
  styleUrls: ['./root.component.scss'],
  //changeDetection: ChangeDetectionStrategy.OnPush,
})

export class RootComponent {

  showAmount = signal(false);
  mySlider = 0;

  data: IData[] = data.map(item => {
    let borderColor = '';
    if(item.amount > 75){
      borderColor = 'green';
    }else if(item.amount <= 75 && item.amount > 40){
      borderColor = 'orange';
    }
    else if(item.amount <= 40 && item.amount > 10){
      borderColor = 'purple';
    }else {
      borderColor = '#880808';
    }
    return {
      ...item,
      color: borderColor,
      showProgress: false,
    }
  }).sort((a,b) => a.amount - b.amount);

  showProgressBar(name: string){
    this.data = this.data.map(item => {
      if(item.name == name){
        return {
          ...item,
          showProgress: !item.showProgress
        }
      }else {
        return {
          ...item,
          showProgress: false,
        }
      }

    })
  }

  changeAmount(name: string, amount: number){
    this.data = this.data.map(item => {
      if(item.name === name){
        return {
          ...item,
          amount,
        }
      }
      else {
        return {
          ...item
        }
      }
    })
  }

}
