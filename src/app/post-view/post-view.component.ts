import { Component, OnInit } from '@angular/core';
import { PostService } from '../services/post.service';
import { Observable } from 'rxjs';
import { Post } from '../post.model';
@Component({
  selector: 'app-post-view',
  templateUrl: './post-view.component.html',
  styleUrls: ['./post-view.component.css']
})
export class PostViewComponent implements OnInit {

  posts: any = [];

  constructor(private ps: PostService) { }

  ngOnInit() {
    this.ps.getPostsData().subscribe(data => {
      this.posts = data;
    });
  }

}


