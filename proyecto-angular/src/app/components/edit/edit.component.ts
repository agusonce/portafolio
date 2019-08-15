import { Component, OnInit } from '@angular/core';
import { Project } from '../../models/project';
import { ProjectService } from '../../services/project.service';
import { UploadService } from '../../services/upload.service';
import { Global } from '../../services/global';
import { Router, ActivatedRoute, Params } from '@angular/router';


@Component({
  selector: 'app-edit',
  templateUrl: '../create/create.component.html',
  styleUrls: ['./edit.component.css'],
  providers: [ProjectService, UploadService]
})
export class EditComponent implements OnInit {
  	public titulo: String;
  	public mensaje: String;
	public status: String;
	public url: String;
  	public filesToUpload: Array<File>;
	public project: Project;
  	public save_project; 

  constructor(
  	private _projectService: ProjectService,
    private _uploadService: UploadService,
    private _router: Router,
  	private _route: ActivatedRoute

  ) { 
  	this.titulo = "Editar proyecto";
  	this.mensaje = "Se Edito el projecto Correctamente";
  	this.url = Global.url;
  }

 
  ngOnInit() {
  	this._route.params.subscribe(params => {
  		let id = params.id;

  		this.getProject(id); 
  	})
  }

  getProject(id){
  	this._projectService.getProject(id).subscribe(
  		response => {
  			this.project = response.project; 
   		},
  		error => {
  			console.log(<any>error);
  		}
  	);
  }

  onSubmit(Form){

    //guardar los datos
  	this._projectService.UpdateProject(this.project).subscribe(
  		response =>{
        var resultado = response;
  			if (resultado.project) {

          		//subir imagen
	          	if (this.filesToUpload) {
			          	this._uploadService.makeFileRequest(Global.url+"uploadImagen/"+response.project._id, [], this.filesToUpload,'image')
			          	.then((result:any) => {
			              this.save_project = result.project;
			              console.log(result);
			              Form.reset();
	          			});
	          	}else{
	            	Form.reset();
	          		console.log("no hay imagen");
	          		this.save_project = resultado.project;
	          	}
	          	this.status = 'success';

  			}else{
  				this.status = 'failed';
  			}
  		},
  		error =>{
  			console.log(<any>error);
  		}
  	);
  }

  fileChangeEvent(fileInput: any){
    this.filesToUpload = <Array<File>>fileInput.target.files;
  }


}
