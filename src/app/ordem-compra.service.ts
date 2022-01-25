import {Pedido} from "./shared/pedido.model";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Injectable} from "@angular/core";
import {URL_API} from "./app.api";
import {Observable} from "rxjs";
import {map} from "rxjs/operators";

@Injectable()
export class OrdemCompraService {

    constructor(private http: HttpClient) {

    }

  public efetivarCompra(pedido: Pedido): Observable<any> {
    let headers: HttpHeaders = new HttpHeaders()
    headers.append('Content-type','applicartion.json')

    return this.http.post<any>(`${URL_API}/pedidos`,
      (pedido),
      ({headers: headers})
    ).pipe(
      map((resposta: Response) => resposta)
    )
  }
}
