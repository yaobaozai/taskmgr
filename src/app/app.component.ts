import { Component, ReflectiveInjector, Inject, enableProdMode } from '@angular/core';
import { OverlayContainer } from '@angular/material';
import { environment } from '../environments/environment';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  
  squareState: string;
  darkTheme = false;
  
  constructor(private oc: OverlayContainer) {
    const injector = ReflectiveInjector.resolveAndCreate([
      Person,
      { provide: Address, useFactory: () => {
        if(environment.production) {
          return new Address('北京', '北京', '朝阳区', 'xx 街道 xx号');
        } else {
          return new Address('西藏', '拉萨', 'xx 区', 'xx 街道 xx号');
        }
      }
    },
    {
      provide: Id, useFactory:() => {
        return Id.getInstance('idcard');
      }
    }
    ]);
    const childInjector = injector.resolveAndCreateChild([Person])
    const person = injector.get(Person);
    const personFromChild = childInjector.get(Person);
    // console.log(JSON.stringify(person));
    console.log(person === personFromChild);
  }

  switchTheme(dark) {
    this.darkTheme = dark;
    this.oc.themeClass = dark ? 'myapp-dark-theme' : null;

  }
  
}

class Id {
  static getInstance(type: string): Id {
    //设置
    return new Id();
  }
}

class Address {
  province: string;
  city: string;
  district: string;
  street: string;
  constructor(province, city, district, street){
    this.province = province;
    this.city = city;
    this.district = district;
    this.street = street;
  }
}

class Person {
  id: Id;
  address: Address;
  constructor(@Inject(Id) id, @Inject(Address) address) {
    this.id = Id.getInstance('idcard')
    this.address = new Address('北京', '北京', '朝阳区', 'xx街道');
  }
}