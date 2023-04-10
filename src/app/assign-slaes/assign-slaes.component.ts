import { Component,Inject, OnInit } from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {DatabaseService} from '../_services/DatabaseService';
import {ActivatedRoute, Router} from '@angular/router';
import {DialogComponent} from '../dialog/dialog.component'

@Component({
  selector: 'app-assign-slaes',
  templateUrl: './assign-slaes.component.html',
  styleUrls: ['./assign-slaes.component.scss']
})
export class AssignSlaesComponent implements OnInit {
  sales_user_id:number;
  karigar_id:[];
  allformdata:[];
  sales_users:[];
  sales_data:any={};
  mode:String=''
  
  constructor(public db: DatabaseService, private route: ActivatedRoute, private router: Router,  public dialog: DialogComponent,
    @Inject(MAT_DIALOG_DATA) public model_data: any, public dialogRef: MatDialogRef<AssignSlaesComponent>) {

      this.karigar_id = this.model_data.karigar_id
      this.mode = this.model_data.mode
      console.log(" this.sales_user_id ====", this.mode)


    }
  ngOnInit() {
    this.SaleUserList()
  }
  SaleUserList()
  {
      this.db.post_rqst('','karigar/get_sales_user')
      .subscribe(d => {
          console.log(d);
          this.sales_users = d.sales_users;
         
      });
  }
  assign_sales_user(f){
    // this.allformdata == ]
    
      this.db.post_rqst({'id':this.karigar_id,'assign_dsr_code':this.sales_data.dsr_code},'karigar/assign_sales_user')
      .subscribe(d => {
          console.log(d);
          this.sales_users = d.sales_users;
          if(d['status'] === 'SUCCESS' ){
            this.dialogRef.close(true);
            
          }
         
       });
     
    //  else if('this.mode === 'dealer_sles_assign'){
    //   this.db.post_rqst({'id':this.karigar_id,'sales_user_id':this.sales_data.sales_user_id},'karigar/assign_sales_user')
    //   .subscribe(d => {
    //       console.log(d);
    //       this.sales_users = d.sales_users;
    //       if(d['status'] === 'SUCCESS' ){
    //         this.dialogRef.close(true);
    //       }
         
    //    });
    //  }
    }
    

}
