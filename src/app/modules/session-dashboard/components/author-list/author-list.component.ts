import { Component, ViewChild, OnInit } from '@angular/core';
import {MatPaginator, MatSort, MatTableDataSource} from '@angular/material';
import { SelectionModel } from '@angular/cdk/collections';

import {CollectionsService} from '@app/shared/services/collections.service';

import {Author} from '@app/shared/classes/author'

@Component({
  selector: 'app-author-list',
  templateUrl: './author-list.component.html',
  styleUrls: ['./author-list.component.css']
})
export class AuthorListComponent implements OnInit {

  private data: Array<Author> = []
  private displayedColumns: string[] = ['name','affiliation','citations', 'papers_in_collection'];
  private dataSource: MatTableDataSource<Author>;
  private selection: SelectionModel<Author>;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(private collectionsService:CollectionsService) { }

  ngOnInit() {
    const initialSelection = []
    const allowMultiSelect = true;
    this.selection = new SelectionModel<Author>(allowMultiSelect,initialSelection);
    //Fetch data
    this.data = this.collectionsService.getAuthorsInSession();
    this.dataSource = new MatTableDataSource(this.data);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    //Subscribe to paper in session service
    this.collectionsService.authors_in_session_updated.subscribe(newData =>{
      this.data = newData;
      this.dataSource = new MatTableDataSource(this.data);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    })
    // this.collectionsService.papers_in_session.next()
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  /** Whether the number of selected elements matches the total number of rows. */
  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected == numRows;
  }

  /** Selects all rows if they are not all selected; otherwise clear selection. */
  masterToggle() {
    this.isAllSelected() ?
        this.selection.clear() :
        this.dataSource.data.forEach(row => this.selection.select(row));
  }

}