import { Component, OnInit, Input, Output } from '@angular/core';
import {Http, HttpModule} from '@angular/http';
import 'rxjs/Rx';

@Component({
    selector: 'my-app',
    templateUrl: './app.component.html'
})
export class AppComponent implements OnInit {
    constructor(private http: Http) {}

    @Input() todayPrice = 1;
    @Input() historicPrice = 1;

    @Output() coin = "BTC";
    @Output() month = "01";
    @Output() year = "2013";

    ngOnInit(): void {
        this.getTodayData();
        this.getHistoricData();
    }

    getTodayData() {
        let apiURLToday : string = "https://min-api.cryptocompare.com/data/pricehistorical?tsyms=USD";
        apiURLToday += "&fsym=" + this.coin;
        apiURLToday += "&ts=" + Math.floor(Date.now()/1000);
        this.http.get(apiURLToday)
        .map(response => {
            return response.json();
        })
        .subscribe(price => {
            this.todayPrice = price[this.coin].USD;
        });
    }

    getHistoricData() {
        let apiURLHistoric : string = "https://min-api.cryptocompare.com/data/pricehistorical?tsyms=USD";
        apiURLHistoric += "&fsym="+this.coin;
        const date : Number = Math.floor(new Date(Number(this.year), Number(this.month), 1).getTime()/1000);
        apiURLHistoric += "&ts=" + date;
        this.http.get(apiURLHistoric)
        .map(response => {
            return response.json();
        })
        .subscribe(price => {
            this.historicPrice = price[this.coin].USD;
        });
    }

    paramChanged(e : Event): void {
        if (this.coin && this.month && this.year) {
            this.getTodayData();
            this.getHistoricData();
        }
    }
}