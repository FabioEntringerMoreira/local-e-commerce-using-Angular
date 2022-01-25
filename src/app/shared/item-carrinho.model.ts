class ItemCarrinho {
  constructor(
    public id: number,
    public img: object,
    public titulo: string,
    public descricao: string,
    public valor: number,
    public quantidade: number
  ) {
  }
}

export {ItemCarrinho};
