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
        afAuth.authState.subscribe(function (user) {
            if (!user) {
                _this.currentUser = null;
                return;
            }
            var seguidores = 0;
            _this.currentUser = { uid: user.uid, photoURL: user.photoURL, name: user.displayName };
            _this.UsersRef = afDatabase.list('users', function (ref) {
                return ref.orderByKey();
            });
            _this.ListaUsers = _this.UsersRef.valueChanges();
            _this.mensajesRef = afDatabase.list('mensajes', function (ref) {
                return ref.orderByChild('orden');
            });
            _this.seguidoresRef = afDatabase.list('users/' + user.uid + '/seguidores');
            _this.ListaMensajes = _this.mensajesRef.valueChanges();
            _this.ListaSeguidores = _this.seguidoresRef.valueChanges();
            _this.ListaSeguidores = _this.seguidoresRef.valueChanges();
        });
    } //Fin del constructor
    // INICIO DEL LOGIN Y LOGOUT \\
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
    }; //Fin del login
    HomePage.prototype.loginWithEmail = function () {
        this.afAuth.auth.signInWithPopup(new __WEBPACK_IMPORTED_MODULE_4_firebase_app__["auth"].EmailAuthProvider()).then(function (xx) {
        });
    }; //Fin del login
    HomePage.prototype.logout = function () {
        this.afAuth.auth.signOut();
        window.location.reload(true);
    }; //Fin del logout
    // FIN DEL LOGIN Y LOGOUT \\
    // Inicio de Show Opciones Boton \\
    HomePage.prototype.showOptionsBot = function () {
        var _this = this;
        var actionSheet = this.actionSheetCtrl.create({
            title: 'Seleccione su opción.',
            buttons: [
                {
                    text: 'Crear Mensaje.',
                    handler: function () {
                        _this.addMensaje(_this.currentUser);
                    }
                },
                {
                    text: 'Cancelar.',
                    role: 'cancel',
                    handler: function () {
                        console.log('Cancel clicked');
                    }
                }
            ]
        });
        actionSheet.present();
    };
    // Fin de showOptions Boton \\
    // INICIO DEL AGREGAR MENSAJE \\
    HomePage.prototype.addMensaje = function (user) {
        var _this = this;
        var prompt = this.alertCtrl.create({
            title: 'Escriba su mensaje.',
            inputs: [
                {
                    name: 'mensaje',
                    placeholder: 'Mensaje.'
                },
            ],
            buttons: [
                {
                    text: 'Cancelar.',
                    handler: function (data) {
                        console.log('Cancel clicked');
                    }
                },
                {
                    text: 'Save',
                    handler: function (data) {
                        var newMensajeRef = _this.mensajesRef.push({});
                        var likes = 0;
                        var dislikes = 0;
                        var orden = 100000000;
                        newMensajeRef.set({
                            id: newMensajeRef.key,
                            mensaje: data.mensaje,
                            likes: likes,
                            dislikes: dislikes,
                            uid: _this.currentUser.uid,
                            persona: _this.currentUser.name,
                            foto: _this.currentUser.photoURL,
                            orden: orden
                        });
                    }
                }
            ]
        });
        prompt.present();
    };
    // FIN DEL AGREGAR MENSAJE \\
    // INICIO DE OPCIONES MENSAJE \\
    HomePage.prototype.showOpcionesMensaje = function (mensaje, likes, dislikes, orden) {
        var _this = this;
        var actionSheet = this.actionSheetCtrl.create({
            title: 'Seleccione su opción.',
            buttons: [
                {
                    text: 'Like.',
                    handler: function () {
                        _this.like(mensaje, likes, dislikes, orden);
                    }
                }, {
                    text: 'Dislike.',
                    handler: function () {
                        _this.dislike(mensaje, likes, dislikes, orden);
                    }
                },
                {
                    text: 'Cancelar.',
                    role: 'cancel',
                    handler: function () {
                        console.log('Cancel clicked');
                    }
                }
            ]
        });
        actionSheet.present();
    };
    // Fin del Show Opciones Mensaje \\
    // Inicio del boton like \\
    HomePage.prototype.like = function (mensaje, likes, dislikes, orden) {
        likes++;
        orden--;
        this.mensajesRef.update(mensaje.id, {
            likes: likes,
            dislikes: dislikes,
            orden: orden
        });
    }; //Fin de like
    // Fin del boton like \\
    // Inicio del botón dislike \\
    HomePage.prototype.dislike = function (mensaje, likes, dislikes, orden) {
        dislikes++;
        this.mensajesRef.update(mensaje.id, {
            likes: likes,
            dislikes: dislikes,
        });
    }; //Fin de dislike
    // Fin del boton dislike \\
    // Inicio del Opciones Usuarios \\
    HomePage.prototype.showOpcionesUsuario = function (user) {
        var _this = this;
        var actionSheet = this.actionSheetCtrl.create({
            title: 'Seleccione su opción.',
            buttons: [
                {
                    text: 'Seguir usuario.',
                    handler: function () {
                        _this.addSeguidor(user);
                    }
                },
                {
                    text: 'Cancelar.',
                    role: 'cancel',
                    handler: function () {
                        console.log('Cancel clicked');
                    }
                }
            ]
        });
        actionSheet.present();
    }; //Fin de opciones
    // Fin del Opciones usuarios \\
    // Inicio del seguir usuario \\
    HomePage.prototype.addSeguidor = function (user) {
        var database = __WEBPACK_IMPORTED_MODULE_4_firebase_app__["database"]();
        __WEBPACK_IMPORTED_MODULE_4_firebase_app__["database"]().ref('users/' + user.userId + '/seguidores').push({
            nombre: this.currentUser.name
        });
        this.follow(user);
    }; //Fin de seguir usuario
    // Fin del seguir usuario \\
    // Inicio de ver seguidores \\
    HomePage.prototype.follow = function (user) {
        this.presentAlert(user);
    }; //Fin del favoriteSong
    HomePage.prototype.presentAlert = function (user) {
        var alert = this.alertCtrl.create({
            title: user.name,
            subTitle: 'Acaba de darle follow a ' + user.displayName + '!',
            buttons: ['Cerrar.']
        });
        alert.present();
    };
    HomePage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-home',template:/*ion-inline-start:"C:\Users\Jose\Desktop\Sistemas\Experiencia de Usuario\Examen1JoseFernandezUX\Prueba1\ionic\crudApp\src\pages\home\home.html"*/'<ion-header>\n\n  <ion-navbar>\n\n    <ion-title>\n\n      JF Network\n\n    </ion-title>\n\n  </ion-navbar>\n\n  </ion-header>\n\n\n\n<ion-content padding class = "MyPage">\n\n\n\n  <div *ngIf="afAuth.authState | async as user; else showLogin">\n\n    <button ion-button color="primary" full (click)="logout()">Logout</button>\n\n    <ion-fab right top>\n\n      <button ion-fab  (click)="showOptionsBot()">\n\n        <ion-icon name="eye" ></ion-icon>\n\n      </button>\n\n    </ion-fab>\n\n  </div>\n\n\n\n\n\n  <ion-list>\n\n      <ion-card>\n\n        <ion-icon name = "people" class = "icon ion-home custom-iconn"></ion-icon><h1>Lista de Usuarios</h1>\n\n        <ion-item class = "card"  *ngFor = "let user of ListaUsers | async" (click)="showOpcionesUsuario(user)">\n\n          <ion-avatar item-start *ngIf="afAuth.authState | async">\n\n              <img src={{user.photoURL}}>\n\n          </ion-avatar>{{user.displayName}}\n\n        </ion-item>\n\n      </ion-card>\n\n    </ion-list>\n\n\n\n  <ion-list>\n\n      <ion-card>\n\n        <ion-icon name = "chatbubbles" class = "icon ion-home custom-iconn"></ion-icon><h1>Mensajes</h1>\n\n        <ion-item class = "card"  *ngFor = "let mensaje of ListaMensajes | async" (click)="showOpcionesMensaje(mensaje, \n\n        mensaje.likes, mensaje.dislikes, mensaje.orden)">\n\n          <ion-avatar item-start *ngIf="afAuth.authState | async" style = "padding-top: 10px">\n\n              <img src={{mensaje.foto}}>\n\n          </ion-avatar><h2 style="font-size: 25px; color: white">{{mensaje.persona}}</h2><br><br>\n\n          <p style = "color:white; font-size: 20px;">\n\n            <ion-icon name = "text"></ion-icon> \n\n            :     {{mensaje.mensaje}}   \n\n          </p>\n\n          <br>\n\n          Público<br><br>\n\n          <ion-icon name = "thumbs-up" class="icon ion-home custom-icon" ></ion-icon> {{mensaje.likes}} <br><br>\n\n          <ion-icon name = "thumbs-down" class="icon ion-home even-more-custom-icon"></ion-icon> {{mensaje.dislikes}} <br><br><br>\n\n        </ion-item>\n\n      </ion-card>\n\n    </ion-list>\n\n\n\n      \n\n\n\n  <ng-template #showLogin>\n\n    <button ion-button color="danger"  full (click)="login()" icon-right>\n\n      <ion-icon name="power"></ion-icon>\n\n    </button>\n\n  </ng-template>\n\n\n\n\n\n   \n\n\n\n\n\n</ion-content>'/*ion-inline-end:"C:\Users\Jose\Desktop\Sistemas\Experiencia de Usuario\Examen1JoseFernandezUX\Prueba1\ionic\crudApp\src\pages\home\home.html"*/
        }),
        __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["f" /* NavController */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["f" /* NavController */]) === "function" && _a || Object, typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["b" /* AlertController */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["b" /* AlertController */]) === "function" && _b || Object, typeof (_c = typeof __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["a" /* ActionSheetController */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["a" /* ActionSheetController */]) === "function" && _c || Object, typeof (_d = typeof __WEBPACK_IMPORTED_MODULE_2_angularfire2_database__["a" /* AngularFireDatabase */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_2_angularfire2_database__["a" /* AngularFireDatabase */]) === "function" && _d || Object, typeof (_e = typeof __WEBPACK_IMPORTED_MODULE_3_angularfire2_auth__["a" /* AngularFireAuth */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_3_angularfire2_auth__["a" /* AngularFireAuth */]) === "function" && _e || Object])
    ], HomePage);
    return HomePage;
    var _a, _b, _c, _d, _e;
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
                __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["e" /* IonicModule */].forRoot(__WEBPACK_IMPORTED_MODULE_5__app_component__["a" /* MyApp */], {
                    tabsPlacement: 'top'
                }, {
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
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({template:/*ion-inline-start:"C:\Users\Jose\Desktop\Sistemas\Experiencia de Usuario\Examen1JoseFernandezUX\Prueba1\ionic\crudApp\src\app\app.html"*/'<ion-nav [root]="rootPage"></ion-nav>\n\n'/*ion-inline-end:"C:\Users\Jose\Desktop\Sistemas\Experiencia de Usuario\Examen1JoseFernandezUX\Prueba1\ionic\crudApp\src\app\app.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["g" /* Platform */], __WEBPACK_IMPORTED_MODULE_2__ionic_native_status_bar__["a" /* StatusBar */], __WEBPACK_IMPORTED_MODULE_3__ionic_native_splash_screen__["a" /* SplashScreen */]])
    ], MyApp);
    return MyApp;
}());

//# sourceMappingURL=app.component.js.map

/***/ })

},[281]);
//# sourceMappingURL=main.js.map