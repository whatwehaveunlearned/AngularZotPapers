import { Component, OnInit, ElementRef, OnChanges } from '@angular/core';

import {CollectionsService} from '@app/shared/services/collections.service';
import { Word } from '@app/shared/classes/word';

import * as D3 from 'd3';

import * as D3Zoom from 'd3-zoom'

@Component({
  selector: 'app-scatterplot',
  templateUrl: './scatterplot.component.html',
  styleUrls: ['./scatterplot.component.css']
})
export class ScatterplotComponent implements OnInit {
  private data: Array<Word> = []
  private margin:{top:number,right:number,bottom:number,left:number} = {top: 25, right: 25, bottom: 25, left: 25}
  
  private width: number;  
  private height: number;
  private xScale:d3.ScaleLinear<number,number>;
  private yScale:d3.ScaleLinear<number,number>;
  private xAxis
  private yAxis
  private yValues 
  private xValues
  private host
  private svg
  private zoomSection
  private points

  constructor(private collectionsService:CollectionsService,private _element: ElementRef) { }

  ngOnInit() {
    //Fetch data
    this.data = this.collectionsService.getSessionWords();
    this.host = D3.select(this._element.nativeElement);
    //Subscribe
    this.collectionsService.words_in_session_updated.subscribe(newData =>{
      this.data = newData;
      if(this.data.length > 100){ //I do this to optimize a bit Its tough to draw on load.
        this.setup();
        this.buildSVG();
        this.populate();
        this.drawXAxis();
        this.drawYAxis();
      }
    })
  }

  resetZoom(){
    D3.select('#zoom_section')
      .attr('transform',"translate(0,0)scale(1)")
    D3.select('.x_axis').call(this.xAxis);
    D3.select('.y_axis').call(this.yAxis);
  }

  setup(){
    // this.width = document.querySelector('#word_scatterplot_card').clientWidth - this.margin.left - this.margin.right;
    // this.height = document.querySelector('#word_scatterplot_card').clientWidth - this.margin.bottom - this.margin.top;
    this.width = document.body.clientWidth/6 * 3;
    this.height = 900;
    this.xScale =  D3.scaleLinear().range([0, this.width]);
    this.yScale = D3.scaleLinear().range([this.height,0]);
    // this.zScale = D3.scaleLinear().range([2,15]);
  }

  buildSVG(){
    D3.select('#word_scatterplot_svg').remove();
    D3.select('.tooltip').remove();
    let selector = D3.select('#word_scatterplot_card')
    this.svg = selector.append('svg')
        .attr('viewBox', "0 0 " + this.width + " " + this.height)
        .attr('width', this.width + this.margin.left + this.margin.right)
        .attr('height',this.height + this.margin.top + this.margin.bottom)
        .attr('id','word_scatterplot_svg')
        .call(D3Zoom.zoom()
          .on("zoom",() => {
              this.axisZoom()
          }))
        // .append('g')
        // .attr('transform','translate(' + this.margin.left + ',' + this.margin.top + ')');
  }

  axisZoom(){
    let svgData = D3.select('#zoom_section')
              console.log(D3.event.transform)
              svgData.attr('transform',D3.event.transform)

              // create new scale ojects based on event
              var new_xScale = D3.event.transform.rescaleX(this.xScale);
              var new_yScale = D3.event.transform.rescaleY(this.yScale);
              // update axes
              D3.select('.x_axis').call(this.xAxis.scale(new_xScale));
              D3.select('.y_axis').call(this.yAxis.scale(new_yScale));
              this.points.data(this.data)
              .attr('cx', function(d) {return new_xScale(d.x)})
              .attr('cy', function(d) {return new_yScale(d.y)});
  }

  drawXAxis() {
    this.xAxis = D3.axisTop(this.xScale)
        .ticks(10)
        .tickPadding(15);
    this.svg.append('g')
        .attr('class','x_axis')
        .attr('transform','translate(0,' + (this.margin.top + 20) + ')')
        .call(this.xAxis)
        .append('text')
            .attr('class','lablel')
            .attr('x',this.width)
            // .attr('y',-6)
            .style('text-anchor','end')
            .style('fill','grey')
            .text('')
}

drawYAxis() {
    this.yAxis = D3.axisLeft(this.yScale)
        .ticks(10)
        .tickPadding(15);
    this.svg.append('g')
        .attr('class','y_axis')
        .attr("transform", "translate(" + (this.margin.left) + "," + 0 + ")")
        .call(this.yAxis)
        .append('text')
            .attr('class','lablel')
            .attr('transform', 'rotate(-90)')
            .attr('y',6)
            .attr('dy','.71em')
            .style('text-anchor','end')
            .style('fill','grey')
            .text('')
}

getMaxX() {
    let data_elements = [];
    if(this.data){
        this.data.forEach((input_data) => {
            data_elements.push(input_data['x']);
        });
        return D3.max(data_elements);
    }
}

getMinX() {
    let data_elements = [];
    if(this.data){
        this.data.forEach((input_data) => {
            data_elements.push(input_data['x']);
        });
        return D3.min(data_elements);
    }
}

getMaxY() {
    let data_elements = [];
    if(this.data){
        this.data.forEach((input_data) => {
            data_elements.push(input_data['y']);
        });
        return D3.max(data_elements);
    }
}

getMinY() {
    let data_elements = [];
    if(this.data){
        this.data.forEach((input_data) => {
            data_elements.push(input_data['y']);
        });
        return D3.min(data_elements);
    }
}

populate(){
  //Create Tooltip
  let tooltip = D3.select('#word_scatterplot_card').append('div')
      .attr('class','tooltip mat-card')
      .style('opacity',0.9)
      .style('position','absolute')
      .style('top',(this.height - this.margin.top - this.margin.bottom) + "px")
      .style('left',(this.width - this.margin.left - 4 * this.margin.right) + "px")
      .style('display','flex')
      .style('flex-direction','column')

  let classRef = this;
  if (this.data){
      this.xScale.domain([this.getMinX(),this.getMaxX()]);
      this.yScale.domain([this.getMinY(),this.getMaxY()]);
      // this.zScale.domain([0,this.getMaxZ()]);
      this.zoomSection = this.svg
          .append('g')
          .attr('id','zoom_section');
      this.points =this.zoomSection.selectAll('.dot')
          .attr('class','dataElements')
          .data(this.data)
          .enter().append('circle')
              .attr('class','dot')
              .attr('id', (d) => 'id_' + d['word'])
              .attr('r', (d) => 1)
              .attr('cx', (d) => classRef.xScale(d['x']))
              .attr('cy', (d) => classRef.yScale(d['y']))
              .style('fill','blue')
              .style('opacity',0.4)
              .style('cursor','pointer')
              .on('mouseover', (d) => {
                  // D3.select(this).style('fill','orange') This does not work I dont know why TS is fucking with me
                  //  tooltip.transition()
                  //     .duration(1)
                  //     .style('opacity',0.9);
                    // D3.select('.tooltip').style('opacity',0.9)
                                        // .style('left', D3.event.pageX + "px")
                                        // .style('top', D3.event.pageY + "px")
                    D3.select('.tooltip').html(
                      '<mat-card-title class:"mat-card-title"> <b>'  +  d['word'] + '</b> </mat-card-title>' +
                      'exemplar: ' + d['exemplar'] +'<br>' +
                      'C: ' + d['C']+'<br>' +
                      'Sigma: ' + d['sigma_nor']+'<br>')
                        // .style("left", (d.x) + "px")		
                        // .style("top", (d.y) + "px");
              })
            //   .on('mouseout', (d) => tooltip.transition()
            //                               .duration(1)
            //                               .style('opacity',0)
            //   )
  }
}

}
