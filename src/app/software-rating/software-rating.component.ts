import {Component, OnInit} from '@angular/core';
import {RatingService} from '../rating.service';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-software-rating',
  templateUrl: './software-rating.component.html',
  styleUrls: ['./software-rating.component.css']
})
export class SoftwareRatingComponent implements OnInit {

  invoiceid :string;

  constructor(
    private rating: RatingService,
    private route: ActivatedRoute,
    private router : Router
  ) { }

  ngOnInit(): void {
    this.invoiceid= this.route.snapshot.paramMap.get("invoiceid")
  }

  submitRating(number: number ) {
    if(this.invoiceid != undefined){
      this.rating.submitRating(number, this.invoiceid).subscribe(data => {
        localStorage.removeItem('table');
        this.router.navigate(["/table"]);
      })
    } else {
      console.log("complete order to submit rating")
    }

  }


}
