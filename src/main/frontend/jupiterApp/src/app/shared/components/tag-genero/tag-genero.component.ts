import {Component, Input} from '@angular/core';
import {TagModule} from "primeng/tag";
import {Genero} from "../../../core/interface/genero.interface";

@Component({
  selector: 'shared-tag-genero',
  standalone: true,
  imports: [
    TagModule
  ],
  templateUrl: './tag-genero.component.html',
  styleUrl: './tag-genero.component.css'
})
export class TagGeneroComponent {


  @Input() generos:Genero[] = [];


}
