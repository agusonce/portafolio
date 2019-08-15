import { Component, OnInit } from '@angular/core';
import { Project } from '../../models/project';
import { ProjectService } from '../../services/project.service';
import { UploadService } from '../../services/upload.service';
import { Global } from '../../services/global';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css'],
  providers: [ProjectService, UploadService]
})
export class CreateComponent implements OnInit {
  public titulo: String;
	public mensaje: String;
	public project: Project;
  public save_project; 
	public status: String;
  public filesToUpload: Array<File>;
  constructor(
  	private _projectService: ProjectService,
    private _uploadService: UploadService
  ) { 
    this.titulo = "create proyecto";
  	this.mensaje = "Se creo el projecto Correctamente";
  	this.project = new Project('','','','',2019,'');
  }

  ngOnInit() {
  }

  onSubmit(Form){

    //guardar los datos
  	this._projectService.saveProject(this.project).subscribe(
  		response =>{
        var resultado = response;
  			if (resultado.project) {
            console.log(response.project._id);

          //subir imagen
            if (this.filesToUpload) {

                this._uploadService.makeFileRequest(Global.url+"uploadImagen/"+response.project._id, [], this.filesToUpload,'image')
                .then((result:any) => {
                    this.save_project = result.project;
                    console.log(result);
                    this.status = 'success';
                    Form.reset();
                });

            }else{
                console.log("no hay imagen");
                this.save_project = resultado.project;
            }
            
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
