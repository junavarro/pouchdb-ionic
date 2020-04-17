import { Component, OnInit } from '@angular/core';
import PouchDB from 'pouchdb';
import { Platform } from '@ionic/angular';
import { ToastController } from '@ionic/angular';
import { geoData } from '../../assets/data/sample';
// import * as transform from 'transform-pouch'
@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page implements OnInit {
  db: any;
  result: any;

  constructor(private platform: Platform, public toastController: ToastController) { }

  ngOnInit() {
    // console.log(crypto);
    this.platform.ready().then(
      (ready) => {
        PouchDB.plugin(require('pouchdb-adapter-cordova-sqlite'));
        this.db = new PouchDB('inec.db', {
          adapter: 'cordova-sqlite',
          iosDatabaseLocation: 'Library',
          androidDatabaseImplementation: 2
        });
        PouchDB.plugin(require('transform-pouch'));
        PouchDB.plugin(require('crypto-pouch'));


        this.db.transform({
          incoming: (doc) => {
            // do something to the document before storage
            console.log('before storage');
            return doc;
          },
          outgoing: (doc) => {
            // do something to the document after retrieval
            console.log('after retrieval');
            return doc;
          }
        });

        this.db.allDocs({ include_docs: true }).then(
          (result) => {
            this.result = result;
            console.log(result);
          }
        );


      }
    );
  }

  addPost() {
    const data = {
      _id: Math.floor(Date.now() * Math.random()).toString(), data: 2345,
      bank: 'juan esteban navarro',
      secure: { username: 'John Doe', pass: '265782jcefb4vr378490' }
    };
    this.db.post(
      data
    ).then((result) => {
      console.log(result);
      this.presentToast(`Se agregó un documento ${data._id}`, 'success');
      this.readAll();
    });

  }


  addBigGeoJSON() {
    this.db.post(
      { data: JSON.parse(JSON.stringify(geoData)) }
    ).then((result) => {
      console.log(result);
      this.presentToast(`Se agregó un documento geosjon`, 'primary');
    }, (error) => {
      this.presentToast(`Error en documento geosjon ${error}`, 'danger');
    });

    console.log(JSON.stringify(geoData[0]));

  }

  readAll() {
    this.db.allDocs({ include_docs: true }).then(
      (result) => {
        this.result = result;
        console.log(result);
      }
    );
  }

  removeCrypto() {
    const data = this.db.removeCrypto();
    console.log('remove', data);
  }

  addCrypto() {
    this.db.crypto('1223455');
  }

  async presentToast(message: string, color: string) {
    const toast = await this.toastController.create({
      message,
      duration: 2000,
      color
    });
    toast.present();
  }






}
