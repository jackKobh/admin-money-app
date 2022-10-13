
import { AlertTypeElement } from "../types/types";
import { TextConfigModel } from "./textconfig.model";

export interface ElementAlertModel {
    type: AlertTypeElement;
    text: TextConfigModel[];
    url?: string;
}