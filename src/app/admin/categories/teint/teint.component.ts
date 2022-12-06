import { Component } from '@angular/core';
import { AppComponent } from 'src/app/app.component';
import { CartService } from '../../Services/cart.service';
import { MasterService } from '../../Services/master.service';
import { ProducatservicesService } from '../../Services/producatservices.service';
import { RegistrationService } from '../../Services/registration.service';

@Component({
  selector: 'app-teint',
  templateUrl: './teint.component.html',
  styleUrls: ['./teint.component.css']
})
export class TeintComponent {

  constructor(
    private master: MasterService,
    private api: RegistrationService,
    private Productapi: ProducatservicesService,
    private app: AppComponent,
    private cart: CartService
  ) {}

  Producatdata: any;
  Electronicsdata = new Array();
  SpinnerActive: boolean = true;
  dataloader: boolean = false;
  Spinner: string = 'assets/spinner/loading.gif';
  Cartdata: any;
  User_id: number = 0;
  Userdata: any;

  ngOnInit(): void {
    this.get_alldata();
    this.Spinnnerfunctions();
  }
  Spinnnerfunctions() {
    this.grtProductdata();
    setInterval(() => {
      this.SpinnerActive = false;
      this.dataloader = true;
    }, this.app.time);
  } 

  
  get_alldata() {
    this.api.getUserdata().subscribe({
      next: (data) => {
        this.Userdata = data;
        //UserData Functions
        this.UserDataFunction();
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  grtProductdata() {
    this.Productapi.getProducatdata().subscribe({
      next: (data) => {
        this.Producatdata = data;
        this.UpdateData();
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  UserDataFunction() {
    for (let i = 0; i < this.Userdata.length; i++) {
      if (this.Userdata[i].User_id == localStorage.getItem('token')) {
        this.User_id = this.Userdata[i].id;
        break;
      }
    }
  }

  UpdateData() {
    for (let i = 0; i < this.Producatdata.length; i++) {
      if (this.Producatdata[i].productfield == 'font') {
        this.Electronicsdata.push(this.Producatdata[i]);
      }
    }
  }

  /*addcart(item: number) {
    this.CARTDATA();
    let on: boolean = false;

    for (let i = 0; i < this.Producatdata.length; i++) {
      if (this.Producatdata[i].id == item) {
        if (this.Cartdata.length != 0) {
          for (let j = 0; j < this.Cartdata.length; j++) {
            if (
              this.Cartdata[j].User_id == this.User_id &&
              this.Cartdata[j].Product_id == this.Producatdata[i].id
            ) {
              on = true;
              break;
            }
          }

          if (on === false) {
            let cart_data = {
              Product_id: this.Producatdata[i].id,
              Productname: this.Producatdata[i].productname,
              Productfield: this.Producatdata[i].productfield,
              Productimage: this.Producatdata[i].productimage,
              Productprice: this.Producatdata[i].productprice,
              User_id: this.User_id,
              CountProduct: 1,
            };
            this.cart.postCart(cart_data).subscribe({
              next: (data) => {},
              error: (err) => {
                console.log(err);
              },
            });
          }
        } else if (this.Cartdata.length == 0) {
          let cart_data = {
            Product_id: this.Producatdata[i].id,
            Productname: this.Producatdata[i].productname,
            Productfield: this.Producatdata[i].productfield,
            Productimage: this.Producatdata[i].productimage,
            Productprice: this.Producatdata[i].productprice,
            User_id: this.User_id,
            CountProduct: 1,
          };
          this.cart.postCart(cart_data).subscribe({
            next: (data) => {},
            error: (err) => {
              console.log(err);
            },
          });
        }
        break;
      }
    }
  }
*/
  CARTDATA() {
    this.Cartdata = new Array<any>();

    this.cart.getCart().subscribe({
      next: (data) => {
        this.Cartdata = data;
      },
      error: (err) => {
        console.error(err);
      },
    });
  }

  supprimer(id:number)
{
 /* this.Productapi.deleteProducatdata(prod.id).subscribe(
    (data)=> (this.Producatdata = this.Producatdata.filter((e)=>e.id != prod.id))
  );*/

  this.Productapi.deleteProducatdata(id)
.subscribe(
  (data)=> (this.Producatdata = this.Producatdata.filter((e:any)=>e.id != id))
);

  alert("suppression ok");
}

  
}
