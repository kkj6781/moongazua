import { Component, Input, Output } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/Rx';
var AppComponent = /** @class */ (function () {
    function AppComponent(http) {
        this.http = http;
        this.todayPrice = 1;
        this.historicPrice = 1;
        this.coin = "BTC";
        this.day = "01";
        this.month = "00";
        this.year = "2013";
    }
    AppComponent.prototype.ngOnInit = function () {
        this.getTodayData();
        this.getHistoricData();
    };
    AppComponent.prototype.getTodayData = function () {
        var _this = this;
        var apiURLToday = "https://min-api.cryptocompare.com/data/pricehistorical?tsyms=USD";
        apiURLToday += "&fsym=" + this.coin;
        apiURLToday += "&ts=" + Math.floor(Date.now() / 1000);
        this.http.get(apiURLToday)
            .map(function (response) {
            return response.json();
        })
            .subscribe(function (price) {
            _this.todayPrice = price[_this.coin].USD;
            console.log("today: $", _this.todayPrice, " ", _this.coin);
        });
    };
    AppComponent.prototype.getHistoricData = function () {
        var _this = this;
        var apiURLHistoric = "https://min-api.cryptocompare.com/data/pricehistorical?tsyms=USD";
        apiURLHistoric += "&fsym=" + this.coin;
        var date = Math.floor(new Date(Number(this.year), Number(this.month), Number(this.day)).getTime() / 1000);
        apiURLHistoric += "&ts=" + date;
        this.http.get(apiURLHistoric)
            .map(function (response) {
            return response.json();
        })
            .subscribe(function (price) {
            _this.historicPrice = price[_this.coin].USD;
            console.log("historic: $", _this.historicPrice, " ", _this.coin);
        });
    };
    AppComponent.prototype.paramChanged = function (e) {
        if (this.coin && this.month && this.year) {
            this.getTodayData();
            this.getHistoricData();
        }
    };
    AppComponent.decorators = [
        { type: Component, args: [{
                    selector: 'my-app',
                    templateUrl: './app.component.html'
                },] },
    ];
    /** @nocollapse */
    AppComponent.ctorParameters = function () { return [
        { type: Http, },
    ]; };
    AppComponent.propDecorators = {
        "todayPrice": [{ type: Input },],
        "historicPrice": [{ type: Input },],
        "moneyWasted": [{ type: Output },],
        "coin": [{ type: Output },],
        "day": [{ type: Output },],
        "month": [{ type: Output },],
        "year": [{ type: Output },],
    };
    return AppComponent;
}());
export { AppComponent };
