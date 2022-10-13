import { Component, Input, OnInit } from '@angular/core';
import { AbstractControl } from '@angular/forms';

@Component({
  selector: 'app-user-image',
  templateUrl: './user-image.component.html',
  styleUrls: ['./user-image.component.scss']
})
export class UserImageComponent implements OnInit {

    @Input() control:AbstractControl;

    @Input() url: string;
    defaultImage: string = '';

  constructor() { }

  ngOnInit(): void {
  }

}
