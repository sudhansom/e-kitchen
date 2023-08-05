import { ChangeDetectionStrategy, Component} from "@angular/core";
import { data } from "src/app/data";
@Component ({
  selector: 'app-root',
  templateUrl: './root.component.html',
  styleUrls: ['./root.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})

export class RootComponent {

  data = data.map(item => {
    let borderColor = '';
    if(item.amount > 75){
      borderColor = 'green';
    }else if(item.amount <= 75 && item.amount > 40){
      borderColor = 'orange';
    }
    else if(item.amount <= 40 && item.amount > 10){
      borderColor = 'purple';
    }else {
      borderColor = 'red';
    }
    return {
      ...item,
      color: borderColor,
    }
  });

}
