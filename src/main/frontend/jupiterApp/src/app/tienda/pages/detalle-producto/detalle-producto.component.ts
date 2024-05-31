import {Component, inject, OnInit, signal} from '@angular/core';
import {ProductoService} from "@service/producto.service";
import {ActivatedRoute, Router} from "@angular/router";
import {delay, switchMap} from "rxjs";
import {Producto} from "@interface/producto.interface";
import {ProgressSpinnerModule} from "primeng/progressspinner";
import {LoadingComponent} from "@shared/components/loading/loading.component";
import {PanelModule} from "primeng/panel";
import {SplitterModule} from "primeng/splitter";
import {ImageModule} from "primeng/image";
import {TagAutorComponent} from "@shared/components/tag-autor/tag-autor.component";
import {TagModule} from "primeng/tag";
import {FieldsetModule} from "primeng/fieldset";
import {TagGeneroComponent} from "@shared/components/tag-genero/tag-genero.component";
import {AccordionModule} from "primeng/accordion";
import {CommonModule} from "@angular/common";
import {RatingModule} from "primeng/rating";
import {FormsModule} from "@angular/forms";
import {UsuarioService} from "@service/usuario.service";
import {Usuario} from "@interface/usuario.interface";
import {ButtonModule} from "primeng/button";
import {DialogModule} from "primeng/dialog";
import {FileUploadModule} from "primeng/fileupload";
import {InputNumberModule} from "primeng/inputnumber";
import {InputTextModule} from "primeng/inputtext";
import {InputTextareaModule} from "primeng/inputtextarea";
import {RippleModule} from "primeng/ripple";
import {ConfirmationService, MessageService} from "primeng/api";
import {ConfirmDialogModule} from "primeng/confirmdialog";
import {PedidoService} from "@service/pedido.service";
import {AuthService} from "@service/auth.service";
import {Pedido} from "@interface/pedido.interface";
import {ToastModule} from "primeng/toast";

@Component({
  selector: 'app-detalle-producto',
  standalone: true,
  imports: [
    ProgressSpinnerModule,
    LoadingComponent,
    PanelModule,
    SplitterModule,
    ImageModule,
    TagAutorComponent,
    TagModule,
    FieldsetModule,
    TagGeneroComponent,
    AccordionModule,
    CommonModule,
    RatingModule,
    FormsModule,
    ButtonModule,
    DialogModule,
    FileUploadModule,
    InputNumberModule,
    InputTextModule,
    InputTextareaModule,
    RippleModule,
    ConfirmDialogModule,
    ToastModule
  ],
  templateUrl: './detalle-producto.component.html',
  styles: `a{
    text-decoration: none;
    color: black;
  }`
})
export class DetalleProductoComponent implements OnInit{
  private productoService = inject(ProductoService);
  private usuarioService = inject(UsuarioService);
  private authService = inject(AuthService);
  private activatedRoute = inject(ActivatedRoute);
  private pedidoService = inject(PedidoService);
  private router = inject(Router);


  compraDialog:boolean = false;

  producto!: Producto;
  usuario!: Usuario | undefined;
  submitted = signal(false);

  constructor(private messageService: MessageService,private confirmationService: ConfirmationService) {
  }
  ngOnInit(): void {
    this.activatedRoute.params
      .pipe(
        delay(900),
        switchMap(({ id }) => this.productoService.getProductoById(id))
      )
      .subscribe((producto) => {
        if (!producto ) return this.router.navigateByUrl('/tienda');
        this.usuarioService.getUsuarioByProducto(producto.id)
          .subscribe((usuario) => {

            if (!usuario) this.router.navigateByUrl('/tienda');
            this.usuario = usuario
          });
        this.producto = producto;
        return;
      });
  }

  openNew() {
    this.submitted.set(false);
    this.compraDialog = true ;
    if (!this.authService.user())this.router.navigateByUrl('/login');
  }

  hideDialog() {
    this.compraDialog = false ;
    this.submitted.set(false);
  }

  showError() {
    this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Se ha ocurrido un error al hacer la operación' });
  }

  savePedido() {
    this.submitted.set(true);
    if (this.usuario?.direccion){
      let fecha = new Date();
      let comprador = <Usuario>this.authService.user();
      const pedido: Pedido = {
        comprador: comprador,
        estado: "Pediente",
        fecha: fecha.toLocaleDateString() +' '+ fecha.toLocaleTimeString(),
        id: 0,
        precio: this.producto!.precio,
        producto: this.producto,
        vendedor: this.usuario
      };
      this.confirmationService.confirm({
        message: '¿Estás seguro de comprar el producto?',
        header: 'Confirm',
        icon: 'pi pi-exclamation-triangle',
        accept: () => {
          this.pedidoService.addPedido(pedido).subscribe((resp)=>{
              if (resp){
                this.producto.comprado = true;
                this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Se ha comprado el producto' });
                this.productoService.updateProducto(this.producto).subscribe(()=>{
                  setTimeout(()=>{
                    this.router.navigateByUrl('/tienda');
                    this.compraDialog = false;
                  },800)
                })


              }else{
                this.showError()
              }
            }
          )
        }
      });
    }


  }

}
