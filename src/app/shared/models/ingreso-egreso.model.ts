import { IngreoEgresoInterface } from '../interfaces/ingreso-egreso.interface';
export class IngresoEgresoModel implements IngreoEgresoInterface {
    description: string;
    monto: number;
    tipo: string;
    uid?: string;
    id?: string;

    constructor(data?: IngreoEgresoInterface) {
        this.description = data?.description;
        this.monto = data?.monto;
        this.tipo = data?.tipo;
        this.uid = data?.uid;
        this.id = data?.id || null;
    }
}
