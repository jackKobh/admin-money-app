import { AlertTypeMessage } from "../types/types";
import { ElementAlertModel } from "./elementAlert.model";


export interface AlertConfigModel {
    type: AlertTypeMessage;
    tittle:string;
	subtitle:string;
	amount?: number;
    fee?: number;
    buttonText: string;
    buttonRedirectUrl?: string;
    optionalElements?: ElementAlertModel[];
}