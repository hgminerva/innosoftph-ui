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
var core_1 = require('@angular/core');
var router_1 = require('@angular/router');
var ng2_slim_loading_bar_1 = require('ng2-slim-loading-bar');
var AppComponent = (function () {
    // inject router
    function AppComponent(router, elementRef, slimLoadingBarService) {
        this.router = router;
        this.elementRef = elementRef;
        this.slimLoadingBarService = slimLoadingBarService;
        // global variables
        this.headerLogin = "";
        this.headerCurrentLoggedInUser = "";
        this.isLoggedIn = true;
        this.isLoggedInDropdown = false;
    }
    // start loading
    AppComponent.prototype.startLoading = function () {
        this.slimLoadingBarService.progress = 30;
        this.slimLoadingBarService.start();
    };
    // complete loading
    AppComponent.prototype.completeLoading = function () {
        this.slimLoadingBarService.complete();
    };
    // logout
    AppComponent.prototype.logout = function () {
        var _this = this;
        document.getElementById("btnLogout").disabled = true;
        document.getElementById("btnLogoutClose").disabled = true;
        document.getElementById("btnLogout").innerHTML = "<i class='fa fa-spinner fa-spin fa-fw'></i> Logging out";
        localStorage.removeItem('access_token');
        localStorage.removeItem('expires_in');
        localStorage.removeItem('token_type');
        localStorage.removeItem('userName');
        setTimeout(function () {
            // document.getElementById("btn-hidden-logout-modal").click();
            // this.router.navigate(['/home']);
            location.reload();
            _this.headerCurrentUserChanges();
        }, 500);
    };
    // logout changes
    AppComponent.prototype.logoutChanges = function () {
        document.getElementById("btnLogout").disabled = false;
        document.getElementById("btnLogoutClose").disabled = false;
        document.getElementById("btnLogout").innerHTML = "<i class='fa fa-power-off fa-fw'></i> Logout";
    };
    // login changes
    AppComponent.prototype.loginChanges = function () {
        var _this = this;
        setTimeout(function () {
            _this.router.navigate(['/dashboard']);
            _this.headerCurrentUserChanges();
        }, 500);
    };
    // header changes
    AppComponent.prototype.headerCurrentUserChanges = function () {
        if (localStorage.getItem('access_token')) {
            var currentUser = localStorage.getItem('userName');
            this.headerLogin = "YOU  <i class='fa fa-caret-down fa-fw'></i>";
            this.headerCurrentLoggedInUser = "<i class='fa fa-key fa-fw'></i> &nbsp;" + currentUser;
            this.isLoggedIn = false;
            this.isLoggedInDropdown = true;
        }
        else {
            this.headerLogin = "LOGIN";
            this.headerCurrentLoggedInUser = "Please Login";
            this.isLoggedIn = true;
            this.isLoggedInDropdown = false;
        }
    };
    // show menu
    AppComponent.prototype.showMenu = function () {
        document.getElementById("showTop").click();
    };
    // show menu
    AppComponent.prototype.selectedMenu = function () {
        this.startLoading();
        document.getElementById("showTop").click();
    };
    // initialization
    AppComponent.prototype.ngOnInit = function () {
        this.headerCurrentUserChanges();
    };
    AppComponent.prototype.ngAfterViewInit = function () {
        var s = document.createElement("script");
        s.type = "text/javascript";
        s.src = "app/scripts/classie.js";
        this.elementRef.nativeElement.appendChild(s);
        var s2 = document.createElement("script");
        s2.type = "text/javascript";
        s2.src = "app/scripts/scripts.js";
        this.elementRef.nativeElement.appendChild(s2);
    };
    AppComponent = __decorate([
        core_1.Component({
            selector: 'my-app',
            templateUrl: 'app/shared-header/header.html'
        }), 
        __metadata('design:paramtypes', [router_1.Router, core_1.ElementRef, ng2_slim_loading_bar_1.SlimLoadingBarService])
    ], AppComponent);
    return AppComponent;
}());
exports.AppComponent = AppComponent;
//# sourceMappingURL=app.component.js.map