import { Component, OnInit } from '@angular/core';
import { OrdemCompraService } from '../ordem-compra.service'
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {Pedido} from "../shared/pedido.model";
import {CarrinhoService} from "../carrinho.service";
import {ItemCarrinho} from "../shared/item-carrinho.model";

@Component({
  selector: 'app-ordem-compra',
  templateUrl: './ordem-compra.component.html',
  styleUrls: ['./ordem-compra.component.css'],
  providers: [ OrdemCompraService ]
})
export class OrdemCompraComponent implements OnInit {

  public formulario: FormGroup = new FormGroup({
    endereco: new FormControl(null, [Validators.required, Validators.minLength(3), Validators.maxLength(120)]),
    numero: new FormControl(null, [Validators.required, Validators.minLength(1), Validators.maxLength(20)]),
    complemento: new FormControl(null),
    formaPagamento: new FormControl(null, [Validators.required])
  })

  public idPedido: number
  public itensSelecionados: ItemCarrinho[];

  constructor(
    private ordemCompraService: OrdemCompraService,
    private carrinhoService: CarrinhoService
    ) { }

  ngOnInit() {
    this.itensSelecionados = this.carrinhoService.itens;
  }

  public confirmarCompra(): void {
    if (this.formulario.invalid){
      this.formulario.markAllAsTouched()
    }else {

      if (this.carrinhoService.exibirItens().length === 0){
        alert('Você não selecionou nenhum item. Para confirmar o pedido, por favor, selecione um item!')

      } else {

        let pedido = new Pedido(this.formulario.value.endereco, this.formulario.value.numero, this.formulario.value.complemento,
          this.formulario.value.formaPagamento, this.carrinhoService.exibirItens())

        this.ordemCompraService.efetivarCompra(pedido)
          .subscribe((res: any) => {
            this.idPedido = res.id
            this.carrinhoService.limpaCarrinho()
          })
      }
    }
  }

  public increment(itemId: number){
    this.carrinhoService.incrementQuantity(itemId)
  }

  public decrement(item: ItemCarrinho){
    this.carrinhoService.decrementQuantity(item)
    console.log('PASSOU')
  }

  onZerarId() {
    this.idPedido = undefined
  }
}
