import {ItemCarrinho} from "./shared/item-carrinho.model";
import {Oferta} from "./shared/oferta.model";


export class CarrinhoService {

  public itens: ItemCarrinho[] = [];

  public exibirItens(): ItemCarrinho[]{
    return this.itens;
  }

  public incluirItem(oferta: Oferta){
      let item: ItemCarrinho = new ItemCarrinho(
        oferta.id,
        oferta.imagens[0],
        oferta.titulo,
        oferta.descricao_oferta,
        oferta.valor,
        1);

      // Verifica se o ítem em questão já se encontra no carrinho
      let itemCarrinhoEncontrado = this.itens.find((value: ItemCarrinho) => value.id === item.id)

      if (itemCarrinhoEncontrado){
        itemCarrinhoEncontrado.quantidade ++
      } else {
        this.itens.push(item)
      }
    console.log('Item adicionado ao carrinho', this.itens)
  }

  public totalCarrinhoCompras(): number {
    let total: number = 0;

    this.itens.map((value: ItemCarrinho) => {
      total += (value.valor * value.quantidade)
    })
    return total;
  }

  public incrementQuantity (itemId: number){
    let itemAlterado = this.itens.find((value: ItemCarrinho) => value.id === itemId)
    if (itemAlterado){
      itemAlterado.quantidade ++
    }
  }

  public decrementQuantity (item: ItemCarrinho){
    let itemAlterado = this.itens.find((value: ItemCarrinho) => value.id === item.id)

    if (itemAlterado){
        itemAlterado.quantidade --

      if (item.quantidade === 0){
        //retirar no array
        //buscar o índice passando o objeto
        this.itens.splice(this.itens.indexOf(itemAlterado), 1)
      }
    }
  }

  limpaCarrinho() {
      this.itens = []
  }
}
