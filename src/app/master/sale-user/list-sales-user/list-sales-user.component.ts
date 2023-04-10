import { Component, OnInit } from '@angular/core';
import { MatDatepicker, MatDialog } from '@angular/material';
import { ActivatedRoute, Router } from '@angular/router';
import { DialogComponent } from 'src/app/dialog/dialog.component';
import { DsruploadComponent } from 'src/app/upload/dsrupload/dsrupload.component';
import { DatabaseService } from 'src/app/_services/DatabaseService';

@Component({
  selector: 'app-list-sales-user',
  templateUrl: './list-sales-user.component.html'
})
export class ListSalesUserComponent implements OnInit {
  
  userForm:any ={};
  loading_list = false;
  savingData = false;
  states: any = [];
  districts: any = [];
  sale_user_id:any;
  filter:any = {};
  filtering : any = false;
  last_page: number ;
  current_page = 1;
  userData:any =[];
  sr_no:any=0;
  per_page:any
  
  constructor(public db: DatabaseService, private router: Router, public dialog: DialogComponent,public route:ActivatedRoute,public alrt:MatDialog) {
    
    this.getStateList();
    this.userList('');
  }
  
  ngOnInit() {
    // this.getdistributor();
    this.getZoneList();
  }
  
  
  
  openDatePicker(picker : MatDatepicker<Date>)
  {
      picker.open();
  }
  
  getStateList(){
    this.loading_list = true;
    this.db.get_rqst('', 'app_master/getStates')
    .subscribe(d => {  
      this.loading_list = false;  
      this.states = d.states;
    });
  }
  getDistrictList(val){
    console.log(val);
    
    this.loading_list = true;
    let st_name;
    if(val == 1)
    {
      st_name = this.userForm.state;
    }
    this.db.post_rqst({'state_name':st_name}, 'app_master/getDistrict')
    .subscribe(d => {  
      this.loading_list = false;
      this.districts = d.districts;  
    });
  }
  
  
  
  
  userAdd()
  {
    this.userForm={};
  }
  numeric_Number(event: any) {
    const pattern = /[0-9\+\-\ ]/;
    let inputChar = String.fromCharCode(event.charCode);
    if (event.keyCode != 8 && !pattern.test(inputChar)) {
      event.preventDefault();
    }
  }
  
  
  
  
  userList(action) 
  {
    this.loading_list = true;
    this.filter.date = this.filter.date  ? this.db.pickerFormat(this.filter.date) : '';
    if( this.filter.date || this.filter.location_id )this.filtering = true;
    this.filter.mode = 0;
    
    if(action=='refresh')
    {
      this.filter={};
    }
    console.log(this.filter);
    
    this.db.post_rqst(  {  'filter': this.filter, 'login':this.db.datauser}, 'karigar/salesList?page=' + this.current_page )
    .subscribe( d => {
      console.log(d);
      this.loading_list = false;
      this.userData = d.sales_users.data;
      console.log(this.userData);
      this.current_page = d.sales_users.current_page;
      this.last_page = d.sales_users.last_page;
      this.per_page = d.sales_users.per_page;
      this.sr_no = this.current_page - 1;
      this.sr_no = this.sr_no * this.per_page;      
    });
  }


  editUser(id,index){
    
    this.userForm = this.userData.filter( x => x.id==id)[0];
    // this.productForm.profile_selected = parseInt(this.productForm.profile);
    console.log(this.userForm);
    this.userForm.karigar_edit_id=this.userForm.id;

    if(this.userForm.state){
      this.db.post_rqst({'state_name':this.userForm.state}, 'app_master/getDistrict')
      .subscribe(d => {  
        this.loading_list = false;
        this.districts = d.districts;  
      });
    }
   
    // this.userForm.karigar_edit_id=this.userForm.main_category_id;
    // console.log(this.productForm.category_id);
}

    
deleteUser(id) {
  this.dialog.delete('Product').then((result) => {
      if(result) {
          this.db.post_rqst({id : id}, 'karigar/delete_sales_user')
          .subscribe(d => {
              this.userList('');
              this.dialog.successfully();
          });
      }
  });
} 


toggle:any;
  submit(form:any)
  {
    this.savingData = true;
    this.loading_list = true;
    this.userForm.dob = this.userForm.dob  ? this.db.pickerFormat(this.userForm.dob) : '';
    this.userForm.created_by = this.db.datauser.id;
    this.userForm.karigar_type = 3;
    this.db.insert_rqst( { 'karigar' : this.userForm }, 'karigar/addKarigar')
    .subscribe( d => {
      this.savingData = false;
      this.loading_list = false;
      console.log( d );
      if(d['status'] == 'EXIST' ){
        this.dialog.error( 'Mobile No. exists');
        return;
      }
      this.router.navigate(['list-user']);
      this.dialog.success('Sales executive has been successfully added');
      this.toggle = "false"
      this.userList('');
    });
  }
  exportproductList()
  {
    https://apps.abacusdesk.com/Magsol/dd_api/
      this.filter.mode = 1;
      this.db.post_rqst(  {'filter': this.filter , 'login':this.db.datauser}, 'karigar/export_sales_user')
      .subscribe( d => {
          this.loading_list = false;
          document.location.href = this.db.myurl+'app/uploads/dsr_user.csv';
          console.log(d);
      });
  }
  
  downloadSamplefile = () => {
    this.filter.mode = 1;
    this.db.post_rqst({'filter': this.filter , 'login':this.db.datauser},'master/exportproductList')
    .subscribe( d => {
        document.location.href = this.db.myurl+'/app/uploads/exports/DSR_upload_sample.csv';
        //console.log(d);
    });
  }

  bulkUpload = () => {
    const dialogRef = this.alrt.open(DsruploadComponent,{
      width: '500px',
      panelClass:'no-padding'
      
  });
  
  dialogRef.afterClosed().subscribe(result => {
      this.userList('');
  });
  }


  
  distributorData = []; 
  getdistributor(){
    this.loading_list = true;
    let zone = this.userForm.zone;
    this.db.post_rqst({'zone': zone}, 'app_master/getDistributors')
    .subscribe(d => {  
        this.loading_list = false;  
        console.log(d);
        this.distributorData = d['distributors'];
        console.log(this.distributorData);
    });
 } 


 zone_list = [];
  getZoneList = ()  => {
    this.db.post_rqst({}, 'master/distributor_zone_list').subscribe(r => {
      this.zone_list = r['zone']
    })
  }
  
}
