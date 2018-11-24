import { Component, OnInit } from '@angular/core';
import { PostService } from '../services/post.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { Post } from '../post.model';
import { NgForm } from "@angular/forms";
@Component({
  selector: 'app-post-view',
  templateUrl: './post-view.component.html',
  styleUrls: ['./post-view.component.css']
})
export class PostViewComponent implements OnInit {

  constructor(private router: Router, private route: ActivatedRoute, private ps: PostService) { }
  post: any = [];
  ngOnInit() {
    console.log(this.route.snapshot.params['id']);
    this.ps.getPost(this.route.snapshot.params['id']).subscribe(data => {
      this.post = data;
    })
  }
  onEditPost(form: NgForm) {
    this.ps.updatePost(this.post[0]._id, form.value.firstname, form.value.surname, form.value.number, form.value.job, form.value.website).subscribe();
    this.router.navigate(['/list']);
  }

}