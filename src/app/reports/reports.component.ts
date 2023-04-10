import { Component, OnInit } from '@angular/core';
import { MatDatepicker, MatDialog } from '@angular/material';
import { ActivatedRoute, Router } from '@angular/router';
import { DialogComponent } from '../dialog/dialog.component';
import { SendNotificationComponent } from '../master/karigar-data/send-notification/send-notification.component';
import { SendmessageComponent } from '../master/karigar-data/sendmessage/sendmessage.component';
import { MastetDateFilterModelComponent } from '../mastet-date-filter-model/mastet-date-filter-model.component';
import { DistributoruploadComponent } from '../upload/distributorupload/distributorupload.component';
import { DatabaseService } from '../_services/DatabaseService';
import { SessionStorage } from '../_services/SessionService';

@Component({
  selector: 'app-reports',
  templateUrl: './reports.component.html',
  styleUrls: ['./reports.component.scss']
})
export class ReportsComponent implements OnInit {

  loading_list = false;
  coupon: any = {};
  available_coupon: any = {};
  savingData = false;
  filter:any = {};
  date1;
  product_code:any =[];
  mode = '1';

  last_page: number ;
  current_page = 1;

  constructor(public db: DatabaseService, private route: ActivatedRoute, private router: Router, public ses: SessionStorage,
    public dialog: DialogComponent ,  public alrt:MatDialog) { 
    
  }

  today:any = '';

  ngOnInit() {
    this.getProduct();
    this.getAvailableCoupanList('');
    this.getZoneList();
    this.today = new Date();

  }


  redirect_previous2() {
    this.current_page--;
    this.saveCouponfrom('');
}
redirect_next2() {
    if (this.current_page < this.last_page) { this.current_page++; }
    else { this.current_page = 1; }
    this.saveCouponfrom('');
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

///pagition start




///pagition end

  numeric_Number(event: any) {
    const pattern = /[0-9\+\-\ ]/;
    let inputChar = String.fromCharCode(event.charCode);
    if (event.keyCode != 8 && !pattern.test(inputChar)) 
    {
      event.preventDefault()
    }
  }

  userType = 0;  

  getType = (value) => {
    this.userType = value;
  } 

reports = [];
total_count = 0;
saveCouponfrom(form: any) {
    console.log('multiple select ===>', this.filter);
    console.log('====================================');
    console.log("test");
    console.log('====================================');

    this.filter.date_from = this.filter.date_from  ? this.db.pickerFormat(this.filter.date_from) : '';
    this.filter.date_to = this.filter.date_to  ? this.db.pickerFormat(this.filter.date_to) : '';

    this.filter.user_type = Number(this.filter.user_type);

      this.loading_list = true;
      this.savingData = true;

      this.db.post_rqst({'filter': this.filter}, 'master/zone_wise_report_list?page=' + this.current_page)
        .subscribe(d => {

          console.log('Result ---->', d);
          this.reports = d.report.data;
          this.current_page = d.report.current_page;
          this.last_page = d.report.last_page;
          this.total_count = d.report.total;
          this.savingData = false;
          this.loading_list = false;
          
          if(this.reports.length <= 0) {
            this.db.dialog.warning('Reports are not available for this Zone');
          }
          // this.filter= {};
          // this.getAvailableCoupanList('');
          // this.router.navigate(['/coupon-code-list']);
        });
  }

  set_filter(data)
  {
      this.db.set_filters(data);
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
        });
  }



  openDatePicker(picker : MatDatepicker<Date>)
  {
      picker.open();
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
      console.log('export function called', this.filter);
      this.db.post_rqst({'filter': this.filter}, 'master/zone_wise_report')
      .subscribe( d => {
          document.location.href = this.db.myurl+'/app/uploads/exports/report.csv';
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
