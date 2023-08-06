import { ChangeDetectionStrategy, Component, signal, OnInit} from "@angular/core";
import { Data } from "@angular/router";
import { data } from "src/app/data";
import { DataService } from "src/app/services/data.service";

interface IData {
  name: string,
  amount: number,
  image: string,
  showProgress?: boolean,
  color?: string,
  id?: string,
}
@Component ({
  selector: 'app-root',
  templateUrl: './root.component.html',
  styleUrls: ['./root.component.scss'],
  //changeDetection: ChangeDetectionStrategy.OnPush,
})

export class RootComponent implements OnInit {

  showAmount = signal(false);
  mySlider = 0;

  data: IData[] = [];

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

  changeAmount(item: IData, amount: number){
    this.dataService.updateData({...item, amount: amount}).subscribe(data => {
      this.fetchData();
    })
  }

  fetchData(){
    this.dataService.getFormData().subscribe(data => {
      let rawData = [];
      for(let key in data){
        rawData.push({...data[key], id:key});
      }
      this.data = rawData.map(item => {
        let borderColor = '';
        if(item.amount > 75){
          borderColor = 'green';
        }else if(item.amount <= 75 && item.amount > 40){
          borderColor = 'orange';
        }
        else if(item.amount <= 40 && item.amount > 10){
          borderColor = 'purple';
        }else {
          borderColor = '	#EE4B2B';
        }
        return {
          ...item,
          color: borderColor,
          showProgress: false,
        }
      }).sort((a,b) => a.amount - b.amount);
    })
  }

  constructor(private dataService: DataService){}

  ngOnInit(): void {
    this.fetchData();
  }
}
