import {Component, inject, OnInit, signal} from '@angular/core';
import {ButtonModule} from "primeng/button";
import {ConfirmDialogModule} from "primeng/confirmdialog";
import {DialogModule} from "primeng/dialog";
import {InputTextModule} from "primeng/inputtext";
import {CommonModule} from "@angular/common";
import {RippleModule} from "primeng/ripple";
import {ConfirmationService, MessageService, SharedModule} from "primeng/api";
import {TableModule} from "primeng/table";
import {ToastModule} from "primeng/toast";
import {ToolbarModule} from "primeng/toolbar";
import {Column} from "../../core/interface/column.interface";
import {delay} from "rxjs";
import {FileSelectEvent, FileUploadModule} from "primeng/fileupload";
import {ImageModule} from "primeng/image";
import {PasswordModule} from "primeng/password";
import {TagModule} from "primeng/tag";
import {ProductoService} from "../../core/service/producto.service";
import {MediaService} from "../../core/service/media.service";
import {AuthService} from "../../core/service/auth.service";
import {Producto} from "../../core/interface/producto.interface";
import {FormsModule} from "@angular/forms";
import {TriStateCheckboxModule} from "primeng/tristatecheckbox";
import {InputNumberModule} from "primeng/inputnumber";
import {InputTextareaModule} from "primeng/inputtextarea";

@Component({
  selector: 'app-productos',
  standalone: true,
  imports: [
    ButtonModule,
    ConfirmDialogModule,
    DialogModule,
    InputTextModule,
    RippleModule,
    SharedModule,
    TableModule,
    ToastModule,
    ToolbarModule,
    FileUploadModule,
    ImageModule,
    CommonModule,
    PasswordModule,
    TagModule,
    FormsModule,
    TriStateCheckboxModule,
    InputNumberModule,
    InputTextareaModule
  ],
  templateUrl: './productos.component.html',
  styles: ``
})
export class ProductosComponent implements OnInit {
  private authService = inject(AuthService);
  private productoService = inject(ProductoService);
  private mediaService = inject(MediaService);

  usuario = this.authService.user();
  loading = signal(true);
  productos = signal<Producto[]>([]);

  selectedProductos: Producto[] = [];


  selectedColumns: Column[] = [];

  uploadedFiles: any[] = [];
  producto!: Producto;

  editar = signal(false);
  submitted = signal(false);
  productoDialog: boolean = false;

  constructor(private messageService: MessageService, private confirmationService: ConfirmationService) {
  }

  ngOnInit(): void {
    setTimeout(() => {

      this.cargarDatos();
    }, 500)
  }

  cargarDatos() {
    this.loading.set(true);

    this.productoService.getProductoByUsuario(this.usuario!.id).pipe(
      delay(500)
    ).subscribe(producto => {
      this.productos.set(producto);
      this.loading.set(false);
    })

  }

  onUpload(event: FileSelectEvent) {

    const file = event.files[0];
    if (file) {
      const formdata = new FormData();
      formdata.append('file', file);

      formdata.append('subfolder', "producto");
      formdata.append('filename', "producto-" + this.producto.nombre.replace(/[\s:/\\¿?]/g, "_") + "-" + this.usuario?.id + "-" + this.producto.precio);
      this.mediaService.uploadFile(formdata).subscribe(res => {
        this.producto.imagen = res.url;
        this.messageService.add({
          severity: 'info',
          summary: 'Cambio realizado con éxito',
          detail: 'Refresca la pagina para ver el cambio'
        });
      })
    }
  }

  showError() {
    this.messageService.add({
      severity: 'error',
      summary: 'Error',
      detail: 'Se ha ocurrido un error al hacer la operación'
    });
  }

  openNew() {
    this.producto = {
      comprado: false, descripcion: "", id: 0, imagen: "", nombre: "", precio: 0
    };
    this.submitted.set(false);
    this.productoDialog = true;
  }

  deleteSelectedProductos() {
    this.confirmationService.confirm({
      message: '¿Estás seguro de eleminar los productos seleccionados?',
      header: 'Confirm',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        for (let producto of this.selectedProductos) {
          this.productoService.deleteProducto(producto.id).subscribe(value => {
            if (!value)
              this.showError()
            this.cargarDatos();
          })
        }
        this.selectedProductos = [];
        this.messageService.add({
          severity: 'success',
          summary: 'Successful',
          detail: 'Productos Eliminados',
          life: 3000
        });
      }
    });
  }

  editProducto(producto: Producto) {
    this.producto = {...producto};
    this.productoDialog = true;
    this.editar.set(true)
  }

  deleteProducto(producto: Producto) {
    this.confirmationService.confirm({
      message: 'Estás seguro de eleminar ' + producto.nombre + '?',
      header: 'Confirm',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.productoService.deleteProducto(producto.id).subscribe(value => {
          if (value) {
            this.messageService.add({
              severity: 'success',
              summary: 'Successful',
              detail: 'Producto eleminado',
              life: 3000
            });
            this.cargarDatos()
          } else {
            this.showError()
          }
        })
      }
    });
  }

  hideDialog() {
    this.productoDialog = false;
    this.submitted.set(false);
    this.editar.set(false);
  }

  saveProducto() {
    this.submitted.set(true);
    if (this.editar()) {
      this.confirmationService.confirm({
        message: '¿Estás seguro de editar el producto seleccionados?',
        header: 'Confirm',
        icon: 'pi pi-exclamation-triangle',
        accept: () => {
          this.productoService.updateProducto(this.producto).subscribe(value => {
            if (value) {
              this.messageService.add({
                severity: 'success',
                summary: 'Successful',
                detail: 'Se ha realizado el cambio',
                life: 3000
              });
              this.productoDialog = false;
              this.editar.set(false);
              this.cargarDatos();
              this.submitted.set(false);
            } else {
              this.showError()
            }
          })

        }
      });
    } else {

      this.productoService.addProducto(this.producto, this.usuario!).subscribe(value => {
        if (value) {
          this.messageService.add({
            severity: 'success',
            summary: 'Successful',
            detail: 'Se ha creado correctamente',
            life: 3000
          });
          this.productoDialog = false;
          this.cargarDatos();
          this.submitted.set(false);

        } else {
          this.showError();
        }
      })
    }
  }
}
