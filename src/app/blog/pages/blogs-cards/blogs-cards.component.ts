import { ChangeDetectionStrategy } from '@angular/compiler';
import {
  AfterViewChecked,
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  OnInit,
  ViewChild,
} from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import {
  BehaviorSubject,
  Observable,
  Subject,
  debounceTime,
  takeUntil,
} from 'rxjs';
import { BlogCardService } from '../../Service/blog-card.service';
import { FormControl } from '@angular/forms';
import { ConfirmBoxService } from '../../shared/service/confirm-box/confirm-box.service';
import { ToastrService } from 'ngx-toastr';
import { BlogStaticMessage } from '../../shared/static/blogResponseMessage';

@Component({
  selector: 'app-blogs-cards',
  templateUrl: './blogs-cards.component.html',
  styleUrls: ['./blogs-cards.component.css'],
})
export class BlogsCardsComponent implements OnInit, AfterViewInit {
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  cardObservableData!: Observable<any>;
  searchControl = new FormControl();
  private searchInputValue = new Subject<string>();
  dataSource: MatTableDataSource<any> = new MatTableDataSource<any>(
    this.blogService.getCardData()
  );
  constructor(
    private changeDetector: ChangeDetectorRef,
    private blogService: BlogCardService,
    private confirmBox: ConfirmBoxService,
    private toaster: ToastrService
  ) {}

  ngOnInit(): void {
    this.blogService.getCardData();
    // console.log(abc);

    this.cardObservableData = this.dataSource.connect();
    //console.log(this.cardObservableData);

    // debounce function use for searching after some time
    this.searchInputValue
      .pipe(
        debounceTime(1000) // Adjust the debounce time as needed
      )
      .subscribe((value) => {
        this.dataSource.filter = value.trim().toLowerCase();
      });
    // console.log('cards');
  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
    this.changeDetector.detectChanges();
  }

  //function for searching
  search(value: string) {
    this.searchInputValue.next(value);
  }

  // delete blog data from its id
  deleteBlog(id: number) {
    // console.log(id);
    this.confirmBox
      .openConfirmDialogue(BlogStaticMessage.BlogDeleteConfirmation)
      .afterClosed()
      .subscribe((res) => {
        if (res == true) {
          let deletedOrNot = this.blogService.deleteBlog(id);
          if (deletedOrNot) {
            this.dataSource = new MatTableDataSource<any>(
              this.blogService.getCardData()
            );
            this.cardObservableData = this.dataSource.connect();
            this.toaster.success(BlogStaticMessage.BlogDeleted);
            this.ngAfterViewInit();
          } else {
            this.toaster.error(BlogStaticMessage.SomethingWentWrong);
          }
        } else {
          this.toaster.warning(BlogStaticMessage.NoBlogDeleted);
        }
      });
  }
}
