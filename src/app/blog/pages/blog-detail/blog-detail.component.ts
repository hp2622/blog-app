import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BlogCardService } from '../../Service/blog-card.service';

@Component({
  selector: 'app-blog-detail',
  templateUrl: './blog-detail.component.html',
  styleUrls: ['./blog-detail.component.css'],
})
export class BlogDetailComponent implements OnInit {
  blogId!: number;
  blogData: any;
  constructor(
    private router: ActivatedRoute,
    private blogService: BlogCardService
  ) {}

  ngOnInit(): void {
    this.router.params.subscribe((res) => {
      this.blogId = +res['id'];
    });
    this.blogData = this.blogService.getBlogDataById(this.blogId);
  }
}
