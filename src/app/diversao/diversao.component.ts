import { Component, OnInit } from '@angular/core';
import { OfertasService } from '../ofertas.service';
import { Oferta } from '../shared/oferta.model';

@Component({
  selector: 'app-diversao',
  templateUrl: './diversao.component.html',
  styleUrls: ['./diversao.component.css'],
  providers: [OfertasService]
})
export class DiversaoComponent implements OnInit {

  public ofertasDiversao: Oferta[];

  constructor(private ofertaSevice: OfertasService) { }

  ngOnInit(): void {
    this.ofertaSevice.getOfertasPorCategoria('diversao')
    .then((ofertaDiversao: Oferta[]) => {
      this.ofertasDiversao = ofertaDiversao;
    })
  }

}
