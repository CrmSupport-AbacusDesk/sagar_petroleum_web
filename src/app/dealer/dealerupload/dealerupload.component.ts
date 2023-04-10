import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material';
import { CouponCodeModalComponent } from 'src/app/coupon-codes/coupon-code-modal/coupon-code-modal.component';
import { DialogComponent } from 'src/app/dialog/dialog.component';
import { DatabaseService } from 'src/app/_services/DatabaseService';

@Component({
  selector: 'app-dealerupload',
  templateUrl: './dealerupload.component.html',
  styleUrls: ['./dealerupload.component.scss']
})
export class DealeruploadComponent implements OnInit {

  filter:any={};
  offer_list:any=[];
  loading:boolean = false;
  formData = new FormData();
  exist_coupon:any=[];
  offer_data:any={};
  coupon_ex:any = '';
  file:any = {};
  coupon_name:any;

constructor(public db: DatabaseService,public dialog: DialogComponent, public alrt:MatDialog,public dialogRef: MatDialogRef<DealeruploadComponent>) { }

ngOnInit() {
}

onUploadChange(evt: any,f) 
{
    console.log('File Type Coupon Bulk Upload ->', f);
    this.file = evt.target.files[0];
    f.resetForm();
    console.log(this.file);
    console.log("File name -> ", this.file.name);
    this.coupon_name = this.file.name;
    
    // this.coupon_ex = this.coupon_name;
}

uploadCSV()
{
    this.dialogRef.disableClose = true;
    this.loading = true; 
    this.formData.append('csv', this.file, this.file.name);
    console.log('File ->', this.file);
    console.log('File_Name ->', this.file.name);
    console.log('Form Data ->', this.formData);
    
    this.db.fileData(this.formData, 'app_master/addDealercsv')
    .subscribe(d => {  
        this.loading = false;
        this.formData = new FormData();
        if(d['status'] == 'BLANK')
        {
            this.dialog.success('File is Blank');
            return;
        }
        
        if(d['status'] == 'INCORRECT FILE'){
            this.dialog.success('File Data is incorrect');
            return;
        }
        
        if(d['status'] == 'INCORRECT FORMAT'){
            this.dialog.success('File Format is incorrect! only CSV Support');
            return;
        }
        
        if(d['status'] == 'SIZE SHORT'){
            this.dialog.success('CSV File To Sort ');
            return;
        }

        if(d['status'] == 'SIZE LARGE'){
            this.dialog.success('File Size Too Lagre');
            return;
        }
        if(d['status'] == 'SUCESS'){
            console.log('Inside success message.')
            this.dialogRef.close();
            this.dialog.success('Dealer Uploaded Successfully');
        }
        if(d['status']  == 'Unauthorized') {
          console.log('Unauthorized error');
          this.dialogRef.close();
          this.dialog.error('Something went wrong');
        }
    },err => {console.log(err);  this.formData = new FormData(); this.loading = false; });
}


downloadSamplefile = () => {
    this.filter.mode = 1;
    this.db.post_rqst({'filter': this.filter , 'login':this.db.datauser},'master/exportproductList')
    .subscribe( d => {
        document.location.href = this.db.myurl+'/app/uploads/exports/sample.csv';
        //console.log(d);
    });
  }
}
