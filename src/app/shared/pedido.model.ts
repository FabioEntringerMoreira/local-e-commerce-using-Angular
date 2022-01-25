import {ItemCarrinho} from "./item-carrinho.model";


export class Pedido {
    constructor(
      public edereco?: string,
      public numero?: string,
      public complemento?: string,
      public formarPagamento?: string,
      public itensPedido?: ItemCarrinho[]
    ) { }

}
