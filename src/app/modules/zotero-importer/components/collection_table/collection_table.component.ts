import {Component, OnInit, ViewChild, Input, OnChanges, SimpleChanges,SimpleChange} from '@angular/core';
import {MatPaginator, MatSort, MatTableDataSource} from '@angular/material';
import { SelectionModel } from '@angular/cdk/collections';

import {CollectionsService} from '@app/shared/services/collections.service';
import { Collection_Item } from '@app/shared/classes/collections';




@Component({
    selector: 'app-collection_table',
    templateUrl: './collection_table.component.html',
    styleUrls: ['./collection_table.component.css'],
    providers: []
  })

export class CollectionTableComponent implements OnInit {
  private data: Array<Collection_Item> = []
  private displayedColumns: string[] = ['select','key', 'name','parentCollection'];
  private dataSource: MatTableDataSource<Collection_Item>;
  private selection: SelectionModel<Collection_Item>;
  public selected_collections: Array<Collection_Item>

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(private collectionsService:CollectionsService) {  }

  ngOnInit() {
    const initialSelection = []
    const allowMultiSelect = true;
    this.selection = new SelectionModel<Collection_Item>(allowMultiSelect,initialSelection);
    //Fetch data
    this.data = this.collectionsService.getCollections();
    this.dataSource = new MatTableDataSource(this.data);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    //Subscribe to collection service
    this.collectionsService.collections.subscribe(newData =>{
      this.data = newData;
      this.dataSource = new MatTableDataSource(this.data);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    })
    //Subscribe to active Collections
    this.collectionsService.active_collections.subscribe(newData =>{
      this.selected_collections = newData;
    })
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

  //Open Papers in that Collection
  onClick(){
    console.log(this.selected_collections);
    this.collectionsService.active_collections.next(this.selection.selected)
  }
}
