"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var core_1 = require("@angular/core");
var router_1 = require("@angular/router");
var ng2_toastr_1 = require("ng2-toastr/ng2-toastr");
// inject services
var login_service_1 = require("./login.service");
var LoginComponent = (function () {
    // constructor
    function LoginComponent(router, loginService, toastr, vRef) {
        this.router = router;
        this.loginService = loginService;
        this.toastr = toastr;
        this.vRef = vRef;
        this.toastr.setRootViewContainerRef(vRef);
    }
    // login with login services injected
    LoginComponent.prototype.login = function (username, password, toastr) {
        document.getElementById("login").innerHTML = "<i class='fa fa-spinner fa-spin fa-fw'></i> Logging in";
        document.getElementById("login").disabled = true;
        this.loginService.login(username, password, toastr);
    };
    // initilization
    LoginComponent.prototype.ngOnInit = function () {
        if (localStorage.getItem('access_token')) {
            this.router.navigate(['dashboard']);
        }
    };
    return LoginComponent;
}());
LoginComponent = __decorate([
    core_1.Component({
        selector: 'my-login',
        templateUrl: 'app/security-login/login.html'
    }),
    __metadata("design:paramtypes", [typeof (_a = typeof router_1.Router !== "undefined" && router_1.Router) === "function" && _a || Object, login_service_1.LoginService, typeof (_b = typeof ng2_toastr_1.ToastsManager !== "undefined" && ng2_toastr_1.ToastsManager) === "function" && _b || Object, typeof (_c = typeof core_1.ViewContainerRef !== "undefined" && core_1.ViewContainerRef) === "function" && _c || Object])
], LoginComponent);
exports.LoginComponent = LoginComponent;
var _a, _b, _c;
//# sourceMappingURL=login.component.js.map