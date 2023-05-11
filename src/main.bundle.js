webpackJsonp([1,4],{

/***/ 10:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_angularx_social_login__ = __webpack_require__(32);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AuthenticationService; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var AuthenticationService = (function () {
    function AuthenticationService(auth) {
        this.auth = auth;
        this.username = '';
        this.usertype = '';
        this.picture = '';
        this.repid = 0;
        this.isAuthenticated = false;
        this.AuthHeaders = {
            withCredentials: true,
            headers: { 'Content-Type': 'application/json', 'Authorization': 'Bearer ' }
        };
    }
    return AuthenticationService;
}());
AuthenticationService = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Injectable"])(),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1_angularx_social_login__["d" /* AuthService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1_angularx_social_login__["d" /* AuthService */]) === "function" && _a || Object])
], AuthenticationService);

var _a;
//# sourceMappingURL=authentication.service.js.map

/***/ }),

/***/ 104:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__menu_menu_service__ = __webpack_require__(31);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AppNavigateComponent; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var AppNavigateComponent = (function () {
    function AppNavigateComponent(menuSerivce) {
        this.menuSerivce = menuSerivce;
        this.goodLocation = this.menuSerivce;
    }
    AppNavigateComponent.prototype.ngOnInit = function () {
        this.goodLocation = this.menuSerivce;
    };
    AppNavigateComponent.prototype.changeMenuStatus = function () {
        this.menuSerivce.hideMenu = !this.menuSerivce.hideMenu;
    };
    return AppNavigateComponent;
}());
AppNavigateComponent = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
        selector: 'app-app-navigate',
        template: __webpack_require__(418),
        styles: [__webpack_require__(378)]
    }),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__menu_menu_service__["a" /* MenuService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__menu_menu_service__["a" /* MenuService */]) === "function" && _a || Object])
], AppNavigateComponent);

var _a;
//# sourceMappingURL=app-navigate.component.js.map

/***/ }),

/***/ 105:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__users_authentication_service__ = __webpack_require__(10);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__general_service__ = __webpack_require__(11);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__angular_http__ = __webpack_require__(16);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return BDSComponent; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




var BDSComponent = (function () {
    function BDSComponent(http, general, auth) {
        this.http = http;
        this.general = general;
        this.auth = auth;
        this.currentView = 'NewBDS';
        this.isViewingItem = false;
        this.textarea = '';
        this.showForm = false;
        this.searchText = '';
        this.finalTable = [];
        this.BDSDashboard = [];
        this.BDSColumns = new Array();
        this.NewBDSObject = {
            formName: '',
            'BILLER': '',
            'FACILITY': '',
            'PATIENT_LAST_NAME': '',
            'PATIENT_FIRST_NAME': '',
            'DATE_OF_SERVICE': '',
            'SCAN_DATE': '',
            'IF_OR_HOME': 'IF',
            'INSURANCE': '',
            'TAKEHOMESERIAL': ''
        };
        this.BDSItems = [];
    }
    BDSComponent.prototype.ngOnInit = function () {
        this.BDSColumns = [
            'BILLER',
            'FACILITY',
            'PATIENT_LAST_NAME',
            'PATIENT_FIRST_NAME',
            'DATE_OF_SERVICE',
            'SCAN_DATE',
            'IF_OR_HOME',
            'INSURANCE',
            'TAKEHOMESERIAL'
        ];
        var me = this;
        setTimeout(function () {
            me.finalTable = me.general.BDS;
            me.BDSDashboard = me.general.BDSDashboard;
        }, 1500);
    };
    BDSComponent.prototype.downloadFacilityWarning = function () {
        var headers = new __WEBPACK_IMPORTED_MODULE_3__angular_http__["b" /* Headers */]({ 'Accept': 'text/csv' });
        headers.append('Content-Type', "application/json");
        headers.append('Authorization', "Bearer " + this.auth.token);
        var options = new __WEBPACK_IMPORTED_MODULE_3__angular_http__["c" /* RequestOptions */]({ headers: headers });
        this.http.get(this.general.starter + '/api/v2/bdserrors', options)
            .subscribe(function (res) {
            var blob = new Blob([res.text()], { type: 'text/csv' });
            var url = window.URL.createObjectURL(blob);
            window.open(url);
        }, function (error) { alert("Invalid Request"); console.log(error); });
    };
    BDSComponent.prototype.download = function () {
        var headers = new __WEBPACK_IMPORTED_MODULE_3__angular_http__["b" /* Headers */]({ 'Accept': 'text/csv' });
        headers.append('Content-Type', "application/json");
        headers.append('Authorization', "Bearer " + this.auth.token);
        var options = new __WEBPACK_IMPORTED_MODULE_3__angular_http__["c" /* RequestOptions */]({ headers: headers });
        this.http.get(this.general.starter + '/api/v2/bds/download', options)
            .subscribe(function (res) {
            var blob = new Blob([res.text()], { type: 'text/csv' });
            var url = window.URL.createObjectURL(blob);
            window.open(url);
        }, function (error) { alert("Invalid Request"); console.log(error); });
    };
    BDSComponent.prototype.clearForm = function () {
        this.NewBDSObject.ID = '';
        this.NewBDSObject.PATIENT_FIRST_NAME = '';
        this.NewBDSObject.PATIENT_LAST_NAME = '';
        this.NewBDSObject.INSURANCE = '';
        this.NewBDSObject.TAKEHOMESERIAL = '';
        $("#selectable").focus();
    };
    BDSComponent.prototype.retrieveData = function (updateObject, data, router, menuService, general) {
        updateObject.NewBDSObject.PATIENT_FIRST_NAME = '';
        updateObject.NewBDSObject.PATIENT_LAST_NAME = '';
        updateObject.NewBDSObject.INSURANCE = '';
        updateObject.NewBDSObject.TAKEHOMESERIAL = '';
        updateObject.finalTable = general.BDS;
        updateObject.BDSDashboard = general.BDSDashboard;
        $("#selectable").focus();
    };
    BDSComponent.prototype.searchBDS = function (seachText, searchColumn, offset, isMine) {
        if (seachText === void 0) { seachText = ''; }
        if (searchColumn === void 0) { searchColumn = ''; }
        if (offset === void 0) { offset = 0; }
        if (isMine === void 0) { isMine = false; }
        this.general.bdsFilterColumn = searchColumn;
        this.general.bdsFilterString = seachText;
        this.general.bdsOffset = offset;
        var bds = '/api/v2/bds?';
        bds += (isMine) ? 'mybds=y&' : '';
        this.general.Queries.BDS = bds + "offset=" + this.general.bdsOffset + "&limit=500&filterColumn=" + this.general.bdsFilterColumn + "&filterString=" + this.general.bdsFilterString;
        this.general.getData(this.general.Queries.BDS, 'BDS', this.retrieveData, this, null, this.general);
    };
    BDSComponent.prototype.dateConvertor = function (date) {
        var month = date.getMonth();
        var year = date.getFullYear();
        var day = date.getDate();
        return year + "-" + month + "-" + day;
    };
    BDSComponent.prototype.addNewItem = function () {
        var bds = {};
        for (var prop in this.NewBDSObject) {
            bds[prop] = this.NewBDSObject[prop];
        }
        this.BDSItems.push(bds);
    };
    BDSComponent.prototype.replaceItem = function (item) {
        for (var prop in item) {
            if (prop == 'BILLER_ID') {
                this.NewBDSObject.BILLER = item.BILLER_ID;
            }
            else if (prop == 'FACILITY_ID') {
                this.NewBDSObject.FACILITY = item.FACILITY_ID;
            }
            else if (prop == 'DATE_OF_SERVICE' || prop == 'SCAN_DATE') {
                var spDT = item[prop].split("T");
                this.NewBDSObject[prop] = spDT[0];
            }
            else {
                this.NewBDSObject[prop] = item[prop];
            }
        }
        this.isViewingItem = true;
    };
    BDSComponent.prototype.deleteItem = function (item) {
        var _this = this;
        this.isViewingItem = false;
        var headers = new __WEBPACK_IMPORTED_MODULE_3__angular_http__["b" /* Headers */]({ 'Accept': 'application/json' });
        headers.append('Content-Type', "application/json");
        headers.append('Authorization', "Bearer " + this.auth.token);
        var options = new __WEBPACK_IMPORTED_MODULE_3__angular_http__["c" /* RequestOptions */]({ headers: headers });
        this.http.delete(this.general.starter + '/api/v2/bds/' + item.ID, options)
            .map(function (res) { return res.json(); })
            .subscribe(function (res) {
            alert(res.success);
            _this.general.getData(_this.general.Queries.BDSDashboard, 'BDSDashboard', _this.retrieveData, _this, null, _this.general);
            _this.general.getData(_this.general.Queries.BDS, 'BDS', _this.retrieveData, _this, null, _this.general);
        }, function (error) { alert("Invalid Action. Check Console!"); console.log(error); _this.currentView = 'NewBDS'; }, function () { return _this.currentView = 'NewBDS'; });
    };
    BDSComponent.prototype.downloadBDS = function () {
        var _this = this;
        var headers = new __WEBPACK_IMPORTED_MODULE_3__angular_http__["b" /* Headers */]({ 'Accept': 'application/json' });
        headers.append('Content-Type', "application/json");
        headers.append('Authorization', "Bearer " + this.auth.token);
        var options = new __WEBPACK_IMPORTED_MODULE_3__angular_http__["c" /* RequestOptions */]({ headers: headers });
        this.http.delete(this.general.starter + '/api/v2/download/bds', options)
            .map(function (res) { return res.json(); })
            .subscribe(function (res) { alert(res.success); _this.currentView = 'NewBDS'; }, function (error) { alert(error.error); console.log(error); _this.currentView = 'NewBDS'; }, function () { return _this.currentView = 'NewBDS'; });
    };
    BDSComponent.prototype.bulkUpload = function () {
        var _this = this;
        if (this.textarea !== '' && this.textarea !== null) {
            var headers = new __WEBPACK_IMPORTED_MODULE_3__angular_http__["b" /* Headers */]({ 'Accept': 'application/json' });
            headers.append('Content-Type', "application/json");
            headers.append('Authorization', "Bearer " + this.auth.token);
            var options = new __WEBPACK_IMPORTED_MODULE_3__angular_http__["c" /* RequestOptions */]({ headers: headers });
            this.http.post(this.general.starter + '/api/v2/bds', JSON.stringify({ upload: this.textarea }), options)
                .map(function (res) { return res.json(); })
                .subscribe(function (res) { alert(res.success); _this.general.getData(_this.general.Queries.BDS, 'BDS', _this.retrieveData, _this, null, _this.general); }, function (error) { alert(error.error); console.log(error); _this.currentView = 'NewBDS'; }, function () { return _this.currentView = 'NewBDS'; });
            this.textarea = '';
        }
        else {
            alert('Upload Must Have Data');
        }
    };
    BDSComponent.prototype.saveForm = function () {
        var _this = this;
        this.showForm = false;
        var headers = new __WEBPACK_IMPORTED_MODULE_3__angular_http__["b" /* Headers */]({ 'Accept': 'application/json' });
        headers.append('Content-Type', "application/json");
        headers.append('Authorization', "Bearer " + this.auth.token);
        var options = new __WEBPACK_IMPORTED_MODULE_3__angular_http__["c" /* RequestOptions */]({ headers: headers });
        if (this.NewBDSObject.ID == null || this.NewBDSObject.ID == "") {
            this.http.post(this.general.starter + '/api/v2/bds', JSON.stringify(this.NewBDSObject), options)
                .map(function (res) { return res.json(); })
                .subscribe(function (res) {
                _this.general.getData(_this.general.Queries.BDSDashboard, 'BDSDashboard', _this.retrieveData, _this, null, _this.general);
                _this.general.getData(_this.general.Queries.BDS, 'BDS', _this.retrieveData, _this, null, _this.general);
            }, function (error) { alert("Invalid Entry, check Console"); console.log(error); _this.currentView = 'NewBDS'; }, function () { return _this.currentView = 'NewBDS'; });
        }
        else {
            this.isViewingItem = false;
            this.http.post(this.general.starter + '/api/v2/bds/' + this.NewBDSObject.ID, JSON.stringify(this.NewBDSObject), options)
                .map(function (res) { return res.json(); })
                .subscribe(function (res) {
                _this.general.getData(_this.general.Queries.BDSDashboard, 'BDSDashboard', _this.retrieveData, _this, null, _this.general);
                _this.general.getData(_this.general.Queries.BDS, 'BDS', _this.retrieveData, _this, null, _this.general);
                _this.clearForm();
            }, function (error) { alert("Invalid Entry, check Console"); console.log(error); _this.currentView = 'NewBDS'; }, function () { return _this.currentView = 'NewBDS'; });
        }
    };
    return BDSComponent;
}());
BDSComponent = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
        selector: 'app-bds',
        template: __webpack_require__(419),
        styles: [__webpack_require__(379)]
    }),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_3__angular_http__["d" /* Http */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_3__angular_http__["d" /* Http */]) === "function" && _a || Object, typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_2__general_service__["a" /* GeneralService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_2__general_service__["a" /* GeneralService */]) === "function" && _b || Object, typeof (_c = typeof __WEBPACK_IMPORTED_MODULE_1__users_authentication_service__["a" /* AuthenticationService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__users_authentication_service__["a" /* AuthenticationService */]) === "function" && _c || Object])
], BDSComponent);

var _a, _b, _c;
//# sourceMappingURL=bds.component.js.map

/***/ }),

/***/ 106:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__users_authentication_service__ = __webpack_require__(10);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__general_service__ = __webpack_require__(11);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__angular_http__ = __webpack_require__(16);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return BillersComponent; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




var BillersComponent = (function () {
    function BillersComponent(http, general, auth) {
        this.http = http;
        this.general = general;
        this.auth = auth;
        this.currentView = 'View';
        this.textarea = '';
        this.searchText = '';
        this.showForm = false;
        this.newUser = {
            formName: '',
            ID: '',
            TITLE: '',
            ABBREVIATION: ''
        };
    }
    BillersComponent.prototype.ngOnInit = function () {
        this.finalTable = this.general.Billers;
    };
    BillersComponent.prototype.retrieveData = function (updateObject, data, router, menuService, general) {
        updateObject.searchText = '';
        updateObject.finalTable = general.Billers;
        updateObject.newUser.ID = '';
        updateObject.newUser.TITLE = '';
        updateObject.newUser.ABBREVIATION = '';
    };
    BillersComponent.prototype.download = function () {
        var headers = new __WEBPACK_IMPORTED_MODULE_3__angular_http__["b" /* Headers */]({ 'Accept': 'text/csv' });
        headers.append('Content-Type', "application/json");
        headers.append('Authorization', "Bearer " + this.auth.token);
        var options = new __WEBPACK_IMPORTED_MODULE_3__angular_http__["c" /* RequestOptions */]({ headers: headers });
        this.http.get(this.general.starter + '/api/v2/billers/download', options)
            .subscribe(function (res) {
            var blob = new Blob([res.text()], { type: 'text/csv' });
            var url = window.URL.createObjectURL(blob);
            window.open(url);
        }, function (error) { alert("Invalid Request"); console.log(error); });
    };
    BillersComponent.prototype.bulkUpload = function () {
        var _this = this;
        if (this.textarea !== '' && this.textarea !== null) {
            var headers = new __WEBPACK_IMPORTED_MODULE_3__angular_http__["b" /* Headers */]({ 'Accept': 'application/json' });
            headers.append('Content-Type', "application/json");
            headers.append('Authorization', "Bearer " + this.auth.token);
            var options = new __WEBPACK_IMPORTED_MODULE_3__angular_http__["c" /* RequestOptions */]({ headers: headers });
            this.http.post(this.general.starter + '/api/v2/billers', JSON.stringify({ upload: this.textarea.split("\n") }), options)
                .map(function (res) { return res.json(); })
                .subscribe(function (res) {
                alert(res.success);
                _this.general.getData(_this.general.Queries.Billers, 'Billers', _this.retrieveData, _this, null, _this.general);
                _this.general.getData(_this.general.Queries.Reports, 'Reports', _this.retrieveData, _this, null, _this.general);
                _this.currentView = 'View';
                $("#newUserStartLocation").focus();
            }, function (error) { alert("Invalid Request"); console.log(error); _this.currentView = 'View'; }, function () { return _this.currentView = 'View'; });
            this.textarea = '';
        }
        else {
            alert('Upload Must Have Data');
        }
    };
    BillersComponent.prototype.beginEdit = function (user) {
        this.newUser.ID = user.ID;
        this.newUser.TITLE = user.TITLE;
        this.newUser.ABBREVIATION = user.ABBREVIATION;
        $("#newUserStartLocation").focus();
    };
    BillersComponent.prototype.saveForm = function () {
        var _this = this;
        this.showForm = false;
        if (this.newUser.TITLE !== '') {
            var headers = new __WEBPACK_IMPORTED_MODULE_3__angular_http__["b" /* Headers */]({ 'Accept': 'application/json' });
            headers.append('Content-Type', "application/json");
            headers.append('Authorization', "Bearer " + this.auth.token);
            var options = new __WEBPACK_IMPORTED_MODULE_3__angular_http__["c" /* RequestOptions */]({ headers: headers });
            this.http.post(this.general.starter + '/api/v2/billers', JSON.stringify(this.newUser), options)
                .map(function (res) { return res.json(); })
                .subscribe(function (res) {
                alert(res.success);
                _this.general.getData(_this.general.Queries.Billers, 'Billers', _this.retrieveData, _this, null, _this.general);
                _this.general.getData(_this.general.Queries.Reports, 'Reports', _this.retrieveData, _this, null, _this.general);
                $("#newUserStartLocation").focus();
            }, function (error) { alert("Invalid Request"); console.log(error); _this.currentView = 'View'; }, function () { return _this.currentView = 'View'; });
        }
        else {
            alert('Billers must have a valid Name');
            this.currentView = 'View';
        }
    };
    BillersComponent.prototype.searchUsers = function () {
        var _this = this;
        if (this.searchText == '') {
            this.finalTable = this.general.Billers;
        }
        else {
            this.finalTable = this.general.Billers.filter(function (a) {
                if (a.TITLE.toLowerCase().indexOf(_this.searchText.toLowerCase()) > -1 || a.ABBREVIATION.toLowerCase().indexOf(_this.searchText.toLowerCase()) > -1) {
                    return a;
                }
            });
        }
    };
    return BillersComponent;
}());
BillersComponent = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
        selector: 'app-billers',
        template: __webpack_require__(420),
        styles: [__webpack_require__(380)]
    }),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_3__angular_http__["d" /* Http */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_3__angular_http__["d" /* Http */]) === "function" && _a || Object, typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_2__general_service__["a" /* GeneralService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_2__general_service__["a" /* GeneralService */]) === "function" && _b || Object, typeof (_c = typeof __WEBPACK_IMPORTED_MODULE_1__users_authentication_service__["a" /* AuthenticationService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__users_authentication_service__["a" /* AuthenticationService */]) === "function" && _c || Object])
], BillersComponent);

var _a, _b, _c;
//# sourceMappingURL=billers.component.js.map

/***/ }),

/***/ 107:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__users_authentication_service__ = __webpack_require__(10);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__general_service__ = __webpack_require__(11);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__angular_http__ = __webpack_require__(16);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__date_picker_date_picker_service__ = __webpack_require__(30);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_ngx_spinner__ = __webpack_require__(294);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_ngx_spinner___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_5_ngx_spinner__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return DashboardComponent; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};






var DashboardComponent = (function () {
    function DashboardComponent(http, general, auth, datePicker, spinner) {
        this.http = http;
        this.general = general;
        this.auth = auth;
        this.datePicker = datePicker;
        this.spinner = spinner;
        this.currentView = 'Dashboard';
        this.activeState = 0;
        this.manual = [];
        this.reportName = '';
        this.currentRep = {
            ID: ''
        };
        this.currentRepID = 0;
        this.manualData = {
            REP_ID: 0,
            TITLE: '',
            DESCRIPTION: '',
            AMOUNT: 0
        };
        this.commissionData = {
            PAID_TOTAL: 0,
            COG_TOTAL: 0,
            GENERAL_COMMISSIONS: 0,
            OVERRIDE_COMMISSIONS: 0,
            MANUAL_COMMISSIONS: 0
        };
        this.viewData = [];
        this.viewDataColumns = [];
        this.currentRep = {
            ID: this.auth.repid,
            TITLE: this.auth.username
        };
        this.currentRepID = this.auth.repid;
        this.setCurrentRep();
        var me = this;
        this.datePicker.updateFunction = function () {
            me.setCurrentRep();
        };
    }
    DashboardComponent.prototype.ngOnInit = function () {
        this.currentRep = {
            ID: this.auth.repid,
            TITLE: this.auth.username
        };
        this.currentRepID = this.auth.repid;
        this.setCurrentRep();
        var me = this;
        this.datePicker.updateFunction = function () {
            me.setCurrentRep();
        };
    };
    DashboardComponent.prototype.formatData = function (data) {
        var newData = '';
        try {
            if (!isNaN(data)) {
                newData = data.toFixed(2).replace(/./g, function (c, i, a) {
                    return i && c !== "." && ((a.length - i) % 3 === 0) ? ',' + c : c;
                });
                newData = '$' + newData.toString();
            }
            else {
                if (data.indexOf("T00:00:00.000Z") > -1) {
                    newData = data.replace("T00:00:00.000Z", "");
                }
                else {
                    newData = data;
                }
            }
        }
        catch (e) {
            newData = data;
        }
        return newData;
    };
    DashboardComponent.prototype.setCurrentRep = function (id) {
        var me = this;
        if (id) {
            me.currentRepID = id;
        }
        else {
            me.currentRepID = me.auth.repid;
        }
        setTimeout(function () {
            if (me.general.Reps) {
                var rep = me.general.Reps.filter(function (a) {
                    if (a.ID == me.currentRepID) {
                        return a;
                    }
                });
                if (rep) {
                    if (rep[0]) {
                        me.currentRep = rep[0];
                    }
                }
            }
            me.viewActiveState();
            me.getCommissionData();
            me.getManualData();
        }, 1000);
    };
    DashboardComponent.prototype.newManualEntry = function () {
        var _this = this;
        if (this.manualData.TITLE !== '') {
            var headers = new __WEBPACK_IMPORTED_MODULE_3__angular_http__["b" /* Headers */]({ 'Accept': 'application/json' });
            headers.append('Content-Type', "application/json");
            headers.append('Authorization', "Bearer " + this.auth.token);
            var options = new __WEBPACK_IMPORTED_MODULE_3__angular_http__["c" /* RequestOptions */]({ headers: headers });
            this.manualData['month'] = this.datePicker.UploadMonth.number;
            this.manualData['year'] = this.datePicker.UploadYear.number;
            this.http.post(this.general.starter + '/api/v2/dashboard/manual/' + this.currentRep.ID, JSON.stringify(this.manualData), options)
                .map(function (res) { return res.json(); })
                .subscribe(function (res) {
                alert("Added Manual Entry");
                _this.getManualData();
                _this.getCommissionData();
                _this.viewDataColumns = [];
                _this.viewData = [];
                _this.reportName = '';
            }, function (error) { alert("Invalid Request"); console.log(error); _this.currentView = 'View'; });
        }
        else {
            alert('Data must have a valid Title');
        }
    };
    DashboardComponent.prototype.removeManualEntry = function (manual) {
        var _this = this;
        var headers = new __WEBPACK_IMPORTED_MODULE_3__angular_http__["b" /* Headers */]({ 'Accept': 'application/json' });
        headers.append('Content-Type', "application/json");
        headers.append('Authorization', "Bearer " + this.auth.token);
        var options = new __WEBPACK_IMPORTED_MODULE_3__angular_http__["c" /* RequestOptions */]({ headers: headers });
        this.http.delete(this.general.starter + '/api/v2/dashboard/manual/' + manual.ID, options)
            .map(function (res) { return res.json(); })
            .subscribe(function (res) {
            alert("Removed Manual Entry");
            _this.getManualData();
            _this.getCommissionData();
        }, function (error) { alert("Invalid Request"); console.log(error); _this.currentView = 'View'; });
    };
    DashboardComponent.prototype.getManualData = function () {
        var _this = this;
        var headers = new __WEBPACK_IMPORTED_MODULE_3__angular_http__["b" /* Headers */]({ 'Accept': 'application/json' });
        headers.append('Authorization', "Bearer " + this.auth.token);
        var options = new __WEBPACK_IMPORTED_MODULE_3__angular_http__["c" /* RequestOptions */]({ headers: headers });
        options.withCredentials = false;
        if (this.currentRep) {
            this.http.get(this.general.starter + ("/api/v2/dashboard/manual/" + this.currentRep.ID + "?month=" + this.datePicker.UploadMonth.number + "&year=" + this.datePicker.UploadYear.number), options)
                .map(function (response) { return response.json(); })
                .subscribe(function (response) {
                _this.manual = response.successObject;
            }, function (error) {
                console.log(error);
            });
        }
    };
    DashboardComponent.prototype.downloadPaidBDS = function () {
        var headers = new __WEBPACK_IMPORTED_MODULE_3__angular_http__["b" /* Headers */]({ 'Accept': 'text/csv' });
        headers.append('Content-Type', "application/json");
        headers.append('Authorization', "Bearer " + this.auth.token);
        var options = new __WEBPACK_IMPORTED_MODULE_3__angular_http__["c" /* RequestOptions */]({ headers: headers });
        this.http.get(this.general.starter + '/api/v2/paid/download?month=' + this.datePicker.UploadMonth.number + "&year=" + this.datePicker.UploadYear.number, options)
            .subscribe(function (res) {
            var blob = new Blob([res.text()], { type: 'text/csv' });
            var url = window.URL.createObjectURL(blob);
            window.open(url);
        }, function (error) { alert("Invalid Request"); console.log(error); });
    };
    DashboardComponent.prototype.downloadCOGS = function () {
        var headers = new __WEBPACK_IMPORTED_MODULE_3__angular_http__["b" /* Headers */]({ 'Accept': 'text/csv' });
        headers.append('Content-Type', "application/json");
        headers.append('Authorization', "Bearer " + this.auth.token);
        var options = new __WEBPACK_IMPORTED_MODULE_3__angular_http__["c" /* RequestOptions */]({ headers: headers });
        this.http.get(this.general.starter + '/api/v2/cogs/download?month=' + this.datePicker.UploadMonth.number + "&year=" + this.datePicker.UploadYear.number, options)
            .subscribe(function (res) {
            var blob = new Blob([res.text()], { type: 'text/csv' });
            var url = window.URL.createObjectURL(blob);
            window.open(url);
        }, function (error) { alert("Invalid Request"); console.log(error); });
    };
    DashboardComponent.prototype.downloadCOMMISSION = function () {
        var headers = new __WEBPACK_IMPORTED_MODULE_3__angular_http__["b" /* Headers */]({ 'Accept': 'text/csv' });
        headers.append('Content-Type', "application/json");
        headers.append('Authorization', "Bearer " + this.auth.token);
        var options = new __WEBPACK_IMPORTED_MODULE_3__angular_http__["c" /* RequestOptions */]({ headers: headers });
        this.http.get(this.general.starter + '/api/v2/commission/download?month=' + this.datePicker.UploadMonth.number + "&year=" + this.datePicker.UploadYear.number, options)
            .subscribe(function (res) {
            var blob = new Blob([res.text()], { type: 'text/csv' });
            var url = window.URL.createObjectURL(blob);
            window.open(url);
        }, function (error) { alert("Invalid Request"); console.log(error); });
    };
    DashboardComponent.prototype.downloadPaidReps = function () {
        var headers = new __WEBPACK_IMPORTED_MODULE_3__angular_http__["b" /* Headers */]({ 'Accept': 'text/csv' });
        headers.append('Content-Type', "application/json");
        headers.append('Authorization', "Bearer " + this.auth.token);
        var options = new __WEBPACK_IMPORTED_MODULE_3__angular_http__["c" /* RequestOptions */]({ headers: headers });
        this.http.get(this.general.starter + '/api/v2/paidrep/download?month=' + this.datePicker.UploadMonth.number + "&year=" + this.datePicker.UploadYear.number, options)
            .subscribe(function (res) {
            var blob = new Blob([res.text()], { type: 'text/csv' });
            var url = window.URL.createObjectURL(blob);
            window.open(url);
        }, function (error) { alert("Invalid Request"); console.log(error); });
    };
    DashboardComponent.prototype.downloadCogsReps = function () {
        var headers = new __WEBPACK_IMPORTED_MODULE_3__angular_http__["b" /* Headers */]({ 'Accept': 'text/csv' });
        headers.append('Content-Type', "application/json");
        headers.append('Authorization', "Bearer " + this.auth.token);
        var options = new __WEBPACK_IMPORTED_MODULE_3__angular_http__["c" /* RequestOptions */]({ headers: headers });
        this.http.get(this.general.starter + '/api/v2/cogrep/download?month=' + this.datePicker.UploadMonth.number + "&year=" + this.datePicker.UploadYear.number, options)
            .subscribe(function (res) {
            var blob = new Blob([res.text()], { type: 'text/csv' });
            var url = window.URL.createObjectURL(blob);
            window.open(url);
        }, function (error) { alert("Invalid Request"); console.log(error); });
    };
    DashboardComponent.prototype.downloadCOMMISSIONDetail = function () {
        var headers = new __WEBPACK_IMPORTED_MODULE_3__angular_http__["b" /* Headers */]({ 'Accept': 'text/csv' });
        headers.append('Content-Type', "application/json");
        headers.append('Authorization', "Bearer " + this.auth.token);
        var options = new __WEBPACK_IMPORTED_MODULE_3__angular_http__["c" /* RequestOptions */]({ headers: headers });
        this.http.get(this.general.starter + '/api/v2/commissiondetail/download?month=' + this.datePicker.UploadMonth.number + "&year=" + this.datePicker.UploadYear.number, options)
            .subscribe(function (res) {
            var blob = new Blob([res.text()], { type: 'text/csv' });
            var url = window.URL.createObjectURL(blob);
            window.open(url);
        }, function (error) { alert("Invalid Request"); console.log(error); });
    };
    DashboardComponent.prototype.downloadPaidVsCogs = function () {
        var headers = new __WEBPACK_IMPORTED_MODULE_3__angular_http__["b" /* Headers */]({ 'Accept': 'text/csv' });
        headers.append('Content-Type', "application/json");
        headers.append('Authorization', "Bearer " + this.auth.token);
        var options = new __WEBPACK_IMPORTED_MODULE_3__angular_http__["c" /* RequestOptions */]({ headers: headers });
        this.http.get(this.general.starter + '/api/v2/paidvscogs/download?month=' + this.datePicker.UploadMonth.number + "&year=" + this.datePicker.UploadYear.number, options)
            .subscribe(function (res) {
            var blob = new Blob([res.text()], { type: 'text/csv' });
            var url = window.URL.createObjectURL(blob);
            window.open(url);
        }, function (error) { alert("Invalid Request"); console.log(error); });
    };
    DashboardComponent.prototype.downloadFacilitiesWithRep = function () {
        var headers = new __WEBPACK_IMPORTED_MODULE_3__angular_http__["b" /* Headers */]({ 'Accept': 'text/csv' });
        headers.append('Content-Type', "application/json");
        headers.append('Authorization', "Bearer " + this.auth.token);
        var options = new __WEBPACK_IMPORTED_MODULE_3__angular_http__["c" /* RequestOptions */]({ headers: headers });
        this.http.get(this.general.starter + '/api/v2/facility_reps/download', options)
            .subscribe(function (res) {
            var blob = new Blob([res.text()], { type: 'text/csv' });
            var url = window.URL.createObjectURL(blob);
            window.open(url);
        }, function (error) { alert("Invalid Request"); console.log(error); });
    };
    DashboardComponent.prototype.viewActiveState = function () {
        var _this = this;
        var headers = new __WEBPACK_IMPORTED_MODULE_3__angular_http__["b" /* Headers */]({ 'Accept': 'application/json' });
        headers.append('Content-Type', "application/json");
        headers.append('Authorization', "Bearer " + this.auth.token);
        var options = new __WEBPACK_IMPORTED_MODULE_3__angular_http__["c" /* RequestOptions */]({ headers: headers });
        this.spinner.show();
        this.http.get(this.general.starter + ("/api/v2/dashboard/activestate?month=" + this.datePicker.UploadMonth.number + "&year=" + this.datePicker.UploadYear.number), options)
            .map(function (res) { return res.json(); })
            .subscribe(function (res) {
            try {
                if (res.activeState.ISACTIVE == null)
                    _this.activeState = res.IsActive;
                else
                    _this.activeState = res.activeState.ISACTIVE;
                _this.spinner.hide();
            }
            catch (exception_var) {
                _this.spinner.hide();
            }
        }, function (error) {
            _this.spinner.hide();
            alert("Invalid Request");
            console.log(error);
        });
    };
    DashboardComponent.prototype.setActiveState = function (isActive) {
        var _this = this;
        var data = {
            isActive: isActive,
            month: this.datePicker.UploadMonth.number,
            year: this.datePicker.UploadYear.number
        };
        var headers = new __WEBPACK_IMPORTED_MODULE_3__angular_http__["b" /* Headers */]({ 'Accept': 'application/json' });
        headers.append('Content-Type', "application/json");
        headers.append('Authorization', "Bearer " + this.auth.token);
        var options = new __WEBPACK_IMPORTED_MODULE_3__angular_http__["c" /* RequestOptions */]({ headers: headers });
        var me = this;
        this.spinner.show();
        this.http.post(this.general.starter + "/api/v2/dashboard/activestate", JSON.stringify(data), options)
            .map(function (res) { return res.json(); })
            .subscribe(function (res) {
            try {
                if (res.activeState == null)
                    me.activeState = res.IsActive;
                else if (res.activeState[0] == null)
                    me.activeState = res.activeState;
                else if (res.activeState[0].ISACTIVE == null)
                    me.activeState = res.activeState[0];
                else
                    me.activeState = res.activeState[0].ISACTIVE;
                _this.spinner.hide();
            }
            catch (exception_var) {
                _this.spinner.hide();
            }
            //alert(`Commissions Have Been Updated with Report Status: ${((me.activeState == 0) ? 'INACTIVE' : 'ACTIVE')}`)
        }, function (error) {
            _this.spinner.hide();
            alert("Invalid Request");
            console.log(error);
        });
    };
    DashboardComponent.prototype.getCommissionData = function () {
        var _this = this;
        var headers = new __WEBPACK_IMPORTED_MODULE_3__angular_http__["b" /* Headers */]({ 'Accept': 'application/json' });
        headers.append('Content-Type', "application/json");
        headers.append('Authorization', "Bearer " + this.auth.token);
        var options = new __WEBPACK_IMPORTED_MODULE_3__angular_http__["c" /* RequestOptions */]({ headers: headers });
        if (this.currentRep) {
            this.http.get(this.general.starter + ("/api/v2/dashboard/detail/" + this.currentRep.ID + "?month=" + this.datePicker.UploadMonth.number + "&year=" + this.datePicker.UploadYear.number), options)
                .map(function (res) { return res.json(); })
                .subscribe(function (res) {
                if (res.successObject) {
                    _this.commissionData = res.successObject;
                }
                else {
                    _this.commissionData = {
                        PAID_TOTAL: 0,
                        COG_TOTAL: 0,
                        GENERAL_COMMISSIONS: 0,
                        OVERRIDE_COMMISSIONS: 0,
                        MANUAL_COMMISSIONS: 0
                    };
                }
            }, function (error) { alert("Invalid Request"); console.log(error); });
        }
        else {
            this.http.get(this.general.starter + ("/api/v2/dashboard/detail/" + this.auth.repid + "?month=" + this.datePicker.UploadMonth.number + "&year=" + this.datePicker.UploadYear.number), options)
                .map(function (res) { return res.json(); })
                .subscribe(function (res) {
                if (res.successObject) {
                    _this.commissionData = res.successObject;
                }
                else {
                    _this.commissionData = {
                        PAID_TOTAL: 0,
                        COG_TOTAL: 0,
                        GENERAL_COMMISSIONS: 0,
                        OVERRIDE_COMMISSIONS: 0,
                        MANUAL_COMMISSIONS: 0
                    };
                }
            }, function (error) { alert("Invalid Request"); console.log(error); });
        }
    };
    DashboardComponent.prototype.showDetail = function (type, detailView, reportName) {
        var _this = this;
        var headers = new __WEBPACK_IMPORTED_MODULE_3__angular_http__["b" /* Headers */]({ 'Accept': 'application/json' });
        headers.append('Content-Type', "application/json");
        headers.append('Authorization', "Bearer " + this.auth.token);
        var options = new __WEBPACK_IMPORTED_MODULE_3__angular_http__["c" /* RequestOptions */]({ headers: headers });
        var query = this.http.get(this.general.starter + ("/api/v2/dashboard/detail/" + this.currentRep.ID + "/" + type + "?type=" + ((detailView) ? 'detail' : 'summary') + "&month=" + this.datePicker.UploadMonth.number + "&year=" + this.datePicker.UploadYear.number), options)
            .map(function (res) { return res.json(); })
            .subscribe(function (res) {
            _this.viewDataColumns = [];
            _this.viewData = [];
            _this.reportName = reportName;
            for (var column in res.successObject[0]) {
                _this.viewDataColumns.push(column);
            }
            _this.viewData = res.successObject;
        }, function (error) { alert("Invalid Request"); console.log(error); });
    };
    return DashboardComponent;
}());
DashboardComponent = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
        selector: 'app-dashboard',
        template: __webpack_require__(421),
        styles: [__webpack_require__(381)]
    }),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_3__angular_http__["d" /* Http */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_3__angular_http__["d" /* Http */]) === "function" && _a || Object, typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_2__general_service__["a" /* GeneralService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_2__general_service__["a" /* GeneralService */]) === "function" && _b || Object, typeof (_c = typeof __WEBPACK_IMPORTED_MODULE_1__users_authentication_service__["a" /* AuthenticationService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__users_authentication_service__["a" /* AuthenticationService */]) === "function" && _c || Object, typeof (_d = typeof __WEBPACK_IMPORTED_MODULE_4__date_picker_date_picker_service__["a" /* DatePickerService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_4__date_picker_date_picker_service__["a" /* DatePickerService */]) === "function" && _d || Object, typeof (_e = typeof __WEBPACK_IMPORTED_MODULE_5_ngx_spinner__["NgxSpinnerService"] !== "undefined" && __WEBPACK_IMPORTED_MODULE_5_ngx_spinner__["NgxSpinnerService"]) === "function" && _e || Object])
], DashboardComponent);

var _a, _b, _c, _d, _e;
//# sourceMappingURL=dashboard.component.js.map

/***/ }),

/***/ 108:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__users_authentication_service__ = __webpack_require__(10);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__general_service__ = __webpack_require__(11);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__angular_http__ = __webpack_require__(16);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return FacilitiesComponent; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




var FacilitiesComponent = (function () {
    function FacilitiesComponent(http, general, auth) {
        this.http = http;
        this.general = general;
        this.auth = auth;
        this.currentView = 'View';
        this.textarea = '';
        this.searchText = '';
        this.showForm = false;
        this.newUser = {
            formName: '',
            ID: '',
            TITLE: '',
            ACRONYMN: ''
        };
    }
    FacilitiesComponent.prototype.ngOnInit = function () {
        this.finalTable = this.general.Facilities;
    };
    FacilitiesComponent.prototype.changeView = function (view) {
        this.currentView = view;
    };
    FacilitiesComponent.prototype.retrieveData = function (updateObject, data, router, menuService, general) {
        updateObject.searchText = '';
        updateObject.finalTable = general.Facilities;
        updateObject.newUser.ID = '';
        updateObject.newUser.TITLE = '';
        updateObject.newUser.ACRONYM = '';
    };
    FacilitiesComponent.prototype.beginEdit = function (user) {
        this.newUser.ID = user.ID;
        this.newUser.TITLE = user.TITLE;
        this.newUser.ACRONYM = user.ACRONYM;
        $("#newUserStartLocation").focus();
    };
    FacilitiesComponent.prototype.download = function () {
        var headers = new __WEBPACK_IMPORTED_MODULE_3__angular_http__["b" /* Headers */]({ 'Accept': 'text/csv' });
        headers.append('Content-Type', "application/json");
        headers.append('Authorization', "Bearer " + this.auth.token);
        var options = new __WEBPACK_IMPORTED_MODULE_3__angular_http__["c" /* RequestOptions */]({ headers: headers });
        this.http.get(this.general.starter + '/api/v2/facilities/download', options)
            .subscribe(function (res) {
            var blob = new Blob([res.text()], { type: 'text/csv' });
            var url = window.URL.createObjectURL(blob);
            window.open(url);
        }, function (error) { alert("Invalid Request"); console.log(error); });
    };
    FacilitiesComponent.prototype.bulkUpload = function () {
        var _this = this;
        if (this.textarea !== '' && this.textarea !== null) {
            var headers = new __WEBPACK_IMPORTED_MODULE_3__angular_http__["b" /* Headers */]({ 'Accept': 'application/json' });
            headers.append('Content-Type', "application/json");
            headers.append('Authorization', "Bearer " + this.auth.token);
            var options = new __WEBPACK_IMPORTED_MODULE_3__angular_http__["c" /* RequestOptions */]({ headers: headers });
            this.http.post(this.general.starter + '/api/v2/facilities', JSON.stringify({ upload: this.textarea }), options)
                .map(function (res) { return res.json(); })
                .subscribe(function (res) {
                alert(res.success);
                _this.general.getData(_this.general.Queries.Facilities, 'Facilities', _this.retrieveData, _this, null, _this.general);
                _this.currentView = 'View';
                $("#newUserStartLocation").focus();
            }, function (error) { alert(error.error); console.log(error); _this.currentView = 'View'; }, function () { return _this.currentView = 'View'; });
            this.textarea = '';
        }
        else {
            alert('Upload Must Have Data');
        }
    };
    FacilitiesComponent.prototype.saveForm = function () {
        var _this = this;
        this.showForm = false;
        if (this.newUser.TITLE !== '') {
            var headers = new __WEBPACK_IMPORTED_MODULE_3__angular_http__["b" /* Headers */]({ 'Accept': 'application/json' });
            headers.append('Content-Type', "application/json");
            headers.append('Authorization', "Bearer " + this.auth.token);
            var options = new __WEBPACK_IMPORTED_MODULE_3__angular_http__["c" /* RequestOptions */]({ headers: headers });
            this.http.post(this.general.starter + '/api/v2/facilities', JSON.stringify(this.newUser), options)
                .map(function (res) { return res.json(); })
                .subscribe(function (res) {
                alert(res.success);
                _this.general.getData(_this.general.Queries.Facilities, 'Facilities', _this.retrieveData, _this, null, _this.general);
                $("#newUserStartLocation").focus();
            }, function (error) { alert(error.error); console.log(error); _this.currentView = 'View'; }, function () { return _this.currentView = 'View'; });
        }
        else {
            alert('Facility must have a valid Name');
            this.currentView = 'View';
        }
    };
    FacilitiesComponent.prototype.searchUsers = function () {
        var _this = this;
        if (this.searchText == '') {
            this.finalTable = this.general.Facilities;
        }
        else {
            this.finalTable = this.general.Facilities.filter(function (a) {
                if (a.TITLE.toLowerCase().indexOf(_this.searchText.toLowerCase()) > -1 || a.ACRONYM.toLowerCase().indexOf(_this.searchText.toLowerCase()) > -1) {
                    return a;
                }
            });
        }
    };
    return FacilitiesComponent;
}());
FacilitiesComponent = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
        selector: 'app-facilities',
        template: __webpack_require__(423),
        styles: [__webpack_require__(383)]
    }),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_3__angular_http__["d" /* Http */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_3__angular_http__["d" /* Http */]) === "function" && _a || Object, typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_2__general_service__["a" /* GeneralService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_2__general_service__["a" /* GeneralService */]) === "function" && _b || Object, typeof (_c = typeof __WEBPACK_IMPORTED_MODULE_1__users_authentication_service__["a" /* AuthenticationService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__users_authentication_service__["a" /* AuthenticationService */]) === "function" && _c || Object])
], FacilitiesComponent);

var _a, _b, _c;
//# sourceMappingURL=facilities.component.js.map

/***/ }),

/***/ 109:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return InvalidRouteComponent; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};

var InvalidRouteComponent = (function () {
    function InvalidRouteComponent() {
    }
    InvalidRouteComponent.prototype.ngOnInit = function () {
    };
    return InvalidRouteComponent;
}());
InvalidRouteComponent = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
        selector: 'app-invalid-route',
        template: __webpack_require__(424),
        styles: [__webpack_require__(384)]
    }),
    __metadata("design:paramtypes", [])
], InvalidRouteComponent);

//# sourceMappingURL=invalid-route.component.js.map

/***/ }),

/***/ 11:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_http__ = __webpack_require__(16);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__Components_users_authentication_service__ = __webpack_require__(10);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__angular_router__ = __webpack_require__(29);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return GeneralService; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




var GeneralService = (function () {
    function GeneralService(http, auth, router) {
        this.http = http;
        this.auth = auth;
        this.router = router;
        this.mode = 'PRODUCTION';
        this.bdsOffset = 0;
        this.bdsFilterColumn = '';
        this.bdsFilterString = '';
        this.starter = (this.mode == 'PRODUCTION') ? '' : 'http://localhost:3000';
        this.showLogin = true;
        this.Queries = {
            Reps: '/api/v2/reps',
            Facilities: '/api/v2/facilities',
            Users: '/api/v2/users',
            Billers: '/api/v2/billers',
            ActiveReports: '/api/v2/activereports',
            BDS: "/api/v2/bds?offset=" + this.bdsOffset + "&limit=500&filterColumn=" + this.bdsFilterColumn + "&filterString=" + this.bdsFilterString,
            BDSDashboard: "/api/v2/bdsdashboard",
            Reports: '/api/v2/reports'
        };
    }
    GeneralService.prototype.kill = function () {
        this.Reps = null;
        this.Facilities = null;
        this.Users = null;
        this.Billers = null;
        this.ActiveReports = null;
        this.BDS = null;
        this.Reports = null;
        this.BDSDashboard = null;
        this.CustomObject = null;
        this.ErrorObject = null;
        this.isComplete = false;
        this.bdsOffset = 0;
        this.bdsFilterColumn = '';
        this.bdsFilterString = '';
    };
    GeneralService.prototype.initialize = function () {
        for (var prop in this.Queries) {
            this.getData(this.Queries[prop], prop);
        }
    };
    GeneralService.prototype.getData = function (query, object, callback, updateObject, menuService, general, errorCallback) {
        var _this = this;
        this.isComplete = false;
        var headers = new __WEBPACK_IMPORTED_MODULE_1__angular_http__["b" /* Headers */]({ 'Accept': 'application/json' });
        headers.append('Authorization', "Bearer " + this.auth.token);
        var options = new __WEBPACK_IMPORTED_MODULE_1__angular_http__["c" /* RequestOptions */]({ headers: headers });
        options.withCredentials = false;
        if (object) {
            this.http.get(this.starter + query, options)
                .map(function (response) { return response.json(); })
                .subscribe(function (response) {
                _this[object] = response.successObject;
                if (callback) {
                    callback(updateObject, response.successObject, _this.router, menuService, general);
                }
            }, function (error) {
                _this.ErrorObject = error;
                console.log(error);
                if (errorCallback) {
                    errorCallback(updateObject, error, _this.router, menuService, general);
                }
            }, function () {
                _this.isComplete = true;
            });
        }
        else {
            this.http.get(this.starter + query, options)
                .map(function (response) { return response.json(); })
                .subscribe(function (response) {
                callback(updateObject, response[0], _this.router, menuService, general);
            }, function (error) {
                console.log(error);
                if (errorCallback) {
                    errorCallback(updateObject, error, _this.router, menuService, general);
                }
            });
        }
    };
    return GeneralService;
}());
GeneralService = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Injectable"])(),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__angular_http__["d" /* Http */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__angular_http__["d" /* Http */]) === "function" && _a || Object, typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_2__Components_users_authentication_service__["a" /* AuthenticationService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_2__Components_users_authentication_service__["a" /* AuthenticationService */]) === "function" && _b || Object, typeof (_c = typeof __WEBPACK_IMPORTED_MODULE_3__angular_router__["b" /* Router */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_3__angular_router__["b" /* Router */]) === "function" && _c || Object])
], GeneralService);

var _a, _b, _c;
//# sourceMappingURL=general.service.js.map

/***/ }),

/***/ 110:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_router__ = __webpack_require__(29);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__menu_menu_service__ = __webpack_require__(31);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__users_authentication_service__ = __webpack_require__(10);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__general_service__ = __webpack_require__(11);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_angularx_social_login__ = __webpack_require__(32);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return LoginComponent; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};







var LoginComponent = (function () {
    function LoginComponent(general, authService, auth, router, menuService) {
        var _this = this;
        this.general = general;
        this.authService = authService;
        this.auth = auth;
        this.router = router;
        this.menuService = menuService;
        this.router.events.subscribe(function (val) {
            if (val instanceof __WEBPACK_IMPORTED_MODULE_1__angular_router__["a" /* NavigationEnd */]) {
                var route = val.urlAfterRedirects;
                _this.menuService.selectItem(route);
            }
        });
    }
    LoginComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.authService.authState.subscribe(function (user) {
            _this.user = user;
            _this.loggedIn = (user != null);
        });
        function errorAuth2(updateObject, error, router, menuService, general) {
            console.log('errorAuth2');
            console.log(error);
            general.kill();
            menuService.kill();
            general.showLogin = true;
            router.navigate(['']);
        }
        function updateAuth2(updateObject, data, router, menuService, general) {
            console.log('updateAuth2');
            if (data) {
                updateObject.picture = data.PICTURE;
                updateObject.username = data.DISPLAY_NAME;
                updateObject.usertype = data.USER_TYPE;
                updateObject.repid = data.REP_ID;
                updateObject.token = localStorage.getItem('ng2-ui-auth_token');
                updateObject.AuthHeaders.headers.Authorization += updateObject.token;
                general.initialize();
                menuService.initialize();
                menuService.showMenu = true;
                console.log(menuService.initialScreen);
                router.navigate([menuService.initialScreen]);
            }
        }
        if (localStorage.getItem('ng2-ui-auth_token')) {
            this.menuService.hasInitialized = true;
            this.auth.token = localStorage.getItem('ng2-ui-auth_token');
            this.general.getData('/api/v2/me', null, updateAuth2, this.auth, this.menuService, this.general, errorAuth2);
        }
    };
    LoginComponent.prototype.signInWithGoogle = function () {
        var _this = this;
        this.authService.signIn(__WEBPACK_IMPORTED_MODULE_5_angularx_social_login__["b" /* GoogleLoginProvider */].PROVIDER_ID).then(function (user) {
            //alert("Sign In Promise processing...");
            console.log('Called service from login component');
            _this.general.showLogin = false;
            _this.authService.authState.subscribe(function (user) {
                //alert("Have the user...");
                _this.user = user;
                _this.loggedIn = (user != null);
                localStorage.setItem('ng2-ui-auth_token', user.idToken);
                _this.auth.token = user.idToken;
                _this.auth.AuthHeaders.headers.Authorization += _this.auth.token;
                function errorAuth(updateObject, error, router, menuService, general) {
                    console.log('errorAuth');
                    //alert("Error Auth");
                    console.log(error);
                    general.kill();
                    menuService.kill();
                    general.showLogin = true;
                    router.navigate(['']);
                }
                function updateAuth(updateObject, data, router, menuService, general) {
                    console.log('updateAuth');
                    if (data) {
                        //alert("Updating autho info");
                        general.showLogin = false;
                        updateObject.isAuthenticated = true;
                        updateObject.picture = data.PICTURE;
                        updateObject.username = data.DISPLAY_NAME;
                        updateObject.usertype = data.USER_TYPE;
                        updateObject.repid = data.REP_ID;
                        updateObject.token = localStorage.getItem('ng2-ui-auth_token');
                        updateObject.AuthHeaders.headers.Authorization += updateObject.token;
                        general.initialize();
                        menuService.initialize();
                        menuService.showMenu = true;
                        console.log(menuService.initialScreen);
                        router.navigate([menuService.initialScreen]);
                    }
                    else {
                        alert("Unable to Log you in. Your credentials are invalid");
                        general.kill();
                        menuService.kill();
                        general.showLogin = true;
                        router.navigate(['']);
                    }
                }
                console.log('get user data');
                if (localStorage.getItem('ng2-ui-auth_token')) {
                    //alert("getting user data");
                    _this.menuService.hasInitialized = true;
                    _this.general.getData('/api/v2/me', null, updateAuth, _this.auth, _this.menuService, _this.general, errorAuth);
                }
                //console.log('redirect');
                //this.router.navigate([this.menuService.initialScreen]);  
            }, function (error) {
                console.log(error);
                localStorage.removeItem('ng2-ui-auth_token');
                _this.general.kill();
                _this.menuService.kill();
                _this.general.showLogin = true;
                _this.router.navigate(['']);
                alert("Unable to Log you in. Google was unable to authenticate you");
            }, function () {
            });
        }).catch(function () {
            localStorage.removeItem('ng2-ui-auth_token');
            alert("Unable to Log you in. Your credentials are invalid");
            _this.general.kill();
            _this.menuService.kill();
            _this.general.showLogin = true;
            _this.router.navigate(['']);
        });
    };
    LoginComponent.prototype.signOut = function () {
        this.authService.signOut();
    };
    return LoginComponent;
}());
LoginComponent = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
        selector: 'app-login',
        template: __webpack_require__(425),
        styles: [__webpack_require__(385)]
    }),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_4__general_service__["a" /* GeneralService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_4__general_service__["a" /* GeneralService */]) === "function" && _a || Object, typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_5_angularx_social_login__["d" /* AuthService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_5_angularx_social_login__["d" /* AuthService */]) === "function" && _b || Object, typeof (_c = typeof __WEBPACK_IMPORTED_MODULE_3__users_authentication_service__["a" /* AuthenticationService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_3__users_authentication_service__["a" /* AuthenticationService */]) === "function" && _c || Object, typeof (_d = typeof __WEBPACK_IMPORTED_MODULE_1__angular_router__["b" /* Router */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__angular_router__["b" /* Router */]) === "function" && _d || Object, typeof (_e = typeof __WEBPACK_IMPORTED_MODULE_2__menu_menu_service__["a" /* MenuService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_2__menu_menu_service__["a" /* MenuService */]) === "function" && _e || Object])
], LoginComponent);

var _a, _b, _c, _d, _e;
//# sourceMappingURL=login.component.js.map

/***/ }),

/***/ 111:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ReportsComponent; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};

var ReportsComponent = (function () {
    function ReportsComponent() {
    }
    ReportsComponent.prototype.ngOnInit = function () {
    };
    return ReportsComponent;
}());
ReportsComponent = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
        selector: 'app-reports',
        template: __webpack_require__(428),
        styles: [__webpack_require__(388)]
    }),
    __metadata("design:paramtypes", [])
], ReportsComponent);

//# sourceMappingURL=reports.component.js.map

/***/ }),

/***/ 112:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__users_authentication_service__ = __webpack_require__(10);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__general_service__ = __webpack_require__(11);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__angular_http__ = __webpack_require__(16);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__date_picker_date_picker_service__ = __webpack_require__(30);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return RepsComponent; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





var RepsComponent = (function () {
    function RepsComponent(http, general, auth, datePicker) {
        this.http = http;
        this.general = general;
        this.auth = auth;
        this.datePicker = datePicker;
        this.currentRep = null;
        this.currentView = 'View';
        this.textarea = '';
        this.textareaB = '';
        this.searchText = '';
        this.commissionTable = null;
        this.showForm = false;
        this.FacilitycurrentView = '';
        this.newUser = {
            formName: '',
            ID: '',
            TITLE: '',
            COMMISSION: 0
        };
        this.newUserB = {
            formName: '',
            ID: '',
            REP_ID: '',
            FACILITY_ID: '',
            COMMISSION: '',
            COMMISSIONTYPE: 'GENERAL',
            UPLOAD_MONTH: '',
            UPLOAD_YEAR: '',
            SHOW_FACILITY: ''
        };
    }
    RepsComponent.prototype.ngOnInit = function () {
        this.finalTable = this.general.Reps;
    };
    RepsComponent.prototype.changeView = function (view) {
        this.currentView = view;
    };
    RepsComponent.prototype.beginEdit = function (user) {
        this.newUser.ID = user.ID;
        this.newUser.TITLE = user.TITLE;
        this.newUser.COMMISSION = user.COMMISSION;
        $("#newUserStartLocation").focus();
    };
    RepsComponent.prototype.beginEditB = function (user) {
        this.newUserB.ID = user.ID;
        this.newUserB.REP_ID = user.REP_ID;
        this.newUserB.FACILITY_ID = user.FACILITY_ID;
        this.newUserB.COMMISSION = user.COMMISSION;
        this.newUserB.COMMISSIONTYPE = user.COMMISSIONTYPE;
        this.newUserB.UPLOAD_MONTH = user.UPLOAD_MONTH;
        this.newUserB.UPLOAD_YEAR = user.UPLOAD_YEAR;
        this.newUserB.SHOW_FACILITY = user.SHOW_FACILITY;
        $("#newUserBStartLocation").focus();
    };
    RepsComponent.prototype.changeRep = function (rep) {
        var _this = this;
        var headers = new __WEBPACK_IMPORTED_MODULE_3__angular_http__["b" /* Headers */]({ 'Accept': 'application/json' });
        headers.append('Content-Type', "application/json");
        headers.append('Authorization', "Bearer " + this.auth.token);
        var options = new __WEBPACK_IMPORTED_MODULE_3__angular_http__["c" /* RequestOptions */]({ headers: headers });
        this.http.get(this.general.starter + '/api/v2/reps/' + rep.ID, options)
            .map(function (res) { return res.json(); })
            .subscribe(function (res) {
            _this.commissionTable = res.successObject;
        }, function (error) { alert("Invalid Action, check Console"); console.log(error); _this.currentView = 'View'; });
        this.currentRep = rep;
        this.newUserB.REP_ID = this.currentRep.ID;
        this.newUserB.COMMISSION = this.currentRep.COMMISSION;
        this.FacilitycurrentView = 'ViewTable';
        this.changeView('Facilities');
        $("#newUserBStartLocation").focus();
    };
    RepsComponent.prototype.retrieveData = function (updateObject, data, router, menuService, general) {
        updateObject.searchText = '';
        updateObject.finalTable = general.Reps;
        updateObject.newUser.ID = '';
        updateObject.newUser.TITLE = '';
        updateObject.newUser.COMMISSION = '';
    };
    RepsComponent.prototype.bulkUpload = function () {
        var _this = this;
        if (this.textarea !== '' && this.textarea !== null) {
            var headers = new __WEBPACK_IMPORTED_MODULE_3__angular_http__["b" /* Headers */]({ 'Accept': 'application/json' });
            headers.append('Content-Type', "application/json");
            headers.append('Authorization', "Bearer " + this.auth.token);
            var options = new __WEBPACK_IMPORTED_MODULE_3__angular_http__["c" /* RequestOptions */]({ headers: headers });
            this.http.post(this.general.starter + '/api/v2/reps', JSON.stringify({ upload: this.textarea }), options)
                .map(function (res) { return res.json(); })
                .subscribe(function (res) {
                alert(res.success);
                _this.general.getData(_this.general.Queries.Reps, 'Reps', _this.retrieveData, _this, null, _this.general);
                _this.currentView = 'View';
                $("#newUserStartLocation").focus();
            }, function (error) { alert(error.error); console.log(error); _this.currentView = 'View'; });
            this.textarea = '';
        }
        else {
            alert('Upload Must Have Data');
        }
    };
    RepsComponent.prototype.downloadB = function () {
        var headers = new __WEBPACK_IMPORTED_MODULE_3__angular_http__["b" /* Headers */]({ 'Accept': 'text/csv' });
        headers.append('Content-Type', "application/json");
        headers.append('Authorization', "Bearer " + this.auth.token);
        var options = new __WEBPACK_IMPORTED_MODULE_3__angular_http__["c" /* RequestOptions */]({ headers: headers });
        this.http.get(this.general.starter + '/api/v2/reps/facilities/download', options)
            .subscribe(function (res) {
            var blob = new Blob([res.text()], { type: 'text/csv' });
            var url = window.URL.createObjectURL(blob);
            window.open(url);
        }, function (error) { alert("Invalid Request"); console.log(error); });
    };
    RepsComponent.prototype.download = function () {
        var headers = new __WEBPACK_IMPORTED_MODULE_3__angular_http__["b" /* Headers */]({ 'Accept': 'text/csv' });
        headers.append('Content-Type', "application/json");
        headers.append('Authorization', "Bearer " + this.auth.token);
        var options = new __WEBPACK_IMPORTED_MODULE_3__angular_http__["c" /* RequestOptions */]({ headers: headers });
        this.http.get(this.general.starter + '/api/v2/rep/download', options)
            .subscribe(function (res) {
            var blob = new Blob([res.text()], { type: 'text/csv' });
            var url = window.URL.createObjectURL(blob);
            window.open(url);
        }, function (error) { alert("Invalid Request"); console.log(error); });
    };
    RepsComponent.prototype.bulkUploadB = function () {
        var _this = this;
        if (this.textareaB !== '' && this.textareaB !== null) {
            var headers = new __WEBPACK_IMPORTED_MODULE_3__angular_http__["b" /* Headers */]({ 'Accept': 'application/json' });
            headers.append('Content-Type', "application/json");
            headers.append('Authorization', "Bearer " + this.auth.token);
            var options = new __WEBPACK_IMPORTED_MODULE_3__angular_http__["c" /* RequestOptions */]({ headers: headers });
            this.http.post(this.general.starter + '/api/v2/rep/facilities', JSON.stringify({ upload: this.textareaB }), options)
                .map(function (res) { return res.json(); })
                .subscribe(function (res) {
                alert(res.success);
                _this.changeRep(_this.currentRep);
                _this.newUserB.ID = '';
                _this.newUserB.REP_ID = _this.currentRep.ID;
                _this.newUserB.FACILITY_ID = '';
                _this.newUserB.COMMISSION = _this.currentRep.COMMISSION;
                _this.newUserB.COMMISSIONTYPE = 'GENERAL';
                _this.newUserB.UPLOAD_MONTH = '';
                _this.newUserB.UPLOAD_YEAR = '';
                _this.newUserB.SHOW_FACILITY = 1;
                _this.FacilitycurrentView = 'ViewTable';
                $("#newUserBStartLocation").focus();
            }, function (error) { alert(error.error); console.log(error); _this.currentView = 'Facilities'; _this.FacilitycurrentView = 'ViewTable'; });
            this.textarea = '';
        }
        else {
            alert('Upload Must Have Data');
        }
    };
    RepsComponent.prototype.removeFacility = function (facility) {
        var _this = this;
        var headers = new __WEBPACK_IMPORTED_MODULE_3__angular_http__["b" /* Headers */]({ 'Accept': 'application/json' });
        headers.append('Content-Type', "application/json");
        headers.append('Authorization', "Bearer " + this.auth.token);
        var options = new __WEBPACK_IMPORTED_MODULE_3__angular_http__["c" /* RequestOptions */]({ headers: headers });
        this.http.delete(this.general.starter + '/api/v2/reps/' + this.currentRep.ID + '/facility/' + facility.FACILITY_ID, options)
            .map(function (res) { return res.json(); })
            .subscribe(function (res) {
            alert(res.success);
            _this.changeRep(_this.currentRep);
            _this.newUserB.ID = '';
            _this.newUserB.REP_ID = _this.currentRep.ID;
            _this.newUserB.FACILITY_ID = '';
            _this.newUserB.COMMISSION = _this.currentRep.COMMISSION;
            _this.newUserB.COMMISSIONTYPE = 'GENERAL';
            _this.newUserB.UPLOAD_MONTH = '';
            _this.newUserB.UPLOAD_YEAR = '';
            _this.newUserB.SHOW_FACILITY = 1;
            $("#newUserBStartLocation").focus();
        }, function (error) { alert("Invalid"); console.log(error); _this.currentView = 'Facilities'; });
    };
    RepsComponent.prototype.saveFormB = function () {
        var _this = this;
        this.showForm = false;
        if (this.newUserB.TITLE !== '') {
            var headers = new __WEBPACK_IMPORTED_MODULE_3__angular_http__["b" /* Headers */]({ 'Accept': 'application/json' });
            headers.append('Content-Type', "application/json");
            headers.append('Authorization', "Bearer " + this.auth.token);
            var options = new __WEBPACK_IMPORTED_MODULE_3__angular_http__["c" /* RequestOptions */]({ headers: headers });
            this.http.post(this.general.starter + '/api/v2/rep/facilities', JSON.stringify(this.newUserB), options)
                .map(function (res) { return res.json(); })
                .subscribe(function (res) {
                alert(res.success);
                _this.changeRep(_this.currentRep);
                _this.newUserB.ID = '';
                _this.newUserB.REP_ID = _this.currentRep.ID;
                _this.newUserB.FACILITY_ID = '';
                _this.newUserB.COMMISSION = _this.currentRep.COMMISSION;
                _this.newUserB.COMMISSIONTYPE = 'GENERAL';
                _this.newUserB.UPLOAD_MONTH = '';
                _this.newUserB.UPLOAD_YEAR = '';
                _this.newUserB.SHOW_FACILITY = 1;
                $("#newUserBStartLocation").focus();
            }, function (error) { alert("Invalid"); console.log(error); _this.currentView = 'Facilities'; });
        }
        else {
            alert('Facility must have a valid Name');
            this.currentView = 'Facilities';
        }
    };
    RepsComponent.prototype.saveForm = function () {
        var _this = this;
        this.showForm = false;
        if (this.newUser.TITLE !== '') {
            var headers = new __WEBPACK_IMPORTED_MODULE_3__angular_http__["b" /* Headers */]({ 'Accept': 'application/json' });
            headers.append('Content-Type', "application/json");
            headers.append('Authorization', "Bearer " + this.auth.token);
            var options = new __WEBPACK_IMPORTED_MODULE_3__angular_http__["c" /* RequestOptions */]({ headers: headers });
            this.newUser['UPLOAD_MONTH'] = this.datePicker.UploadMonth.number;
            this.newUser['UPLOAD_YEAR'] = this.datePicker.UploadYear.number;
            this.http.post(this.general.starter + '/api/v2/reps', JSON.stringify(this.newUser), options)
                .map(function (res) { return res.json(); })
                .subscribe(function (res) {
                alert(res.success);
                _this.general.getData(_this.general.Queries.Reps, 'Reps', _this.retrieveData, _this, null, _this.general);
                $("#newUserStartLocation").focus();
            }, function (error) { alert(error.error); console.log(error); _this.currentView = 'View'; }, function () { return _this.currentView = 'View'; });
        }
        else {
            alert('Facility must have a valid Name');
            this.currentView = 'View';
        }
    };
    RepsComponent.prototype.searchUsers = function () {
        var _this = this;
        if (this.searchText == '') {
            this.finalTable = this.general.Reps;
        }
        else {
            this.finalTable = this.general.Reps.filter(function (a) {
                if (a.TITLE.toLowerCase().indexOf(_this.searchText.toLowerCase()) > -1) {
                    return a;
                }
            });
        }
    };
    return RepsComponent;
}());
RepsComponent = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
        selector: 'app-reps',
        template: __webpack_require__(429),
        styles: [__webpack_require__(389)]
    }),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_3__angular_http__["d" /* Http */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_3__angular_http__["d" /* Http */]) === "function" && _a || Object, typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_2__general_service__["a" /* GeneralService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_2__general_service__["a" /* GeneralService */]) === "function" && _b || Object, typeof (_c = typeof __WEBPACK_IMPORTED_MODULE_1__users_authentication_service__["a" /* AuthenticationService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__users_authentication_service__["a" /* AuthenticationService */]) === "function" && _c || Object, typeof (_d = typeof __WEBPACK_IMPORTED_MODULE_4__date_picker_date_picker_service__["a" /* DatePickerService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_4__date_picker_date_picker_service__["a" /* DatePickerService */]) === "function" && _d || Object])
], RepsComponent);

var _a, _b, _c, _d;
//# sourceMappingURL=reps.component.js.map

/***/ }),

/***/ 113:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__users_authentication_service__ = __webpack_require__(10);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__general_service__ = __webpack_require__(11);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__angular_http__ = __webpack_require__(16);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__date_picker_date_picker_service__ = __webpack_require__(30);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return UploadsComponent; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





var UploadsComponent = (function () {
    function UploadsComponent(http, general, auth, datePicker) {
        this.http = http;
        this.general = general;
        this.auth = auth;
        this.datePicker = datePicker;
        this.currentBiller = null;
        this.currentReport = null;
        this.columnMapping = [];
        this.unmappedData = [];
        this.alarm = {
            text: '',
            isLoading: false,
            status: '',
            alertType: 'info',
            totalAmount: null
        };
    }
    UploadsComponent.prototype.ngOnInit = function () {
    };
    UploadsComponent.prototype.setCurrentReport = function () {
        var _this = this;
        var reports = this.general.Reports.filter(function (a) {
            if (a.ID == _this.currentBiller.REPORT_ID) {
                return a;
            }
        });
        this.currentReport = reports[0];
        var headers = new __WEBPACK_IMPORTED_MODULE_3__angular_http__["b" /* Headers */]({ 'Accept': 'application/json' });
        headers.append('Content-Type', "application/json");
        headers.append('Authorization', "Bearer " + this.auth.token);
        var options = new __WEBPACK_IMPORTED_MODULE_3__angular_http__["c" /* RequestOptions */]({ headers: headers });
        this.http.get(this.general.starter + '/api/v2/columns/' + this.currentReport.ID, options)
            .map(function (res) { return res.json(); })
            .subscribe(function (res) {
            _this.columnMapping = res.successObject;
        }, function (error) { alert("Invalid Action, check Console"); console.log(error); });
    };
    UploadsComponent.prototype.updateCurrentBiller = function (isCogs, biller) {
        if (isCogs) {
            this.currentBiller = { TITLE: 'COGS', REPORT_ID: 1 };
            console.log(this.currentBiller.REPORT_ID);
        }
        else {
            this.currentBiller = biller;
            console.log(this.currentBiller.REPORT_ID);
            if (this.currentBiller.REPORT_ID == null || this.currentBiller.REPORT_ID == '' || this.currentBiller.REPORT_ID == "undefined") {
                this.currentBiller.REPORT_ID = 1;
            }
        }
        this.setCurrentReport();
    };
    UploadsComponent.prototype.saveReport = function () {
        var _this = this;
        if (this.currentReport.TITLE !== '') {
            var headers = new __WEBPACK_IMPORTED_MODULE_3__angular_http__["b" /* Headers */]({ 'Accept': 'application/json' });
            headers.append('Content-Type', "application/json");
            headers.append('Authorization', "Bearer " + this.auth.token);
            var options = new __WEBPACK_IMPORTED_MODULE_3__angular_http__["c" /* RequestOptions */]({ headers: headers });
            this.http.put(this.general.starter + '/api/v2/reports/' + this.currentReport.ID, JSON.stringify(this.currentReport), options)
                .map(function (res) { return res.json(); })
                .subscribe(function (res) {
                alert(res.success);
                _this.setCurrentReport();
            }, function (error) { alert("Invalid"); console.log(error); });
        }
        else {
            alert('Report must have a valid Name');
        }
    };
    UploadsComponent.prototype.bulkUploadFacilityMapping = function () {
        var _this = this;
        var headers = new __WEBPACK_IMPORTED_MODULE_3__angular_http__["b" /* Headers */]({ 'Accept': 'application/json' });
        headers.append('Content-Type', "application/json");
        headers.append('Authorization', "Bearer " + this.auth.token);
        var options = new __WEBPACK_IMPORTED_MODULE_3__angular_http__["c" /* RequestOptions */]({ headers: headers });
        this.http.post(this.general.starter + '/api/v2/facilitiesMap', JSON.stringify({ upload: this.unmappedData }), options)
            .map(function (res) { return res.json(); })
            .subscribe(function (res) {
            alert(res.success);
            _this.mapFacilities();
        }, function (error) { alert("Invalid Request"); console.log(error); });
    };
    UploadsComponent.prototype.updateColumnMapping = function (column) {
        this.alarm.totalAmount = null;
        if (column.RAW_COLUMN_NAME !== '') {
            var headers = new __WEBPACK_IMPORTED_MODULE_3__angular_http__["b" /* Headers */]({ 'Accept': 'application/json' });
            headers.append('Content-Type', "application/json");
            headers.append('Authorization', "Bearer " + this.auth.token);
            var options = new __WEBPACK_IMPORTED_MODULE_3__angular_http__["c" /* RequestOptions */]({ headers: headers });
            this.http.put(this.general.starter + '/api/v2/columns/' + column.ID, JSON.stringify(column), options)
                .map(function (res) { return res.json(); })
                .subscribe(function (res) {
                alert(res.success);
            }, function (error) { alert("Invalid"); console.log(error); });
        }
        else {
            alert('Column must have a valid Name');
        }
    };
    UploadsComponent.prototype.mapFacilities = function () {
        var _this = this;
        this.alarm.totalAmount = null;
        var headers = new __WEBPACK_IMPORTED_MODULE_3__angular_http__["b" /* Headers */]({ 'Accept': 'application/json' });
        headers.append('Content-Type', "application/json");
        headers.append('Authorization', "Bearer " + this.auth.token);
        var options = new __WEBPACK_IMPORTED_MODULE_3__angular_http__["c" /* RequestOptions */]({ headers: headers });
        var data = {
            month: this.datePicker.UploadMonth.number,
            year: this.datePicker.UploadYear.number,
            title: this.currentBiller.TITLE
        };
        this.http.post(this.general.starter + ("/api/v2/uploads/" + this.currentBiller.ID + "/mapFile?isCogs=" + ((this.currentBiller.TITLE == 'COGS') ? 'yes' : 'no')), JSON.stringify(data), options)
            .map(function (res) { return res.json(); })
            .subscribe(function (res) {
            console.log(res);
            var dataMapped = false;
            if (res.unmappedItems) {
                if (res.unmappedItems[0][0] == null) {
                    dataMapped = true;
                }
            }
            else {
                dataMapped = true;
            }
            if (dataMapped) {
                _this.unmappedData = [];
                _this.alarm.text = "All facilities have been successfully mapped based on the Facility Legend. Please wait as we load data to Database";
                _this.alarm.isLoading = true;
                _this.alarm.status = "Facility/Rep Mapping";
                _this.alarm.alertType = "success";
                _this.pushToDatabase();
            }
            else {
                _this.alarm.text = "Please review all unmapped facilities below. You can not continue.";
                _this.alarm.isLoading = true;
                _this.alarm.status = "Unmapped Facilities/Reps";
                _this.alarm.alertType = "warning";
                _this.unmappedData = res.unmappedItems[0];
            }
        }, function (error) {
            console.log(error);
            _this.alarm.text = "There was an error when mapping facilities. This was not caused by Unmapped Facilities";
            _this.alarm.isLoading = true;
            _this.alarm.status = "Facility/Rep Mapping";
            _this.alarm.alertType = "danger";
        });
    };
    UploadsComponent.prototype.pushToDatabase = function () {
        var _this = this;
        var headers = new __WEBPACK_IMPORTED_MODULE_3__angular_http__["b" /* Headers */]({ 'Accept': 'application/json' });
        headers.append('Content-Type', "application/json");
        headers.append('Authorization', "Bearer " + this.auth.token);
        var options = new __WEBPACK_IMPORTED_MODULE_3__angular_http__["c" /* RequestOptions */]({ headers: headers });
        var data = {
            month: this.datePicker.UploadMonth.number,
            year: this.datePicker.UploadYear.number,
            title: this.currentBiller.TITLE
        };
        this.http.post(this.general.starter + ("/api/v2/uploads/" + this.currentBiller.ID + "/pushToDatabase?isCogs=" + ((this.currentBiller.TITLE == 'COGS') ? 'yes' : 'no')), JSON.stringify(data), options)
            .map(function (res) { return res.json(); })
            .subscribe(function (res) {
            console.log(res);
            _this.general.getData(_this.general.Queries.Billers, 'Billers', null, _this, null, _this.general);
            _this.unmappedData = [];
            _this.alarm.text = "Data has been succefully pushed. Total Amount:";
            _this.alarm.totalAmount = res.paidTotal[0].PAID_AMOUNT;
            _this.alarm.isLoading = true;
            _this.alarm.status = "Successful Upload:";
            _this.alarm.alertType = "success";
        }, function (error) {
            console.log(error);
            _this.alarm.text = "There was an error while pushing your data to the Database";
            _this.alarm.isLoading = true;
            _this.alarm.status = "Database Push";
            _this.alarm.alertType = "danger";
            _this.alarm.totalAmount = null;
        });
    };
    UploadsComponent.prototype.uploadReport = function () {
        var _this = this;
        this.alarm.isLoading = false;
        this.alarm.totalAmount = null;
        var myFiles = document.getElementById("uploadFile");
        var files = myFiles.files;
        if (files[0]) {
            this.alarm.isLoading = true;
            this.alarm.text = "Please wait.... ";
            this.alarm.isLoading = true;
            this.alarm.status = "Loading File";
            this.alarm.alertType = "info";
            var form = new FormData();
            form.append("uploadFiles", files[0], files[0].name);
            var headers = new __WEBPACK_IMPORTED_MODULE_3__angular_http__["b" /* Headers */]({ 'Accept': 'application/json' });
            //headers.append('Content-Type', `multipart/form-data`);
            headers.append('Authorization', "Bearer " + this.auth.token);
            var options = new __WEBPACK_IMPORTED_MODULE_3__angular_http__["c" /* RequestOptions */]({ headers: headers });
            this.http.post(this.general.starter + ("/api/v2/uploads/schemaCheck?biller=" + this.currentBiller.TITLE + "&sheetNumber=" + this.currentReport.SHEET_NUMBER + "&startRow=" + this.currentReport.START_ROW + "&billerID=" + this.currentBiller.ID + "&reportID=" + this.currentReport.ID + "&month=" + this.datePicker.UploadMonth.number + "&year=" + this.datePicker.UploadYear.number + "&isCogs=" + ((this.currentBiller.TITLE == 'COGS') ? 'yes' : 'no')), form, options)
                .map(function (res) { return res.json(); })
                .subscribe(function (res) {
                console.log(res);
                _this.alarm.text = "The schema of this file has been validated. Please Wait as we Map Facilities";
                _this.alarm.isLoading = true;
                _this.alarm.status = "Schema Check";
                _this.alarm.alertType = "success";
                _this.mapFacilities();
            }, function (error) {
                console.log(error);
                _this.alarm.text = "The schema of this file does not match as expected. Check the Column Mappings";
                _this.alarm.isLoading = true;
                _this.alarm.status = "Schema Check";
                _this.alarm.alertType = "danger";
            });
        }
        else {
            alert("Can not upload a blank file!");
            this.alarm.text = "No file to upload";
            this.alarm.isLoading = true;
            this.alarm.status = "Bad File Uploaded";
            this.alarm.alertType = "danger";
        }
    };
    return UploadsComponent;
}());
UploadsComponent = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
        selector: 'app-uploads',
        template: __webpack_require__(431),
        styles: [__webpack_require__(391)]
    }),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_3__angular_http__["d" /* Http */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_3__angular_http__["d" /* Http */]) === "function" && _a || Object, typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_2__general_service__["a" /* GeneralService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_2__general_service__["a" /* GeneralService */]) === "function" && _b || Object, typeof (_c = typeof __WEBPACK_IMPORTED_MODULE_1__users_authentication_service__["a" /* AuthenticationService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__users_authentication_service__["a" /* AuthenticationService */]) === "function" && _c || Object, typeof (_d = typeof __WEBPACK_IMPORTED_MODULE_4__date_picker_date_picker_service__["a" /* DatePickerService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_4__date_picker_date_picker_service__["a" /* DatePickerService */]) === "function" && _d || Object])
], UploadsComponent);

var _a, _b, _c, _d;
//# sourceMappingURL=uploads.component.js.map

/***/ }),

/***/ 114:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__authentication_service__ = __webpack_require__(10);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__general_service__ = __webpack_require__(11);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__angular_http__ = __webpack_require__(16);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return UsersComponent; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




var UsersComponent = (function () {
    function UsersComponent(http, general, auth) {
        this.http = http;
        this.general = general;
        this.auth = auth;
        this.currentView = 'View';
        this.textarea = '';
        this.searchText = '';
        this.showForm = false;
        this.newUser = {
            formName: '',
            ID: '',
            TITLE: '',
            EMAIL: '',
            USER_TYPE: '',
            REP_ID: '',
        };
    }
    UsersComponent.prototype.ngOnInit = function () {
        this.finalTable = this.general.Users;
    };
    UsersComponent.prototype.download = function () {
        var headers = new __WEBPACK_IMPORTED_MODULE_3__angular_http__["b" /* Headers */]({ 'Accept': 'text/csv' });
        headers.append('Content-Type', "application/json");
        headers.append('Authorization', "Bearer " + this.auth.token);
        var options = new __WEBPACK_IMPORTED_MODULE_3__angular_http__["c" /* RequestOptions */]({ headers: headers });
        this.http.get(this.general.starter + '/api/v2/users/download', options)
            .subscribe(function (res) {
            var blob = new Blob([res.text()], { type: 'text/csv' });
            var url = window.URL.createObjectURL(blob);
            window.open(url);
        }, function (error) { alert("Invalid Request"); console.log(error); });
    };
    UsersComponent.prototype.retrieveData = function (updateObject, data, router, menuService, general) {
        updateObject.searchText = '';
        updateObject.finalTable = general.Users;
        updateObject.newUser.ID = '';
        updateObject.newUser.TITLE = '';
        updateObject.newUser.EMAIL = '';
        updateObject.newUser.USER_TYPE = '';
        updateObject.newUser.REP_ID = '';
    };
    UsersComponent.prototype.beginEdit = function (user) {
        this.newUser.ID = user.ID;
        this.newUser.TITLE = user.TITLE;
        this.newUser.EMAIL = user.EMAIL;
        this.newUser.USER_TYPE = user.USER_TYPE;
        this.newUser.REP_ID = user.REP_ID;
        $("#newUserStartLocation").focus();
    };
    UsersComponent.prototype.bulkUpload = function () {
        var _this = this;
        if (this.textarea !== '' && this.textarea !== null) {
            var headers = new __WEBPACK_IMPORTED_MODULE_3__angular_http__["b" /* Headers */]({ 'Accept': 'application/json' });
            headers.append('Content-Type', "application/json");
            headers.append('Authorization', "Bearer " + this.auth.token);
            var options = new __WEBPACK_IMPORTED_MODULE_3__angular_http__["c" /* RequestOptions */]({ headers: headers });
            this.http.post(this.general.starter + '/api/v2/users', JSON.stringify({ upload: this.textarea }), options)
                .map(function (res) { return res.json(); })
                .subscribe(function (res) {
                alert(res.success);
                _this.general.getData(_this.general.Queries.Users, 'Users', _this.retrieveData, _this, null, _this.general);
                _this.currentView = 'View';
                $("#newUserStartLocation").focus();
            }, function (error) { alert(error.error); console.log(error); _this.currentView = 'View'; }, function () { return _this.currentView = 'View'; });
            this.textarea = '';
        }
        else {
            alert('Upload Must Have Data');
        }
    };
    UsersComponent.prototype.saveForm = function () {
        var _this = this;
        this.showForm = false;
        if (this.newUser.TITLE !== '' && this.newUser.EMAIL !== '') {
            var headers = new __WEBPACK_IMPORTED_MODULE_3__angular_http__["b" /* Headers */]({ 'Accept': 'application/json' });
            headers.append('Content-Type', "application/json");
            headers.append('Authorization', "Bearer " + this.auth.token);
            var options = new __WEBPACK_IMPORTED_MODULE_3__angular_http__["c" /* RequestOptions */]({ headers: headers });
            this.http.post(this.general.starter + '/api/v2/users', JSON.stringify(this.newUser), options)
                .map(function (res) { return res.json(); })
                .subscribe(function (res) {
                alert(res.success);
                _this.general.getData(_this.general.Queries.Users, 'Users', _this.retrieveData, _this, null, _this.general);
                $("#newUserStartLocation").focus();
            }, function (error) { alert(error.error); console.log(error); _this.currentView = 'View'; }, function () { return _this.currentView = 'View'; });
        }
        else {
            alert('User must have a valid Name and Email Address');
            this.currentView = 'View';
        }
    };
    UsersComponent.prototype.userAction = function (user, action) {
        var _this = this;
        this.showForm = false;
        var headers = new __WEBPACK_IMPORTED_MODULE_3__angular_http__["b" /* Headers */]({ 'Accept': 'application/json' });
        headers.append('Content-Type', "application/json");
        headers.append('Authorization', "Bearer " + this.auth.token);
        var options = new __WEBPACK_IMPORTED_MODULE_3__angular_http__["c" /* RequestOptions */]({ headers: headers });
        this.http.put(this.general.starter + '/api/v2/users', JSON.stringify({ ID: user.ID, ACTION: action }), options)
            .map(function (res) { return res.json(); })
            .subscribe(function (res) { _this.general.getData(_this.general.Queries.Users, 'Users', _this.retrieveData, _this, null, _this.general); alert(res.success); }, function (error) { alert(error.error); console.log(error); }, function () { return console.log('complete'); });
    };
    UsersComponent.prototype.searchUsers = function () {
        var _this = this;
        if (this.searchText == '') {
            this.finalTable = this.general.Users;
        }
        else {
            this.finalTable = this.general.Users.filter(function (a) {
                if (a.TITLE.toLowerCase().indexOf(_this.searchText.toLowerCase()) > -1 ||
                    a.EMAIL.toLowerCase().indexOf(_this.searchText.toLowerCase()) > -1) {
                    return a;
                }
            });
        }
    };
    return UsersComponent;
}());
UsersComponent = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
        selector: 'app-users',
        template: __webpack_require__(432),
        styles: [__webpack_require__(392)]
    }),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_3__angular_http__["d" /* Http */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_3__angular_http__["d" /* Http */]) === "function" && _a || Object, typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_2__general_service__["a" /* GeneralService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_2__general_service__["a" /* GeneralService */]) === "function" && _b || Object, typeof (_c = typeof __WEBPACK_IMPORTED_MODULE_1__authentication_service__["a" /* AuthenticationService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__authentication_service__["a" /* AuthenticationService */]) === "function" && _c || Object])
], UsersComponent);

var _a, _b, _c;
//# sourceMappingURL=users.component.js.map

/***/ }),

/***/ 30:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* unused harmony export Month */
/* unused harmony export Year */
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return DatePickerService; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};

var Month = (function () {
    function Month(title, number, jsnumber) {
        this.title = title;
        this.number = number;
        this.jsnumber = jsnumber;
        this.isSelected = false;
    }
    return Month;
}());
Month = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Injectable"])(),
    __metadata("design:paramtypes", [String, Number, Number])
], Month);

var Year = (function () {
    function Year(title, number, jsnumber) {
        this.title = title;
        this.number = number;
        this.jsnumber = jsnumber;
        this.isSelected = false;
    }
    return Year;
}());

var DatePickerService = (function () {
    function DatePickerService() {
        this.Months = new Array();
        this.Years = new Array();
    }
    DatePickerService.prototype.initialize = function () {
        var months = [
            'January',
            'February',
            'March',
            'April',
            'May',
            'June',
            'July',
            'August',
            'September',
            'October',
            'November',
            'December'
        ];
        var date = new Date();
        var year = date.getFullYear();
        var currentMonth = date.getMonth();
        var lastUploadDate = new Date(year, currentMonth - 1, 1);
        var startyear = 2017;
        var endyear = year + 2;
        var i = 0;
        for (var _i = 0, months_1 = months; _i < months_1.length; _i++) {
            var month = months_1[_i];
            var thisMonth = new Month(month, i + 1, i);
            if (thisMonth.jsnumber == lastUploadDate.getMonth()) {
                thisMonth.isSelected = true;
                this.UploadMonth = thisMonth;
                this.selectedMonth = this.UploadMonth.title;
            }
            this.Months.push(thisMonth);
            i++;
        }
        while (startyear <= endyear) {
            var thisYear = new Year(startyear.toString(), startyear, startyear);
            if (thisYear.jsnumber == lastUploadDate.getFullYear()) {
                thisYear.isSelected = true;
                this.UploadYear = thisYear;
                this.selectedYear = this.UploadYear.title;
            }
            this.Years.push(thisYear);
            startyear++;
        }
    };
    DatePickerService.prototype.changeDate = function (month, year) {
        if (month) {
            var thisMonth = this.Months.filter(function (a) {
                if (a.title == month) {
                    return a;
                }
            });
            this.UploadMonth = thisMonth[0];
            this.selectedMonth = this.UploadMonth.title;
        }
        if (year) {
            var thisYear = this.Years.filter(function (a) {
                if (a.title == year) {
                    return a;
                }
            });
            this.UploadYear = thisYear[0];
            this.selectedYear = this.UploadYear.title;
        }
        if (this.updateFunction)
            this.updateFunction();
    };
    return DatePickerService;
}());

//# sourceMappingURL=date-picker.service.js.map

/***/ }),

/***/ 309:
/***/ (function(module, exports) {

function webpackEmptyContext(req) {
	throw new Error("Cannot find module '" + req + "'.");
}
webpackEmptyContext.keys = function() { return []; };
webpackEmptyContext.resolve = webpackEmptyContext;
module.exports = webpackEmptyContext;
webpackEmptyContext.id = 309;


/***/ }),

/***/ 31:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__users_authentication_service__ = __webpack_require__(10);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_router__ = __webpack_require__(29);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__general_service__ = __webpack_require__(11);
/* unused harmony export MenuItem */
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return MenuService; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




var MenuItem = (function () {
    function MenuItem(menuRouter, menuTitle, menuUserType, menuNavigation) {
        this.router = menuRouter;
        this.title = menuTitle;
        this.usertype = menuUserType;
        this.navigation = menuNavigation;
        this.isSelected = false;
        this.color = 'gray';
    }
    MenuItem.prototype.goToRoute = function () {
        this.router.navigate([this.navigation]);
    };
    return MenuItem;
}());

var MenuService = (function () {
    function MenuService(auth, router, general) {
        var _this = this;
        this.auth = auth;
        this.router = router;
        this.general = general;
        this.showMenu = false;
        this.hideMenu = false;
        this.version = 3;
        this.menuItems = new Array();
        this.footerMenuItems = new Array();
        this.hasInitialized = false;
        this.initialScreen = '';
        function updateAuth(updateObject, data, router, menuService, general) {
            if (data) {
                updateObject.picture = data.PICTURE;
                updateObject.username = data.DISPLAY_NAME;
                updateObject.usertype = data.USER_TYPE;
                updateObject.repid = data.REP_ID;
                updateObject.token = localStorage.getItem('ng2-ui-auth_token');
                updateObject.AuthHeaders.headers.Authorization += updateObject.token;
                updateObject.isAuthenticated = true;
                general.showLogin = false;
                general.initialize();
                menuService.initialize();
                menuService.showMenu = true;
                router.navigate([menuService.initialScreen]);
            }
        }
        if (localStorage.getItem('ng2-ui-auth_token')) {
            if (this.hasInitialized == false) {
                this.hasInitialized = true;
                this.auth.token = localStorage.getItem('ng2-ui-auth_token');
                this.general.getData('/api/v2/me', null, updateAuth, this.auth, this, this.general);
            }
        }
        this.router.events.subscribe(function (val) {
            if (val instanceof __WEBPACK_IMPORTED_MODULE_2__angular_router__["a" /* NavigationEnd */]) {
                var route = val.urlAfterRedirects;
                _this.selectItem(route);
            }
        });
    }
    MenuService.prototype.kill = function () {
        this.showMenu = false;
        this.menuItems = new Array();
        this.footerMenuItems = new Array();
        this.selectItems = new Array();
        this.hasInitialized = false;
    };
    MenuService.prototype.changeMenu = function () {
        this.showMenu = !this.showMenu;
    };
    MenuService.prototype.initialize = function () {
        var dashboard = new MenuItem(this.router, 'Dashboard', this.auth.usertype, '/app/dashboard');
        var uploads = new MenuItem(this.router, 'Uploads', this.auth.usertype, '/app/uploads');
        var bds = new MenuItem(this.router, 'BDS', this.auth.usertype, '/app/bds');
        var users = new MenuItem(this.router, 'Users', this.auth.usertype, '/app/users');
        var facilities = new MenuItem(this.router, 'Facilities', this.auth.usertype, '/app/facilities');
        var reps = new MenuItem(this.router, 'Reps', this.auth.usertype, '/app/reps');
        var reports = new MenuItem(this.router, 'Reports', this.auth.usertype, '/app/reports');
        var billers = new MenuItem(this.router, 'Billers', this.auth.usertype, '/app/billers');
        var logs = new MenuItem(this.router, 'Logs', this.auth.usertype, '/app/logs');
        var bdserrors = new MenuItem(this.router, 'Facility Errors', this.auth.usertype, '/app/facilityreporting');
        if (this.auth.usertype == 'ADMIN') {
            this.selectItems = [
                dashboard,
                uploads,
                bds,
                facilities,
                users,
                reps,
                billers
                //logs
            ];
            this.initialScreen = '/app/dashboard';
        }
        else if (this.auth.usertype == 'EDITOR') {
            this.selectItems = [
                bds
            ];
            this.initialScreen = '/app/bds';
        }
        else {
            this.selectItems = [
                dashboard
            ];
            this.initialScreen = '/app/dashboard';
        }
        this.menuItems = [];
        for (var _i = 0, _a = this.selectItems; _i < _a.length; _i++) {
            var item = _a[_i];
            this.menuItems.push(item);
        }
    };
    MenuService.prototype.selectItem = function (item) {
        this.showMenu = true;
        for (var _i = 0, _a = this.menuItems; _i < _a.length; _i++) {
            var i = _a[_i];
            i.isSelected = false;
            i.color = 'gray';
            if (i.navigation == "/app/" + item || i.navigation == "" + item) {
                i.isSelected = true;
                i.color = '#90EE90';
            }
        }
    };
    MenuService.prototype.logout = function () {
        this.auth.token = null;
        this.auth.AuthHeaders.headers.Authorization += null;
        localStorage.removeItem('ng2-ui-auth_token');
        this.general.kill();
        this.kill();
        this.router.navigate(['/']);
        this.general.showLogin = true;
        alert("You are logged out");
        window.location.href = (this.general.starter == '') ? 'https://reports.medvantageco.com' : 'http://localhost:4200';
    };
    return MenuService;
}());
MenuService = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Injectable"])(),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__users_authentication_service__["a" /* AuthenticationService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__users_authentication_service__["a" /* AuthenticationService */]) === "function" && _a || Object, typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_2__angular_router__["b" /* Router */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_2__angular_router__["b" /* Router */]) === "function" && _b || Object, typeof (_c = typeof __WEBPACK_IMPORTED_MODULE_3__general_service__["a" /* GeneralService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_3__general_service__["a" /* GeneralService */]) === "function" && _c || Object])
], MenuService);

var _a, _b, _c;
//# sourceMappingURL=menu.service.js.map

/***/ }),

/***/ 310:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_platform_browser_dynamic__ = __webpack_require__(316);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__app_app_module__ = __webpack_require__(323);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__environments_environment__ = __webpack_require__(324);




if (__WEBPACK_IMPORTED_MODULE_3__environments_environment__["a" /* environment */].production) {
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["enableProdMode"])();
}
__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__angular_platform_browser_dynamic__["a" /* platformBrowserDynamic */])().bootstrapModule(__WEBPACK_IMPORTED_MODULE_2__app_app_module__["a" /* AppModule */]);
//# sourceMappingURL=main.js.map

/***/ }),

/***/ 317:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__date_picker_service__ = __webpack_require__(30);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return DatePickerComponent; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var DatePickerComponent = (function () {
    function DatePickerComponent(DatePicker) {
        this.DatePicker = DatePicker;
    }
    DatePickerComponent.prototype.ngOnInit = function () {
        this.DatePicker.initialize();
    };
    return DatePickerComponent;
}());
DatePickerComponent = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
        selector: 'app-date-picker',
        template: __webpack_require__(422),
        styles: [__webpack_require__(382)]
    }),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__date_picker_service__["a" /* DatePickerService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__date_picker_service__["a" /* DatePickerService */]) === "function" && _a || Object])
], DatePickerComponent);

var _a;
//# sourceMappingURL=date-picker.component.js.map

/***/ }),

/***/ 318:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ManualEntryComponent; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};

var ManualEntryComponent = (function () {
    function ManualEntryComponent() {
    }
    ManualEntryComponent.prototype.ngOnInit = function () {
    };
    return ManualEntryComponent;
}());
ManualEntryComponent = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
        selector: 'app-manual-entry',
        template: __webpack_require__(426),
        styles: [__webpack_require__(386)]
    }),
    __metadata("design:paramtypes", [])
], ManualEntryComponent);

//# sourceMappingURL=manual-entry.component.js.map

/***/ }),

/***/ 319:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__menu_service__ = __webpack_require__(31);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return MenuComponent; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var MenuComponent = (function () {
    function MenuComponent(menuService) {
        this.menuService = menuService;
    }
    MenuComponent.prototype.ngOnInit = function () {
        /*try {
          if (!this.menuService.auth.isAuthenticated) {
            this.menuService.router.navigate(['/login']);
          }
        }
        catch(e) {
          this.menuService.router.navigate(['/login']);
        }*/
    };
    return MenuComponent;
}());
MenuComponent = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
        selector: 'app-menu',
        template: __webpack_require__(427),
        styles: [__webpack_require__(387)]
    }),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__menu_service__["a" /* MenuService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__menu_service__["a" /* MenuService */]) === "function" && _a || Object])
], MenuComponent);

var _a;
//# sourceMappingURL=menu.component.js.map

/***/ }),

/***/ 320:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return TableViewerComponent; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};

var TableViewerComponent = (function () {
    function TableViewerComponent() {
    }
    TableViewerComponent.prototype.ngOnInit = function () {
    };
    return TableViewerComponent;
}());
TableViewerComponent = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
        selector: 'app-table-viewer',
        template: __webpack_require__(430),
        styles: [__webpack_require__(390)]
    }),
    __metadata("design:paramtypes", [])
], TableViewerComponent);

//# sourceMappingURL=table-viewer.component.js.map

/***/ }),

/***/ 321:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_router__ = __webpack_require__(29);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__Components_login_login_component__ = __webpack_require__(110);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__Components_invalid_route_invalid_route_component__ = __webpack_require__(109);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__Components_dashboard_dashboard_component__ = __webpack_require__(107);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__Components_bds_bds_component__ = __webpack_require__(105);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__Components_uploads_uploads_component__ = __webpack_require__(113);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__Components_users_users_component__ = __webpack_require__(114);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__Components_facilities_facilities_component__ = __webpack_require__(108);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__Components_billers_billers_component__ = __webpack_require__(106);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__Components_reps_reps_component__ = __webpack_require__(112);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__Components_app_navigate_app_navigate_component__ = __webpack_require__(104);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12__Components_reports_reports_component__ = __webpack_require__(111);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AppRoutingModule; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};













//import { FacilitylegendComponent } from './_Components/facilitylegend/facilitylegend.component';
//import { SuperuserComponent } from './_Components/superuser/superuser.component';
var routes = [
    {
        path: '',
        component: __WEBPACK_IMPORTED_MODULE_2__Components_login_login_component__["a" /* LoginComponent */]
    },
    {
        path: 'app',
        component: __WEBPACK_IMPORTED_MODULE_11__Components_app_navigate_app_navigate_component__["a" /* AppNavigateComponent */],
        children: [
            {
                path: '', redirectTo: 'bds', pathMatch: 'full'
            },
            {
                path: 'login',
                component: __WEBPACK_IMPORTED_MODULE_2__Components_login_login_component__["a" /* LoginComponent */]
            },
            {
                path: 'dashboard',
                component: __WEBPACK_IMPORTED_MODULE_4__Components_dashboard_dashboard_component__["a" /* DashboardComponent */]
            },
            {
                path: 'uploads',
                component: __WEBPACK_IMPORTED_MODULE_6__Components_uploads_uploads_component__["a" /* UploadsComponent */]
            },
            {
                path: 'bds',
                component: __WEBPACK_IMPORTED_MODULE_5__Components_bds_bds_component__["a" /* BDSComponent */]
            },
            {
                path: 'users',
                component: __WEBPACK_IMPORTED_MODULE_7__Components_users_users_component__["a" /* UsersComponent */]
            },
            {
                path: 'facilities',
                component: __WEBPACK_IMPORTED_MODULE_8__Components_facilities_facilities_component__["a" /* FacilitiesComponent */]
            },
            {
                path: 'billers',
                component: __WEBPACK_IMPORTED_MODULE_9__Components_billers_billers_component__["a" /* BillersComponent */]
            },
            {
                path: 'reps',
                component: __WEBPACK_IMPORTED_MODULE_10__Components_reps_reps_component__["a" /* RepsComponent */]
            },
            {
                path: 'reports',
                component: __WEBPACK_IMPORTED_MODULE_12__Components_reports_reports_component__["a" /* ReportsComponent */]
            }
        ]
    },
    {
        path: '**',
        component: __WEBPACK_IMPORTED_MODULE_3__Components_invalid_route_invalid_route_component__["a" /* InvalidRouteComponent */]
    }
];
var AppRoutingModule = (function () {
    function AppRoutingModule() {
    }
    return AppRoutingModule;
}());
AppRoutingModule = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["NgModule"])({
        imports: [__WEBPACK_IMPORTED_MODULE_1__angular_router__["c" /* RouterModule */].forRoot(routes)],
        exports: [__WEBPACK_IMPORTED_MODULE_1__angular_router__["c" /* RouterModule */]]
    })
], AppRoutingModule);

//# sourceMappingURL=app-routing.module.js.map

/***/ }),

/***/ 322:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_router__ = __webpack_require__(29);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__Components_menu_menu_service__ = __webpack_require__(31);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__Components_users_authentication_service__ = __webpack_require__(10);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__general_service__ = __webpack_require__(11);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AppComponent; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





var AppComponent = (function () {
    function AppComponent(general, auth, router, menuService) {
        var _this = this;
        this.general = general;
        this.auth = auth;
        this.router = router;
        this.menuService = menuService;
        this.loadingText = '';
        this.router.events.subscribe(function (val) {
            if (val instanceof __WEBPACK_IMPORTED_MODULE_1__angular_router__["a" /* NavigationEnd */]) {
                var route = val.urlAfterRedirects;
                _this.menuService.selectItem(route);
            }
        });
    }
    AppComponent.prototype.ngOnInit = function () {
    };
    return AppComponent;
}());
AppComponent = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
        selector: 'app-root',
        template: __webpack_require__(433),
        styles: [__webpack_require__(393)]
    }),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_4__general_service__["a" /* GeneralService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_4__general_service__["a" /* GeneralService */]) === "function" && _a || Object, typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_3__Components_users_authentication_service__["a" /* AuthenticationService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_3__Components_users_authentication_service__["a" /* AuthenticationService */]) === "function" && _b || Object, typeof (_c = typeof __WEBPACK_IMPORTED_MODULE_1__angular_router__["b" /* Router */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__angular_router__["b" /* Router */]) === "function" && _c || Object, typeof (_d = typeof __WEBPACK_IMPORTED_MODULE_2__Components_menu_menu_service__["a" /* MenuService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_2__Components_menu_menu_service__["a" /* MenuService */]) === "function" && _d || Object])
], AppComponent);

var _a, _b, _c, _d;
//# sourceMappingURL=app.component.js.map

/***/ }),

/***/ 323:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser__ = __webpack_require__(27);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_forms__ = __webpack_require__(9);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__angular_http__ = __webpack_require__(16);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__angular_platform_browser_animations__ = __webpack_require__(103);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_hammerjs__ = __webpack_require__(394);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_hammerjs___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_5_hammerjs__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_ngx_bootstrap__ = __webpack_require__(403);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__Components_menu_menu_service__ = __webpack_require__(31);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__Components_users_authentication_service__ = __webpack_require__(10);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__Components_date_picker_date_picker_service__ = __webpack_require__(30);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__general_service__ = __webpack_require__(11);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__app_routing_module__ = __webpack_require__(321);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12__app_component__ = __webpack_require__(322);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_13__Components_login_login_component__ = __webpack_require__(110);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_14__Components_menu_menu_component__ = __webpack_require__(319);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_15__Components_invalid_route_invalid_route_component__ = __webpack_require__(109);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_16__Components_dashboard_dashboard_component__ = __webpack_require__(107);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_17__Components_bds_bds_component__ = __webpack_require__(105);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_18__Components_uploads_uploads_component__ = __webpack_require__(113);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_19__Components_users_users_component__ = __webpack_require__(114);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_20__Components_facilities_facilities_component__ = __webpack_require__(108);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_21__Components_reps_reps_component__ = __webpack_require__(112);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_22__Components_date_picker_date_picker_component__ = __webpack_require__(317);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_23__Components_manual_entry_manual_entry_component__ = __webpack_require__(318);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_24__Components_table_viewer_table_viewer_component__ = __webpack_require__(320);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_25__Components_billers_billers_component__ = __webpack_require__(106);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_26__Components_app_navigate_app_navigate_component__ = __webpack_require__(104);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_27__Components_reports_reports_component__ = __webpack_require__(111);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_28_angularx_social_login__ = __webpack_require__(32);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_29_ngx_spinner__ = __webpack_require__(294);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_29_ngx_spinner___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_29_ngx_spinner__);
/* unused harmony export GOOGLE_CLIENT_ID */
/* unused harmony export provideConfig */
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AppModule; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};





























//import { FacilitylegendComponent } from './_Components/facilitylegend/facilitylegend.component';
//import { SuperuserComponent } from './_Components/superuser/superuser.component';



var GOOGLE_CLIENT_ID = '114225384341-8f90eqm6gceeiin8thq4accp0e9ad7og.apps.googleusercontent.com';
//export const GOOGLE_CLIENT_ID = '114225384341-vp8o4shsf33nc1g0kmt67j3erf5q3ui5.apps.googleusercontent.com';
var config = new __WEBPACK_IMPORTED_MODULE_28_angularx_social_login__["a" /* AuthServiceConfig */]([
    {
        id: __WEBPACK_IMPORTED_MODULE_28_angularx_social_login__["b" /* GoogleLoginProvider */].PROVIDER_ID,
        provider: new __WEBPACK_IMPORTED_MODULE_28_angularx_social_login__["b" /* GoogleLoginProvider */](GOOGLE_CLIENT_ID)
    }
]);
function provideConfig() {
    return config;
}
var AppModule = (function () {
    function AppModule() {
    }
    return AppModule;
}());
AppModule = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__angular_core__["NgModule"])({
        declarations: [
            __WEBPACK_IMPORTED_MODULE_12__app_component__["a" /* AppComponent */],
            __WEBPACK_IMPORTED_MODULE_13__Components_login_login_component__["a" /* LoginComponent */],
            __WEBPACK_IMPORTED_MODULE_14__Components_menu_menu_component__["a" /* MenuComponent */],
            __WEBPACK_IMPORTED_MODULE_15__Components_invalid_route_invalid_route_component__["a" /* InvalidRouteComponent */],
            __WEBPACK_IMPORTED_MODULE_16__Components_dashboard_dashboard_component__["a" /* DashboardComponent */],
            __WEBPACK_IMPORTED_MODULE_17__Components_bds_bds_component__["a" /* BDSComponent */],
            __WEBPACK_IMPORTED_MODULE_18__Components_uploads_uploads_component__["a" /* UploadsComponent */],
            __WEBPACK_IMPORTED_MODULE_19__Components_users_users_component__["a" /* UsersComponent */],
            __WEBPACK_IMPORTED_MODULE_20__Components_facilities_facilities_component__["a" /* FacilitiesComponent */],
            __WEBPACK_IMPORTED_MODULE_21__Components_reps_reps_component__["a" /* RepsComponent */],
            __WEBPACK_IMPORTED_MODULE_22__Components_date_picker_date_picker_component__["a" /* DatePickerComponent */],
            __WEBPACK_IMPORTED_MODULE_23__Components_manual_entry_manual_entry_component__["a" /* ManualEntryComponent */],
            __WEBPACK_IMPORTED_MODULE_24__Components_table_viewer_table_viewer_component__["a" /* TableViewerComponent */],
            __WEBPACK_IMPORTED_MODULE_25__Components_billers_billers_component__["a" /* BillersComponent */],
            __WEBPACK_IMPORTED_MODULE_26__Components_app_navigate_app_navigate_component__["a" /* AppNavigateComponent */],
            __WEBPACK_IMPORTED_MODULE_27__Components_reports_reports_component__["a" /* ReportsComponent */]
        ],
        imports: [
            __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser__["a" /* BrowserModule */],
            __WEBPACK_IMPORTED_MODULE_2__angular_forms__["a" /* FormsModule */],
            __WEBPACK_IMPORTED_MODULE_3__angular_http__["a" /* HttpModule */],
            __WEBPACK_IMPORTED_MODULE_11__app_routing_module__["a" /* AppRoutingModule */],
            __WEBPACK_IMPORTED_MODULE_4__angular_platform_browser_animations__["a" /* BrowserAnimationsModule */],
            __WEBPACK_IMPORTED_MODULE_4__angular_platform_browser_animations__["b" /* NoopAnimationsModule */],
            __WEBPACK_IMPORTED_MODULE_6_ngx_bootstrap__["a" /* ModalModule */].forRoot(),
            __WEBPACK_IMPORTED_MODULE_28_angularx_social_login__["c" /* SocialLoginModule */],
            __WEBPACK_IMPORTED_MODULE_29_ngx_spinner__["NgxSpinnerModule"]
        ],
        providers: [
            {
                provide: __WEBPACK_IMPORTED_MODULE_28_angularx_social_login__["a" /* AuthServiceConfig */],
                useFactory: provideConfig
            },
            __WEBPACK_IMPORTED_MODULE_10__general_service__["a" /* GeneralService */],
            __WEBPACK_IMPORTED_MODULE_7__Components_menu_menu_service__["a" /* MenuService */],
            __WEBPACK_IMPORTED_MODULE_8__Components_users_authentication_service__["a" /* AuthenticationService */],
            __WEBPACK_IMPORTED_MODULE_9__Components_date_picker_date_picker_service__["a" /* DatePickerService */]
        ],
        bootstrap: [__WEBPACK_IMPORTED_MODULE_12__app_component__["a" /* AppComponent */]]
    })
], AppModule);

//# sourceMappingURL=app.module.js.map

/***/ }),

/***/ 324:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return environment; });
// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.
// The file contents for the current environment will overwrite these during build.
var environment = {
    production: false
};
//# sourceMappingURL=environment.js.map

/***/ }),

/***/ 378:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(4)(false);
// imports


// module
exports.push([module.i, "/*table {\n    width: 100%;\n    height: 100%;\n    text-align: center;\n}\n\ntable td {\n    position: relative;\n    height: 100%;\n}\n\ntable td:first-child {\n    width: 20%;\n    min-width: 300px;\n}\n\ntable td:last-child {\n    width: 80%;\n}\n\n\n\n.section {\n    width: 85%;\n    height: 100%;\n    margin: 0px auto;\n}\n*/", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ 379:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(4)(false);
// imports


// module
exports.push([module.i, ".holder {\n    height: 100%;\n}\n\n.menu {\n    margin-top: 20px;\n}\n\n.menu table {\n    margin-bottom: 20px;\n}\n.menu table td {\n    padding: 5px;\n    border-bottom: 3px solid lightgray;\n    cursor: pointer;\n}\n\n.menu table td:hover {\n    border-bottom: 3px solid #107FE8;\n}\n\n.bdsEntry {\n    width: 100%;\n    height: 100%;\n}\n\n.bdsEntry .small {\n    width: 40%;\n    height: 100%;\n    background-color: lightgray;\n    position: relative;\n}\n\n.bdsEntry .large {\n    width: 60%;\n    height: 100%;\n    position: relative;\n}\n\n.data {\n    overflow: auto;\n}\n.entryTable {\n    margin-top: 10px;\n}\n\n.entryTable table {\n    text-align: left;\n}\n\n.entryTable table tr td {\n    padding:5px;\n}\n\n.entryTable table tr td:first-child {\n    font-size: small;\n    width: 30%;\n}\n\n.entryTable table tr td:last-child {\n    font-size: medium;\n    width: 70%;\n}\n\n.entryTable input, .entryTable select {\n    width: 100%;\n}\n\n.entryTable table tr td:last-child input, .entryTable table tr td:last-child select {\n    width: 90%;\n}\n\n.saveButton {\n    padding: 5px;\n    background-color: #107FE8;\n    color: white;\n    margin: 10px auto;\n    cursor: pointer;\n}\n\n.holderTable th, .holderTable td {\n    width: 150px;\n    min-width: 150px;\n    font-size: small;\n    text-align: center;\n    padding: 5px;\n}\n\n.view, .delete {\n    text-align: center;\n    color:white;\n    cursor: pointer;\n    text-decoration: underline;\n}\n\n.smallClass {\n    width: 80px;\n    max-width: 80px;\n}", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ 380:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(4)(false);
// imports


// module
exports.push([module.i, "  /*<div class=\"title\">Users</div>\n  <div class=\"actions\">\n    <div class=\"button green\"></div>\n    <div class=\"upload\">\n      Upload User File<input type=\"file\" />\n    </div>\n  </div>\n  <div class=\"search\">\n    <input type=\"text\" placeholder=\"Search Users\"/>\n  </div>\n  */\n\n    .menu {\n        margin-top: 20px;\n    }\n\n    .menu table {\n        margin-bottom: 20px;\n    }\n    .menu table td {\n        padding: 5px;\n        border-bottom: 3px solid lightgray;\n        cursor: pointer;\n    }\n\n    .menu table td:hover {\n        border-bottom: 3px solid #107FE8;\n    }\n\n    .section {\n        text-align: left;\n    }\n\n    .section .dateChooser {\n        margin-top: 10px;\n    }  \n\n.dataTable {\n    max-height: 600px;\n}\n  .title {\n    font-size: large;\n    font-weight: bold;\n  }\n\n  .button {\n      padding: 10px;\n      background-color: lightgray;\n      text-align: center;\n      cursor: pointer;\n  }\n\n  .search input {\n      padding: 5px;\n      font-size: medium;\n      border: 1px solid lightgray;\n      text-align: center;\n      width: 60%;\n  }\n\n  .table table {\n      width: 100%;\n      font-size: small;\n      text-align: center;\n      border: 1px solid whitesmoke;\n      padding: 10px;\n  }\n  .table table td, .table table th {\n      border-bottom: 1px solid whitesmoke;\n      padding: 10px;\n  }\n\n  .form {\n    padding: 10px;\n    width: 50%;\n    margin: 0px auto;\n  }\n  .form table {\n      width: 100%;\n      text-align: center;\n      border: 1px solid whitesmoke;\n      padding: 10px;      \n  }\n  .form td {\n      padding: 10px;\n  }\n  .table table tr:odd td {\n      background-color: #e8e8e8;\n  }\n\n  .edit:hover {\n      background-color: lightgray;\n  }\n\n  .edit {\n      padding: 5px;\n      border: 1px solid whitesmoke;\n      cursor: pointer;\n      text-align: center;\n  }\n\n  .green {\n      color:green\n  }\n\n  .blue {\n      color:blue;\n  }\n\n  .red {\n      color: red;\n  }\n\n  .orange {\n      color: orange;\n  }\n\n  textarea {\n      width: 90%;\n      height: 300px;\n  }", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ 381:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(4)(false);
// imports


// module
exports.push([module.i, ".menu {\n    margin-top: 20px;\n}\n\n.menu table {\n    margin-bottom: 20px;\n}\n.menu table td {\n    padding: 5px;\n    border-bottom: 3px solid lightgray;\n    cursor: pointer;\n}\n\n.menu table td:hover {\n    border-bottom: 3px solid #107FE8;\n}\n\nh1 {\n    padding: 0;\n    margin: 0;\n    font-weight: 300;\n}\n\n.section {\n    text-align: left;\n}\n\n.section .dateChooser {\n    margin-top: 10px;\n}\n\n.details .generalTable {\n    display: inline;\n}\n.details .generalTable td {\n    background-color: lightgray;\n    padding: 10px;\n    cursor: pointer;\n    border-bottom: 3px solid lightgray;\n}\n\n.details .generalTable td:hover {\n    border-bottom: 3px solid #107FE8;\n}\n\n.commissionTable td {\n    width: 225px;\n    background-color: #265B8D;\n    color: white;\n    cursor: pointer;\n    padding: 20px;\n    text-align: center;\n    border: 10px solid white;\n}\n\n.commissionTable td:hover {\n    background-color:#022E57;\n}\n\n.totalCommission {\n    color: limegreen;\n    font-size: xx-large;\n    font-weight: bold;\n}\n\n.totalCommission span {\n    color: black;\n    font-size: medium;\n}\n\n.manualEntry i {\n    padding-right: 10px;\n    font-size: small;\n}\n\n.manualEntry table {\n    width: 100%;\n}\n\n.manualEntry table td {\n    border: 3px solid white;\n}\n\n.manualEntry table td input {\n    width: 100%;\n    padding: 5px 0px 5px 0px;\n}\n\n.manualEntry table td:nth-child(1) {\n    width: 10%;\n}\n.manualEntry table td:nth-child(2) {\n    width: 40%;\n}\n.manualEntry table td:nth-child(3) {\n    width: 10%;\n}\n.manualEntry table td:nth-child(4) {\n    width: 10%;\n}\n\n.summaryTitle {\n    font-size: small;\n}\n\n.summaryNumber span:first-child {\n    font-size: large;\n}\n\n.summaryNumber span:last-child {\n    font-size: small;\n}\n\n.viewTable {\n    margin-top: 20px;\n}\n\n.viewTable table {\n    width: 100%;\n    border: 2px solid lightgray;\n    border-radius: 5px;\n    text-align: center;\n}\n\n.viewTable th, .viewTable td {\n    padding: 10px;\n}\n\n.viewTable tr:nth-child(odd) {\n    background-color: lightgray;\n}\n\n.currentStatus {\n    margin-top: 20px;\n}\n\n.currentStatus div {\n    padding: 20px;\n    font-size: x-large;\n    color: white;\n    font-weight: 600;   \n    cursor: pointer; \n}\n\n.currentStatus .active {\n    background-color: #90EE90;\n}\n\n.currentStatus .inactive {\n    background-color: #CE4F35;\n}\n\n.downloads div {\n    padding: 20px;\n    background-color: lightgray;\n    margin-top: 10px;\n    cursor: pointer;\n}\n\n.downloads div:hover {\n    background-color: #265B8D;\n    color: white;\n}\n\n.activeState {\n    text-align: center;\n    font-size: xx-large;\n}", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ 382:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(4)(false);
// imports


// module
exports.push([module.i, "", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ 383:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(4)(false);
// imports


// module
exports.push([module.i, "  /*<div class=\"title\">Users</div>\n  <div class=\"actions\">\n    <div class=\"button green\"></div>\n    <div class=\"upload\">\n      Upload User File<input type=\"file\" />\n    </div>\n  </div>\n  <div class=\"search\">\n    <input type=\"text\" placeholder=\"Search Users\"/>\n  </div>\n  */\n\n    .menu {\n        margin-top: 20px;\n    }\n\n    .menu table {\n        margin-bottom: 20px;\n    }\n    .menu table td {\n        padding: 5px;\n        border-bottom: 3px solid lightgray;\n        cursor: pointer;\n    }\n\n    .menu table td:hover {\n        border-bottom: 3px solid #107FE8;\n    }\n\n  .title {\n    font-size: large;\n    font-weight: bold;\n  }\n\n\n  .dataTable {\n      margin-top: 20px;\n      max-height: 600px;\n  }\n\n\n  .form {\n    padding: 10px;\n    width: 50%;\n    margin: 0px auto;\n  }\n  .form table {\n      width: 100%;\n      text-align: center;\n      border: 1px solid whitesmoke;\n      padding: 10px;      \n  }\n  .form td {\n      padding: 10px;\n  }\n\n  .edit:hover {\n      background-color: lightgray;\n  }\n\n  .edit {\n      padding: 5px;\n      border: 1px solid whitesmoke;\n      cursor: pointer;\n      text-align: center;\n  }\n\n  .green {\n      color:green\n  }\n\n  .blue {\n      color:blue;\n  }\n\n  .red {\n      color: red;\n  }\n\n  .orange {\n      color: orange;\n  }\n\n  textarea {\n      width: 90%;\n      height: 300px;\n  }", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ 384:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(4)(false);
// imports


// module
exports.push([module.i, "", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ 385:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(4)(false);
// imports


// module
exports.push([module.i, "div, table {\n    text-align: center;\n    width: 100%;\n    height: 100%;\n}\n\ntable td {\n    height: 100%;\n}\n\nimg {\n    width: 800px;\n    height: 125px;\n}\n\nspan {\n    background-color: #022E57;\n    padding: 15px;\n    color: whitesmoke;\n    cursor: pointer;\n    border: 5px solid #265B8D;\n    border-radius: 10px;\n}\n\nspan:hover {\n    background-color: #265B8D;\n}\n\n\n@media (max-width: 300px) {\n    img {\n        width: 300px;\n        height: 46.875px;\n    }\n}\n\n@media (max-width: 500px) {\n    img {\n        width: 500px;\n        height: 78.125px;\n    }\n}", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ 386:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(4)(false);
// imports


// module
exports.push([module.i, "", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ 387:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(4)(false);
// imports


// module
exports.push([module.i, ".holder {\n    background-color: #2E3033;\n    width: 100%;\n    height: 100%;\n    color: white;\n    padding: 20px;\n    position: relative;\n    z-index: 1000;\n}\n\nh1, h4 {\n    padding: 0;\n    margin: 0;\n    font-weight: 300;\n    display: inline;\n}\n\nh4 {\n    font-size: small;\n}\n\n.version {\n    font-size: small;\n    color: orange;\n}\n\n.user {\n    padding: 5px;\n    border-bottom: 1px solid #3F4145;\n}\n\n.user img {\n    width: 20px;\n    height: 20px;\n    vertical-align: bottom;\n}\n\n.user span {\n    font-size: small;\n}\n\n.usertype {\n    color: #265B8D;\n}\n\n.logout, .menuChoices td {\n    cursor: pointer;\n    padding: 10px;\n    border-radius: 5px;\n}\n\n.menuChoices td i {\n    padding-right: 100px;\n}\n\n.logout:hover, .menuChoices td:hover {\n    background-color: #3F4145;\n}\n\n.logout i {\n    color: #CE4F35;\n}\n\n.menuChoices {\n    margin-top: 20px;\n}\n\n.menuChoices table {\n    width: 100%;\n}\n\n.menuChoices td {\n    text-align: left;\n    width: 100%;\n}\n\n.viewAs {\n    margin-top: 20px;\n    background-color: #107FE8;\n    padding: 10px;\n    border-radius: 10px;\n}\n\n.viewAs .titleViewAs {\n    padding: 5px;\n}\n\n.viewAs .viewAsSection select {\n    width: 100%;\n    padding: 10px;\n    font-size: medium;\n    text-align: center;\n}\n\n@media (max-width: 1000px) {\n    .holder {\n        height: auto;\n    } \n}\n\n", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ 388:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(4)(false);
// imports


// module
exports.push([module.i, "", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ 389:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(4)(false);
// imports


// module
exports.push([module.i, "  /*<div class=\"title\">Users</div>\n  <div class=\"actions\">\n    <div class=\"button green\"></div>\n    <div class=\"upload\">\n      Upload User File<input type=\"file\" />\n    </div>\n  </div>\n  <div class=\"search\">\n    <input type=\"text\" placeholder=\"Search Users\"/>\n  </div>\n  */\n\n    .menu {\n        margin-top: 20px;\n    }\n\n    .menu table {\n        margin-bottom: 20px;\n    }\n    .menu table td {\n        padding: 5px;\n        border-bottom: 3px solid lightgray;\n        cursor: pointer;\n    }\n\n    .menu table td:hover {\n        border-bottom: 3px solid #107FE8;\n    }\n\n  .title {\n    font-size: large;\n    font-weight: bold;\n  }\n\n\n  .dataTable {\n      margin-top: 20px;\n  }\n\n\n  .form {\n    padding: 10px;\n    width: 50%;\n    margin: 0px auto;\n  }\n  .form table {\n      width: 100%;\n      text-align: center;\n      border: 1px solid whitesmoke;\n      padding: 10px;      \n  }\n  .form td {\n      padding: 10px;\n  }\n\n  .edit:hover {\n      background-color: lightgray;\n  }\n\n  .edit {\n      padding: 5px;\n      border: 1px solid whitesmoke;\n      cursor: pointer;\n      text-align: center;\n  }\n\n  .green {\n      color:green\n  }\n\n  .blue {\n      color:blue;\n  }\n\n  .red {\n      color: red;\n  }\n\n  .orange {\n      color: orange;\n  }\n\n  textarea {\n      width: 90%;\n      height: 300px;\n  }\n", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ 390:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(4)(false);
// imports


// module
exports.push([module.i, "", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ 391:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(4)(false);
// imports


// module
exports.push([module.i, ".holderUploads {\n    max-height: 100%;\n    overflow: auto;\n}\n.choose {\n    text-align: left;\n}\n\n.billers {\n    text-align: left;\n    width: 100%;\n    display: block;\n    padding: 20px;\n}\n\n.biller {\n    width: 150px;\n    text-align: center;\n    background-color:#265B8D;;\n    color: white;\n    padding: 20px;\n    margin-top: 10px;\n    margin-right: 10px;\n    margin-bottom: 10px;\n    border-radius: 5px;\n    float: left;\n    cursor: pointer;\n}\n\n.biller:hover {\n    background-color: #022E57;\n}\n\n.Abbreviation {\n    font-size: large;\n}\n\n.Name {\n    font-size: small;\n}\n\n.reportDetail {\n    text-align: left;\n}\n\n.columnMapping, .uploadStatus, .unmappedColumns {\n    margin-top: 10px;\n}\n\n.uploadStatus i {\n    color: lightgray;\n    padding-right: 10px;\n}\n.columnMapping table td, .unmappedColumns table td {\n    padding: 10px;\n}\n\n.columnMapping table td input, .unmappedColumns table td select {\n    padding: 5px;\n    width: 150px;\n}\n\n.updateButton {\n    padding: 10px;\n    background-color: #107FE8;\n    color: white;\n    margin: 0px auto;\n    cursor: pointer;\n}", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ 392:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(4)(false);
// imports


// module
exports.push([module.i, "  /*<div class=\"title\">Users</div>\n  <div class=\"actions\">\n    <div class=\"button green\"></div>\n    <div class=\"upload\">\n      Upload User File<input type=\"file\" />\n    </div>\n  </div>\n  <div class=\"search\">\n    <input type=\"text\" placeholder=\"Search Users\"/>\n  </div>\n  */\n\n    .menu {\n        margin-top: 20px;\n    }\n\n    .menu table {\n        margin-bottom: 20px;\n    }\n    .menu table td {\n        padding: 5px;\n        border-bottom: 3px solid lightgray;\n        cursor: pointer;\n    }\n\n    .menu table td:hover {\n        border-bottom: 3px solid #107FE8;\n    }\n\n    .section {\n        text-align: left;\n    }\n\n    .section .dateChooser {\n        margin-top: 10px;\n    }  \n\n  .title {\n    font-size: large;\n    font-weight: bold;\n  }\n\n  .button {\n      padding: 10px;\n      background-color: lightgray;\n      text-align: center;\n      cursor: pointer;\n  }\n\n  .search input {\n      padding: 5px;\n      font-size: medium;\n      border: 1px solid lightgray;\n      text-align: center;\n      width: 60%;\n  }\n\n  .table table {\n      width: 100%;\n      font-size: small;\n      text-align: center;\n      border: 1px solid whitesmoke;\n      padding: 10px;\n  }\n  .table table td, .table table th {\n      border-bottom: 1px solid whitesmoke;\n      padding: 10px;\n  }\n\n  .form {\n    padding: 10px;\n    width: 50%;\n    margin: 0px auto;\n  }\n  .form table {\n      width: 100%;\n      text-align: center;\n      border: 1px solid whitesmoke;\n      padding: 10px;      \n  }\n  .form td {\n      padding: 10px;\n  }\n  .table table tr:odd td {\n      background-color: #e8e8e8;\n  }\n\n  .edit:hover {\n      background-color: lightgray;\n  }\n\n  .edit {\n      padding: 5px;\n      border: 1px solid whitesmoke;\n      cursor: pointer;\n      text-align: center;\n  }\n\n  .green {\n      color:green\n  }\n\n  .blue {\n      color:blue;\n  }\n\n  .red {\n      color: red;\n  }\n\n  .orange {\n      color: orange;\n  }\n\n  textarea {\n      width: 90%;\n      height: 300px;\n  }", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ 393:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(4)(false);
// imports


// module
exports.push([module.i, "div, table {\n    text-align: center;\n    width: 100%;\n    height: 100%;\n}\n\ntable td {\n    height: 100%;\n}\n\nimg {\n    width: 800px;\n    height: 125px;\n}\n\nspan {\n    background-color: #022E57;\n    padding: 15px;\n    color: whitesmoke;\n    cursor: pointer;\n    border: 5px solid #265B8D;\n    border-radius: 10px;\n}\n\nspan:hover {\n    background-color: #265B8D;\n}\n\n\n@media (max-width: 300px) {\n    img {\n        width: 300px;\n        height: 46.875px;\n    }\n}\n\n@media (max-width: 500px) {\n    img {\n        width: 500px;\n        height: 78.125px;\n    }\n}", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ 395:
/***/ (function(module, exports, __webpack_require__) {

var map = {
	"./af": 126,
	"./af.js": 126,
	"./ar": 133,
	"./ar-dz": 127,
	"./ar-dz.js": 127,
	"./ar-kw": 128,
	"./ar-kw.js": 128,
	"./ar-ly": 129,
	"./ar-ly.js": 129,
	"./ar-ma": 130,
	"./ar-ma.js": 130,
	"./ar-sa": 131,
	"./ar-sa.js": 131,
	"./ar-tn": 132,
	"./ar-tn.js": 132,
	"./ar.js": 133,
	"./az": 134,
	"./az.js": 134,
	"./be": 135,
	"./be.js": 135,
	"./bg": 136,
	"./bg.js": 136,
	"./bn": 137,
	"./bn.js": 137,
	"./bo": 138,
	"./bo.js": 138,
	"./br": 139,
	"./br.js": 139,
	"./bs": 140,
	"./bs.js": 140,
	"./ca": 141,
	"./ca.js": 141,
	"./cs": 142,
	"./cs.js": 142,
	"./cv": 143,
	"./cv.js": 143,
	"./cy": 144,
	"./cy.js": 144,
	"./da": 145,
	"./da.js": 145,
	"./de": 148,
	"./de-at": 146,
	"./de-at.js": 146,
	"./de-ch": 147,
	"./de-ch.js": 147,
	"./de.js": 148,
	"./dv": 149,
	"./dv.js": 149,
	"./el": 150,
	"./el.js": 150,
	"./en-au": 151,
	"./en-au.js": 151,
	"./en-ca": 152,
	"./en-ca.js": 152,
	"./en-gb": 153,
	"./en-gb.js": 153,
	"./en-ie": 154,
	"./en-ie.js": 154,
	"./en-nz": 155,
	"./en-nz.js": 155,
	"./eo": 156,
	"./eo.js": 156,
	"./es": 158,
	"./es-do": 157,
	"./es-do.js": 157,
	"./es.js": 158,
	"./et": 159,
	"./et.js": 159,
	"./eu": 160,
	"./eu.js": 160,
	"./fa": 161,
	"./fa.js": 161,
	"./fi": 162,
	"./fi.js": 162,
	"./fo": 163,
	"./fo.js": 163,
	"./fr": 166,
	"./fr-ca": 164,
	"./fr-ca.js": 164,
	"./fr-ch": 165,
	"./fr-ch.js": 165,
	"./fr.js": 166,
	"./fy": 167,
	"./fy.js": 167,
	"./gd": 168,
	"./gd.js": 168,
	"./gl": 169,
	"./gl.js": 169,
	"./gom-latn": 170,
	"./gom-latn.js": 170,
	"./he": 171,
	"./he.js": 171,
	"./hi": 172,
	"./hi.js": 172,
	"./hr": 173,
	"./hr.js": 173,
	"./hu": 174,
	"./hu.js": 174,
	"./hy-am": 175,
	"./hy-am.js": 175,
	"./id": 176,
	"./id.js": 176,
	"./is": 177,
	"./is.js": 177,
	"./it": 178,
	"./it.js": 178,
	"./ja": 179,
	"./ja.js": 179,
	"./jv": 180,
	"./jv.js": 180,
	"./ka": 181,
	"./ka.js": 181,
	"./kk": 182,
	"./kk.js": 182,
	"./km": 183,
	"./km.js": 183,
	"./kn": 184,
	"./kn.js": 184,
	"./ko": 185,
	"./ko.js": 185,
	"./ky": 186,
	"./ky.js": 186,
	"./lb": 187,
	"./lb.js": 187,
	"./lo": 188,
	"./lo.js": 188,
	"./lt": 189,
	"./lt.js": 189,
	"./lv": 190,
	"./lv.js": 190,
	"./me": 191,
	"./me.js": 191,
	"./mi": 192,
	"./mi.js": 192,
	"./mk": 193,
	"./mk.js": 193,
	"./ml": 194,
	"./ml.js": 194,
	"./mr": 195,
	"./mr.js": 195,
	"./ms": 197,
	"./ms-my": 196,
	"./ms-my.js": 196,
	"./ms.js": 197,
	"./my": 198,
	"./my.js": 198,
	"./nb": 199,
	"./nb.js": 199,
	"./ne": 200,
	"./ne.js": 200,
	"./nl": 202,
	"./nl-be": 201,
	"./nl-be.js": 201,
	"./nl.js": 202,
	"./nn": 203,
	"./nn.js": 203,
	"./pa-in": 204,
	"./pa-in.js": 204,
	"./pl": 205,
	"./pl.js": 205,
	"./pt": 207,
	"./pt-br": 206,
	"./pt-br.js": 206,
	"./pt.js": 207,
	"./ro": 208,
	"./ro.js": 208,
	"./ru": 209,
	"./ru.js": 209,
	"./sd": 210,
	"./sd.js": 210,
	"./se": 211,
	"./se.js": 211,
	"./si": 212,
	"./si.js": 212,
	"./sk": 213,
	"./sk.js": 213,
	"./sl": 214,
	"./sl.js": 214,
	"./sq": 215,
	"./sq.js": 215,
	"./sr": 217,
	"./sr-cyrl": 216,
	"./sr-cyrl.js": 216,
	"./sr.js": 217,
	"./ss": 218,
	"./ss.js": 218,
	"./sv": 219,
	"./sv.js": 219,
	"./sw": 220,
	"./sw.js": 220,
	"./ta": 221,
	"./ta.js": 221,
	"./te": 222,
	"./te.js": 222,
	"./tet": 223,
	"./tet.js": 223,
	"./th": 224,
	"./th.js": 224,
	"./tl-ph": 225,
	"./tl-ph.js": 225,
	"./tlh": 226,
	"./tlh.js": 226,
	"./tr": 227,
	"./tr.js": 227,
	"./tzl": 228,
	"./tzl.js": 228,
	"./tzm": 230,
	"./tzm-latn": 229,
	"./tzm-latn.js": 229,
	"./tzm.js": 230,
	"./uk": 231,
	"./uk.js": 231,
	"./ur": 232,
	"./ur.js": 232,
	"./uz": 234,
	"./uz-latn": 233,
	"./uz-latn.js": 233,
	"./uz.js": 234,
	"./vi": 235,
	"./vi.js": 235,
	"./x-pseudo": 236,
	"./x-pseudo.js": 236,
	"./yo": 237,
	"./yo.js": 237,
	"./zh-cn": 238,
	"./zh-cn.js": 238,
	"./zh-hk": 239,
	"./zh-hk.js": 239,
	"./zh-tw": 240,
	"./zh-tw.js": 240
};
function webpackContext(req) {
	return __webpack_require__(webpackContextResolve(req));
};
function webpackContextResolve(req) {
	var id = map[req];
	if(!(id + 1)) // check for number
		throw new Error("Cannot find module '" + req + "'.");
	return id;
};
webpackContext.keys = function webpackContextKeys() {
	return Object.keys(map);
};
webpackContext.resolve = webpackContextResolve;
module.exports = webpackContext;
webpackContext.id = 395;


/***/ }),

/***/ 418:
/***/ (function(module, exports) {

module.exports = "<div class=\"row fluid-maxheight\">\n  <div class=\"col-md-3 fluid-maxheight\" *ngIf=\"goodLocation.showMenu\">\n    <div class=\"menu fluid-maxheight\">\n        <app-menu></app-menu>\n    </div>\n  </div>\n  <div class=\"col-md-9 fluid-maxheight\" [ngClass]=\"{'col-md-9':goodLocation.showMenu,'col-md-12':!goodLocation.showMenu}\">\n    <button class=\"button\" *ngIf=\"!goodLocation.showMenu\" (click)=\"goodLocation.changeMenu()\">Show Menu</button>\n    <router-outlet></router-outlet>\n  </div>\n</div>\n<!--\n<table>\n  <tr>\n    <td *ngIf=\"menuSerivce.showMenu\">\n\n    </td>\n    <td>\n      <div class=\"section\">\n        <router-outlet></router-outlet>\n      </div>\n    </td>\n  </tr>\n</table>\n-->"

/***/ }),

/***/ 419:
/***/ (function(module, exports) {

module.exports = "<div class=\"container-fluid\"> \n  <div class=\"menu\">\n    <table>\n      <tr>\n        <td (click)=\"currentView = 'NewBDS'\" [style.borderBottom]=\"(currentView == 'NewBDS') ? '3px solid #107FE8' : ''\">BDS Entry</td>\n        <td *ngIf=\"auth.usertype == 'ADMIN'\" (click)=\"download()\">Download BDS</td>\n        <td *ngIf=\"auth.usertype == 'ADMIN'\" (click)=\"downloadFacilityWarning()\">Download Facility Warnings</td>\n        <!--<td (click)=\"currentView = 'Mapped'\" [style.borderBottom]=\"(currentView == 'Mapped') ? '3px solid #107FE8' : ''\">Review/Update BDS</td>\n        <td (click)=\"currentView = 'Unmapped'\" [style.borderBottom]=\"(currentView == 'Unmapped') ? '3px solid #107FE8' : ''\">Unmapped BDS Data</td>\n        <td (click)=\"currentView = 'AtRisk'\" [style.borderBottom]=\"(currentView == 'AtRisk') ? '3px solid #107FE8' : ''\">At Risk Facilities</td>-->\n      </tr>\n    </table>\n  </div>\n\n  <div class=\"section\" *ngIf=\"currentView !== 'AtRisk'\">\n    <div class=\"row\">\n      <div class=\"col-md-12\">\n        <button type=\"button\" class=\"btn btn-info\" (click)=\"searchBDS()\">All BDS</button>\n        <button type=\"button\" class=\"btn btn-info\" (click)=\"searchBDS('','',0, true)\">My BDS</button>\n        <br>\n        <br>\n        <button type=\"button\" class=\"btn btn-primary\">Today Total BDS Entry <span class=\"badge\">{{(BDSDashboard[0]) ? BDSDashboard[0].COUNTERS : ''}}</span></button>\n        <button type=\"button\" class=\"btn btn-primary\">Today My BDS Entry <span class=\"badge\">{{(BDSDashboard[1]) ? BDSDashboard[1].COUNTERS : ''}}</span></button>\n        <button type=\"button\" class=\"btn btn-primary\">MTD Total BDS Entry <span class=\"badge\">{{(BDSDashboard[2]) ? BDSDashboard[2].COUNTERS : ''}}</span></button>\n        <button type=\"button\" class=\"btn btn-primary\">MTD My BDS Entry <span class=\"badge\">{{(BDSDashboard[3]) ? BDSDashboard[3].COUNTERS : ''}}</span></button>\n      </div>\n    </div>\n    <div class=\"row\">\n      <div class=\"col-md-12\">\n      <div class=\"col-md-5\">\n        <div class=\"data\">\n          <h4>BDS Static Entry:</h4>\n          <div class=\"entryTable\">\n            <table>\n              <tr>\n                <td>BILLER</td>\n                <td>\n                  <select [(ngModel)]=\"NewBDSObject.BILLER\">\n                    <option *ngFor=\"let biller of general.Billers\" [value]=\"biller.ID\">{{biller.TITLE}}</option>\n                  </select>\n                </td>               \n              </tr>\n              <tr>\n                <td>FACILITY ACRONYM</td>\n                <td>\n                  <select [(ngModel)]=\"NewBDSObject.FACILITY\">\n                    <option *ngFor=\"let facilitya of general.Facilities\" [value]=\"facilitya.ID\">{{facilitya.ACRONYM}}</option>\n                  </select>\n                </td>               \n              </tr>              \n              <tr>\n                <td>FACILITY</td>\n                <td>\n                  <select [(ngModel)]=\"NewBDSObject.FACILITY\">\n                    <option *ngFor=\"let facilityb of general.Facilities\" [value]=\"facilityb.ID\">{{facilityb.TITLE}}</option>\n                  </select>\n                </td>               \n              </tr>\n              <tr>\n                <td>IF_OR_HOME</td>\n                <td>\n                  <select [(ngModel)]=\"NewBDSObject.IF_OR_HOME\">\n                    <option value=\"IF\">IF</option>\n                    <option value=\"HOME\">HOME</option>\n                  </select>\n                </td>               \n              </tr>  \n              <tr>\n                <td>SCAN_DATE</td>\n                <td><input type=\"date\" [(ngModel)]=\"NewBDSObject.SCAN_DATE\"/></td>               \n              </tr>                              \n            </table>\n          </div>\n        </div>  \n      </div> \n      <div class=\"col-md-7\">\n        <div class=\"data\">\n          <h4>BDS Variable Entry:</h4>\n          <div class=\"entryTable\">\n            <table>               \n              <tr>\n                <td>PATIENT_LAST_NAME</td>\n                <td><input type=\"text\" [(ngModel)]=\"NewBDSObject.PATIENT_LAST_NAME\" id=\"selectable\"/></td>               \n              </tr>\n              <tr>\n                <td>PATIENT_FIRST_NAME</td>\n                <td><input type=\"text\" [(ngModel)]=\"NewBDSObject.PATIENT_FIRST_NAME\"/></td>               \n              </tr>\n              <tr>\n                <td>DATE_OF_SERVICE</td>\n                <td><input type=\"date\" [(ngModel)]=\"NewBDSObject.DATE_OF_SERVICE\"/></td>               \n              </tr>              \n              <tr>\n                <td>TAKE_HOME_SERIAL</td>\n                <td><input type=\"text\" [(ngModel)]=\"NewBDSObject.TAKEHOMESERIAL\"/></td>               \n              </tr>                   \n              <tr>\n                <td>INSURANCE</td>\n                <td><input type=\"text\" [(ngModel)]=\"NewBDSObject.INSURANCE\"/></td>               \n              </tr>                                                                                                            \n              <tr>\n                <td colspan=\"2\">\n                  <button type=\"button\" class=\"btn btn-success form-control\" (click)=\"saveForm()\">Save</button> \n                </td>\n              </tr>\n            </table>\n          </div>\n        </div>              \n      </div>\n      </div>\n    </div>\n    <br>\n    <br>\n    <div class=\"row maxheight\">\n      <div class=\"col-md-12 maxheight\">\n        <div class=\"data maxheight\">\n          <table class=\"holderTable maxheight maxwidth overflow table-striped center table-hover\">\n            <thead>\n            <tr>\n              <th>ACTION</th>              \n              <th>BILLER</th>\n              <th>FACILITY</th>\n              <th>PATIENT_LAST_NAME</th>\n              <th>PATIENT_FIRST_NAME</th>\n              <th>DATE_OF_SERVICE</th>\n              <th>SCAN_DATE</th>\n              <th>IF_OR_HOME</th>\n              <th>INSURANCE</th>\n              <th>TAKEHOMESERIAL</th>\n              <th>CREATED BY</th>\n              <th>CREATED DATE</th>\n              <th>MODIFIED BY</th>\n              <th>MODIFIED DATE</th>\n            </tr>\n            </thead>\n            <tbody>\n            <tr>\n              <td></td>             \n              <td><div class=\"input-group\"><input type=\"text\" placeholder=\"BILLER SEARCH\" [(ngModel)]=\"BillerSearch\" class=\"form-control\"/><div class=\"input-group-btn\"><button (click)=\"searchBDS(BillerSearch, 'BILLER_NAME', 0)\" class=\"btn btn-default\"><i class=\"glyphicon glyphicon-search\"></i></button></div></div></td>\n              <td><div class=\"input-group\"><input type=\"text\" placeholder=\"FACILITY SEARCH\" [(ngModel)]=\"FacilitySearch\" class=\"form-control\"/><div class=\"input-group-btn\"><button (click)=\"searchBDS(FacilitySearch, 'FACILITY_NAME', 0)\" class=\"btn btn-default\"><i class=\"glyphicon glyphicon-search\"></i></button></div></div></td>\n              <td colspan=\"2\"><div class=\"input-group\"><input type=\"text\" placeholder=\"PATIENT SEARCH\" [(ngModel)]=\"PATIENTSearch\" class=\"form-control\"/><div class=\"input-group-btn\"><button (click)=\"searchBDS(PATIENTSearch, 'PATIENT', 0)\" class=\"btn btn-default\"><i class=\"glyphicon glyphicon-search\"></i></button></div></div></td>\n              <td><div class=\"input-group\"><input type=\"date\" placeholder=\"DOS SEARCH\" [(ngModel)]=\"ServiceSearch\" class=\"form-control\"/><div class=\"input-group-btn\"><button (click)=\"searchBDS(ServiceSearch, 'DATE_OF_SERVICE', 0)\" class=\"btn btn-default\"><i class=\"glyphicon glyphicon-search\"></i></button></div></div></td>\n              <td><div class=\"input-group\"><input type=\"date\" placeholder=\"SCAN DATE SEARCH\" [(ngModel)]=\"ScanSearch\" class=\"form-control\"/><div class=\"input-group-btn\"><button (click)=\"searchBDS(ScanSearch, 'SCAN_DATE', 0)\" class=\"btn btn-default\"><i class=\"glyphicon glyphicon-search\"></i></button></div></div></td>\n              <td></td>\n              <td><div class=\"input-group\"><input type=\"text\" placeholder=\"INSURANCE SEARCH\" [(ngModel)]=\"INSURANCESearch\" class=\"form-control\"/><div class=\"input-group-btn\"><button (click)=\"searchBDS(INSURANCESearch, 'INSURANCE', 0)\" class=\"btn btn-default\"><i class=\"glyphicon glyphicon-search\"></i></button></div></div></td>\n              <td></td>\n              <td></td>\n              <td></td>\n              <td></td>\n              <td></td>\n            </tr>              \n            <tr *ngFor=\"let item of finalTable\">\n              <td>\n                <button (click)=\"replaceItem(item)\" type=\"button\" class=\"btn btn-info marginright\">View</button>\n                <button (click)=\"deleteItem(item)\" type=\"button\" class=\"btn btn-danger\">Delete</button>\n              </td>                   \n              <td>{{item.BILLER_NAME}}</td>\n              <td>{{item.FACILITY_NAME}}</td>                \n              <td>{{item.PATIENT_LAST_NAME}}</td>\n              <td>{{item.PATIENT_FIRST_NAME}}</td>                \n              <td>{{item.DATE_OF_SERVICE | date}}</td>\n              <td>{{item.SCAN_DATE | date}}</td>                \n              <td>{{item.IF_OR_HOME}}</td>\n              <td>{{item.INSURANCE}}</td>      \n              <td>{{item.TAKEHOMESERIAL}}</td>   \n              <td>{{item.CREATED}}</td>\n              <td>{{item.CREATED_DATE}}</td>\n              <td>{{item.MODIFIED}}</td>    \n              <td>{{item.MODIFIED_DATE}}</td>                              \n            </tr>\n            </tbody>\n          </table>\n        </div>        \n      </div>\n    </div>    \n  </div>\n\n  <!--<div class=\"section\" *ngIf=\"currentView == 'AtRisk'\">\n    <table>\n      <tr>\n        <th>Facility Name</th>\n        <th>Last Entry Date</th>\n        <th>Days Since Last Entry</th>\n      </tr>\n    </table>\n  </div>-->\n</div>\n"

/***/ }),

/***/ 420:
/***/ (function(module, exports) {

module.exports = "<div class=\"holder\">\n  <h1 class=\"title\">Billers</h1>\n  <div class=\"menu\">\n      <table cellspacing=\"20px\">\n          <tr>\n              <td *ngIf=\"auth.usertype == 'ADMIN'\" (click)=\"currentView = 'View'; newUser.formName = 'Edit Biller:'; showForm = false;\" [style.borderBottom]=\"(currentView == 'View')?'3px solid #107FE8':''\">View Billers</td>\n              <td *ngIf=\"auth.usertype == 'ADMIN'\" (click)=\"currentView = 'Upload'; showForm = false;\" [style.borderBottom]=\"(currentView == 'Upload')?'3px solid #107FE8':''\">Upload Billers</td>\n              <td *ngIf=\"auth.usertype == 'ADMIN'\" (click)=\"currentView = 'View'; download()\">Download Billers</td>\n          </tr>\n      </table>\n  </div>  \n  <div class=\"section\" *ngIf=\"currentView == 'View'\">\n    <div class=\"row\">\n      <div class=\"col-md-12\">\n        <div class=\"input-group\">\n          <input class=\"form-control\" type=\"text\" placeholder=\"Search Billers\" [(ngModel)]=\"searchText\" (ngModelChange)=\"searchUsers()\"/>\n          <div class=\"input-group-btn\"><button class=\"btn btn-default\"><i class=\"glyphicon glyphicon-search\"></i></button>          \n        </div>\n      </div>\n    </div>    \n    <div class=\"row\">\n      <div class=\"col-md-12\">\n        <div class=\"dataTable overflow center padding\">\n          <table cellspacing=\"0\" class=\"table table-striped table-hover center\">\n            <thead>\n            <tr>\n              <th>Biller Name</th>\n              <th>Biller Abbreviation</th>\n              <th colspan=\"1\">Actions</th>\n            </tr>\n            </thead>\n            <tbody>\n            <tr>\n              <td>\n                <div class=\"form-group\">\n                  <div class=\"input-group\">\n                    <span class=\"input-group-addon\">Name:</span>\n                    <input [(ngModel)]=\"newUser.TITLE\" type=\"text\" class=\"form-control\" placeholder=\"Biller Name\" id=\"newUserStartLocation\"/>\n                  </div>\n                </div>   \n              </td>\n              <td>\n                <div class=\"form-group\">\n                  <div class=\"input-group\">\n                    <span class=\"input-group-addon\">Abbreviation:</span>\n                    <input [(ngModel)]=\"newUser.ABBREVIATION\" type=\"text\" class=\"form-control\" placeholder=\"Biller Abbreviation\"/>\n                  </div>\n                </div>\n              </td>\n              <td><button (click)=\"saveForm()\" type=\"button\" class=\"btn btn-success form-control\">SAVE/ADD</button></td>              \n            </tr>\n            <tr *ngFor=\"let biller of finalTable\">\n              <td>{{biller.TITLE}}</td>\n              <td>{{biller.ABBREVIATION}}</td>\n              <td>\n                <button (click)=\"beginEdit(biller)\" type=\"button\" class=\"btn btn-info\">Edit</button>\n              </td>\n            </tr>\n            </tbody>\n          </table>\n        </div>    \n      </div>\n    </div>      \n  </div> \n</div>\n\n\n\n\n<div class=\"section\" *ngIf=\"currentView == 'Upload'\">\n  <textarea [(ngModel)]=\"textarea\" placeholder=\"Paste in Biller Data NAME\"></textarea>\n  <button type=\"button\" class=\"btn btn-primary\" (click)=\"bulkUpload()\">Upload</button>\n</div> "

/***/ }),

/***/ 421:
/***/ (function(module, exports) {

module.exports = "<ngx-spinner></ngx-spinner>\n<div class=\"holder\">\n    <div class=\"menu\">\n        <table cellspacing=\"20px\">\n            <tr>\n                <td (click)=\"setCurrentRep(); currentView = 'Dashboard'\" [style.borderBottom]=\"(currentView == 'Dashboard')?'3px solid #107FE8':''\">Dashboard</td>\n                <td *ngIf=\"auth.usertype == 'ADMIN'\" (click)=\"activeState = ''; currentView = 'ActiveReports'\" [style.borderBottom]=\"(currentView == 'ActiveReports')?'3px solid #107FE8':''\">Active Reports</td>\n                <td *ngIf=\"auth.usertype == 'ADMIN'\" (click)=\"currentView = 'Downloads'\" [style.borderBottom]=\"(currentView == 'Downloads')?'3px solid #107FE8':''\">Downloads</td>\n            </tr>\n        </table>\n    </div>\n\n    <div class=\"section\" *ngIf=\"currentView == 'Dashboard'\">\n        <h1>{{(currentRep) ? currentRep.TITLE : ''}} Commission Dashboard</h1>\n        <div class=\"input-group\" *ngIf=\"auth.usertype == 'ADMIN' || auth.usertype == 'SUPER'\">\n            <span class=\"input-group-addon\">Choose a Rep:</span>\n            <select class=\"form-control\" [(ngModel)]=\"currentRepID\" (ngModelChange)=\"reportName = ''; setCurrentRep(currentRepID)\">\n                <option *ngFor=\"let rep of general.Reps\" [value]=\"rep.ID\">{{rep.TITLE}}</option>\n            </select>\n        </div>\n        <div class=\"dateChooser\">\n            Choose a Date:\n            <app-date-picker></app-date-picker>\n            <!--<button (click)=\"setCurrentRep(currentRep.ID)\" type=\"button\" class=\"btn btn-primary\">Review</button>-->\n        </div>\n        <br>\n        <div class=\"totalCommission\">\n            <span>Total Commissions:</span> {{commissionData.TOTAL_COMMISSIONS | currency:'USD':true:'1.2-2'}}\n        </div>\n        <div *ngIf=\"auth.usertype == 'ADMIN'\" class=\"panel panel-default\">\n            <div class=\"panel-heading\" data-toggle=\"collapse\" data-target=\"#manual\">Manual Entry Section</div>\n            <div id=\"manual\" class=\"panel-body collapse\">\n                <table class=\"table table-hover\">\n                    <thead>\n                        <tr>\n                            <th>Title</th>\n                            <th>Description</th>\n                            <th>Amount</th>\n                            <th>Action</th>\n                        </tr>\n                    </thead>\n                    <tbody>\n                        <tr>\n                            <td><input class=\"form-control\" type=\"text\" placeholder=\"Category/Title\" [(ngModel)]=\"manualData.TITLE\" /></td>\n                            <td><input class=\"form-control\" type=\"text\" placeholder=\"Description\" [(ngModel)]=\"manualData.DESCRIPTION\" /></td>\n                            <td><input class=\"form-control\" type=\"number\" placeholder=\"Amount\" [(ngModel)]=\"manualData.AMOUNT\" /></td>\n                            <td><button (click)=\"newManualEntry()\" class=\"btn btn-success form-control\">Add</button></td>\n                        </tr>\n                        <tr *ngFor=\"let man of manual\">\n                            <td>{{man.TITLE}}</td>\n                            <td>{{man.DESCRIPTION}}</td>\n                            <td>{{man.AMOUNT | currency:'USD':true:'1.2-2'}}</td>\n                            <td><button (click)=\"removeManualEntry(man)\" type=\"button\" class=\"btn btn-danger\">Remove</button></td>\n                        </tr>\n                    </tbody>\n                </table>\n            </div>\n        </div>       \n\n        <div class=\"panel panel-default\" *ngIf=\"activeState || auth.usertype == 'ADMIN'\">\n            <div class=\"panel-heading\" data-toggle=\"collapse\" data-target=\"#comDetail\">Commission Detail Section</div>\n            <div id=\"comDetail\" class=\"panel-body collapse in\">\n                <button (click)=\"showDetail('paid',true, 'PAID DETAILS: GENERAL + OVERRIDES')\" class=\"btn btn-primary\">Paid Detail</button>\n                <button (click)=\"showDetail('cogs',true, 'COGS DETAILS: GENERAL + OVERRIDES')\" class=\"btn btn-primary\">COGS Detail</button>\n                <!--<button (click)=\"showDetail('override',true, 'OVERRIDE PAID DETAILS')\" *ngIf=\"commissionData.OVERRIDE_COMMISSIONS !== 0\" class=\"btn btn-primary\">Override Detail</button>-->\n            </div>\n        </div>       \n\n        <div class=\"panel panel-default\" *ngIf=\"activeState || auth.usertype == 'ADMIN'\">\n            <div class=\"panel-heading\" data-toggle=\"collapse\" data-target=\"#comSum\">Commission Summary Section</div>\n            <div id=\"comSum\" class=\"panel-body collapse in\">\n            <table class=\"commissionTable\" cellspacing=\"10px\">\n                <tr>\n                    <td (click)=\"showDetail('general',false, 'GENERAL COMMISSION')\">\n                        <div class=\"summaryTitle\">General Commissions</div>\n                        <div class=\"summaryNumber\">\n                            <span>{{commissionData.GENERAL_COMMISSIONS | currency:'USD':true:'1.2-2'}}</span> <span>USD</span>\n                        </div>\n                    </td>\n                    <td (click)=\"showDetail('override',false, 'OVERRIDE COMMISSION')\" *ngIf=\"commissionData.OVERRIDE_COMMISSIONS !== 0\">\n                        <div class=\"summaryTitle\">Overrides Commissions</div>\n                        <div class=\"summaryNumber\">\n                            <span>{{commissionData.OVERRIDE_COMMISSIONS | currency:'USD':true:'1.2-2'}}</span> <span>USD</span>\n                        </div>\n                    </td>                     \n                    <td (click)=\"showDetail('paid',false, 'FACILITIES GROSS')\">\n                        <div class=\"summaryTitle\">Paid Summary</div>\n                        <div class=\"summaryNumber\">\n                            <span>{{commissionData.PAID_TOTAL | currency:'USD':true:'1.2-2'}}</span> <span>USD</span>\n                        </div>\n                    </td>\n                    <td (click)=\"showDetail('cogs',false, 'COGS SUMMARY')\">\n                        <div class=\"summaryTitle\">COGS Summary</div>\n                        <div class=\"summaryNumber\">\n                            <span>{{commissionData.COG_TOTAL | currency:'USD':true:'1.2-2'}}</span> <span>USD</span>\n                        </div>\n                    </td>   \n                    <td (click)=\"showDetail('manual',true, 'MANUAL ENTRY DETAIL')\" *ngIf=\"commissionData.MANUAL_COMMISSIONS !== 0\">\n                        <div class=\"summaryTitle\">Manual Entry Summary</div>\n                        <div class=\"summaryNumber\">\n                            <span>{{commissionData.MANUAL_COMMISSIONS | currency:'USD':true:'1.2-2'}}</span> <span>USD</span>\n                        </div>\n                    </td>                                                                                \n                </tr>\n            </table>\n            </div>\n        </div>             \n\n        <div class=\"panel panel-default\" *ngIf=\"reportName !== ''\">\n            <div class=\"panel-heading\" data-toggle=\"collapse\" data-target=\"#comView\">{{reportName}}</div>\n            <div id=\"comView\" class=\"panel-body collapse in\">\n                <table cellspacing=\"10px\" class=\"table table-striped table-hover center\">\n                    <thead>\n                    <tr>\n                        <th *ngFor=\"let col of viewDataColumns\">{{col}}</th>\n                    </tr> \n                    </thead>    \n                    <tbody>               \n                    <tr *ngFor=\"let row of viewData\">\n                        <td *ngFor=\"let column of viewDataColumns\">{{formatData(row[column])}}</td>\n                    </tr>\n                    </tbody>\n                </table> \n            </div>\n        </div>  \n    </div>\n\n    <div class=\"section\" *ngIf=\"currentView == 'ActiveReports'\">\n        <div class=\"dateChooser\">\n            Choose a Date:\n            <app-date-picker></app-date-picker>\n        </div>\n\n        <div class=\"currentStatus\">\n            <span>Click to toggle Active/InActive</span>\n            <br>\n            <button (click)=\"viewActiveState()\" class=\"btn btn-primary\">View Current Status</button>\n            <button (click)=\"setActiveState(true)\" class=\"btn btn-success\">Set Status: Active!</button>\n            <button (click)=\"setActiveState(false)\" class=\"btn btn-danger\">Set Status: InActive!</button>\n        </div>\n\n        <div class=\"activeState\">\n            <div [style.color]=\"(activeState == 0) ? 'red' : 'green'\">{{(activeState == 0) ? 'INACTIVE' : 'ACTIVE'}}</div>\n        </div>\n    </div>\n\n    <div class=\"section\" *ngIf=\"currentView == 'Downloads'\">\n        <app-date-picker></app-date-picker>\n        <div class=\"downloads\">\n            <div (click)=\"downloadPaidBDS()\">Download Paid BDS Report</div>\n            <div (click)=\"downloadPaidReps()\">Download Paid BDS with Reps Report (From Tool)</div>\n            <div (click)=\"downloadCOGS()\">Download COGS Report</div>\n            <div (click)=\"downloadCogsReps()\">Download COGS with Reps Report (From Tool)</div>\n            <div (click)=\"downloadCOMMISSION()\">Download Commissions Report</div>\n            <div (click)=\"downloadCOMMISSIONDetail()\">Download Commissions Detail Report</div>\n            <div (click)=\"downloadFacilitiesWithRep()\">Download Facilities With Rep Report</div>\n            <div (click)=\"downloadPaidVsCogs()\">Download Rep Paid vs. COGS Report</div> \n        </div>\n    </div>\n</div>"

/***/ }),

/***/ 422:
/***/ (function(module, exports) {

module.exports = "<div class=\"holder\">\n  <table cellspacing=\"20px\">\n    <tr>\n      <td>\n        <div class=\"form-group\">\n          <div class=\"input-group\">\n            <span class=\"input-group-addon\">Month:</span>\n            <select class=\"form-control\" [(ngModel)]=\"DatePicker.selectedMonth\" (ngModelChange)=\"DatePicker.changeDate(DatePicker.selectedMonth, null)\">\n              <option *ngFor=\"let month of DatePicker.Months\" [ngValue]=\"month.title\">{{month.title}}</option>\n            </select>\n          </div>  \n        </div>        \n      </td>\n      <td>\n        <div class=\"form-group\">\n          <div class=\"input-group\">\n            <span class=\"input-group-addon\">Year:</span>\n            <select class=\"form-control\" [(ngModel)]=\"DatePicker.selectedYear\" (ngModelChange)=\"DatePicker.changeDate(null, DatePicker.selectedYear)\">\n              <option *ngFor=\"let year of DatePicker.Years\" [ngValue]=\"year.title\">{{year.title}}</option>\n            </select> \n          </div>\n        </div>\n      </td>\n    </tr>\n  </table>\n</div>\n"

/***/ }),

/***/ 423:
/***/ (function(module, exports) {

module.exports = "<div class=\"container-fluid\">\n  <h1 class=\"title\">Facilities</h1>\n  <div class=\"menu\">\n      <table cellspacing=\"20px\">\n          <tr>\n              <td *ngIf=\"auth.usertype == 'ADMIN'\" (click)=\"currentView = 'View'; newUser.formName = 'Edit Facility:'; showForm = false;\" [style.borderBottom]=\"(currentView == 'View')?'3px solid #107FE8':''\">View Facilities</td>\n              <td *ngIf=\"auth.usertype == 'ADMIN'\" (click)=\"changeView('Upload'); showForm = false;\" [style.borderBottom]=\"(currentView == 'Upload')?'3px solid #107FE8':''\">Upload Facilities</td>\n              <td *ngIf=\"auth.usertype == 'ADMIN'\" (click)=\"currentView = 'View'; download()\">Download Facilities</td>\n          </tr>\n      </table>\n  </div>  \n  <div class=\"section\" *ngIf=\"currentView == 'View'\">\n    <div class=\"row\">\n      <div class=\"col-md-12\">\n        <div class=\"input-group\">\n          <input class=\"form-control\" type=\"text\" placeholder=\"Search Facilities\" [(ngModel)]=\"searchText\" (ngModelChange)=\"searchUsers()\"/>\n          <div class=\"input-group-btn\"><button class=\"btn btn-default\"><i class=\"glyphicon glyphicon-search\"></i></button>          \n        </div>\n      </div>\n    </div>\n    <div class=\"row\">\n      <div class=\"col-md-12\">\n        <div class=\"dataTable overflow center padding\">\n          <table cellspacing=\"0\" class=\"table table-striped table-hover\">\n            <thead>\n            <tr>\n              <th>Facility Name</th>\n              <th>Facility Acronym</th>\n              <th colspan=\"1\">Actions</th>\n            </tr>\n            </thead>\n            <tbody>\n            <tr>\n              <td>\n                <div class=\"form-group\">\n                  <div class=\"input-group\">\n                    <span class=\"input-group-addon\">Name:</span>\n                    <input [(ngModel)]=\"newUser.TITLE\" type=\"text\" class=\"form-control\" placeholder=\"Facility Name\" id=\"newUserStartLocation\"/>\n                  </div>\n                </div>              \n              </td>\n              <td>\n                <div class=\"form-group\">\n                  <div class=\"input-group\">\n                    <span class=\"input-group-addon\">Acronym:</span>\n                    <input [(ngModel)]=\"newUser.ACRONYM\" type=\"text\" class=\"form-control\" placeholder=\"Facility Acronym\"/>\n                  </div>\n                </div>                   \n              </td>\n              <td>\n                <button (click)=\"saveForm()\" type=\"button\" class=\"btn btn-success form-control\">SAVE/ADD</button>                \n              </td>              \n            </tr>\n            <tr *ngFor=\"let facility of finalTable\">\n              <td>{{facility.TITLE}}</td>\n              <td>{{facility.ACRONYM}}</td>\n              <td>\n                <button (click)=\"beginEdit(facility)\" type=\"button\" class=\"btn btn-info\">Edit</button>\n              </td>\n            </tr>\n            </tbody>\n          </table>\n        </div>    \n      </div>\n    </div>\n  </div>     \n</div>\n</div>\n\n<div class=\"section\" *ngIf=\"currentView == 'Upload'\">\n  <textarea [(ngModel)]=\"textarea\" placeholder=\"Paste in Facility Data NAME: Acronym | Name\"></textarea>\n  <button type=\"button\" class=\"btn btn-primary\" (click)=\"bulkUpload()\">Upload</button>\n</div> "

/***/ }),

/***/ 424:
/***/ (function(module, exports) {

module.exports = "<p>\n  invalid-route works!\n</p>\n"

/***/ }),

/***/ 425:
/***/ (function(module, exports) {

module.exports = "<div *ngIf=\"general.showLogin\">\n  <table>\n    <tr>\n      <td>\n        <img src=\"/assets/img/logo.png\" />\n        <br>\n        <br>\n        <span (click)=\"signInWithGoogle()\">Login to Continue...</span>\n        \n      </td>\n    </tr>\n    <tr><td>\n\n    </td></tr>\n  </table>\n</div>"

/***/ }),

/***/ 426:
/***/ (function(module, exports) {

module.exports = "<p>\n  manual-entry works!\n</p>\n"

/***/ }),

/***/ 427:
/***/ (function(module, exports) {

module.exports = "<div class=\"holder\">\n  <div class=\"title\">\n    <h1>MedVantage</h1>\n    <br>\n    <h4>Web Portal</h4>\n    <span class=\"version\">v{{menuService.version}}</span>\n  </div>\n  <div class=\"user\">\n    <!--<img src=\"{{menuService.auth.picture}}\" /> -->\n    <span>{{menuService.auth.username}}</span>\n    <span class=\"usertype\">({{menuService.auth.usertype}})</span>\n    <span class=\"logout\" (click)=\"menuService.logout()\"><i class=\"fa fa-sign-out\"></i></span>\n  </div>\n  <div class=\"menuChoices\">\n    <table>\n      <tr *ngFor=\"let item of menuService.menuItems\">\n        <td (click)=\"item.goToRoute()\">\n          <i class=\"fa fa-circle\" [style.color]=\"item.color\"></i>\n          <span>{{item.title}}</span>\n        </td>\n      </tr>\n      <tr>\n        <td (click)=\"menuService.changeMenu()\">\n          <span>Hide Menu</span>\n        </td>\n      </tr>\n    </table>\n  </div>\n  <!--<div class=\"viewAs\">\n    <div class=\"titleViewAs\">View As:</div>\n    <div class=\"viewAsSection\">\n      <select>\n        <option value=\"ADMIN\">ADMIN</option>\n        <option value=\"SUPER\">SUPER</option>\n        <option value=\"EDITOR\">EDITOR</option>\n        <option *ngFor=\"let rep of menuService.general.Reps\">{{rep.TITLE}}</option>\n      </select>\n    </div>\n  </div>-->\n</div>\n"

/***/ }),

/***/ 428:
/***/ (function(module, exports) {

module.exports = "<p>\n  reports works!\n</p>\n"

/***/ }),

/***/ 429:
/***/ (function(module, exports) {

module.exports = "<div class=\"container-fluid\">\n  <h1 class=\"title\">Reps</h1>\n  <div class=\"menu\">\n      <table cellspacing=\"20px\">\n          <tr>\n              <td *ngIf=\"auth.usertype == 'ADMIN'\" (click)=\"currentView = 'View'; newUser.formName = 'Edit Rep:'; showForm = false;\" [style.borderBottom]=\"(currentView == 'View' || currentView == 'Facilities')?'3px solid #107FE8':''\">View Reps</td>\n              <td *ngIf=\"auth.usertype == 'ADMIN'\" (click)=\"changeView('Upload'); showForm = false;\" [style.borderBottom]=\"(currentView == 'Upload')?'3px solid #107FE8':''\">Upload Reps</td>\n              <td *ngIf=\"auth.usertype == 'ADMIN'\" (click)=\"download()\">Download Reps</td>\n              <td *ngIf=\"auth.usertype == 'ADMIN'\" (click)=\"downloadB()\">Download Rep Facilities</td>\n          </tr>\n      </table>\n  </div>  \n  <div class=\"dateChooser\">\n    Choose a Date:\n    <app-date-picker></app-date-picker>\n    <!--<button (click)=\"setCurrentRep(currentRep.ID)\" type=\"button\" class=\"btn btn-primary\">Review</button>-->\n  </div>\n  <div class=\"section\" *ngIf=\"currentView == 'View'\">\n    <div class=\"row stopRow\">\n      <div class=\"col-md-12\">\n        <div class=\"row\">\n          <div class=\"col-md-12\">\n            <div class=\"input-group\">\n              <input class=\"form-control\" type=\"text\" placeholder=\"Search Reps\" [(ngModel)]=\"searchText\" (ngModelChange)=\"searchUsers()\"/>\n              <div class=\"input-group-btn\"><button class=\"btn btn-default\"><i class=\"glyphicon glyphicon-search\"></i></button>          \n            </div>\n          </div>\n        </div>\n        <div class=\"row\">\n          <div class=\"col-md-12\">\n            <div class=\"dataTable overflow center padding\">\n              <table cellspacing=\"0\" class=\"table table-striped table-hover\">\n                <thead>\n                <tr>\n                  <th>Rep Name</th>\n                  <th>Default Commission</th>\n                  <th colspan=\"1\">Actions</th>\n                </tr>\n                </thead>\n                <tbody>\n                <tr>\n                  <td>\n                    <div class=\"input-group\">\n                      <span class=\"input-group-addon\">Name:</span>\n                      <input [(ngModel)]=\"newUser.TITLE\" type=\"text\" class=\"form-control\" placeholder=\"Rep Name\" id=\"newUserStartLocation\"/>\n                    </div>  \n                  </td>\n                  <td>\n                    <div class=\"input-group\">\n                      <span class=\"input-group-addon\">Commission:</span>\n                      <input [(ngModel)]=\"newUser.COMMISSION\" type=\"text\" class=\"form-control\" placeholder=\"Default Commission\"/>\n                    </div>                      \n                  </td>        \n                  <td><button (click)=\"saveForm()\" type=\"button\" class=\"btn btn-success form-control\">ADD/SAVE</button></td>          \n                </tr>\n                <tr *ngFor=\"let rep of finalTable\">\n                  <td>{{rep.TITLE}}</td>\n                  <td>{{rep.COMMISSION}}</td>\n                  <td>\n                    <button (click)=\"beginEdit(rep)\" type=\"button\" class=\"btn btn-info marginright\">Edit</button>\n                    <button (click)=\"changeRep(rep)\" type=\"button\" class=\"btn btn-primary\">Facilities</button>\n                  </td>\n                </tr>\n                </tbody>\n              </table>\n            </div>    \n          </div>\n        </div>\n      </div>\n    </div>\n\n  </div>          \n</div>\n</div>\n\n\n\n<div class=\"section\" *ngIf=\"currentView == 'Upload'\">\n  <textarea [(ngModel)]=\"textarea\" placeholder=\"Paste in Rep Data: Name | Default Commission\"></textarea>\n  <button type=\"button\" class=\"btn btn-primary\" (click)=\"bulkUpload()\">Upload</button>\n</div> \n\n<div class=\"section\" *ngIf=\"currentView == 'Facilities'\">\n  <div class=\"row stopRow\">\n    <div class=\"col-md-12\">\n      <div class=\"dataTable overflow center padding\">\n        <div>\n          <button type=\"button\" class=\"btn btn-danger\" (click)=\"currentView = 'View'\">Back to Reps</button>\n          <button *ngIf=\"FacilitycurrentView == 'FacilitiesUpload'\" type=\"button\" class=\"btn btn-primary\" (click)=\"FacilitycurrentView = 'ViewTable';\">View Rep Facilities</button>\n          <button *ngIf=\"FacilitycurrentView == 'ViewTable'\" type=\"button\" class=\"btn btn-primary\" (click)=\"FacilitycurrentView = 'FacilitiesUpload';\">Bulk Add Facilities</button>\n        </div>\n        <h4>Current Rep Facilities for: {{(currentRep) ? currentRep.TITLE : ''}}</h4>\n        <div class=\"section\" *ngIf=\"FacilitycurrentView == 'FacilitiesUpload'\">\n          <textarea [(ngModel)]=\"textareaB\" placeholder=\"Paste in Rep Facility Data: Rep ID | Facility ID | Commission | Commission Type\"></textarea>\n          <button type=\"button\" class=\"btn btn-primary\" (click)=\"bulkUploadB()\">Upload</button>\n        </div>         \n        <table cellspacing=\"0\" class=\"table table-striped table-hover\" *ngIf=\"FacilitycurrentView == 'ViewTable'\">\n          <thead>\n          <tr>\n            <th>Facility Name</th>\n            <th>Commission</th>\n            <th>Commission Type</th>\n            <th>Activation Month</th>\n            <th>Activation Year</th>\n            <th>Show Facility</th>\n            <th colspan=\"1\">Actions</th>\n          </tr>\n          </thead>\n          <tbody>\n          <tr>\n            <td>\n              <div class=\"input-group\">\n                <span class=\"input-group-addon\">Facility Name:</span>\n                <select class=\"form-control\" [(ngModel)]=\"newUserB.FACILITY_ID\" id=\"newUserBStartLocation\">\n                  <option *ngFor=\"let fac of general.Facilities\" [value]=\"fac.ID\">{{fac.TITLE}}</option>\n                </select> \n              </div>  \n            </td>   \n            <td>\n              <div class=\"input-group\">\n                <span class=\"input-group-addon\">Commission:</span>\n                <input class=\"form-control\" [(ngModel)]=\"newUserB.COMMISSION\" type=\"text\" />\n              </div>  \n            </td>    \n            <td>\n              <div class=\"input-group\">\n                <span class=\"input-group-addon\">Type:</span>\n                <select class=\"form-control\" [(ngModel)]=\"newUserB.COMMISSIONTYPE\">\n                  <option value=\"GENERAL\">GENERAL</option>\n                  <option value=\"OVERRIDE\">OVERRIDE</option>\n                </select> \n              </div>  \n            </td>    \n\n\n            <td>\n              <div class=\"input-group\">\n                <span class=\"input-group-addon\">Month:</span>\n                <select class=\"form-control\" [(ngModel)]=\"newUserB.UPLOAD_MONTH\">\n                  <option value=\"01\">January</option>\n                  <option value=\"02\">February</option>\n                  <option value=\"03\">March</option>\n                  <option value=\"04\">April</option>\n                  <option value=\"05\">May</option>\n                  <option value=\"06\">June</option>\n                  <option value=\"07\">July</option>\n                  <option value=\"08\">August</option>\n                  <option value=\"09\">September</option>\n                  <option value=\"10\">October</option>\n                  <option value=\"11\">November</option>\n                  <option value=\"12\">December</option>\n                </select> \n              </div>  \n            </td>\n            <td>\n              <div class=\"input-group\">\n                <span class=\"input-group-addon\">Year:</span>\n                <select class=\"form-control\" [(ngModel)]=\"newUserB.UPLOAD_YEAR\">\n                  <option value=\"2018\">2018</option>\n                  <option value=\"2019\">2019</option>\n                  <option value=\"2020\">2020</option>\n                  <option value=\"2021\">2021</option>\n                  <option value=\"2022\">2022</option>\n                  <option value=\"2023\">2023</option>\n                  <option value=\"2024\">2024</option>\n                  <option value=\"2025\">2025</option>\n                  <option value=\"2026\">2026</option>\n                  <option value=\"2027\">2027</option>\n                  <option value=\"2028\">2028</option>\n                </select> \n              </div>  \n            </td>\n            <td>\n              <div class=\"input-group\">\n                <span class=\"input-group-addon\">Show:</span>\n                <select class=\"form-control\" [(ngModel)]=\"newUserB.SHOW_FACILITY\">\n                  <option value=\"1\">TRUE</option>\n                  <option value=\"0\">FALSE</option>\n                </select> \n              </div>  \n            </td>\n            \n            <td>\n              <button (click)=\"saveFormB()\" type=\"button\" class=\"btn btn-success form-control\">ADD/SAVE</button>\n            </td>                           \n          </tr>\n          <tr *ngFor=\"let facility of commissionTable\">\n            <td>{{facility.FACILITY_NAME}}</td>\n            <td>{{facility.COMMISSION}}</td>\n            <td>{{facility.COMMISSIONTYPE}}</td>\n            <td>{{facility.UPLOAD_MONTH}}</td>\n            <td>{{facility.UPLOAD_YEAR}}</td>\n            <td>{{facility.SHOW_FACILITY}}</td>\n            <td style=\"min-width: 200px;\">\n              <button (click)=\"beginEditB(facility)\" type=\"button\" class=\"btn btn-info btn-sm\">Edit</button>\n              <button (click)=\"removeFacility(facility)\" type=\"button\" class=\"btn btn-danger btn-sm\">Delete</button>\n            </td>\n          </tr>\n          </tbody>\n        </table>\n      </div>\n    </div>\n  </div>\n</div>\n\n"

/***/ }),

/***/ 430:
/***/ (function(module, exports) {

module.exports = "<p>\n  table-viewer works!\n</p>\n"

/***/ }),

/***/ 431:
/***/ (function(module, exports) {

module.exports = "<div class=\"holderUploads\">\n  <div class=\"title\">\n    <h1>Upload Report Data</h1>\n  </div>\n  <h4 class=\"choose\">\n    Choose a Report Upload Date:\n  </h4>\n  <div class=\"billers\">\n    <app-date-picker></app-date-picker>\n  </div>  \n  <h4 class=\"choose\">\n    Choose a Report to Upload:\n  </h4>\n  <div class=\"billers\">\n    <div class=\"biller\" (click)=\"alarm.isLoading = false; updateCurrentBiller(true);\">\n      <div class=\"Abbreviation\">COGS</div>\n      <div class=\"Name\">Cost of Goods</div>\n    </div>      \n    <div [style.borderBottom]=\"(biller.LAST_UPLOAD_MONTH == datePicker.UploadMonth.number && biller.LAST_UPLOAD_YEAR == datePicker.UploadYear.number) ? '3px solid limegreen':'3px solid lightgray'\" (click)=\"alarm.isLoading = false; updateCurrentBiller(false, biller)\" class=\"biller\" *ngFor=\"let biller of general.Billers\">\n      <div class=\"Abbreviation\">{{biller.ABBREVIATION}}</div>\n      <div class=\"Name\">{{biller.TITLE}}</div>\n    </div>     \n  </div>\n  <div *ngIf=\"currentBiller\" style=\"clear:both;\">\n    <h4 class=\"choose\">\n      Set Report Details:\n    </h4>\n    <div class=\"billers\">\n      <div *ngIf=\"currentReport\">\n        <h5>Report Details:</h5>\n        <div class=\"input-group\">\n          <span class=\"input-group-addon\">Last Upload Date:</span>\n          <input type=\"text\" class=\"form-control\" [(ngModel)]=\"currentBiller.LAST_UPLOAD\" readonly/>\n        </div>  \n        <div class=\"input-group\">\n          <span class=\"input-group-addon\">Last Upload Month:</span>\n          <input type=\"text\" class=\"form-control\" [(ngModel)]=\"currentBiller.LAST_UPLOAD_MONTH\" readonly/>\n        </div>  \n        <div class=\"input-group\">\n          <span class=\"input-group-addon\">Last Upload Year:</span>\n          <input type=\"text\" class=\"form-control\" [(ngModel)]=\"currentBiller.LAST_UPLOAD_YEAR\" readonly/>\n        </div>                          \n        <div class=\"input-group\">\n          <span class=\"input-group-addon\">Report Title:</span>\n          <input type=\"text\" class=\"form-control\" [(ngModel)]=\"currentReport.TITLE\" />\n        </div>  \n        <div class=\"input-group\">\n          <span class=\"input-group-addon\">Report Sheet Number:</span>\n          <input type=\"text\" class=\"form-control\" [(ngModel)]=\"currentReport.SHEET_NUMBER\" />\n        </div>  \n        <div class=\"input-group\">\n          <span class=\"input-group-addon\">Report Start Row:</span>\n          <input type=\"text\" class=\"form-control\" [(ngModel)]=\"currentReport.START_ROW\" />\n        </div>\n        <div>\n          <button type=\"button\" (click)=\"saveReport()\" class=\"btn btn-primary form-control\">SAVE/UPDATE</button>\n        </div>\n      </div>          \n    </div>\n    <div *ngIf=\"currentBiller\">\n      <h3 class=\"billerTitle\">\n        {{(currentBiller) ? currentBiller.TITLE + ' Report' : ''}}\n      </h3>\n      <div>\n        <h5>Column Mapping</h5>\n        <div>\n          <table>\n            <tr *ngFor=\"let column of columnMapping\">\n              <td>\n                <div class=\"input-group\" style=\"width:350px;\">\n                  <span class=\"input-group-addon\">{{column.MAPPED_COLUMN_NAME}}:</span>\n                  <input type=\"text\" class=\"form-control\" [(ngModel)]=\"column.RAW_COLUMN_NAME\" />\n                  <div class=\"input-group-btn\">\n                    <button (click)=\"updateColumnMapping(column)\" type=\"button\" class=\"btn btn-primary\">UPDATE</button>\n                  </div>\n                </div>  \n              </td>\n            </tr>\n          </table>\n        </div>\n        <div class=\"input-group\">\n          <input type=\"file\" class=\"form-control\" id=\"uploadFile\"/>\n          <div class=\"input-group-btn\">\n            <button (click)=\"alarm.totalAmount == null; uploadReport()\" class=\"btn btn-success form-control\">Upload</button>\n          </div>\n        </div>\n        <div *ngIf=\"alarm.isLoading\" class=\"alert alert-{{alarm.alertType}}\">\n          <strong>{{alarm.status}}</strong> {{alarm.text}} <strong>{{((alarm.totalAmount) ? alarm.totalAmount : '') | currency:'USD':true:'4.2-2'}}</strong>\n        </div>    \n        <div class=\"unmapped\" *ngIf=\"unmappedData.length > 0\">\n          <table class=\"table table-striped table-hover\">\n            <thead>\n              <tr>\n                <th>MAP FACILITY</th>\n                <th>CREATE FACILITY</th>\n              </tr>\n            </thead>\n            <tbody>\n              <tr *ngFor=\"let item of unmappedData\">\n                <td>\n                  <div class=\"input-group\">\n                    <span class=\"input-group-addon\">{{item.RAW_FACILITY_NAME}}</span>\n                    <select class=\"form-control\" [(ngModel)]=\"item.FACILITY_ID\">\n                      <option *ngFor=\"let facility of general.Facilities\" [value]=\"facility.ID\">\n                        {{facility.TITLE}}\n                      </option>\n                    </select>\n                  </div>  \n                </td>\n                <td>\n                  <div class=\"input-group\">\n                    <input class=\"form-control\" [(ngModel)]=\"item.FACILITY_NAME\"/>\n                  </div>                                   \n                </td>\n              </tr>\n            </tbody>\n            <tfoot>\n              <tr>\n                <td colspan=\"2\">\n                  <button (click)=\"bulkUploadFacilityMapping()\" type=\"button\" class=\"btn btn-success pull-right\">SAVE FACILITIES</button>\n                </td>\n              </tr>\n            </tfoot>\n          </table>\n      </div>\n    </div>\n  </div>\n</div>\n"

/***/ }),

/***/ 432:
/***/ (function(module, exports) {

module.exports = "<div class=\"holder\">\n  <h1 class=\"title\">Users</h1>\n  <div class=\"menu\">\n      <table cellspacing=\"20px\">\n          <tr>\n              <td *ngIf=\"auth.usertype == 'ADMIN' || auth.usertype == 'SUPER'\" (click)=\"currentView = 'View'; newUser.formName = 'Edit User:'; showForm = false;\" [style.borderBottom]=\"(currentView == 'View')?'3px solid #107FE8':''\">View Users</td>\n              <td *ngIf=\"auth.usertype == 'ADMIN'\" (click)=\"currentView = 'Upload'; showForm = false;\" [style.borderBottom]=\"(currentView == 'Upload')?'3px solid #107FE8':''\">Upload Users</td>\n              <td *ngIf=\"auth.usertype == 'ADMIN'\" (click)=\"currentView = 'View'; download()\">Download Users</td>\n          </tr>\n      </table>\n  </div>  \n  <div class=\"section\" *ngIf=\"currentView == 'View'\">\n    <div class=\"row\">\n      <div class=\"col-md-12\">\n        <div class=\"input-group\">\n          <input class=\"form-control\" type=\"text\" placeholder=\"Search Users\" [(ngModel)]=\"searchText\" (ngModelChange)=\"searchUsers()\"/>\n          <div class=\"input-group-btn\"><button class=\"btn btn-default\"><i class=\"glyphicon glyphicon-search\"></i></button>          \n        </div>\n      </div>\n    </div>    \n    <div class=\"row\">\n      <div class=\"col-md-12\">\n        <div class=\"dataTable overflow center padding\">\n          <table cellspacing=\"0\" class=\"table table-striped table-hover\">\n            <thead>    \n            <tr>\n              <th>Name</th>\n              <th>Email</th>\n              <th>Rep Name</th>\n              <th>User Type</th>\n              <th>Active User</th>\n              <th>Last Login</th>\n              <th colspan=\"2\">Actions</th>\n            </tr>\n            </thead>\n            <tbody>\n            <tr>\n              <td style=\"min-width: 200px;\">\n                <div class=\"form-group\">\n                <div class=\"input-group\">\n                  <span class=\"input-group-addon\">Name:</span>\n                  <input [(ngModel)]=\"newUser.TITLE\" type=\"text\" class=\"form-control\" placeholder=\"User Name\" id=\"newUserStartLocation\"/>\n                </div>    \n                </div>\n              </td>\n              <td style=\"min-width: 200px;\">\n                <div class=\"form-group\">\n                <div class=\"input-group\">\n                  <span class=\"input-group-addon\">Email:</span>\n                  <input [(ngModel)]=\"newUser.EMAIL\" type=\"email\" class=\"form-control\" placeholder=\"User Email\"/>\n                </div>  \n                </div>\n              </td>\n              <td style=\"min-width: 200px;\">\n                <div class=\"form-group\">\n                <div class=\"input-group\">\n                  <span class=\"input-group-addon\">Rep Name:</span>\n                  <select class=\"form-control\" [(ngModel)]=\"newUser.REP_ID\">\n                    <option *ngFor=\"let rep of general.Reps\" [value]=\"rep.ID\">{{rep.TITLE}}</option>\n                  </select> \n                </div>  \n                </div>\n              </td>\n              <td style=\"min-width: 200px;\">\n                <div class=\"form-group\">\n                <div class=\"input-group\">\n                  <span class=\"input-group-addon\">User Type:</span>\n                  <select class=\"form-control\" [(ngModel)]=\"newUser.USER_TYPE\">\n                    <option *ngIf=\"auth.usertype == 'ADMIN'\" value=\"ADMIN\">ADMIN</option>\n                    <option *ngIf=\"auth.usertype == 'ADMIN'\" value=\"EDITOR\">EDITOR</option>\n                    <option value=\"GENERAL\">GENERAL</option>\n                    <option *ngIf=\"auth.usertype == 'ADMIN'\" value=\"SUPER\">SUPER</option>\n                  </select> \n                </div>  \n                </div>\n              </td>\n              <td>\n                <button (click)=\"saveForm()\" type=\"button\" class=\"btn btn-success form-control\">SAVE/ADD</button>\n              </td> \n              <td>\n              </td>\n              <td>\n              </td>                                                                                                             \n            </tr>\n            <tr *ngFor=\"let user of finalTable\">\n              <td>{{user.TITLE}}</td>\n              <td>{{user.EMAIL}}</td>\n              <td>{{user.REP_NAME}}</td>\n              <td>{{user.USER_TYPE}}</td>\n              <td>{{(user.ISACTIVE == 1) ? 'TRUE' : 'FALSE'}}</td>\n              <td>{{user.LAST_LOGIN}}</td>\n              <td><button type=\"button\" class=\"btn btn-info\" (click)=\"beginEdit(user)\">EDIT</button></td>\n              <td>\n                <button type=\"button\" class=\"btn btn-danger\" *ngIf=\"user.ISACTIVE\" (click)=\"userAction(user, 'DEACTIVATE')\">DEACTIVATE</button>\n                <button *ngIf=\"!user.ISACTIVE\" type=\"button\" class=\"btn btn-success\" (click)=\"userAction(user, 'ACTIVATE')\">ACTIVATE</button>\n              </td>\n            </tr>\n            </tbody>\n          </table>\n        </div>\n      </div>    \n    </div>\n  </div>\n\n  <div class=\"coverContainer\" *ngIf=\"showForm\">\n    <table class=\"coverContainerTable\">\n      <tr>\n        <td>\n          <div class=\"templateContainer\">\n            <div class=\"templateContainerClose\">\n              <i class=\"fa fa-times-circle pull-right\" (click)=\"showForm = false;\"></i>\n            </div>              \n            <div class=\"formTemplate\">\n              <div class=\"formTemplateTitle\">\n                <h4>{{newUser.formName}}</h4>\n              </div>\n              <div class=\"formTemplateBody\">\n                <div class=\"form-group\">\n                  <div class=\"col-md-9\">\n                    <input [(ngModel)]=\"newUser.ID\" type=\"number\" class=\"form-control\" placeholder=\"User ID\" readonly/>\n                  </div>\n                </div>\n                <div class=\"form-group\">\n                  <div class=\"col-md-9\">\n                    <div class=\"input-group\">\n                      <span class=\"input-group-addon\">Name:</span>\n                      <input [(ngModel)]=\"newUser.TITLE\" type=\"text\" class=\"form-control\" placeholder=\"User Name\"/>\n                    </div>                       \n                  </div>\n                </div>            \n                <div class=\"form-group\">\n                  <div class=\"col-md-9\">\n                    <div class=\"input-group\">\n                      <span class=\"input-group-addon\">Email:</span>\n                      <input [(ngModel)]=\"newUser.EMAIL\" type=\"email\" class=\"form-control\" placeholder=\"User Email\"/>\n                    </div>                    \n                  </div>\n                </div>\n                <div class=\"form-group\">\n                  <div class=\"col-md-9\">\n                    <div class=\"input-group\">\n                      <span class=\"input-group-addon\">Rep Name:</span>\n                      <select class=\"form-control\" [(ngModel)]=\"newUser.REP_ID\">\n                        <option *ngFor=\"let rep of general.Reps\" [value]=\"rep.ID\">{{rep.TITLE}}</option>\n                      </select> \n                    </div>                    \n                  </div>\n                </div>\n                <div class=\"form-group\">\n                  <div class=\"col-md-9\">\n                    <div class=\"input-group\">\n                      <span class=\"input-group-addon\">User Type:</span>\n                      <select class=\"form-control\" [(ngModel)]=\"newUser.USER_TYPE\">\n                        <option *ngIf=\"auth.usertype == 'ADMIN'\" value=\"ADMIN\">ADMIN</option>\n                        <option *ngIf=\"auth.usertype == 'ADMIN'\" value=\"EDITOR\">EDITOR</option>\n                        <option value=\"GENERAL\">GENERAL</option>\n                        <option *ngIf=\"auth.usertype == 'ADMIN'\" value=\"EDITOR\">SUPER</option>\n                      </select> \n                    </div>                      \n                  </div>\n                </div>                                \n                <div class=\"form-group\">\n                  <div class=\"col-md-12\">\n                    <button (click)=\"saveForm()\" type=\"button\" class=\"btn btn-success pull-right\">Save</button>\n                  </div>\n                </div> \n              </div>\n            </div>\n          </div>\n        </td>\n      </tr>\n    </table>   \n  </div>     \n</div>\n\n\n\n<div class=\"section\" *ngIf=\"currentView == 'Upload'\">\n  <textarea [(ngModel)]=\"textarea\" placeholder=\"Paste in Pipe Seperated User Data NAME|EMAIL|TYPE\"></textarea>\n  <button type=\"button\" class=\"btn btn-primary\" (click)=\"bulkUpload()\">Upload</button>\n</div> "

/***/ }),

/***/ 433:
/***/ (function(module, exports) {

module.exports = "<router-outlet></router-outlet>\n"

/***/ }),

/***/ 475:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(310);


/***/ })

},[475]);
//# sourceMappingURL=main.bundle.js.map