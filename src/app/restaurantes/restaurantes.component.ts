import { Component, Injectable, OnInit } from '@angular/core';
import { OfertasService } from '../ofertas.service';
import { Oferta } from '../shared/oferta.model';

@Component({
  selector: 'app-restaurantes',
  templateUrl: './restaurantes.component.html',
  styleUrls: ['./restaurantes.component.css'],
  providers: [OfertasService]
})
@Injectable()
export class RestaurantesComponent implements OnInit {

  public ofertasRestaurante: Oferta[];

  constructor(private ofertaService: OfertasService) { }

  ngOnInit(): void {
    this.ofertaService.getOfertasPorCategoria('restaurante')
    .then((ofertas: Oferta[]) => {
      this.ofertasRestaurante = ofertas;
    })
    .catch((param: any) =>{
      console.log(param)
    })
  }

}
