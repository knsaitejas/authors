import { Component, OnInit } from '@angular/core';
import { HttpService } from '../http.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit {
	id: any;
	name: any;
  constructor(private _httpService: HttpService, private router: Router, private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.id = params['id'];
      console.log(this.id)
      // console.log(params)
      })
    this.findAuthorFromService()
  }

  findAuthorFromService(){
  	let observable = this._httpService.findAuthor(this.id);
  	observable.subscribe(data =>{
  		this.name = data.name
  		// console.log(this.name)
  	})
  }

  updateAuthorFromService(){
  	let observable = this._httpService.updateAuthor(this.id, this.name)
  	observable.subscribe(data=>{
  		console.log(data)
  		this.router.navigate([''])
  	})
  }


}
