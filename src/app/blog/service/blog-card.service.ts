import { JsonPipe } from '@angular/common';
import { Injectable, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { BlogInitialData } from '../shared/static/initialData';

@Injectable({
  providedIn: 'root',
})
export class BlogCardService {
  cardData: any = BlogInitialData;

  constructor() {}

  //set card data to local storage Initially
  setCardData() {
    let cardData = JSON.stringify(this.cardData);
    localStorage.setItem('Blogs', cardData);
    localStorage.setItem('isDataPresent', 'present');
  }

  //function for checking if data already present in local when we refresh website
  isDataPresent(): boolean {
    if (localStorage.getItem('isDataPresent') == 'present') {
      return true;
    } else {
      return false;
    }
  }

  //get card data from local storage
  getCardData(): any {
    const Data = localStorage.getItem('Blogs');
    return JSON.parse(Data!);
  }

  //get blog data from its id
  getBlogDataById(id: number) {
    const AllBlogs = localStorage.getItem('Blogs');
    const blogObj = JSON.parse(AllBlogs!);

    let blogData = blogObj.find((item: any) => {
      return item.id == id;
    });
    return blogData;
  }

  //add new blog
  addNewBlogData(newBlogData: any): boolean {
    let ExistingData = JSON.parse(localStorage.getItem('Blogs')!);
    if (ExistingData.length == 0) {
      newBlogData.id = 1;
    } else {
      let latestBlogId = ExistingData[ExistingData.length - 1].id + 1;
      newBlogData.id = latestBlogId;
    }
    ExistingData.push(newBlogData);
    let newCardAddedData = JSON.stringify(ExistingData);
    localStorage.setItem('Blogs', newCardAddedData);
    return true;
  }

  //edit blog data from it's id
  editBlogData(editedBlogData: any): boolean {
    const Data = localStorage.getItem('Blogs');
    const existingBlogData = JSON.parse(Data!);
    const indexOfObjectToReplace = existingBlogData.findIndex(
      (obj: any) => obj.id === editedBlogData.id
    );
    if (indexOfObjectToReplace !== -1) {
      existingBlogData[indexOfObjectToReplace] = editedBlogData;
      let cardData = JSON.stringify(existingBlogData);
      localStorage.setItem('Blogs', cardData);
      return true;
    } else {
      return false;
    }
  }

  //delete blog data from local storage
  deleteBlog(id: number): boolean {
    const Data = localStorage.getItem('Blogs');
    const existingBlogData = JSON.parse(Data!);
    const newArrayAfterDelete = existingBlogData.filter(
      (item: any) => item.id !== id
    );
    let cardData = JSON.stringify(newArrayAfterDelete);
    localStorage.setItem('Blogs', cardData);
    return true;
  }
}
