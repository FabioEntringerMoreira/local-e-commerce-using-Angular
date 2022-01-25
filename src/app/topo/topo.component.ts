import { Component, OnInit } from '@angular/core';
import { Observable, of, scheduled, Subject } from 'rxjs';
import { catchError, debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';
import { OfertasService } from '../ofertas.service';
import { Oferta } from '../shared/oferta.model';

@Component({
  selector: 'app-topo',
  templateUrl: './topo.component.html',
  styleUrls: ['./topo.component.css'],
  providers: [OfertasService]
})
export class TopoComponent implements OnInit {

  public ofertas: Observable<Oferta[]>;
  private subjectPesquisa: Subject<string> = new Subject<string>();

  constructor(private ofertasService: OfertasService) { }

  ngOnInit(): void {
    this.ofertas = this.subjectPesquisa.pipe(
      debounceTime(1000),
      distinctUntilChanged(),
      switchMap(((termo: string) => {

        if (termo.trim() === '') {
          return of<Oferta[]>([])
        }
        
          return this.ofertasService.pesquisaOfertas(termo);
      }))
    ),
    catchError((error: any) => {
      return of<Oferta[]>([])
  })
  }

  public pesquisa(termoDaBusca: string) : void {
   this.subjectPesquisa.next(termoDaBusca)

    /*
    // Observavel
    this.ofertas = this.ofertasService.pesquisaOfertas(termoDaBusca)
 
    // Observador
    this.ofertas.subscribe(
      // Recebendo o retorno e executando ações com ele
      (ofertas: Oferta[]) => console.log(ofertas),
      // Capturando os erros caso existem e executando ações
      (error: any) => {console.log('Erro status:' + error.status)},
      // "Complete" Realizando alguma ação após o fluxo do observable terminar
      () => console.log('Fluxo de eventos completo!')
    ) */

  }

  public limpaPesquisa(){
    this.subjectPesquisa.next('')
  }
}
