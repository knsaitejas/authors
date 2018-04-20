import { Component, OnInit } from '@angular/core';
import { HttpService } from '../http.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
	authors: any;
  constructor(private _httpService: HttpService, private router: Router, private route: ActivatedRoute) { }

  ngOnInit() {
  	this.getAuthors()
  }
  getAuthors(){
  	let observable = this._httpService.findAll()
  	observable.subscribe(data => {
  		this.authors = data
  		console.log(data)
  	})
  }
  deleteTheAuthor(id){
    console.log(id)
    let observable1 = this._httpService.deleteAuthor(id)
    observable1.subscribe(data=>
      console.log(data))
      this.getAuthors()
  }
}
