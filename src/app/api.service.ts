import { Injectable } from '@angular/core';
import {HttpClient, HttpResponse} from '@angular/common/http';
import {Problem} from './problem';
import { Storage } from '@ionic/storage';
import {json} from '@angular-devkit/core';
@Injectable({
  providedIn: 'root'
})

export class ApiService {
  problems: Problem[] = null;
  CFG;
  TCG;
  selectedRev = null;
  filteredProblems: Problem[] = null;
  constructor(private http: HttpClient, private storage: Storage) { }

  updateProblems() {
    this.http.get('http://cem.lemooo.com/api/problems').subscribe((res: any) => {
      if (res.length === 0) {
        this.storage.get('myBackup').then(data => {
          data = JSON.parse(data);
          this.problems = data;
        });
      } else {
        this.problems = res;
        this.storage.set('myBackup', JSON.stringify(this.problems));
      }
    },
    err => {
      this.storage.get('myBackup').then(data => {
        data = JSON.parse(data);
        this.problems = data;
      });
    });
    this.storage.get('myBackupRev').then(data => {
      data = JSON.parse(data);
      this.CFG = data.CFG;
      this.TCG = data.TCG;
      this.selectedRev = data.selectedRev;
    });
  }
  doFilter(subTitle) {
    this.filteredProblems = this.problems.filter(problem => problem.sub_title === subTitle);
  }
  doRev(rev: {CFG: string, TCG: string}) {
    this.CFG = rev.CFG;
    this.TCG = rev.TCG;
    const data = {
      CFG: this.CFG,
      TCG: this.TCG,
      selectedRev: this.selectedRev
    };
    this.storage.set('myBackupRev', JSON.stringify(data));
  }
  doSelectedRev(value) {
    this.selectedRev = value;
    const data = {
      CFG: this.CFG,
      TCG: this.TCG,
      selectedRev: this.selectedRev
    };
    this.storage.set('myBackupRev', JSON.stringify(data));
  }
}
