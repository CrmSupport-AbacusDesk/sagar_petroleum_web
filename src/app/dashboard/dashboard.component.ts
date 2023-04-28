import { Component, OnInit } from '@angular/core';
import { DatabaseService } from '../_services/DatabaseService';
import { Router } from '@angular/router';
import { SessionStorage } from '../_services/SessionService';

@Component({
    selector: 'app-dashboard',
    templateUrl: './dashboard.component.html',
})
export class DashboardComponent implements OnInit {
    
    loading_list = false;
    balance_coupon_value:any;
    karigars:any;
    totalNetwork:any;
    user_karigar:any;
    user_Retailer:any;
    user_Distributor:any;
    unread_counts:any;
    offer:any;
    total_coupon_value:any;
    coupon_value_scan_by_Retailer:any;
    coupon_value_scan_by_karigar:any;
    offer_karigar:any;
    offer_Retailer:any;
    pending_redeem_request:any;
    pending_redeem_request_karigar:any;
    pending_redeem_request_retailer:any;
    offer_gift:any;
    products:any;
    super_karigars:any=[];
    super_dealers:any=[];
    offer_balance_days:any=[];
    state_wise_karigars:any=[];
    dataSource : any = [];
    dataSource1:any=[];
    scan_coupon_count:any=[];
    coupon_count:any=[];
    data_Source:any;
    karigar_Source:any;
    dealer_Source:any;
    coupon_Source:any;
    day_Source:any;
    scan_coupon_Source:any;

    distributor_Source:any;
    karigar_state_wise:any=[];
    dealer_state_wise:any=[];
    coupon_state_wise:any=[];
    day_state_wise:any=[];

    six_state_coupon_wise:any=[]

    distributor_state_wise:any=[];
    stateWiseKarigar:any=[];
    stateWiseDealer:any=[];


    stateWiseCoupon:any=[];
    dayWiseCoupon:any=[];
    sixMonthStateWiseScannedCoupon:any=[];

    stateWiseDistributor:any=[];

    /// @ DSR's and Sales Person Graph variables
    topDsrSource = {};
    topSalesSource : {};
    bottomDsrSource : {};
    bottomSalesSource : {};
    topDsrArray = [];
    bottomDsrArray = [];
    topSalesArray = [];
    bottomSalesArray = [];
    topDsr : any = [];
    topSales : any = [];
    bottomDsr : any = [];
    bottomSales : any = [];
    /// @ DSR's and Sales Person Graph variables end'

    //  Dealer wise, Zone wise coupon Graphics

    dealerCouponSource = {};
    zoneCouponSource = {};
    dealerCouponArr = [];
    zoneCouponArr = [];
    filter = {};
    zoneSourceYTD = {};
    zoneYTDArr = [];

    access_level:any;
    users: any = {};
    head_machanic: any;
    assitant_machanic: any;


    
    constructor(public db: DatabaseService, private router:Router,public ses:SessionStorage) 
    {
        this.getZoneWiseScannedMTD();
        this.getZoneWiseScannedYTD();
        // this.getDealerWiseScanned();
        this.get_counts();
        this.get_super_karigars();
        this.get_super_dealers();
        this.get_offer_balance_days();
        this.state_wise_karigar();
        this.state_wise_coupon();
        this.day_wise_coupon_scan_datas();
        this.sixMonthStateWiseScannedCoupons();
        // this.sixMonthStateWiseScannedValue();
        this.state_wise_distributor();
        this.coupon_code_graph();
        this.get_scan_coupon_data();
        this.topDsrSales();
        this.bottomDsrSales();
        
        this.users = this.ses.users;
        this.access_level = this.users.access_level;
        console.log(this.access_level);

    }
    
    ngOnInit() 
    {
        
    }


    // getDealerWiseScanned = () => {
    //     this.db.post_rqst({},'master/dealer_wise_coupons')
    //     .subscribe((resp)=>
    //     {
    //         console.log('Dealer Source ====>', resp);
    //         // console.log('Zone wise coupon scanned', resp);
    //         let dealerArr = resp.dealer_wise_coupons;
            
    //         for (let i=0;i < dealerArr.length; i++)
    //         {
    //             this.zoneCouponArr.push({"label": dealerArr[i].full_name,"value": dealerArr[i].coupon_count});
    //         }

    //         this.zoneCouponSource = {
    //             "chart": {
    //                 "xAxisName": "Zone",
    //                 "yAxisName": "Scanned Count",
    //                 "theme": "fusion",
    //             },
    //             "data": this.zoneCouponArr            
    //         };

    //     })
    // }

    getZoneWiseScannedMTD = () => {
        this.filter['range'] = 'MTD';

        this.db.post_rqst({"filter":this.filter},'master/zone_wise_coupons')
        .subscribe((resp)=>
        {
            console.log('Zone wise coupon scanned', resp);
            let zoneArr = resp.zone_wise_coupons;
            
            for (let i=0;i < zoneArr.length; i++)
            {
                this.zoneCouponArr.push({"label": zoneArr[i].zone,"value": zoneArr[i].coupon_count});
            }

            this.zoneCouponSource = {
                "chart": {
                    "xAxisName": "Zone",
                    "yAxisName": "Scanned Count",
                    "theme": "fusion",
                },
                "data": this.zoneCouponArr            
            };
        })
    }


    getZoneWiseScannedYTD = () => {
        this.filter['range'] = 'YTD';

        this.db.post_rqst({"filter":this.filter},'master/zone_wise_coupons')
        .subscribe((resp)=>
        {
            console.log('Zone wise coupon scanned', resp);
            let zoneArr = resp.zone_wise_coupons;
            
            for (let i=0;i < zoneArr.length; i++)
            {
                this.zoneYTDArr.push({"label": zoneArr[i].zone,"value": zoneArr[i].coupon_count});
            }

            this.zoneSourceYTD = {
                "chart": {
                    "xAxisName": "Zone",
                    "yAxisName": "Scanned Count",
                    "theme": "fusion",
                },
                "data": this.zoneYTDArr            
            };
        })
    }
    
    get_counts() 
    {
        this.loading_list = true;
        
        this.db.post_rqst({ }, 'master/getDashboardcounts').subscribe(resp => 
            {
                this.loading_list = false;
                console.log(resp);
                this.balance_coupon_value = resp.balance_coupon_value;
                this.karigars = resp.karigars;
                this.offer_karigar=resp.offer_karigar;
                this.offer_Retailer=resp.offer_Retailer;
                this.offer = resp.offer;
                this.total_coupon_value=resp.total_coupon_value;
                this.coupon_value_scan_by_Retailer=resp.coupon_value_scan_by_Retailer;
                this.coupon_value_scan_by_karigar=resp.coupon_value_scan_by_karigar;
                this.pending_redeem_request_karigar=resp.pending_redeem_request_karigar;
                this.pending_redeem_request_retailer=resp.pending_redeem_request_retailer;
                this.offer_gift = resp.offer_gift;
                this.pending_redeem_request = resp.pending_redeem_request;
                this.products = resp.products;
                this.totalNetwork=resp.user;
                this.user_karigar=resp.user_karigar;
                this.user_Retailer=resp.user_Retailer;
                this.user_Distributor=resp.user_Distributor;
                this.unread_counts=resp.unread;

                this.assitant_machanic=resp.assitant_machanic;
                this.head_machanic=resp.head_machanic;

            });
        }
        
        get_super_karigars()
        {
            this.loading_list = true;
            
            this.db.post_rqst({ }, 'master/getSuperkarigars')
            .subscribe((resp) => 
            {
                this.loading_list = false;
                console.log(resp);
                this.super_karigars = resp.super_karigars;
            });
        }


        get_super_dealers()
        {
            this.loading_list = true;
            
            this.db.post_rqst({ }, 'master/getSuperkarigars')
            .subscribe((resp) => 
            {
                this.loading_list = false;
                console.log(resp);
                this.super_dealers = resp.super_Retailers;
            });
        }
        
        get_offer_balance_days()
        {
            this.loading_list = true;
            this.db.post_rqst({ }, 'master/getOfferBalanceDays')
            .subscribe((resp) => 
            {
                this.loading_list = false;
                console.log(resp);
                this.offer_balance_days = resp.offer_balance_days;
            });
        }
        
        topDsrSales = () => {
            this.db.post_rqst({},'master/top_ten_dsr')
            .subscribe((resp)=>
            {
                console.log('Top 10 DSR Called', resp);
                this.topDsrArray = resp.top_dsr;
                this.topSalesArray = resp.top_sales_person;

                console.log('test ---->', this.topDsrArray);
                
                for (let i=0;i < this.topDsrArray.length; i++)
                {
                    this.topDsr.push({"label": this.topDsrArray[i].full_name,"value": this.topDsrArray[i].coupon_count});
                }

                
                for (let i=0;i < this.topSalesArray.length; i++)
                {
                    this.topSales.push({"label": this.topSalesArray[i].sales_person,"value": this.topSalesArray[i].coupon_count});
                }

                console.log('Top DSR ----> ', this.topDsr);
                
                this.topDsrSource = {
                    "chart": {
                        "xAxisName": "DSR's Name",
                        "yAxisName": "Coupons Count",
                        // "numberSuffix": "k",
                        "theme": "fusion",
                    },
                    "data": this.topDsr            
                };

                this.topSalesSource = {
                    "chart": {
                        "xAxisName": "Sales Person Name",
                        "yAxisName": "Coupons Count",
                        // "numberSuffix": "k",
                        "theme": "fusion",
                    },
                    "data": this.topSales            
                };
                

                console.log('top 10 dsr logs ----->', this.topDsrSource)
            })
        }

        bottomDsrSales = () => {
            this.db.post_rqst({},'master/top_ten_dsr')
            .subscribe((resp)=>
            {
                console.log('Top 10 DSR Called', resp);
                this.bottomDsrArray = resp.bottom_ten_dsr;
                this.bottomSalesArray = resp.bottom_ten_sales_person;

                
                for (let i=0;i < this.bottomDsrArray.length; i++)
                {
                    this.bottomDsr.push({"label": this.bottomDsrArray[i].full_name,"value": this.bottomDsrArray[i].coupon_count});
                }

                
                for (let i=0;i < this.bottomSalesArray.length; i++)
                {
                    this.bottomSales.push({"label": this.bottomSalesArray[i].sales_person,"value": this.bottomSalesArray[i].coupon_count});
                }

                console.log('Top DSR ----> ', this.topDsr);
                
                this.bottomDsrSource = {
                    "chart": {
                        "xAxisName": "DSR's Name",
                        "yAxisName": "Coupon Scan Counts",
                        // "numberSuffix": "k",
                        "theme": "fusion",
                    },
                    "data": this.bottomDsr            
                };

                this.bottomSalesSource = {
                    "chart": {
                        "xAxisName": "Sales Person Name",
                        "yAxisName": "Coupon Scan Counts",
                        // "numberSuffix": "k",
                        "theme": "fusion",
                    },
                    "data": this.bottomSales            
                };
                

                // console.log('top 10 dsr logs ----->', this.topDsrSource)
            })
        }

        state_wise_karigar()
        {
            this.db.post_rqst({},'master/stateWiseKarigar')
            .subscribe((resp)=>
            {
                console.log(resp);
                this.stateWiseKarigar=resp.state_wise_karigars;
                
                for (let i=0;i < this.stateWiseKarigar.length; i++)
                {
                    this.karigar_state_wise.push({"label": this.stateWiseKarigar[i].state,"value": this.stateWiseKarigar[i].total_karigars});
                }
                console.log(this.karigar_state_wise);
                
                this.karigar_Source = {
                    "chart": {
                        "xAxisName": "States",
                        "yAxisName": "Mechanic",
                        // "numberSuffix": "k",
                        "theme": "fusion",
                    },
                    "data": this.karigar_state_wise            
                };
            })
        }

        state_wise_coupon(){
            this.db.post_rqst({},'master/state_wise_coupons')
            .subscribe((resp)=>
            {
                console.log(resp);
                this.stateWiseCoupon=resp.state_wise_coupons;
                
                for (let i=0;i < this.stateWiseCoupon.length; i++)
                {
                    this.coupon_state_wise.push({"label": this.stateWiseCoupon[i].state,"value": this.stateWiseCoupon[i].coupon_count});
                }
                console.log(this.coupon_state_wise);
                
                this.coupon_Source = {
                    "chart": {
                        "xAxisName": "States",
                        "yAxisName": "Counts",
                        // "numberSuffix": "k",
                        "theme": "fusion",
                    },
                    "data": this.coupon_state_wise            
                };
            })
        }






        day_wise_coupon_scan_datas(){
            this.db.post_rqst({},'master/day_wise_coupon_scan_data')
            .subscribe((resp)=>
            {
                console.log(resp);
                this.dayWiseCoupon=resp.scan_coupon_data;
                
                for (let i=0;i < this.dayWiseCoupon.length; i++)
                {
                    this.day_state_wise.push({"label": this.dayWiseCoupon[i].scan_by_karigar_date,"value": this.dayWiseCoupon[i].scan_coupon_data});
                }
                console.log(this.day_state_wise);
                
                this.day_Source = {
                    "chart": {
                        "xAxisName": "Date",
                        "yAxisName": "Scan Coupon",
                        // "numberSuffix": "k",
                        "theme": "fusion",
                    },
                    "data": this.day_state_wise            
                };
            })
        }







        sixMonthStateWiseScannedCoupons(){
            this.db.post_rqst({},'master/sixMonthStateWiseScannedCoupon')
            .subscribe((resp)=>
            {
                console.log(resp);
                this.sixMonthStateWiseScannedCoupon=resp.six_month_state_wise_scanned_coupon;
                
                for (let i=0;i < this.sixMonthStateWiseScannedCoupon.length; i++)
                {
                    this.six_state_coupon_wise.push({"label": this.sixMonthStateWiseScannedCoupon[i].state,"value": this.sixMonthStateWiseScannedCoupon[i].scanned_coupon});
                }
                console.log(this.six_state_coupon_wise);
                
                this.scan_coupon_Source = {
                    "chart": {
                        "xAxisName": "state",
                        "yAxisName": "Coupon Scan",
                        // "numberSuffix": "k",
                        "theme": "fusion",
                    },
                    "data": this.six_state_coupon_wise            
                };
            })
        }





        // sixMonthStateWiseScannedValue(){
        //     this.db.post_rqst({},'master/sixMonthStateWiseScannedCoupon')
        //     .subscribe((resp)=>
        //     {
        //         console.log(resp);
        //         this.sixMonthStateWiseScannedCoupon=resp.six_month_state_wise_scanned_coupon;
                
        //         for (let i=0;i < this.sixMonthStateWiseScannedCoupon.length; i++)
        //         {
        //             this.six_state_coupon_wise.push({"label": this.sixMonthStateWiseScannedCoupon[i].state,"value": this.sixMonthStateWiseScannedCoupon[i].coupon_value});
        //         }
        //         console.log(this.six_state_coupon_wise);
                
        //         this.scan_coupon_Source = {
        //             "chart": {
        //                 "xAxisName": "state",
        //                 "yAxisName": "Coupon Value",
        //                 // "numberSuffix": "k",
        //                 "theme": "fusion",
        //             },
        //             "data": this.six_state_coupon_wise            
        //         };
        //     })
        // }






        state_wise_distributor(){

            this.db.post_rqst({},'master/stateWiseKarigar')
            .subscribe((resp)=>
            {
                console.log(resp);
                this.stateWiseDistributor=resp.state_wise_Distributor;
                
                for (let i=0;i < this.stateWiseDistributor.length; i++)
                {
                    this.distributor_state_wise.push({"label": this.stateWiseDistributor[i].state,"value": this.stateWiseDistributor[i].total_distributor});
                }
                console.log(this.distributor_state_wise);
                
                this.distributor_Source = {
                    "chart": {
                        "xAxisName": "States",
                        "yAxisName": "Distributors",
                        // "numberSuffix": "k",
                        "theme": "fusion",
                    },
                    "data": this.distributor_state_wise            
                };
            })

        }

        showDealersList=true;
        showKarigarList=false;
        show_karigar_graph=true;
        show_dealer_graph=true;
     
        showDealers(){
            console.log("click");
            this.showDealersList=true;
            this.showKarigarList=false;
            this.get_super_dealers();
        }
        showKarigar(){
            this.showDealersList=false;
            this.showKarigarList=true;
            this.get_super_karigars();
        }
        showKarigarGraph(){
            this.show_karigar_graph=true;
            this.show_dealer_graph=false;
        }
        showDealerGraph(){
            this.show_karigar_graph=false;
            this.show_dealer_graph=true;
        }


        topTenDsr = true;
        topTenSales = false;
        showTopTenDSRs = () => {
            this.topTenDsr = true;
            this.topTenSales = false;
        }
        showTopTenSales = () => {
            this.topTenSales = true;
            this.topTenDsr = false;
        }

        mtd = true;
        ytd = false;
        showMTD = () => {
            this.mtd = true;
            this.ytd = false;
            // this.filter = {};
            // this.getZoneWiseScannedMTD('MTD')
        }

        showYTD = () => {
            this.ytd = true;
            this.mtd = false;
            // this.filter = {};
            // this.getZoneWiseScannedMTD('YTD');
        }

        bottomTenSales = false;
        bottomTenDSR = true;

        showBottomTenDSR = () => {
            this.bottomTenDSR = true;
            this.bottomTenSales = false;
        }
        
        showBottomTenSales = () => {
            this.bottomTenSales = true;
            this.bottomTenDSR = false;
        }

        total_coupon_code_data : any = [];
        scanned_coupon_code_data : any = [];
        total_coupon:any=[];
        scanned_coupon:any=[];
        offer_name:any=[];
        
        
        coupon_code_graph()
        {
            this.db.post_rqst({},'master/get_coupon_code_graph_data')
            .subscribe((resp)=>
            {
                console.log(resp);
                this.total_coupon_code_data = resp.total_coupon;
                this.scanned_coupon_code_data = resp.scanned_coupon;
                
                for(var i=0; i<this.total_coupon_code_data.length; i++)
                {
                    this.total_coupon.push({"value":this.total_coupon_code_data[i]['total_coupon']});
                    
                    this.offer_name.push({"label":this.total_coupon_code_data[i]['title']});
                }
                
                for(var j=0; j<this.scanned_coupon_code_data.length; j++)
                {
                    this.scanned_coupon.push({"value":this.scanned_coupon_code_data[j]['scan_coupon']})
                }
                
                this.dataSource = {
                    chart: {
                        xaxisname: "Offer Name",
                        yaxisname: "Total Number of Coupons",
                        formatnumberscale: "1",
                        plottooltext:
                        "<b>$dataValue</b> apps were available on <b>$seriesName</b> in $label",
                        theme: "fusion",
                        drawcrossline: "1"
                    },
                    categories: [{category : this.offer_name}],
                    dataset:[{seriesname:"Total Coupons", data:this.total_coupon}, {seriesname:"Scanned Coupons", data:this.scanned_coupon}]
                };
            });
        }
        
        
        get_scan_coupon_data()
        {
            this.db.post_rqst({},'master/scanCoupondata')
            .subscribe((resp)=>
            {
                console.log('Response =====>', resp);
                this.scan_coupon_count = resp.scan_coupon_count;
                
                for (let i=0;i < this.scan_coupon_count.length; i++)
                {
                    this.coupon_count.push({"label": this.scan_coupon_count[i].scan_day,"value": this.scan_coupon_count[i].scan_coupon_count});
                }
                
                this.dataSource1 = {
                    "chart": {
                        "xAxisName": "Day's",
                        "yAxisName": "No. of Coupons",
                        "showValues": "0",
                        "theme": "fusion"
                    },
                    "annotations": {
                        "groups": [{
                            "id": "anchor-highlight",
                            "items": [{
                                "id": "high-star",
                                "type": "circle",
                                "x": "$dataset.0.set.2.x",
                                "y": "$dataset.0.set.2.y",
                                "radius": "12",
                                "color": "#6baa01",
                                "border": "2",
                                "borderColor": "#f8bd19"
                            }
                        ]
                    }]
                },
                "data": this.coupon_count
            }
        })  
    }
    
    
    
    goto_offerPage()
    {
        if(this.access_level ==1 ){
            this.router.navigate(["offer-list/active"]);
            }
    }
    
    goto_offergiftPage()
    {
      

        if(this.access_level ==1 ){
            this.router.navigate(['gift-list']);
            }
    }
    
    goto_pending_redeem_rqs_page()
    {
      


        if(this.access_level ==1 ){
            this.router.navigate(['redeem-request-list/pending']);
            }
    } 
    
    goto_balance_coupon_page()
    {
     

        if(this.access_level ==1 ){
            this.router.navigate(['coupon-code-list']);
            }
    }
    
    goto_karigarsPage()
    {
      

        if(this.access_level ==1 ){
            this.router.navigate(['karigar-list/1']);
            }
    }
    
    goto_productPage()
    {
       

      
    }
    goto_feedbackPage()
    {
     

        if(this.access_level ==1 ){
            this.router.navigate(['feedback-list']);
            }
    }
    
}
