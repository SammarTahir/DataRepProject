import { Component, OnInit } from '@angular/core';
import { NgForm } from "@angular/forms";
import {PostService} from '../services/post.service';

@Component({
  selector: 'app-post-create',
  templateUrl: './post-create.component.html',
  styleUrls: ['./post-create.component.css']
})
export class PostCreateComponent implements OnInit {

  constructor(private service:PostService) { }

  onAddPost(form: NgForm) {

    this.service.addPost(form.value.firstname, form.value.surname, form.value.number, form.value.job, form.value.website).subscribe();
    
    console.log(form.value);
    form.resetForm();
  }
  
  ngOnInit() {

  }

}
