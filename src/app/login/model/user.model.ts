export class userModel {

  public id: string | undefined;
  public tipo:string;
  public nome: string;
  public email: string;
  public password:string;

  constructor(id: string | undefined,tipo:string, nome: string, email: string, password:string) {
      this.id = id;
      this.tipo = tipo;
      this.nome = nome;
      this.email = email;
      this.password = password;
  }

}

export class userLogar {
  public email: string;
  public password:string;

  constructor(email: string, password:string) {
    this.email = email;
    this.password = password;
}
}
