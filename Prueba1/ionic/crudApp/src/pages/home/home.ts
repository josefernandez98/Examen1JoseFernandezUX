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
@Component({
  selector: 'my-search',
  template: '<ion-toolbar primary><ion-searchbar (input)="onInput($event)" (ionClear)="onClear($event)"></ion-searchbar></ion-toolbar><ion-content><ion-list><ion-item *ngFor="let item of items">{{ item }}</ion-item></ion-list></ion-content>'
})
export class HomePage {

  currentUser:any;
  songsRef:any;
  songs: AngularFireList<any>;
  
  constructor(
    public navCtrl: NavController, 
    public alertCtrl: AlertController,
    public actionSheetCtrl: ActionSheetController,
    public afDatabase: AngularFireDatabase,
    public afAuth: AngularFireAuth,
  ) {
    this.songsRef = afDatabase.list('songs');
    this.songs = this.songsRef.valueChanges();

    afAuth.authState.subscribe(user => {
      if (!user) {
        this.currentUser = null;
        return;
      }
      this.currentUser = {uid:user.uid, photoURL: user.photoURL};
      
    });
    this.generateTopics();
  }

  addSong(){
    let prompt = this.alertCtrl.create({
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
          handler: data => {
            console.log('Cancel clicked');
          }
        },
        {
          text: 'Save',
          handler: data => {
            const newSongRef = this.songsRef.push({});
            newSongRef.set({
              id: newSongRef.key,
              title: data.title,
              uid: this.currentUser.uid
            });
          }
        }
      ]
    });
    prompt.present();
  }

  showOptions(songId, songTitle) {
    let actionSheet = this.actionSheetCtrl.create({
      title: 'What do you want to do?',
      buttons: [
        {
          text: 'Delete Song',
          role: 'destructive',
          handler: () => {
            this.removeSong(songId);
          }
        },{
          text: 'Update title',
          handler: () => {
            this.updateSong(songId, songTitle);
          }
        },{
          text: 'Favorite',
          role: 'destructive',
          handler: () => {
            this.favoriteSong(songTitle);
          }
        },
        {
          text: 'Cancel',
          role: 'cancel',
          handler: () => {
            console.log('Cancel clicked');
          }
        }
      ]
    });
    actionSheet.present();
  }

  favoriteSong(songTitle) {
    this.presentAlert(songTitle);
  }//Fin del favoriteSong

  presentAlert(songTitle) {
    let alert = this.alertCtrl.create({
      title: songTitle,
      subTitle: 'Acaba de darle favorito a esta canción.\n   ¡Felicidades!',
      buttons: ['Cerrar.']
    });
    alert.present();
  }

  removeSong(songId: string){
    this.songsRef.remove(songId);
  }

  updateSong(songId, songTitle){
    let prompt = this.alertCtrl.create({
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
          handler: data => {
            console.log('Cancel clicked');
          }
        },
        {
          text: 'Save',
          handler: data => {
            this.songsRef.update(songId, {
              title: data.title, lastUpdatedBy: this.currentUser.uid
            });
          }
        }
      ]
    });
    prompt.present();
  }

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
  }

  loginWithEmail() {
    this.afAuth.auth.signInWithPopup(new firebase.auth.EmailAuthProvider()).then((xx)=>{

    });
  }
  logout() {
    this.afAuth.auth.signOut();
  }


  //Comenzando el Search Bar
  
  topics: string[];

  generateTopics () {
    this.topics = [
      'Ana', 'Angel','Blad','Carlos', 'Diego',
      'Fausto', 'Fernando Andres', 'Gabriela Agurcia', 'Harold', 'Jose',
      'Juan Pablo', 'Luis', 'Maria', 'Mario',
      'Miguel', 'Oscar Fac', 'Ricardo Fernandez', 'Victor'];
  }//Fin del generateTopics
  
  getTopics(ev: any) {
    this.generateTopics();
    let serVal = ev.target.value;
    if (serVal && serVal.trim() != '') {
      this.topics = this.topics.filter((topic) => {
        return (topic.toLowerCase().indexOf(serVal.toLowerCase()) > -1); 
      })
    }
  }//Fin del getTopics

  //Fin del Search Bar


}

