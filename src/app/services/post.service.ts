import { Injectable, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Post } from '../post.model';

@Injectable({
  providedIn: 'root'
})
export class PostService {

  constructor(private http: HttpClient) { }

  getPostsData(): Observable<any> {
    return this.http.get("http://localhost:8081/api/posts");
  }

  private posts: Post[] = [];
  //private postsUpdated = new Subject<Post[]>();

  getPosts() {
    return [...this.posts];
  }

  addPost(firstname: string, surname: string, number: string, job: string, website: string): Observable<any> {
    const post: Post = { firstname: firstname, surname: surname, number: number, job: job, website: website };
    return this.http.post("http://localhost:8081/api/posts", post);
  }

  deletePost(id: String): Observable<any> {
    return this.http.delete("http://localhost:8081/api/posts/" + id);
  }

  getPost(id: string): Observable<any> {
    return this.http.get("http://localhost:8081/api/posts/" + id);
  }

  updatePost(id: string, firstname: string, surname: string, number: string, job: string, website: string): Observable<any> {
    const post: Post = { firstname: firstname, surname: surname, number: number, job: job, website: website };
    return this.http.put("http://localhost:8081/api/posts/" + id, post);
  }
}
