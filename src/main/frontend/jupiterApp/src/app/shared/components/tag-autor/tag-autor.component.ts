import {Component, Input, OnInit} from '@angular/core';
import {TagModule} from "primeng/tag";
import {Autor} from "../../../core/interface/autor.interface";

@Component({
  selector: 'shared-tag-autor',
  standalone: true,
  imports: [
    TagModule
  ],
  templateUrl: 'tag-autor.component.html'
})
export class TagAutorComponent implements OnInit{

  @Input() autores:Autor[] = [];

  ngOnInit(): void {
  }

}
