import { Component, OnInit } from '@angular/core';
import { MatDatepicker, MatDialog } from '@angular/material';
import { ActivatedRoute, Router } from '@angular/router';
import { DialogComponent } from '../dialog/dialog.component';
import { MastetDateFilterModelComponent } from '../mastet-date-filter-model/mastet-date-filter-model.component';
import { DatabaseService } from '../_services/DatabaseService';
import { SessionStorage } from '../_services/SessionService';

@Component({
  selector: 'app-productreport',
  templateUrl: './productreport.component.html',
  styleUrls: ['./productreport.component.scss']
})
export class ProductreportComponent implements OnInit {

  loading_list = false;
  coupon: any = {};
  available_coupon: any = {};
  savingData = false;
  filter:any = {};
  date1;
  product_code:any =[];
  mode = '1';
  notfound = false;

  constructor(public db: DatabaseService, private route: ActivatedRoute, private router: Router, public ses: SessionStorage,
    public dialog: DialogComponent ,  public alrt:MatDialog) { 
    
  }

  today:any = '';

  ngOnInit() {
    this.getProduct();
    this.getAvailableCoupanList('');
    this.getZoneList();
    this.today = new Date();
    // this.getdistributor();

  }

  zone_list = [];
  getZoneList = ()  => {
    this.db.post_rqst({}, 'master/distributor_zone_list').subscribe(r=>{
      console.log('Zone List ----> ', r);
      this.zone_list = r['zone']
    })
  }

  getProduct(){
    this.db.post_rqst( '', 'app_karigar/getProduct?page=').subscribe(r=>{
      console.log(r);
      this.product_code=r['productData'];
      console.log(this.product_code);
    })
  }

  getAvailableCoupanList(f){
     this.filter.date = this.filter.date  ? this.db.pickerFormat(this.filter.date) : '';
    console.log("coupon list is come");
    this.db.post_rqst({'filter': this.filter},'app_master/coupon_history').subscribe(r=>{
      // console.log(r);
      this.available_coupon=r['coupon'];
      console.log(this.available_coupon);
    })
  }




  numeric_Number(event: any) {
    const pattern = /[0-9\+\-\ ]/;
    let inputChar = String.fromCharCode(event.charCode);
    if (event.keyCode != 8 && !pattern.test(inputChar)) {
      event.preventDefault();
    }
  }

  userType = 0;  

  getType = (value) => {
    this.userType = value;
  } 

reports = [];
dealer_product = [];
dsr_product = [];
mechanic_product = [];
saveCouponfrom(form: any) {
    console.log(this.coupon);
    console.log('====================================');
    console.log("test");
    console.log('====================================');

    this.filter.date_from = this.filter.date_from  ? this.db.pickerFormat(this.filter.date_from) : '';
    this.filter.date_to = this.filter.date_to  ? this.db.pickerFormat(this.filter.date_to) : '';

    this.filter.user_type = Number(this.filter.user_type);

      this.loading_list = true;
      this.savingData = true;

      this.db.post_rqst({ 'filter': this.filter}, 'master/top_ten_product_performance')
        .subscribe(d => {
          console.log('Result ---->', d);
          // this.reports = d['product_preformance_machanic'];
          // console.log('reports ---->', this.reports);
          
          this.dealer_product = d.product_preformance_dealer;
          console.log('dealer products ----->', this.dealer_product);
          
          this.dsr_product = d.product_preformance_DSR;
          this.mechanic_product = d.product_preformance_machanic;
         
          this.savingData = false;
          this.loading_list = false;
          if(this.dealer_product.length <= 0) {
            this.db.dialog.warning('Product reports are not available for this zone');
          }
          // this.getAvailableCoupanList('');
          // this.router.navigate(['/coupon-code-list']);
        });
  }


  refreshReport = () => {
    console.log(this.coupon);
    console.log('====================================');
    console.log("test");
    console.log('====================================');

    this.coupon.date_from = this.coupon.date_from  ? this.db.pickerFormat(this.coupon.date_from) : '';
    this.coupon.date_to = this.coupon.date_to  ? this.db.pickerFormat(this.coupon.date_to) : '';

    let user_type = Number(this.coupon.user_type);

      this.loading_list = true;
      this.savingData = true;

      this.db.post_rqst({}, 'master/zone_wise_report_list')
        .subscribe(d => {

          console.log('Result ---->', d);
          this.reports = d['report'];

          this.savingData = false;
          this.loading_list = false;
          // this.getAvailableCoupanList('');
          // this.router.navigate(['/coupon-code-list']);
        });
  }



  openDatePicker(picker : MatDatepicker<Date>)
  {
      picker.open();
      // console.log('Date From', this.coupon.date_from);
  }




openDatepicker(): void {
  const dialogRef = this.alrt.open(MastetDateFilterModelComponent, {
      width: '500px',
      data: {
          from:this.filter.date_from,
          to:this.filter.date_to
      }
  });
  
  dialogRef.afterClosed()
  .subscribe(result => {
      this.filter.date_from = result.from;
      this.filter.date_to = result.to;
      this.getAvailableCoupanList('');
  });
}
downloadCoupon(id){
  this.db.post_rqst({'id':id}, 'app_master/exportCoupon')
  .subscribe( d => {
      document.location.href = this.db.myurl+'/app/uploads/exports/coupons.csv';
      console.log("downloaded Excel sucessfully");
  });
}

deleteCoupon(id) {
  this.dialog.delete('Coupon').then((result) => {
  if(result) {
      this.db.post_rqst({'id': id}, 'app_master/delete_multi_coupon').subscribe(d => {
      console.log(d);
      this.getAvailableCoupanList('');
      this.dialog.successfully();
      });
      }
  });
}

    exportDealer = () => {
      this.filter.date_from = this.filter.date_from  ? this.db.pickerFormat(this.filter.date_from) : '';
      this.filter.date_to = this.filter.date_to  ? this.db.pickerFormat(this.filter.date_to) : '';
      
      console.log('Product report excel download -->',this.filter);
      this.db.post_rqst({'filter':this.filter}, 'master/export_top_ten_product_performance')
      .subscribe( d => {
          document.location.href = this.db.myurl+'/app/uploads/exports/product_report.csv';
          console.log(d);
      });
    } 


    showZone = true;
    showProduct = true;
    toggleTab = (val) => {
      console.log('toggle Tab', val);
      if(val == 'zone') {
        this.showZone = true;
        this.showProduct = false;
      }
      else {
        this.showProduct = true;
        this.showZone = false;
      }
    }

  distributorData = []; 
  getdistributor(){
    this.loading_list = true;
    let zone = this.filter.zone;
    this.db.post_rqst({'zone':zone}, 'app_master/getDistributors')
    .subscribe(d => {  
        this.loading_list = false;  
        console.log(d);
        this.distributorData = d['distributors'];
        console.log(this.distributorData);
    });
 } 


}
