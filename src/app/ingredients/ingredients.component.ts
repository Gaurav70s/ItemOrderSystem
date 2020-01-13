import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-ingredients',
  templateUrl: './ingredients.component.html',
  styleUrls: ['./ingredients.component.css']
})
export class IngredientsComponent implements OnInit {

  ingredientsForm: FormGroup;
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
    this.ingredientsForm = this.formBuilder.group({
      name : ['', Validators.required],
      image: new FormControl()
    });

    // get return url from route parameters or default to '/'
    this.returnUrl = this.route.snapshot.queryParams.returnUrl || '/';
  }

  onSubmit() {
    console.log(this.ingredientsForm.value);
  }

}
