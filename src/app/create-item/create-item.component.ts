import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-create-item',
  templateUrl: './create-item.component.html',
  styleUrls: ['./create-item.component.css']
})
export class CreateItemComponent implements OnInit {

  itemForm: FormGroup;
  loading = false;
  isSubmitted  =  false;
  // endTime = new Date();
  returnUrl: string;
  error = '';

  constructor( private formBuilder: FormBuilder,
               // private authService: AuthService,
               private route: ActivatedRoute,
               private router: Router) { }


  ngOnInit() {
    this.itemForm = this.formBuilder.group({
      name : ['', Validators.required],
      price : ['', Validators.required],
      description: new FormControl(),
      category: new FormControl(),
      itemImage: new FormControl(),
      property: new FormControl()
    });

    // get return url from route parameters or default to '/'
    this.returnUrl = this.route.snapshot.queryParams.returnUrl || '/';
  }

  onSubmit() {
    console.log(this.itemForm.value);
  }
}
