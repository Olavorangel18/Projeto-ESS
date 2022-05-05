export class userLogadoModel {

  public id: string | undefined;
  public tipo:string;
  public nome: string;


  constructor(id: string | undefined,tipo:string, nome: string) {
      this.id = id;
      this.tipo = tipo;
      this.nome = nome;
  }

}
