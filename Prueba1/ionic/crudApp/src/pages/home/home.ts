import { Component } from '@angular/core';
import { NavController, 
  AlertController, // To Add Button
  ActionSheetController, // To delete
  Icon
 } from 'ionic-angular';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';
import { AngularFireAuth} from 'angularfire2/auth';
import * as firebase from 'firebase/app';
import { Observable } from '@firebase/util';


@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})



export class HomePage {
  currentUser:any;
  UsersRef: any;
  ListaUsers: any;
  mensajesRef: any;
  ListaMensajes: AngularFireList<any>;
  seguidoresRef: any;
  ListaSeguidores: AngularFireList<any>;
  
  constructor(
    public navCtrl: NavController, 
    public alertCtrl: AlertController,
    public actionSheetCtrl: ActionSheetController,
    public afDatabase: AngularFireDatabase,
    public afAuth: AngularFireAuth,
  ) {

    afAuth.authState.subscribe(user => {
      if (!user) {
        this.currentUser = null;
        return;
      }
      var seguidores: number = 0;
      this.currentUser = {uid:user.uid, photoURL: user.photoURL, name:user.displayName};
      this.UsersRef = afDatabase.list('users', ref =>{
        return ref.orderByKey();
      })
      this.ListaUsers = this.UsersRef.valueChanges();
      this.mensajesRef = afDatabase.list('mensajes', ref => {
        return ref.orderByChild('orden');
      });
      this.seguidoresRef = afDatabase.list('users/'+user.uid+'/seguidores');
      this.ListaMensajes = this.mensajesRef.valueChanges();
      this.ListaSeguidores = this.seguidoresRef.valueChanges();
      this.ListaSeguidores = this.seguidoresRef.valueChanges();
    });
  }//Fin del constructor

// INICIO DEL LOGIN Y LOGOUT \\
  login() {
    this.afAuth.auth.signInWithPopup(new firebase.auth.GoogleAuthProvider())
    .then((response)=>{
      console.log('resultado login google:', response);
      const userRef = this.afDatabase.list('users');
      userRef.update(response.user.uid, 
        {
          userId: response.user.uid, 
          displayName: response.user.displayName,
          photoURL: response.user.photoURL
        });
      //userRef.push({userId: xx.user.uid, displayName: xx.user.displayName}).then((xx)=>{
      //});
    });
  }//Fin del login
  loginWithEmail() {
    this.afAuth.auth.signInWithPopup(new firebase.auth.EmailAuthProvider()).then((xx)=>{
    });
  }//Fin del login
  logout() {
    this.afAuth.auth.signOut();
    window.location.reload(true);
  }//Fin del logout
// FIN DEL LOGIN Y LOGOUT \\

// Inicio de Show Opciones Boton \\
  showOptionsBot() {
    let actionSheet = this.actionSheetCtrl.create({
      title: 'Seleccione su opción.',
      buttons: [
        {
          text: 'Crear Mensaje.',
          handler: () => {
            this.addMensaje(this.currentUser);
          }
        },
        {
          text: 'Cancelar.',
          role: 'cancel',
          handler: () => {
            console.log('Cancel clicked');
          }
        }
      ]
    });
    actionSheet.present();
  }
// Fin de showOptions Boton \\

// INICIO DEL AGREGAR MENSAJE \\
  addMensaje(user){
    let prompt = this.alertCtrl.create({
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
          handler: data => {
            console.log('Cancel clicked');
          }
        },
        {
          text: 'Save',
          handler: data => {
            const newMensajeRef = this.mensajesRef.push({});
            var likes: number = 0;
            var dislikes: number = 0;
            var orden: number = 100000000;
            newMensajeRef.set({
              id: newMensajeRef.key,
              mensaje: data.mensaje,
              likes: likes,
              dislikes: dislikes,
              uid: this.currentUser.uid,
              persona: this.currentUser.name,
              foto: this.currentUser.photoURL,
              orden: orden
            });
          }
        }
      ]
    });
    prompt.present();
  }
// FIN DEL AGREGAR MENSAJE \\

// INICIO DE OPCIONES MENSAJE \\
showOpcionesMensaje(mensaje, likes, dislikes, orden) {
  let actionSheet = this.actionSheetCtrl.create({
    title: 'Seleccione su opción.',
    buttons: [
      {
        text: 'Like.',
        handler: () => {
          this.like(mensaje, likes, dislikes, orden);
        }
      },{
        text: 'Dislike.',
        handler: () => {
          this.dislike(mensaje, likes, dislikes, orden);
        }
      },
      {
        text: 'Cancelar.',
        role: 'cancel',
        handler: () => {
          console.log('Cancel clicked');
        }
      }
    ]
  });
  actionSheet.present();
}
// Fin del Show Opciones Mensaje \\

// Inicio del boton like \\
  like(mensaje, likes, dislikes, orden) {
    likes++;
    orden--;
    this.mensajesRef.update(mensaje.id, {
      likes: likes,
      dislikes: dislikes,
      orden: orden
    })
  }//Fin de like

// Fin del boton like \\

// Inicio del botón dislike \\
  dislike(mensaje, likes, dislikes, orden) {
    dislikes++;
    this.mensajesRef.update(mensaje.id, {
      likes: likes,
      dislikes: dislikes,
    })
  }//Fin de dislike

// Fin del boton dislike \\

// Inicio del Opciones Usuarios \\
  showOpcionesUsuario (user) {
    let actionSheet = this.actionSheetCtrl.create({
      title: 'Seleccione su opción.',
      buttons: [
        {
          text: 'Seguir usuario.',
          handler: () => {
            this.addSeguidor(user);
        }
        },
        {
          text: 'Cancelar.',
          role: 'cancel',
          handler: () => {
            console.log('Cancel clicked');
        }
        }
      ]
    });
      actionSheet.present();
  }//Fin de opciones
// Fin del Opciones usuarios \\

// Inicio del seguir usuario \\
  addSeguidor(user) {
    var database = firebase.database();
    firebase.database().ref('users/'+user.userId+'/seguidores').push({
      nombre: this.currentUser.name
    })
    this.follow(user);
  }//Fin de seguir usuario
// Fin del seguir usuario \\

// Inicio de ver seguidores \\
  
follow(user) {
  this.presentAlert(user);
}//Fin del favoriteSong

presentAlert(user) {
  let alert = this.alertCtrl.create({
    title: user.name,
    subTitle: 'Acaba de darle follow a '+user.displayName+'!',
    buttons: ['Cerrar.']
  });
  alert.present();
}
// Fin de ver seguidores \\


}