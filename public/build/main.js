webpackJsonp([0],{

/***/ 143:
/***/ (function(module, exports) {

function webpackEmptyAsyncContext(req) {
	// Here Promise.resolve().then() is used instead of new Promise() to prevent
	// uncatched exception popping up in devtools
	return Promise.resolve().then(function() {
		throw new Error("Cannot find module '" + req + "'.");
	});
}
webpackEmptyAsyncContext.keys = function() { return []; };
webpackEmptyAsyncContext.resolve = webpackEmptyAsyncContext;
module.exports = webpackEmptyAsyncContext;
webpackEmptyAsyncContext.id = 143;

/***/ }),

/***/ 186:
/***/ (function(module, exports) {

function webpackEmptyAsyncContext(req) {
	// Here Promise.resolve().then() is used instead of new Promise() to prevent
	// uncatched exception popping up in devtools
	return Promise.resolve().then(function() {
		throw new Error("Cannot find module '" + req + "'.");
	});
}
webpackEmptyAsyncContext.keys = function() { return []; };
webpackEmptyAsyncContext.resolve = webpackEmptyAsyncContext;
module.exports = webpackEmptyAsyncContext;
webpackEmptyAsyncContext.id = 186;

/***/ }),

/***/ 230:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return HomePage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(78);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_angularfire2_database__ = __webpack_require__(231);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_angularfire2_auth__ = __webpack_require__(279);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_firebase_app__ = __webpack_require__(437);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_firebase_app___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4_firebase_app__);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





var HomePage = (function () {
    function HomePage(navCtrl, alertCtrl, actionSheetCtrl, afDatabase, afAuth) {
        var _this = this;
        this.navCtrl = navCtrl;
        this.alertCtrl = alertCtrl;
        this.actionSheetCtrl = actionSheetCtrl;
        this.afDatabase = afDatabase;
        this.afAuth = afAuth;
        this.songsRef = afDatabase.list('songs');
        this.songs = this.songsRef.valueChanges();
        afAuth.authState.subscribe(function (user) {
            if (!user) {
                _this.currentUser = null;
                return;
            }
            _this.currentUser = { uid: user.uid, photoURL: user.photoURL };
        });
        this.generateTopics();
    }
    HomePage.prototype.addSong = function () {
        var _this = this;
        var prompt = this.alertCtrl.create({
            title: 'Song Name',
            message: "Enter a name for this new song you're so keen on adding",
            inputs: [
                {
                    name: 'title',
                    placeholder: 'Title'
                },
            ],
            buttons: [
                {
                    text: 'Cancel',
                    handler: function (data) {
                        console.log('Cancel clicked');
                    }
                },
                {
                    text: 'Save',
                    handler: function (data) {
                        var newSongRef = _this.songsRef.push({});
                        newSongRef.set({
                            id: newSongRef.key,
                            title: data.title,
                            uid: _this.currentUser.uid
                        });
                    }
                }
            ]
        });
        prompt.present();
    };
    HomePage.prototype.showOptions = function (songId, songTitle) {
        var _this = this;
        var actionSheet = this.actionSheetCtrl.create({
            title: 'What do you want to do?',
            buttons: [
                {
                    text: 'Delete Song',
                    role: 'destructive',
                    handler: function () {
                        _this.removeSong(songId);
                    }
                }, {
                    text: 'Update title',
                    handler: function () {
                        _this.updateSong(songId, songTitle);
                    }
                }, {
                    text: 'Favorite',
                    role: 'destructive',
                    handler: function () {
                        _this.favoriteSong(songTitle);
                    }
                },
                {
                    text: 'Cancel',
                    role: 'cancel',
                    handler: function () {
                        console.log('Cancel clicked');
                    }
                }
            ]
        });
        actionSheet.present();
    };
    HomePage.prototype.favoriteSong = function (songTitle) {
        this.presentAlert(songTitle);
    }; //Fin del favoriteSong
    HomePage.prototype.presentAlert = function (songTitle) {
        var alert = this.alertCtrl.create({
            title: songTitle,
            subTitle: 'Acaba de darle favorito a esta canción.\n   ¡Felicidades!',
            buttons: ['Cerrar.']
        });
        alert.present();
    };
    HomePage.prototype.removeSong = function (songId) {
        this.songsRef.remove(songId);
    };
    HomePage.prototype.updateSong = function (songId, songTitle) {
        var _this = this;
        var prompt = this.alertCtrl.create({
            title: 'Song Name',
            message: "Update the name for this song",
            inputs: [
                {
                    name: 'title',
                    placeholder: 'Title',
                    value: songTitle
                },
            ],
            buttons: [
                {
                    text: 'Cancel',
                    handler: function (data) {
                        console.log('Cancel clicked');
                    }
                },
                {
                    text: 'Save',
                    handler: function (data) {
                        _this.songsRef.update(songId, {
                            title: data.title, lastUpdatedBy: _this.currentUser.uid
                        });
                    }
                }
            ]
        });
        prompt.present();
    };
    HomePage.prototype.login = function () {
        var _this = this;
        this.afAuth.auth.signInWithPopup(new __WEBPACK_IMPORTED_MODULE_4_firebase_app__["auth"].GoogleAuthProvider())
            .then(function (response) {
            console.log('resultado login google:', response);
            var userRef = _this.afDatabase.list('users');
            userRef.update(response.user.uid, {
                userId: response.user.uid,
                displayName: response.user.displayName,
                photoURL: response.user.photoURL
            });
            //userRef.push({userId: xx.user.uid, displayName: xx.user.displayName}).then((xx)=>{
            //});
        });
    };
    HomePage.prototype.loginWithEmail = function () {
        this.afAuth.auth.signInWithPopup(new __WEBPACK_IMPORTED_MODULE_4_firebase_app__["auth"].EmailAuthProvider()).then(function (xx) {
        });
    };
    HomePage.prototype.logout = function () {
        this.afAuth.auth.signOut();
    };
    HomePage.prototype.generateTopics = function () {
        this.topics = [
            'Ana', 'Angel', 'Blad', 'Carlos', 'Diego',
            'Fausto', 'Fernando Andres', 'Gabriela Agurcia', 'Harold', 'Jose',
            'Juan Pablo', 'Luis', 'Maria', 'Mario',
            'Miguel', 'Oscar Fac', 'Ricardo Fernandez', 'Victor'
        ];
    }; //Fin del generateTopics
    HomePage.prototype.getTopics = function (ev) {
        this.generateTopics();
        var serVal = ev.target.value;
        if (serVal && serVal.trim() != '') {
            this.topics = this.topics.filter(function (topic) {
                return (topic.toLowerCase().indexOf(serVal.toLowerCase()) > -1);
            });
        }
    }; //Fin del getTopics
    HomePage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-home',template:/*ion-inline-start:"C:\Users\Jose\Desktop\Sistemas\Experiencia de Usuario\Prueba1\ionic\crudApp\src\pages\home\home.html"*/'<ion-header>\n\n  <ion-navbar>\n\n    \n\n    <!--ion-buttons end *ngIf="afAuth.authState | async">\n\n    <button color="primary" ion-button icon-only (click)="addSong()">\n\n    <ion-icon name="add-circle"></ion-icon>\n\n    </button>\n\n    </ion-buttons-->\n\n    \n\n    <ion-title>\n\n      <ion-item class="item item-trns text-center">\n\n        Ejercicio Ionic App\n\n        <ion-avatar item-end *ngIf="afAuth.authState | async">\n\n          <img src={{currentUser.photoURL}}>\n\n        </ion-avatar>\n\n      </ion-item>  \n\n    </ion-title>\n\n  </ion-navbar>\n\n</ion-header>\n\n\n\n<ion-content padding>\n\n  <div *ngIf="afAuth.authState | async as user; else showLogin">\n\n    <h1>Hello {{ user.displayName }}!</h1>\n\n    <button ion-button color="primary" full (click)="logout()">Logout</button>\n\n    <ion-list>\n\n      <ion-item *ngFor="let song of songs | async" (click)="showOptions(song.id, song.title)">\n\n        {{song.title}}\n\n      </ion-item>\n\n    </ion-list>\n\n    <ion-fab right bottom>\n\n      <button ion-fab  (click)="addSong()">\n\n        <ion-icon name="add" ></ion-icon>\n\n      </button>\n\n    </ion-fab>\n\n  </div>\n\n\n\n  <ng-template #showLogin>\n\n    <p>Please login.</p>\n\n    <button ion-button color="danger"  full (click)="login()" icon-right>\n\n      <ion-icon name="logo-googleplus"></ion-icon>\n\n        Login with Google\n\n    </button>\n\n  </ng-template>\n\n\n\n  <!-- Comenzando el Google Search Bar -->\n\n  \n\n  <input id="textbox" type="text" placeholder="Search on Google..." \n\n  onkeydown="if (event.keyCode == 13 || event.which == 13) { location=\'http://www.google.com/search?q=\' \n\n  + encodeURIComponent(document.getElementById(\'textbox\').value);}" />\n\n  \n\n  <!-- Terminando el Google Search Bar -->\n\n\n\n  <!-- Comenzando redes soclaies -->\n\n    <a ion-thumbnail ion-item href="https://www.facebook.com">\n\n      <img src = "https://firebasestorage.googleapis.com/v0/b/practicaux.appspot.com/o/fb.PNG?alt=media&token=d7484950-66f2-4b80-bc18-c6c9fd8df7b0">\n\n    </a>\n\n  \n\n    <a ion-thumbnail ion-item href="https://www.twitter.com">\n\n      <img src = "">\n\n    </a>\n\n\n\n    <a ion-thumbnail ion-item href="https://www.instagram.com">\n\n      <img src = "">\n\n    </a>\n\n  <!-- Terminando redes sociales -->\n\n\n\n  <!-- Comenzando el Search Bar-->\n\n  <ion-searchbar (ionInput) = "getTopics($event)" [showCancelButton] = "shouldShowCancel" (ionCancel)="onCancel($event)"></ion-searchbar>\n\n\n\n  <ion-list>\n\n    <ion-item *ngFor = "let topic of topics">\n\n      {{topic}}\n\n    </ion-item>\n\n  </ion-list>\n\n  <!--Terminando el search bar -->\n\n  \n\n</ion-content>\n\n\n\n<ion-footer>\n\n  <div class="bottom_bar">\n\n    <ion-title>José Ricardo Fernández Ortega. 2018</ion-title>\n\n  </div>\n\n</ion-footer>\n\n\n\n'/*ion-inline-end:"C:\Users\Jose\Desktop\Sistemas\Experiencia de Usuario\Prueba1\ionic\crudApp\src\pages\home\home.html"*/
        }),
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'my-search',
            template: '<ion-toolbar primary><ion-searchbar (input)="onInput($event)" (ionClear)="onClear($event)"></ion-searchbar></ion-toolbar><ion-content><ion-list><ion-item *ngFor="let item of items">{{ item }}</ion-item></ion-list></ion-content>'
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["f" /* NavController */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["b" /* AlertController */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["a" /* ActionSheetController */],
            __WEBPACK_IMPORTED_MODULE_2_angularfire2_database__["a" /* AngularFireDatabase */],
            __WEBPACK_IMPORTED_MODULE_3_angularfire2_auth__["a" /* AngularFireAuth */]])
    ], HomePage);
    return HomePage;
}());

//# sourceMappingURL=home.js.map

/***/ }),

/***/ 281:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser_dynamic__ = __webpack_require__(282);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__app_module__ = __webpack_require__(302);


Object(__WEBPACK_IMPORTED_MODULE_0__angular_platform_browser_dynamic__["a" /* platformBrowserDynamic */])().bootstrapModule(__WEBPACK_IMPORTED_MODULE_1__app_module__["a" /* AppModule */]);
//# sourceMappingURL=main.js.map

/***/ }),

/***/ 302:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* unused harmony export firebaseConfig */
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AppModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser__ = __webpack_require__(39);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_ionic_angular__ = __webpack_require__(78);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ionic_native_splash_screen__ = __webpack_require__(226);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__ionic_native_status_bar__ = __webpack_require__(229);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__app_component__ = __webpack_require__(351);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__pages_home_home__ = __webpack_require__(230);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7_angularfire2__ = __webpack_require__(41);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8_angularfire2_database__ = __webpack_require__(231);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9_angularfire2_auth__ = __webpack_require__(279);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};







// Import the AF2 Module



// AF2 Settings
var firebaseConfig = {
    apiKey: "AIzaSyBjIIdKK3uRkcOdaslfNlPdZPsD7u385zM",
    authDomain: "prueba1jfernandez.firebaseapp.com",
    databaseURL: "https://prueba1jfernandez.firebaseio.com",
    projectId: "prueba1jfernandez",
    storageBucket: "prueba1jfernandez.appspot.com",
    messagingSenderId: "672172112699"
};
var AppModule = (function () {
    function AppModule() {
    }
    AppModule = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_1__angular_core__["I" /* NgModule */])({
            declarations: [
                __WEBPACK_IMPORTED_MODULE_5__app_component__["a" /* MyApp */],
                __WEBPACK_IMPORTED_MODULE_6__pages_home_home__["a" /* HomePage */]
            ],
            imports: [
                __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser__["a" /* BrowserModule */],
                __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["e" /* IonicModule */].forRoot(__WEBPACK_IMPORTED_MODULE_5__app_component__["a" /* MyApp */], {}, {
                    links: []
                }),
                __WEBPACK_IMPORTED_MODULE_7_angularfire2__["a" /* AngularFireModule */].initializeApp(firebaseConfig),
                __WEBPACK_IMPORTED_MODULE_8_angularfire2_database__["b" /* AngularFireDatabaseModule */],
                __WEBPACK_IMPORTED_MODULE_9_angularfire2_auth__["b" /* AngularFireAuthModule */]
            ],
            bootstrap: [__WEBPACK_IMPORTED_MODULE_2_ionic_angular__["c" /* IonicApp */]],
            entryComponents: [
                __WEBPACK_IMPORTED_MODULE_5__app_component__["a" /* MyApp */],
                __WEBPACK_IMPORTED_MODULE_6__pages_home_home__["a" /* HomePage */]
            ],
            providers: [
                __WEBPACK_IMPORTED_MODULE_4__ionic_native_status_bar__["a" /* StatusBar */],
                __WEBPACK_IMPORTED_MODULE_3__ionic_native_splash_screen__["a" /* SplashScreen */],
                { provide: __WEBPACK_IMPORTED_MODULE_1__angular_core__["u" /* ErrorHandler */], useClass: __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["d" /* IonicErrorHandler */] }
            ]
        })
    ], AppModule);
    return AppModule;
}());

//# sourceMappingURL=app.module.js.map

/***/ }),

/***/ 351:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return MyApp; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(78);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ionic_native_status_bar__ = __webpack_require__(229);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ionic_native_splash_screen__ = __webpack_require__(226);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__pages_home_home__ = __webpack_require__(230);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





var MyApp = (function () {
    function MyApp(platform, statusBar, splashScreen) {
        this.rootPage = __WEBPACK_IMPORTED_MODULE_4__pages_home_home__["a" /* HomePage */];
        platform.ready().then(function () {
            // Okay, so the platform is ready and our plugins are available.
            // Here you can do any higher level native things you might need.
            statusBar.styleDefault();
            splashScreen.hide();
        });
    }
    MyApp = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({template:/*ion-inline-start:"C:\Users\Jose\Desktop\Sistemas\Experiencia de Usuario\Prueba1\ionic\crudApp\src\app\app.html"*/'<ion-nav [root]="rootPage"></ion-nav>\n\n'/*ion-inline-end:"C:\Users\Jose\Desktop\Sistemas\Experiencia de Usuario\Prueba1\ionic\crudApp\src\app\app.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["g" /* Platform */], __WEBPACK_IMPORTED_MODULE_2__ionic_native_status_bar__["a" /* StatusBar */], __WEBPACK_IMPORTED_MODULE_3__ionic_native_splash_screen__["a" /* SplashScreen */]])
    ], MyApp);
    return MyApp;
}());

//# sourceMappingURL=app.component.js.map

/***/ })

},[281]);
//# sourceMappingURL=main.js.map