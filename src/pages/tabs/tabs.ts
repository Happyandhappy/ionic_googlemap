import { Component } from '@angular/core';

import { AboutPage } from '../about/about';
import { ContactPage } from '../contact/contact';
import { HomePage } from '../home/home';
import { ActionSheetController } from 'ionic-angular';

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {

  tab1Root = HomePage;
  tab2Root = AboutPage;
  tab3Root = ContactPage;

  root:any = HomePage;
  constructor(public actionSheetCtrl: ActionSheetController) {}
  setRootPage(tab:any){
    switch(tab){
      case 'tab1Root':
        this.root = HomePage;
        break;
      case 'tab2Root':
        this.root = AboutPage;
        break;
      case 'tab3Root':
        this.root = ContactPage;
        break;
      case 'tab4Root':

        break;
    }
  }
  presentActionSheet() {
    console.log("more clicked");
    let actionSheet = this.actionSheetCtrl.create({
      // title: 'Modify your album',
      buttons: [
        {
          text: 'LogOut',
          role: 'destructive',
          handler: () => {
            console.log('Destructive clicked');
          }
        },{
          text: 'Settings',
          handler: () => {
            console.log('Archive clicked');
          }
        },{
          text: 'About',
          handler: () => {
            console.log('Archive clicked');
          }
        },{
          text: 'Discover',
          handler: () => {
            console.log('Archive clicked');
          }
        },{
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
}

