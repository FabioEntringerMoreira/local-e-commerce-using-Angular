import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { OfertasService } from '../ofertas.service';
import { Oferta } from '../shared/oferta.model';
import {CarrinhoService} from "../carrinho.service";

@Component({
  selector: 'app-oferta',
  templateUrl: './oferta.component.html',
  styleUrls: ['./oferta.component.css'],
  providers: [OfertasService]
})
export class OfertaComponent implements OnInit, OnDestroy {

  public ofertaSelecionada: Oferta;
  id: number;

  constructor(private route: ActivatedRoute,
              private ofertaService: OfertasService,
              private carrinhoService: CarrinhoService) {
              }

  ngOnInit(): void {
    this.route.params.subscribe((parametro: Params) => {
      this.ofertaService.getOfertaById(parametro.id)
        .then((oferta: Oferta) => {
           this.ofertaSelecionada = oferta;
  })
  })
  }

  ngOnDestroy(){
  }

  adicionarItemCarrinho() {
    this.carrinhoService.incluirItem(this.ofertaSelecionada)
  }
}
