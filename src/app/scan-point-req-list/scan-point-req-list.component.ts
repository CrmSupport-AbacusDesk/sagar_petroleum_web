import { Component, OnInit } from '@angular/core';
import { DatabaseService } from '../_services/DatabaseService';
// import { ListAccodingDateFilterComponent } from 'src/list-accoding-date-filter/list-accoding-date-filter.component';
import { MatDialog } from '@angular/material';
import * as moment from 'moment';
import { ListAccodingDateFilterComponent } from '../list-accoding-date-filter copy/list-accoding-date-filter.component';


@Component({
  selector: 'app-scan-point-req-list',
  templateUrl: './scan-point-req-list.component.html',
  styleUrls: ['./scan-point-req-list.component.scss']
})
export class ScanPointReqListComponent implements OnInit {
  loading_list = true;
  filter: any = {};
  filtering: any = false;
  current_page = 1;
  last_page: number;
  years: any;
  length:number =0;
  sr_no:number =0;


  constructor(public db: DatabaseService, public alrt: MatDialog) {
    var currentTime = new Date();
    console.log(currentTime);

    var year = currentTime.getFullYear();
    console.log(year);
    this.years = year;
    console.log(this.years);


  }

  ngOnInit() {
    this.length =0;
    this.getStateWiseReport('',this.length);

  }

  redirect_previous(length) {
    // this.current_page--;
    if(length > 0){
      this.length -= length;
    }
    this.getStateWiseReport('',this.length);
  }

  set_filter(data)
  {
      this.db.set_filters(data);
  }

  redirect_next(length) {

    console.log(length);
    if(length > 0){

    this.length += length;
  }
    
    // if (this.current_page < this.total_page) { this.current_page++; }
    // else { this.current_page = 1; }
    this.getStateWiseReport('',this.length);
  }


  openDatepicker(): void {
    const dialogRef = this.alrt.open(ListAccodingDateFilterComponent, {
      width: '500px',
      data: {
        date_from: this.filter.date_from,
        date_to: this.filter.date_to
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      this.filter.date_from = result.date_from;
      this.filter.date_to = result.date_to;
      this.getStateWiseReport('',this.length);
    });
  }


  current() {
    this.current_page = 1;
    this.getStateWiseReport('',this.length);
  }
  last() {
    this.current_page = this.last_page;
    this.getStateWiseReport('',this.length);
  }

  state_wise_count: any = [];
  state_wise_count2: any = [];
  mohth_wise_coupon_data2: any = [];
  year_wise_coupon_data: any = [];

  data: any = [];


  search_val: any = {}
  public onDate(event): void {
    this.search_val.date_created = moment(event.value).format('YYYY-MM-DD');
  }


  header_list: any = [];
  monthYear: any = [];
  YearMonth: any = [];
  total_page: any;
  getStateWiseReport(action: any,length) {


    console.log(length);

    console.log(this.filter);
    this.loading_list = true;

    if (this.filter.date_from) {
      this.filter.date_from = moment(this.filter.date_from).format('YYYY-MM-DD');
    }
    if (this.filter.date_to) {
      this.filter.date_to = moment(this.filter.date_to).format('YYYY-MM-DD');
    }

    if (this.filter.date_from && this.filter.date_to) {
      this.filter.year = '';
    } else {
      this.filter.year = this.years;

    }
    //   this.filter.date_from = this.filter.date_from  ? this.db.pickerFormat(this.filter.date_from) : '';
    //   this.filter.date_to = this.filter.date_to  ? this.db.pickerFormat(this.filter.date_to) : '';
    if (this.filter.date) this.filtering = true;
    this.filter.mode = 0;
    this.filter.limit = length;


    if (action == 'refresh') {
      this.filter.date_from = '';
      this.filter.date_to = '';
      this.filter.year = this.years;


    }


    this.db.post_rqst({ 'filter': this.filter }, 'master/scanned_point_report')
      .subscribe(d => {
        this.loading_list = false;
        console.log(d);
        this.state_wise_count = d.scanned_coupon_list;
        console.log(this.state_wise_count);
        this.header_list = d.headers;
        console.log(this.header_list);
     
        // for (let i = 0; i < this.state_wise_count.length; i++) {
        //   this.monthYear = this.state_wise_count[i].month_wise_coupon_data;
        //   console.log(this.monthYear)
        // }

        // for (let j = 0; j < this.state_wise_count.length; j++) {
        //   this.YearMonth = this.state_wise_count[j].year_wise_coupon_data;
        //   console.log(this.YearMonth)
        // }

        // for(let j=0; j<this.monthYear.length;j++){
        //     this.YearMonth=this.monthYear[j]
        //     console.log(this.YearMonth)
        //     }

        // this.sr_no = this.sr_no * 100;  

      });

  }


  exportStateWise() {
    this.filter.mode = 1;
    this.db.post_rqst({ 'filter': this.filter, 'login': this.db.datauser }, 'master/export_scanned_point_report')
      .subscribe(d => {
        document.location.href = this.db.myurl + '/app/uploads/exports/' + d.file_name;
        console.log(d);
      });
  }

}
