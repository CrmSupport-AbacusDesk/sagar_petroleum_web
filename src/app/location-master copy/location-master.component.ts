import { Component, OnInit } from '@angular/core';
import { MatDatepicker, MatDialog } from '@angular/material';
import { ActivatedRoute, Router } from '@angular/router';
import { DialogComponent } from 'src/app/dialog/dialog.component';
import { LoactionCsvComponent } from 'src/app/loaction-csv/loaction-csv.component';
import { DatabaseService } from 'src/app/_services/DatabaseService';
import { SessionStorage } from 'src/app/_services/SessionService';

@Component({
  selector: 'app-location-master',
  templateUrl: './location-master.component.html',
  styleUrls: ['./location-master.component.scss']
})
export class LocationMasterComponent implements OnInit {
  isEditCalled= false;
  locationForm:any ={};
  toggle: any;
  savingData = false;
  loading_list = false;
  filtering: any = false;
  filter: any = {};
  perPage=0
  sr_no:any=0;
  last_page: number;
  current_page = 1;
  search: any = "";
  searchData = true;
  loacatinData:any =[];
  states:any =[];
  districts:any =[];
  statesCode:any =[];
  districtCodes:any =[];
  citys:any =[];
  cityCodes:any =[];
  zoneData:any =[];

  constructor( public db: DatabaseService,
    private route: ActivatedRoute,
    public alert:MatDialog,
    private router: Router,
    public ses: SessionStorage,
    public dialog: DialogComponent) { 
      this.getLocationList('');
      this.getStateList('');
      this.getStateCode('');
      this.getDistrictList('');
      this.getDistrictListCode('');
      this.getCityList('');
      this.getCityListCode('');
      this.getZoneList('');
    }
    
    ngOnInit() {
      this.getZoneList('');

    }
    
    
    getStateList(searcValue){
      console.log(searcValue);
      
      this.loading_list = true;
    
      this.db.post_rqst({'search':searcValue}, 'master/getLocationStates')
      .subscribe(d => { 
        
         
        this.loading_list = false;  
        this.states = d.locationStates;
      });
    }
    getStateCode(searcValue){
      console.log(searcValue);
      
      this.loading_list = true;
      this.db.post_rqst({'search':searcValue}, 'master/getLocationStateCodes')
      .subscribe(d => { 
        
        this.loading_list = false;  
        this.statesCode = d.locationStateCodes;

      });
    }
    getStateCode_edit(state_name){
      console.log(state_name);   
      this.loading_list = true;
      this.db.post_rqst({'state_name':state_name}, 'master/getLocationStateCodes')
      .subscribe(d => { 
        
        this.loading_list = false;  
        this.statesCode = d.locationStateCodes;

        for(let i=0; i<this.statesCode.length; i++){

          this.locationForm.state_code= this.statesCode[i].state_code
          
        }
        

        

      });
    }
    getDistrictList(searcValue){
      this.loading_list = true;
      this.db.post_rqst({'search':searcValue}, 'master/getLocationDistricts')
      .subscribe(d => { 
        
        this.loading_list = false;  
        this.districts = d.locationDistricts;
      });
    }
    getDistrictListCode(searcValue){
      this.loading_list = true;
      this.db.post_rqst({'search':searcValue}, 'master/getLocationDistrictCodes')
      .subscribe(d => { 
        
        this.loading_list = false;  
        this.districtCodes = d.locationDistrictCodes;
        console.log(this.districtCodes);
        
        
      });
    }

    getDistrictListCode_edit(district_name){
      console.log(district_name);
      
      this.loading_list = true;
      this.db.post_rqst({'district_name':district_name}, 'master/getLocationDistrictCodes')
      .subscribe(d => { 
        
        this.loading_list = false;  
        this.districtCodes = d.locationDistrictCodes;
        console.log(this.districtCodes);
        for(let i=0; i<this.districtCodes.length; i++){

          this.locationForm.district_code= this.districtCodes[i].district_code
          
        }
      });
    }
    getCityList(searcValue){
      this.loading_list = true;
      this.db.post_rqst({'search':searcValue}, 'master/getLocationCitys')
      .subscribe(d => { 
        
        this.loading_list = false;  
        this.citys = d.locationCitys;
      });
    }
    getCityListCode(searcValue){
      this.loading_list = true;
      this.db.post_rqst({'search':searcValue}, 'master/getLocationCityCodes')
      .subscribe(d => { 
        console.log(d);
        
        this.loading_list = false;  
        this.cityCodes = d.locationCityCodes;
      

      });
    }

    getCityListCode_edit(city_name){
      console.log(city_name);
      
      this.loading_list = true;
      this.db.post_rqst({'city_name':city_name}, 'master/getLocationCityCodes')
      .subscribe(d => { 
        console.log(d);
        
        this.loading_list = false;  
        this.cityCodes = d.locationCityCodes;
        for(let i=0; i<this.cityCodes.length; i++){

          this.locationForm.city_code= this.cityCodes[i].city_code;
          
        }
      });
    }
    getZoneList(searcValue){
      this.loading_list = true;
      // this.filter.limit = 0;
      // this.filter.search = searcValue;
      this.db.post_rqst({'search':searcValue}, 'master/getLocationZonesDropdown')
      .subscribe(d => { 
        
        this.loading_list = false;  
        this.zoneData = d.locationZones;
      });
    }
    
    redirect_previous() {
      this.current_page--;
      this.getLocationList("");
    }
    redirect_next() {
      if (this.current_page < this.last_page) {
        this.current_page++;
      } else {
        this.current_page = 1;
      }
      this.getLocationList("");
    }
    openDatePicker(picker: MatDatepicker<Date>) {
      picker.open();
    }

    editProduct(id,index){
      this.isEditCalled = true;
      this.locationForm = this.loacatinData.filter( x => x.id==id)[0];
      
     
      
      // for(let i=0; i<this.locationForm.image.length ;i++)
      // {
      //     if( parseInt( this.locationForm.image[i].profile ) == 1  )
      //     this.locationForm.profile_selected = this.locationForm.image[i].image_id;
      //     this.selected_image.push({"image":this.locationForm.image[i].image_name,"id":this.locationForm.image[i].image_id} );
      // }
      
  }


    getLocationList(action) {
      this.loading_list = true;
      this.filter.date = this.filter.date
      ? this.db.pickerFormat(this.filter.date)
      : "";
      if (this.filter.date || this.filter.location_id) this.filtering = true;
      this.filter.mode = 0;
      
      if (action == "refresh") {
        this.filter = {};
      }
      console.log(this.filter);
      
      this.db
      .post_rqst(
        { filter: this.filter, login: this.db.datauser },
        "master/locationList?page=" + this.current_page
        )
        .subscribe((d) => {
          
          this.loading_list = false;
          this.current_page = d.locations.current_page;
          this.last_page = d.locations.last_page;
          this.loacatinData = d.locations.data;
          console.log(this.loacatinData);
          
          
          this.perPage = d.locations.per_page;   
          this.sr_no = this.current_page - 1;
          this.sr_no = this.sr_no * this.perPage;
          
        });
      }
      
      addLocation(){
        this.isEditCalled = false;
        this.locationForm = {};
      }
      saveLoaction() {
        console.log(this.locationForm);
        
        this.savingData = true;
        console.log(this.locationForm.product_id);
        
        // if (this.products.id) {
        //   this.locationForm.edit_product_id = this.products.id;
        // }
        this.db.post_rqst({'state_name':this.locationForm.state_name,'state_code':this.locationForm.state_code,'district_name':this.locationForm.district_name,'district_code':this.locationForm.district_code,'city_name':this.locationForm.city_name,'city_code':this.locationForm.city_code,'zone':this.locationForm.zone,'id':this.locationForm.id}, "master/addLocation")
        .subscribe((d) => {
          
          if (d["status"] == "EXIST") {
            this.savingData = false;
            this.dialog.error("This Location Already exists");
            return;
          }
          else if(d["status"] == "SUCCESS"){
            this.savingData = false;
            this.locationForm = {};
            this.toggle = "false";
            this.dialog.success('Location updated successfully')
            this.getLocationList('');
          }

          
        });
      }
      
      openDialog(): void {
        const dialogRef = this.alert.open(LoactionCsvComponent,{
          width: '500px',
          
        });
        
        dialogRef.afterClosed().subscribe(result => {
          if(result){
            console.log("close==>",result)
            this.getLocationList('');
          }
          // this.getAvailableCoupanList('') ;
        });
      }
      
      exportLocation() {
        this.filter.mode = 1;
        this.db
        .post_rqst(
          { filter: this.filter, login: this.db.datauser },
          "master/exportLocationList"
          )
          .subscribe((d) => {
            this.loading_list = false;
            document.location.href =
            this.db.myurl + "app/uploads/exports/locationList.csv";
            
          });
        }
        
      }
      