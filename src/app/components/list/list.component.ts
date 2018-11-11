import {Component, OnInit, ViewChild, Input, OnChanges, SimpleChanges,SimpleChange} from '@angular/core';
import {MatPaginator, MatSort, MatTableDataSource} from '@angular/material';

// import {DataService} from '@app/services/data.service';
import {CollectionsService} from '@app/services/collections.service';
import { Collection_Item } from '@app/classes/collections';

export interface CollectionData {
  key: string;
  name: string;
}

@Component({
    selector: 'app-list',
    templateUrl: './list.component.html',
    styleUrls: ['./list.component.css'],
    providers: [CollectionsService]
  })

  export class ListComponent implements OnInit {
  private data: Array<Collection_Item> = []
  private displayedColumns: string[] = ['key', 'name','parentCollection'];
  private dataSource: MatTableDataSource<CollectionData>;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(private collectionsService:CollectionsService) {  }

  ngOnInit() {
    //Subscribe to collection service
    this.collectionsService.collections.subscribe(newData =>{
      this.data = newData;
      this.dataSource = new MatTableDataSource(this.data);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    })
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
}
