import { Component, OnInit } from '@angular/core';
import { BlogCardService } from './Service/blog-card.service';

@Component({
  selector: 'app-blog',
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.css'],
})
export class BlogComponent implements OnInit {
  navLinks: any[] = [
    { title: 'All blogs', link: '' },
    { title: 'View profile', link: '' },
  ];
  constructor(private blogService: BlogCardService) {}
  ngOnInit(): void {
    //this.blogService.isDataPresent();
    if (!this.blogService.isDataPresent()) {
      this.blogService.setCardData();
    }
  }
}
