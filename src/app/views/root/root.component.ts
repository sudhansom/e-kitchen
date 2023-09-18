import { ChangeDetectionStrategy, Component, signal, OnInit} from "@angular/core";
import { Data } from "@angular/router";
import { data } from "src/app/data";
import { DataService } from "src/app/services/data.service";

interface IData {
  name: string,
  quantity: number,
  image: string,
  showProgress?: boolean,
  color?: string,
  id?: string,
  date: bigint,
  category?: string,
}
@Component ({
  selector: 'app-root',
  templateUrl: './root.component.html',
  styleUrls: ['./root.component.scss'],
  //changeDetection: ChangeDetectionStrategy.OnPush,
})

export class RootComponent implements OnInit {
  showAmount = signal(false);
  updated = signal(false);

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

  changeAmount(item: IData, quantity: number){
    console.log(item);
    this.updated.set(true);
    setTimeout(()=>{
      this.updated.set(false);
    }, 1500)
    this.dataService.updateData({...item, quantity: quantity, date: Date.now()}).subscribe(data => {
      console.log(data);
      this.fetchData();
    })
  }

  fetchData(){
    this.dataService.getFormData().subscribe(data => {
      let rawData = [...data];
      // for(let key in data){
      //   rawData.push({...data[key], id:key});
      // }
      this.data = rawData.map(item => {
        let date = Date.now();
        let day  = Math.floor(Math.abs(date - item.date)/(1000 * 60 * 60 * 24));
        if(item.category === 'one'){
          return {
            ...item,
            quantity:item.quantity - day * 10,
          }
        }else if(item.category == 'two'){
          return {
            ...item,
            quantity:item.quantity - day *  5,
          }
        }else {
          return {
            ...item,
            quantity:item.quantity - day * 3,
          }
        }
      }).map(item => {
        let borderColor = '';
        if(Number(item.quantity) > 75){
          borderColor = 'var(--full-color)';
        }else if(Number(item.quantity) <= 75 && item.quantity > 40){
          borderColor = 'var(--okay-color)';
        }
        else if(item.quantity <= 40 && item.quantity > 10){
          borderColor = 'var(--less-color)';
        }else {
          borderColor = 'var(--empty-color)';
        }
        return {
          ...item,
          color: borderColor,
          showProgress: false,
        }
      }).sort((a,b) => a.quantity - b.quantity);
    })
    //this.dataService.getFormData().subscribe(data => console.log(data));
  }

  constructor(private dataService: DataService){}

  ngOnInit(): void {
    this.fetchData();
  }
}
