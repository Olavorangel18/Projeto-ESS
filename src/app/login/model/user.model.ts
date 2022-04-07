import { empresaModel } from './../../meu-cadastro/models/empresa.model';
import { pessoaModel } from "src/app/meu-cadastro/models/pessoa.model";

export class userModel {

  public id: string | undefined;
  public tipo:string;
  public nome: string;
  public email: string;
  public password:string;
  public cadastroPessoa: pessoaModel | string;
  public cadastroEmpresa: empresaModel | string;

  constructor(id: string | undefined,tipo:string, nome: string, email: string, password:string, cadastroPessoa:pessoaModel|string, cadastroEmpresa:empresaModel|string) {
      this.id = id;
      this.tipo = tipo;
      this.nome = nome;
      this.email = email;
      this.password = password;
      this.cadastroPessoa = cadastroPessoa;
      this.cadastroEmpresa = cadastroEmpresa;
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
