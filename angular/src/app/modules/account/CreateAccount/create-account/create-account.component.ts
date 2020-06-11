import { Component, OnInit } from '@angular/core';
import { Account } from '../../../../data/account.model';

@Component({
  selector: 'uic-create-account',
  templateUrl: './create-account.component.html',
  styleUrls: ['./create-account.component.scss']
})
export class CreateAccountComponent implements OnInit {
  data: Account = {
    id:'',
    address: {
        id:'',
        city:'',
        country:'',
        postalCode:'',
        stateProvince:'',
        unit: '',
        street:''
    }
    ,
    name: '',
    payments:[{
        id:'',
        cardExpirationDate: new Date("7/9/21"),
        cardName: '',
        cardNumber: ''
    }
    ],
    profiles:[]}
  constructor() { }

  ngOnInit(): void {
    
  }

  stuff(){
    console.log(this.data.name);
  }

}
