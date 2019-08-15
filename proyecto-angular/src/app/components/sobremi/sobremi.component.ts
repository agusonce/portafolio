import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-sobremi',
  templateUrl: './sobremi.component.html',
  styleUrls: ['./sobremi.component.css']
})
export class SobremiComponent implements OnInit {
	public title: string;  
	public subtitle: string;  
	public email: string;  
  constructor() { 
	this.title = "agustin albornoz";
  	this.subtitle = "sub titulo";
  	this.email = "agusonce18@gmail.com"
  }

  ngOnInit() {
  }

}
