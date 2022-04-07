export class empresaModel {

  public cnpj:string;
  public localizacao:string;
  public telefone:string;
  public tipoEmpresa:string;

  constructor(cnpj: string,localizacao:string, telefone: string, tipoEmpresa: string) {

    this.cnpj = cnpj
    this.localizacao = localizacao
    this.telefone = telefone
    this.tipoEmpresa = tipoEmpresa

  }

}
