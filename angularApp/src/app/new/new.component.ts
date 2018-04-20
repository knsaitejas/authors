import { Component, OnInit } from '@angular/core';
import { HttpService } from '../http.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-new',
  templateUrl: './new.component.html',
  styleUrls: ['./new.component.css']
})
export class NewComponent implements OnInit {
	newAuthor: any;
	$window.location.href = '/'
  	constructor(private _httpService: HttpService, private router: Router) { }

  	ngOnInit() {
  		this.newAuthor = ''
  }
  onSubmit(){
  	let observable = this._httpService.addAuthor(this.newAuthor)
  	observable.subscribe(data => {
  		
  		if ('error' in data){
  			console.log(data)	
  		} else {
  			this.router.navigate([''])
  		}
  	})
  }

}
