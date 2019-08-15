import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
declare var  $:any;


@Component({
  selector: 'slider',
  templateUrl: './slider.component.html',
  styleUrls: ['./slider.component.css']
})
export class SliderComponent implements OnInit {
	@Input() anchura: number;
	@Input('etiquetas') captions: boolean;
  	@Output() getAutor = new EventEmitter();

  public autor: any;

  constructor() { 

  	this.autor = {
  		nombre : "agustin",
  		website : "agusonce.101"
  	};
  }

  ngOnInit() {
  	$("#logo").click(function(e){
  		e.preventDefault();
	  	$("header").css("background", "green");
  	});

  	$(".galeria").bxSlider({
    	mode: 'fade',
    	captions: this.captions,
    	slideWidth: this.anchura
  	});

  	this.getAutor.emit(this.autor);
  	
  }


  lanzar(event){
  	this.getAutor.emit(this.autor);
  }


}
