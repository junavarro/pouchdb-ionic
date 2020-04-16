import { Component, OnInit } from '@angular/core';
import PouchDB from 'pouchdb';
import { Platform } from '@ionic/angular';
@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page  implements OnInit {
  db: any;

  constructor(private platform: Platform) { }

  ngOnInit() {
    // console.log(crypto);
    this.platform.ready().then(
      (ready) => {
        PouchDB.plugin(require('pouchdb-adapter-cordova-sqlite'));
        this.db = new PouchDB('mydb.db', {
          adapter: 'cordova-sqlite',
          iosDatabaseLocation: 'Library',
          androidDatabaseImplementation: 2
        });
        //PouchDB.plugin(require('cryptp-pouch'));
        this.db.post({ '_id': '124', 'data': 2345 }).then((result) => {
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
