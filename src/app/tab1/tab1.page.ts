import { Component, OnInit } from '@angular/core';
import PouchDB from 'pouchdb';
import { Platform } from '@ionic/angular';
//import * as transform from 'transform-pouch'
@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page implements OnInit {
  db: any;

  constructor(private platform: Platform) { }

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
        this.db.crypto("1223455");

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
        this.db.post({ '_id': Date.now() + '124', 'data': 2345 }).then((result) => {
          console.log(result);
        });

        this.db.allDocs({ include_docs: true }).then(
          (result) => {
            console.log(result);
          }
        );
      }
    );
  }

}
