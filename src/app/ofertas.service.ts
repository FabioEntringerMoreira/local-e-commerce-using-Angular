import { HttpClient, HttpResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { URL_API } from "./app.api";
import { Oferta } from "./shared/oferta.model";
import { map, retry } from 'rxjs/operators';

@Injectable()
export class OfertasService {

    constructor(private http: HttpClient){

    }

    public getOfertas(): Promise<Oferta[]>{
        return this.http.get<HttpResponse<Oferta[]>>(`${URL_API}/ofertas?destaque=true`)
        .toPromise()
        .then((resposta: any) => resposta); 
        }

        public getOfertaById(id: number): Promise<Oferta>{
            return this.http.get(`${URL_API}/ofertas?id=${id}`)
            .toPromise()
            .then((resposta: Response) => resposta[0]); 
            }
    
    public getOfertasPorCategoria(categoria: string): Promise<Oferta[]>{
        return this.http.get<HttpResponse<Oferta[]>>(`${URL_API}/ofertas?categoria=${categoria}`)
        .toPromise()
        .then((resposta: any) => resposta); 
        }     

    public getComoUsarOfertaById(id: number): Promise<string>{
        return this.http.get(`${URL_API}/como-usar?id=${id}`)
        .toPromise()
        .then((resposta: Response) => {
            return resposta[0].descricao;
        });
    }    

    public getOndeFicaOfertaById(id: number): Promise<string>{
        return this.http.get(`${URL_API}/onde-fica?id=${id}`)
        .toPromise()
        .then((resposta: Response) => {
            return resposta[0].descricao;
        });
    }    

   /* public getOfertas2(): Promise<Oferta[]>{
        return new Promise((resolve, reject) => {
            // algum tipo de processamento que ao finalizar chama a função resolve e se falhar chama o reject
            console.log('Ele passou pelo processamento?');
            let deuCerto = true;
            if (deuCerto) {
                setTimeout(() => resolve( this.ofertas), 3000) 
            } else {
                reject({erro: '404', mensagem: 'servidor não encontrado'});
            }
        })
        .then((ofertas: Oferta[]) => {
            // Alguma tratativa aqui antes de entregar a promise para o método que à chama
            console.log('primeira chamada')
            return ofertas;
        })
        .then((ofertas: Oferta[]) => {
            // Uma segunda tratativa aqui, por exemplo chamando outro método assíncrono
            console.log('segunda chamada')
            return new Promise((resolve2, reject2) => {
                setTimeout(() => {resolve2(ofertas)}, 3000);
            });
        }).then((ofertas: Oferta[]) => {
            console.log('terceiro then executado após 3 segundos porque estava aguardando uma promise ser resolvida')
            return ofertas;
        })
    } */

    public pesquisaOfertas(termo: string): Observable<Oferta[]>
    {
        return this.http.get<HttpResponse<Oferta[]>>(`${ URL_API }/ofertas?descricao_oferta_like=${ termo }`) 
        .pipe( retry(10) )
        .pipe( map( (resposta: any) => {return resposta} ) )
    }
}