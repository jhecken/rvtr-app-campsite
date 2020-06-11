import { Component, OnInit } from '@angular/core';
import { Account } from '../../../data/account.model';
import { AccountService } from 'src/app/services/account/account.service';
import { Payment } from 'src/app/data/payment.model';
import { Profile } from 'src/app/data/profile.model';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'uic-edit-account',
  templateUrl: './edit-account.component.html',
  styleUrls: ['./edit-account.component.scss']
})
export class EditAccountComponent implements OnInit {
  data:Account;

  isNullOrWhitespace(input:string) {
    if (typeof input === 'undefined' || input == null) return true;
    return input.replace(/\s/g, '').length < 1;
}
  //adds a new credit card info to the displayed list
  addCard(cardName:string,cardNumberr:number,cardExpi:Date){
    //validation to check entered card name is not empty, 15 digit number, and future expiration date
    let today = new Date();
    if( cardNumberr.toString().length!=15 || this.isNullOrWhitespace(cardName) || 
    today>cardExpi ||this.data.payments.some(x=>x.cardNumber==cardNumberr.toString())){
      return console.log('Error, please try again');
    }else{
    let newCard:Payment = {
      id:null,
      cardExpirationDate:cardExpi,
      cardName:cardName,
      cardNumber:cardNumberr.toString()
    }
    this.data.payments.push(newCard);
    console.log('Successfully added to the list')
  }
  }

  removeCard(card){
    this.data.payments
    .splice(this.data.payments.indexOf(card),1);
  }

  addProfile(firstName:string,lastName:string,age:"Adult"|"Child",email:string,phone:number){
    //validation for adding new profile
    if(this.data.profiles.some(x=>x.name.given==firstName&&x.name.family==lastName) || 
    this.isNullOrWhitespace(firstName) || this.isNullOrWhitespace(lastName) || 
    this.isNullOrWhitespace(email) || phone.toString().length!=10){
      return console.log('Error, please try again');      
    }
    let newProfile:Profile = {
      id:null,
      email:email,
      phone:phone.toString(),
      age:age,
      name:{
        id:null,
        family:lastName,
        given:firstName
      }
    }
    this.data.profiles.push(newProfile);
  }


  removeProfile(profile){
    this.data.profiles
    .splice(this.data.payments.indexOf(profile),1);
  }

  obscure(){
    for(let i = 0; i < this.data.payments.length; i++){
      this.data.payments[i].cardNumber = "***********"+ this.data.payments[i].cardNumber.substring(11,16);
    }
  }
  
  //directed from the view account page with unique id
  get(){
    const x = +this.route.snapshot.paramMap.get('id');
    this.AccServ.get(x.toString()).subscribe(data => this.data = data[0]);
  }

  onSubmit(){
    this.AccServ.put(this.data).subscribe(
      success=>console.log('success: ', this.data),
      error=>console.log('error'));
      confirm("Account updated!");
      this.router.navigateByUrl('account/1');
      console.log(this.data);

  }

  constructor(private AccServ: AccountService,
              private route: ActivatedRoute,
              private router:Router
    ) { }

  ngOnInit(): void {
    this.get();
  }
}
