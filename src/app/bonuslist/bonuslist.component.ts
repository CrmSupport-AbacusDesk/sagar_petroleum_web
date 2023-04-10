import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDatepicker } from '@angular/material';
import { ActivatedRoute, Router } from '@angular/router';
import { SessionStorage } from 'src/app/_services/SessionService';
import { DatabaseService } from '../_services/DatabaseService';
import { DialogComponent } from '../dialog/dialog.component';
import { UploadbonusComponent } from '../uploadbonus/uploadbonus.component';


@Component({
  selector: 'app-bonuslist',
  templateUrl: './bonuslist.component.html',
  styleUrls: ['./bonuslist.component.scss']
})
export class BonuslistComponent implements OnInit {
  filter:any={}
  loading_list=true;
  bonus_list:any=[];
  current_page:number=0;
  last_page:number=0;
  per_page:number=0;
  sno:number=0; 
  urlsampleFile:string='';
  constructor(public db: DatabaseService, private route: ActivatedRoute, private router: Router, public ses: SessionStorage, public dialog:DialogComponent, public alrt:MatDialog) {
    this.urlsampleFile = this.db.myurl+'app/uploads/sample_bonus_file.csv'
   }

  ngOnInit() {
    this.getBonuslist();
  }
  getBonuslist() 
  {
      this.loading_list = true;
      this.db.post_rqst(  {  'filter': this.filter }, 'app_master/bonus_point_list?page=' + this.current_page)
      .subscribe( d => {
          this.loading_list = false;
          this.bonus_list = d['point_log']['data']
          this.current_page = d['point_log']['current_page']
          this.last_page =  d['point_log']['last_page']
          this.per_page  = d['point_log']['per_page']
          this.sno = this.current_page -1
          this.sno =   this.sno *  this.per_page
          console.log(this.bonus_list)
   
      });
  }  
  
  redirect_next(){
    if( this.current_page  <  this.last_page){
      this.current_page++;
      this.getBonuslist();
    }else {
      this.current_page = 1;
    }
    
  }
  redirect_previous(){
    this.current_page--;
    this.getBonuslist();
  }

  exportBonusList()
  {
      this.filter.mode = 1;
      this.db.post_rqst(  {}, 'app_master/export_bonus_excel')
      .subscribe( d => {
          this.loading_list = false;
          document.location.href = this.db.myurl+'app/uploads/exports/bonus_excel.csv';
          console.log(d);
      });
  }

  

  openDialog(): void {
    const dialogRef = this.alrt.open(UploadbonusComponent,{
        width: '500px',
        
    });
    
    dialogRef.afterClosed().subscribe(result => {
      if(result){
        console.log("close==>",result)
        this.getBonuslist();
      }
        // this.getAvailableCoupanList('') ;
    });
  }
}
