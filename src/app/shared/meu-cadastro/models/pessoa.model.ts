export class pessoaModel {

  public cpf:string;
  public escolaridade:string;
  public salario:string;
  public area:string;
  public senioridade:string;

  constructor(escolaridade: string,salario:string, area: string, senioridade: string, cpf:string) {

    this.cpf = cpf
    this.escolaridade = escolaridade
    this.salario = salario
    this.area = area
    this.senioridade = senioridade

  }

}
