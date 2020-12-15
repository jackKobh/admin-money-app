export type ValidMovementType = 'ingreso' | 'egreso';

export class Movement {

  constructor(
    public descripcion: string,
    public monto:number,
    public tipo: ValidMovementType,
    public uid:string = '',
  ){}
}
