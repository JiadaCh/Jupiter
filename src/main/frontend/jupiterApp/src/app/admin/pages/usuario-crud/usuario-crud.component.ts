import {Component, inject, OnInit, signal} from "@angular/core";
import {UsuarioService} from "@service/usuario.service";
import {MediaService} from "@service/media.service";
import {Usuario} from "@interface/usuario.interface";
import {Rol} from "@interface/autor.interface";
import {Column} from "@interface/column.interface";
import {ConfirmationService, MessageService} from "primeng/api";
import {delay} from "rxjs";
import {FileSelectEvent, FileUploadModule} from "primeng/fileupload";
import {TagModule} from "primeng/tag";
import {ToolbarModule} from "primeng/toolbar";
import {ToastModule} from "primeng/toast";
import {ButtonModule} from "primeng/button";
import {RippleModule} from "primeng/ripple";
import {TableModule} from "primeng/table";
import {FormsModule} from "@angular/forms";
import {MultiSelectModule} from "primeng/multiselect";
import {DropdownModule} from "primeng/dropdown";
import {ImageModule} from "primeng/image";
import {DialogModule} from "primeng/dialog";
import {InputTextModule} from "primeng/inputtext";
import {ConfirmDialogModule} from "primeng/confirmdialog";


@Component({
  selector: 'app-usuario-crud',
  standalone: true,
  imports: [
    TagModule,
    ToolbarModule,
    ToastModule,
    ButtonModule,
    RippleModule,
    TableModule,
    FormsModule,
    MultiSelectModule,
    DropdownModule,
    ImageModule,
    DialogModule,
    InputTextModule,
    FileUploadModule,
    ConfirmDialogModule,
  ],
  templateUrl: './usuario-crud.component.html',
  styleUrl: './usuario-crud.component.css',
})
export class UsuarioCrudComponent implements OnInit{
  private usuarioService = inject(UsuarioService);
  private mediaService = inject(MediaService);

  loading= signal(true);
  usuarios = signal<Usuario[]>([]);

  selectedUsuarios:Usuario[] = [];

  rol:Rol[] = [Rol.admin,Rol.usuario];

  cols: Column[] = [];

  selectedColumns: Column[] = [];

  uploadedFiles: any[] = [];
  usuario!: Usuario;

  editar = signal(false);
  submitted = signal(false);
  usuarioDialog:boolean = false;

  constructor(private messageService: MessageService,private confirmationService: ConfirmationService) {}

  ngOnInit(): void {
    this.cargarDatos();

  }

  cargarDatos(){
    this.loading.set(true);

    this.usuarioService.getUsuario().pipe(
      delay(500)
    ).subscribe( usuario =>{
      this.usuarios.set(usuario)
      this.loading.set(false);
    } )

  }

  onUpload(event: FileSelectEvent) {

    const file = event.files[0];
    if (file){
      const formdata = new FormData();
      formdata.append('file', file);

      formdata.append('subfolder', "usuario");
      formdata.append('filename', "usuario-"+this.usuario.nombre+"-"+this.usuario.correo);
      this.mediaService.uploadFile(formdata).subscribe(res=>{
        this.usuario.imagen = res.url;
      })
    }
    this.messageService.add({severity: 'info', summary: 'File Uploaded', detail: ''});
  }

  showError() {
    this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Se ha ocurrido un error al hacer la operación' });
  }

  openNew() {
    this.usuario = {
      contrasena: "", correo: "", id: 0, imagen: "http://localhost:8080/media/usuario/default-perfil.webp", nombre: "", rol: ""
    };
    this.submitted.set(false);
    this.usuarioDialog = true ;
  }

  deleteSelectedUsuarios() {
    this.confirmationService.confirm({
      message: '¿Estás seguro de eleminar los usuarios seleccionados?',
      header: 'Confirm',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        for (let usuario of this.selectedUsuarios){
          this.usuarioService.deleteUsuario(usuario.id).subscribe(value => {
            if (!value)
              this.showError()
            this.cargarDatos();
          })
        }
        this.selectedUsuarios = [];
        this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Usuarioes Eliminados', life: 3000 });
      }
    });
  }

  editUsuario(usuario: Usuario) {
    this.usuario = { ...usuario };
    this.usuarioDialog = true ;
    this.editar.set(true)
  }

  deleteUsuario(usuario: Usuario) {
    this.confirmationService.confirm({
      message: 'Estás seguro de eleminar ' + usuario.nombre + '?',
      header: 'Confirm',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.usuarioService.deleteUsuario(usuario.id).subscribe(value => {
          if (value){
            this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Usuario eleminado', life: 3000 });
            this.cargarDatos()
          }else{
            this.showError()
          }
        })
      }
    });
  }

  hideDialog() {
    this.usuarioDialog = false ;
    this.submitted.set(false);
    this.editar.set(false);
  }

  saveUsuario() {
    this.submitted.set(true);
    if (this.editar()){
      this.confirmationService.confirm({
        message: '¿Estás seguro de editar el usuario seleccionados?',
        header: 'Confirm',
        icon: 'pi pi-exclamation-triangle',
        accept: () => {
          this.usuarioService.updateUsuario(this.usuario).subscribe(value => {
            if (value){
              this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Se ha realizado el cambio', life: 3000 });
              this.usuarioDialog = false ;
              this.editar.set(false);
              this.cargarDatos()
            }else{
              this.showError()
            }
          })

        }
      });
    }else{

      this.usuarioService.addUsuario(this.usuario).subscribe(value => {
        if (value){
          this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Se ha creado correctamente', life: 3000 });
          this.usuarioDialog = false;
          this.cargarDatos();

        }else{
          this.showError();
        }
      })
    }
  }

}
