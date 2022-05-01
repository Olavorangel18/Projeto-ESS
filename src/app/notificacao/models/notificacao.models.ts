export class notificacaoModel {

  public id:string;
  public idEmpresa:string;
  public idUsuario:string;
  public assunto:string;
  public titulo:string;
  public mensagem:string

  constructor(id:string,idEmpresa: string,idUsuario:string, assunto: string, titulo: string, mensagem:string) {

    this.id = id
    this.idEmpresa = idEmpresa
    this.idUsuario = idUsuario
    this.assunto = assunto
    this.titulo = titulo
    this.mensagem = mensagem

  }

}
