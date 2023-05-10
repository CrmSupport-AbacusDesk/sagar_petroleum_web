import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { DialogComponent } from '../dialog/dialog.component';
import { DatabaseService } from '../_services/DatabaseService';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-add-coupon-points',
  templateUrl: './add-coupon-points.component.html',
  styleUrls: ['./add-coupon-points.component.scss']
})
export class AddCouponPointsComponent implements OnInit {

  Couponform:any ={};
  userId:any;
  target:any ={};
  couponData:any ={}
  loading = false;
  couponsList: any = [];
  id:any;
  karigar_pending:any={}
  from:any;
  // karigar_id;
  
  constructor(public db: DatabaseService,public dialog: DialogComponent, public alrt:MatDialog, private route: ActivatedRoute, private router: Router, 
      public dialogRef: MatDialogRef<AddCouponPointsComponent>, @Inject(MAT_DIALOG_DATA) public data: any) {
        this.id = data["id"];
        this.from=data['from']


        if(data['status_remark']){
          this.karigar_pending.remarks=data['status_remark']
         }

         
       else if(data['machanic_code']){
          this.karigar_pending.machanic_code=data['machanic_code']
         }


        console.log('Karigar Id Is ->', this.id);
       }

  ngOnInit() {
    // this.route.params.subscribe(params => {
    //   this.karigar_id = params['karigar_id'];
    // });
  }

  saveCoupon = ()  => {
    this.Couponform;
    console.log(this.Couponform.coupon_points);
    if(this.Couponform.coupon_points == undefined){
        this.dialog.error('Points are required');
        return;
    }
    if(this.Couponform.remarks == undefined){
      this.dialog.error('Remarks are required');
      return;
      }
    const coupon_points = this.Couponform.coupon_points;
    const remarks = this.Couponform.remarks;

    this.db.insert_rqst({"id":this.id, "point":coupon_points, "remark": remarks}, 'karigar/bonus_points')
    .subscribe(response => {
        console.log(response);
        this.dialogRef.close();
        this.loading = false;
    });
  }




  Update_reason(){
    this.db.insert_rqst({'machanic_code':this.karigar_pending.machanic_code,'karigar_id':this.id,},'karigar/update_machanic_code').subscribe(result=>{
      console.log(result)
      if(result['status']=='SUCCESS'){
      this.dialog.success('Update Successfully');
      }

      this.dialogRef.close();

    })

  }

}
