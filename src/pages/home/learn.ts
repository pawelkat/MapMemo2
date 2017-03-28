import { Component } from '@angular/core';

import { NavController } from 'ionic-angular';
import * as jQuery from 'jquery';
// import 'jquery.hotkeys';
import * as PouchDB from 'pouchdb-browser';
import * as MAPJS from 'mindmup-mapjs';



@Component({
  selector: 'page-learn',
  templateUrl: 'learn.html'
})
export class HomePage {
	pouchdbLoaded: boolean;
  	idbSupported: boolean;
	websqlSupported: boolean;
  constructor(public navCtrl: NavController) {

    this.pouchdbLoaded = false;
    this.idbSupported = false;
    this.websqlSupported = false;
	this.loadPouchDB();
  }
  loadPouchDB() {
    var self = this;
    	const container = jQuery('#container');
    	//console.log(MAPJS);
			//idea = content(testMap),
			//imageInsertController = new MAPJS.ImageInsertController('http://localhost:4999?u='),
		//const mapModel = new MAPJS.MapModel(MAPJS.DOMRender.layoutCalculator, []);
    function checkAdapterWorks(adapter) {
      return Promise.resolve().then(() => {
        var db = new PouchDB('flashcards', {adapter: adapter});
        return db.info();
      }).then(() => true).catch(() => false);
    }

    var promises = [
      checkAdapterWorks('idb'),
      checkAdapterWorks('websql')
    ];

    Promise.all(promises).then(function (results) {
      self.idbSupported = results[0];
      self.websqlSupported = results[1];
      self.pouchdbLoaded = true;
    });
  }
}
