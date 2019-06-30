import { Component } from '@angular/core';
import {ApiService} from '../api.service';
import {Router} from '@angular/router';
import {AlertController} from '@ionic/angular';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  query = '';
  filter = null;
  constructor(private API: ApiService, private router: Router, public alertController: AlertController) {
    this.API.updateProblems();
  }
  openProblem(index) {
    this.router.navigate(['/', 'problem', index]);
  }
  doRiv() {
    this.presentRev();
  }
  doFilter() {
    const filters = [];
    this.API.problems.forEach(problem => {
      filters.push({
        name: problem.sub_title,
        type: 'radio',
        label: problem.sub_title,
        value: problem.sub_title,
        checked: this.filter === problem.sub_title
      });
    });
    filters.push({
      name: 'All',
      type: 'radio',
      label: 'All',
      value: 'All',
      checked: this.filter === null
    });
    this.presentFilter(filters);
  }
  async presentFilter(inputs) {
    const alert = await this.alertController.create({
      header: 'Filter',
      inputs,
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {
            console.log('Confirm Cancel');
          }
        }, {
          text: 'Ok',
          handler: (value) => {
            console.log(value);
            this.filter = value !== 'All' ? value : null;
            this.API.doFilter(this.filter);
          }
        }
      ]
    });

    await alert.present();
  }
  async presentRev() {
    const alert = await this.alertController.create({
      header: 'Choose Rev',
      inputs: [
        {
          name: 'CFG',
          type: 'radio',
          label: `CFG (${this.API.CFG ? this.API.CFG : 'Unknown'})`,
          value: 'CFG',
          checked: this.API.selectedRev === 'CFG'
        },
        {
          name: 'TCG',
          type: 'radio',
          label: `TCG (${this.API.TCG ? this.API.TCG : 'Unknown'})`,
          value: 'TCG',
          checked: this.API.selectedRev === 'TCG'
        },
        {
          name: 'None',
          type: 'radio',
          label: 'None',
          value: 'None',
          checked: this.API.selectedRev === null || this.API.selectedRev === 'None'
        },
      ],
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {
            console.log('Confirm Cancel');
          }
        },
        {
          text: 'Edit Rev',
          handler: (value) => {
            this.presentAlertPrompt();
          }
        },
        {
          text: 'Ok',
          handler: (value) => {
            this.API.doSelectedRev(value);
          }
        }
      ]
    });

    await alert.present();
  }
  async presentAlertPrompt() {
    const alert = await this.alertController.create({
      header: 'Input Rev',
      inputs: [
        {
          name: 'CFG',
          type: 'text',
          value: this.API.CFG,
          placeholder: 'CFG'
        },
        {
          name: 'TCG',
          type: 'text',
          value: this.API.TCG,
          placeholder: 'TCG'
        },
      ],
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {
            console.log('Confirm Cancel');
          }
        }, {
          text: 'Ok',
          handler: (EVENT: {CFG: string, TCG: string}) => {
            this.API.doRev(EVENT);
          }
        }
      ]
    });

    await alert.present();
  }
}
