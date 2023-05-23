import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Params } from '@angular/router';
import { DatabaseService } from 'src/app/_services/DatabaseService';
@Component({
  selector: 'app-list-accoding-date-filter',
  templateUrl: './list-accoding-date-filter.component.html',
  styleUrls: ['./list-accoding-date-filter.component.scss']
})
export class ListAccodingDateFilterComponent implements OnInit {

  constructor(private dialogRef: MatDialogRef<ListAccodingDateFilterComponent>, public db: DatabaseService, @Inject(MAT_DIALOG_DATA) public params: any) {
    console.log(this.params);
    this.data.date_from = this.params.date_from;
    this.data.date_to = this.params.date_to;

  }

  data:any={};
    today:any = '';
  ngOnInit() {
    this.today = new Date();
  }


  submit()
  {
      console.log(this.data);
      this.data.date_from = this.data.date_from  ? this.db.pickerFormat(this.data.date_from) : '';
      this.data.date_to = this.data.date_to  ? this.db.pickerFormat(this.data.date_to) : '';
      this.dialogRef.close(this.data);
  }
}
