import { Component, OnInit, ElementRef, OnChanges } from '@angular/core';

import {CollectionsService} from '@app/shared/services/collections.service';
import { Word } from '@app/shared/classes/word';

import * as D3 from 'd3';

@Component({
  selector: 'app-scatterplot',
  templateUrl: './scatterplot.component.html',
  styleUrls: ['./scatterplot.component.css']
})
export class ScatterplotComponent implements OnInit, OnChanges {
  private data: Array<Word> = []
  private margin:{top:number,right:number,bottom:number,left:number} = {top: 50, right: 50, bottom: 50, left: 50}
  
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

  ngOnChanges(){

  }

  setup(){
    // this.width = document.querySelector('#word_scatterplot_card').clientWidth - this.margin.left - this.margin.right;
    // this.height = document.querySelector('#word_scatterplot_card').clientWidth - this.margin.bottom - this.margin.top;
    this.width = 500;
    this.height = 500;
    this.xScale =  D3.scaleLinear().range([0, this.width]);
    this.yScale = D3.scaleLinear().range([this.height,0]);
    // this.zScale = D3.scaleLinear().range([2,15]);
  }

  buildSVG(){
    D3.select('#word_scatterplot_svg').remove();
    D3.select('.tooltip').remove();
    let selector = D3.select('#word_scatterplot_card')
    this.svg = selector.append('svg')
        .attr('viewBox', "0 0 600 600")
        .attr('width', this.width + this.margin.left + this.margin.right)
        .attr('height',this.height + this.margin.top + this.margin.bottom)
        .attr('id','word_scatterplot_svg')
        .append('g')
        // .attr('transform','translate(' + this.margin.left + ',' + this.margin.top + ')');
  }

  drawXAxis() {
    this.xAxis = D3.axisBottom(this.xScale)
        .ticks(5)
        .tickPadding(15);
    this.svg.append('g')
        .attr('class','x axis')
        .attr('transform','translate(0,' + (this.height/2 - this.margin.top + 5) + ')')
        .call(this.xAxis)
        .append('text')
            .attr('class','lablel')
            .attr('x',this.width)
            .attr('y',-6)
            .style('text-anchor','end')
            .style('fill','grey')
            .text('')
}

drawYAxis() {
    this.xAxis = D3.axisLeft(this.yScale)
        .ticks(5)
        .tickPadding(15);
    this.svg.append('g')
        .attr('class','y axis')
        .attr("transform", "translate(" + (this.width/2 - this.margin.right -11) + "," + 0 + ")")
        .call(this.xAxis)
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
      .style('opacity',0)
      .style('position','absolute')
      .style('display','flex')
      .style('flex-direction','column')

  let classRef = this;
  if (this.data){
      this.xScale.domain([this.getMinX(),this.getMaxX()]);
      this.yScale.domain([this.getMinY(),this.getMaxY()]);
      // this.zScale.domain([0,this.getMaxZ()]);
      this.svg.append('g').selectAll('.dot')
          .attr('class','dataElements')
          .data(this.data)
          .enter().append('circle')
              .attr('class','dot')
              .attr('r', (d) => 1)
              .attr('cx', (d) => classRef.xScale(d['x']))
              .attr('cy', (d) => classRef.yScale(d['y']))
              .style('fill','blue')
              .style('opacity',0.4)
              // .style('cursor','pointer')
              .on('mouseover', (d) => {
                  // D3.select(this).style('fill','orange') This does not work I dont know why TS is fucking with me
                  //  tooltip.transition()
                  //     .duration(1)
                  //     .style('opacity',0.9);
                    D3.select('.tooltip').style('opacity',0.9);
                    D3.select('.tooltip').html(
                      '<mat-card-title class:"mat-card-title"> <b>'  +  d['word'] + '</b> </mat-card-title>' +
                      'exemplar: ' + d['exemplar'] +'<br>' +
                      'C: ' + d['C']+'<br>' +
                      'Sigma: ' + d['sigma_nor']+'<br>')
                        .style("left", (d.x) + "px")		
                        .style("top", (d.y) + "px");
              })
              // .on('mouseout', (d) => tooltip.transition()
              //                             .duration(1)
              //                             .style('opacity',0)
              // )
  }
}


  // drawScatterPlot(){
	// 		// Define the div for the tooltip
	// 		let div = d3.select("body").append("div")	
	// 			.attr("class", "tooltip")				
	// 			.style("opacity", 0);

	// 		//Prepare Data
	// 		this.yValues = d3.entries(collection_words['y2D'])
	// 		words = d3.entries(collection_words['word'])
	// 		// weights = d3.entries(collection_words['C'])


	// 		// set the scales
	// 		var xScale = d3.scaleLinear().range([0, this.width]);
	// 		var yScale = d3.scaleLinear().range([this.height, 0]);
	// 		var circleOpacityScale = d3.scaleLinear().range([0.1, 1]);
			
	// 		//Prepare domains
	// 		// xScale.domain([d3.min(xValues, function(d) { return d.value; }), d3.max(xValues, function(d) { return d.value; })])
	// 		// yScale.domain([d3.min(yValues, function(d) { return d.value; }), d3.max(yValues, function(d) { return d.value; })])
	// 		// circleOpacityScale.domain([d3.min(weights, function(d) { return d.value; }), d3.max(weights, function(d) { return d.value; })])

	// 	// 1. Add the SVG to the page and employ #2
	// 	var svg = d3.select("body").append("svg")
	// 			.attr("width", this.width + this.margin.left + this.margin.right)
	// 			.attr("height", this.height + this.margin.top + this.margin.bottom)
	// 		.append("g")
	// 			.attr("transform", "translate(" + this.margin.left + "," + this.margin.top + ")");

	// 		// 3. Call the x axis in a group tag
	// 		svg.append("g")
	// 			.attr("class", "x axis")
	// 			.attr("transform", "translate(0," + this.height + ")")
	// 			.call(d3.axisBottom(xScale)) // Create an axis component with d3.axisBottom
	// 			.selectAll("text")
	// 			.style("text-anchor", "end")
  //     			.attr("dx", "-.8em")
  //     			.attr("dy", (d,i) => { 
	// 				// if (num_years === 0) {
	// 					return this.width/2 + "px";
	// 				// }else{
	// 					// return (width/num_years)/2 + "px"
	// 				})
	//   			.attr("transform", "rotate(-90)" )

	// 		// 4. Call the y axis in a group tag
	// 		svg.append("g")
	// 			.attr("class", "y axis")
	// 			.call(d3.axisLeft(yScale)
	// 					// .tickFormat((e:number) =>{
	// 					// 	if(Math.floor(e) === e)
	// 					// 	{
	// 					// 		return e;
	// 					// 	}
	// 					// })
	// 			); // Create an axis component with d3.axisLeft

	// 		// 12. Appends a circle for each datapoint 
	// 		// svg.append("g")
	// 		// 	.attr("class", "circles")
	// 		// 	.selectAll(".bar")
	// 		// 	.data(words)
	// 		// 	.enter().append("circle") // Uses the enter().append() method
	// 		// 		.attr("class", "circle") // Assign a class for styling
	// 		// 		.attr("cx", function(d,i) { 
	// 		// 			return xScale(xValues[i].value)})
	// 		// 		.attr("cy", function(d,i) { 
	// 		// 			return yScale(yValues[i].value) })
	// 		// 		.attr("r", function(d) { return 5; })
	// 		// 		.attr("fill-opacity",function(d,i) { return circleOpacityScale(weights[i].value); })
	// 		// 		.on("mouseover", function(d) {		
	// 		// 			div.transition()		
	// 		// 				.duration(200)		
	// 		// 				.style("opacity", .9);		
	// 		// 			div	.html(d.value)	
	// 		// 				.style("left", (d3.event.pageX) + "px")		
	// 		// 				.style("top", (d3.event.pageY - 28) + "px");	
	// 		// 			})			
	// 	// }
  // }

}
