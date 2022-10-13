import { fromEvent, fromEventPattern } from "rxjs";



export class StyleTools {

  static getResizeObserver(element: HTMLElement, event: string = 'resize') {
    return fromEvent(element, event)
  }

  static getBodySize(): number {
    return document.body.offsetHeight;
  }

  static getBodyWidth(): number {
      return document.body.offsetWidth;
  }


}
