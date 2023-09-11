import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BlogComponent } from './blog.component';
import { BlogsCardsComponent } from './pages/blogs-cards/blogs-cards.component';
import { AddEditBlogComponent } from './pages/add-edit-blog/add-edit-blog.component';
import { BlogDetailComponent } from './pages/blog-detail/blog-detail.component';

const routes: Routes = [
  {
    path: '',
    component: BlogComponent,
    children: [
      {
        path: '',
        component: BlogsCardsComponent,
      },
      {
        path: 'add',
        component: AddEditBlogComponent,
      },
      {
        path: 'edit/:id',
        component: AddEditBlogComponent,
      },
      {
        path: 'details/:id',
        component: BlogDetailComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class BlogRoutingModule {}
