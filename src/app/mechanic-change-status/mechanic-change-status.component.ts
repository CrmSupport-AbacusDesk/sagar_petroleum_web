import { Component,Inject, OnInit } from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {DatabaseService} from '../_services/DatabaseService';
import {ActivatedRoute, Router} from '@angular/router';
import {DialogComponent} from '../dialog/dialog.component';
// import { log } from 'console';

@Component({
  selector: 'app-mechanic-change-status',
  templateUrl: './mechanic-change-status.component.html',
  styleUrls: ['./mechanic-change-status.component.scss']
})
export class MechanicChangeStatusComponent implements OnInit {

  data: any = {};
    loading_list:any = false;
    mode:any;
    savingData = false;
    gift_id;
    karigarform:any = {};
    filter: any={};
    head_machanic: any;
    karigar_id:any='';
    
    constructor(public db: DatabaseService, private route: ActivatedRoute, private router: Router,  public dialog: DialogComponent,
        @Inject(MAT_DIALOG_DATA) public model_data: any, public dialogRef: MatDialogRef<MechanicChangeStatusComponent>) {
            console.log(model_data);
            this.data.id = model_data.id; 
            this.data.status = model_data.status; 
            this.karigarform.kyc_status = model_data.kyc_status; 
            this.data.type = model_data.type; 
            this.data.karigar_id = model_data.karigar_id; 
          console.log(this.data.type);
      
            this.data.district = model_data.district; 
            this.karigarform.machanic_type = model_data.machanic_type; 
            this.karigarform.head_machanic_id = model_data.head_machanic_id; 
           
            console.log( this.sales_list);

            this.getSales_list();
            
        }
        ngOnInit() {
            this.route.params.subscribe(params => {

                this.karigar_id = params['karigar_id'];
                this.gift_id = params['gift_id'];
                this.karigarform.status = this.data.status; 


                console.log( this.karigarform.status);
                
            });
        }
        
        karigarstatus(form:any)
        {
            this.savingData = true;
            this.db.post_rqst( { 'id': this.data.id,'status': this.karigarform.status,'machanic_type': this.karigarform.machanic_type,'head_mechanic_id':this.karigarform.head_machanic_id}, 'karigar/karigarStatus')
            .subscribe( d => {
                this.savingData = false;
                this.dialog.success( 'Status successfully Change');
                this.dialogRef.close(true);
                console.log( d );
            });
        }


        KycStatus(form:any)
        {
            this.savingData = true;
            this.db.post_rqst( { 'id': this.data.id,  'kyc_status' : this.karigarform.kyc_status ,'karigar_id':this.data.karigar_id,'kyc_status_reason':this.karigarform.kyc_status_reason}, 'karigar/update_kyc_status')
            .subscribe( d => {
                this.savingData = false;
                this.dialog.success( 'Status successfully Change');
                this.dialogRef.close(true);
                console.log( d );
            });
        }

        
        onNoClick(): void{
            this.dialogRef.close();
        }



        sales_list: any = {};
        getSales_list() {
            this.filter.district = this.data.district;
            console.log(this.filter.district);
            this.filter.limit = 0;
            this.db.post_rqst({'filter':this.filter}, 'master/head_machanic_list')
                .subscribe(d => {
                    this.sales_list = d.head_machanic;  
                    console.log( this.sales_list);              
                });
               
        }
    



    }
    