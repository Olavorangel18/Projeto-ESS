import { userModel } from "src/app/shared/login/model/user.model";
export class vagaModel {

  public id:string |undefined;
  public nome:string;
  public modalidade:string;
  public salario:string;
  public area:string;
  public descricao:string;
  public senioridade:string;
  public idEmpresa:string | undefined;
  public pessoas:any[];
  public cadastrado:boolean | String;

  constructor(id:string, nome:string, modalidade: string,salario:string, area: string,descricao:string,
    senioridade: string, idEmpresa:string|undefined, pessoas:any[], cadastrado:boolean|String) {
    this.id=id
    this.nome = nome
    this.modalidade = modalidade
    this.salario = salario
    this.area = area
    this.descricao = descricao
    this.senioridade = senioridade
    this.idEmpresa = idEmpresa
    this.pessoas = pessoas
    this.cadastrado = cadastrado
  }

}

