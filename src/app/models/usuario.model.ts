import { uiReducer } from "../shared/ui.reducer";
import { PeriodicidadModel } from "./periodicidad.model";

export interface Usuario {


    uid: string | undefined;
    nombre: string;
    email: string | null | undefined;

    avatar?: string;

    periodicidad: PeriodicidadModel

}
