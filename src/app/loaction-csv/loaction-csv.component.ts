import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material';
import { DialogComponent } from '../dialog/dialog.component';
import { DatabaseService } from '../_services/DatabaseService';

@Component({
  selector: 'app-loaction-csv',
  templateUrl: './loaction-csv.component.html',
  styleUrls: ['./loaction-csv.component.scss']
})
export class LoactionCsvComponent implements OnInit {
  
  filter:any={};
  // offer_list:any=[];
  loading:boolean = false;
  formData = new FormData();
  exist_coupon:any=[];
  offer_data:any={};
  coupon_ex:any = '';
  urlsampleFile:string='';
  file:any = {};
  file_name:any;
  constructor(public db: DatabaseService,public dialog: DialogComponent, public alrt:MatDialog,public dialogRef: MatDialogRef<LoactionCsvComponent>) { 
    this.urlsampleFile = this.db.myurl+'app/uploads/Org/sample_location.csv'

  }
  
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
    this.formData.append('loc_file', this.file, this.file.name);
    this.db.fileData( this.formData, 'app_master/importLocation')
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
