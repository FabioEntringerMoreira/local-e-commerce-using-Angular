import {Component, Input, OnInit, Output} from '@angular/core';
import { EventEmitter } from '@angular/core';

@Component({
  selector: 'app-ordem-compra-sucesso',
  templateUrl: './ordem-compra-sucesso.component.html',
  styleUrls: ['./ordem-compra-sucesso.component.css']
})
export class OrdemCompraSucessoComponent implements OnInit {

  @Input() public idPedido: number;
  @Output() public zerarId = new EventEmitter()

  constructor() { }

  ngOnInit(): void {
  }

  resetarIdPedido() {
    this.zerarId.emit()
  }
}
