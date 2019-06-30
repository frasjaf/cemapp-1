import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {Problem} from '../problem';
import {ApiService} from '../api.service';

@Component({
  selector: 'app-problem',
  templateUrl: './problem.page.html',
  styleUrls: ['./problem.page.scss'],
})
export class ProblemPage implements OnInit {
  id: number;
  problem: Problem;
  constructor(private API: ApiService, private route: ActivatedRoute, private router: Router) {
    this.route.params.subscribe(params => {
      if (!this.API.problems) {
        this.router.navigate(['/', 'home']);
      }
      this.id = params.id;
      this.problem = this.API.problems[this.id];
    });
  }

  ngOnInit() {
  }

}
