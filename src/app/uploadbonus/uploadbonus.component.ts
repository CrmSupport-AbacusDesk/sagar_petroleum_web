import { Component, OnInit } from '@angular/core';
import { DatabaseService } from 'src/app/_services/DatabaseService';
import { ImportStatusModelComponent } from 'src/app/offer/import-status-model/import-status-model.component';
import { DialogComponent } from 'src/app/dialog/dialog.component';
import { MatDialog, MatDialogRef } from '@angular/material';

@Component({
  selector: 'app-uploadbonus',
  templateUrl: './uploadbonus.component.html',
  styleUrls: ['./uploadbonus.component.scss']
})
export class UploadbonusComponent implements OnInit {
  filter:any={};
  // offer_list:any=[];
  loading:boolean = false;
  formData = new FormData();
  exist_coupon:any=[];
  offer_data:any={};
  coupon_ex:any = '';
  file:any = {};
  file_name:any;
  constructor(public db: DatabaseService,public dialog: DialogComponent, public alrt:MatDialog,public dialogRef: MatDialogRef<UploadbonusComponent>) { }

  ngOnInit() {
  }

  onUploadChange1(evt: any,f) 
  {
       console.log(f);
       this.file = evt.target.files[0];
       f.resetForm();
       console.log(this.file);
       console.log("this.file.File.name", this.file.name)
       this.file_name = this.file.name;
  }

  uploadBonus()
    {
        console.log(this.offer_data.offer_id);
        this.dialogRef.disableClose = true;
        this.loading = true; 
        this.formData.append('bonus_excel', this.file, this.file.name);
        // this.formData.append('offer_id', this.offer_data.offer_id); 
        https://apps.abacusdesk.com/Magsol/dd_api/karigar/upload_bonus_point
        // this.db.fileData( this.formData, 'app_master/couponExcel')
        this.db.fileData( this.formData, 'app_master/upload_bonus_point')
        .subscribe(d => {  
            this.loading = false;
            console.log(d)
            this.formData = new FormData();
           
            if(d['status'] == 'SUCCESS'){
               
                this.dialog.success( 'File Upload Successfully');
                this.dialogRef.close(true);
            }
            
        },err => {console.log(err);  this.formData = new FormData(); this.loading = false; });
    }

}
