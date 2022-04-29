import { vagaModel } from './../../criacao-vaga/models/vaga.models';
import { empresaModel } from './../../meu-cadastro/models/empresa.model';
import { pessoaModel } from "src/app/meu-cadastro/models/pessoa.model";

export class userModel {

  public id: string | undefined;
  public tipo:string;
  public nome: string;
  public email: string;
  public password:string;
  public cadastroPessoa: pessoaModel | undefined;
  public cadastroEmpresa: empresaModel | undefined;
  public candidatado:boolean;
  public vagas:any[];

  constructor(id: string | undefined,tipo:string, nome: string, email: string,
    password:string, cadastroPessoa:pessoaModel|undefined,
    cadastroEmpresa:empresaModel|undefined, candidatado:boolean,
    vagas:any[]) {
      this.id = id;
      this.tipo = tipo;
      this.nome = nome;
      this.email = email;
      this.password = password;
      this.cadastroPessoa = cadastroPessoa;
      this.cadastroEmpresa = cadastroEmpresa;
      this.candidatado = candidatado;
      this.vagas = vagas;
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

