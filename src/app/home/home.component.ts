import { Component, OnInit } from '@angular/core';
import { OfertasService } from '../ofertas.service';
import { Oferta } from '../shared/oferta.model';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  providers:[ OfertasService ] // injetando o serviço para este componente e todos os seus filhos
})
export class HomeComponent implements OnInit {

  ofertas: Oferta[];

  constructor(private ofertaService: OfertasService) {}

  ngOnInit(): void {
  //  this.ofertas = this.ofertaService.getOfertas();
  //  console.log(this.ofertas);

  this.ofertaService.getOfertas()
  .then((ofertas: Oferta[]) => {
      this.ofertas = ofertas;
    })
    .catch((param: any) => {
      console.log(param)
    })
  }

  public navigateToOferta(){
    
  }

}
