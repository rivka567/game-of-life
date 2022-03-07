import { analyzeFileForInjectables, ElementSchemaRegistry } from '@angular/compiler';
import { isExpressionFactoryMetadata } from '@angular/compiler/src/render3/r3_factory';
import { newArray } from '@angular/compiler/src/util';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {


  public mat:any;
  public speed:string='';



  constructor() { }

  ngOnInit(): void {

  }

  chooseSeed(seed:string,size:number)
  {
   
    if(seed=='low')
     return  ((size*size)/10)
    
    else if(seed=='medium')
     return ((size*size)/10)*3
     
    else
     return ((size*size)/2)
     
  }

  initMat(size:number,seed:string)
  {

    this.mat= new Array(size)

    for(let i=0; i<this.mat.length;i++)
      this.mat[i]=new Array(size)

    let num=0 ,ranRow , ranCol
    let chooseSeed= this.chooseSeed(seed,size)

    //initialize cells randomly
      while(num<chooseSeed)
      {
        ranRow= Math.floor((Math.random() * 10));
        ranCol=Math.floor((Math.random() * 10));

        let check=0

        //chech if the cell is live
        while(check!=1)
        {

          //if the cell is died
             if(this.mat[ranRow][ranCol]!=1)
            {
              this.mat[ranRow][ranCol]=1
              check=1
            }

             //if the cell is live random again
            else{
              ranRow= Math.floor((Math.random() * 10));
              ranCol=Math.floor((Math.random() * 10)); 

            }               
        }
        num++
      }

  }

  checkNeighbours(row:number,col:number,size:number)
  {
    let count=0;

  //left top  
  if(row==0 && col==0)
  {
    this.mat[row][col+1]==1 ? count++ : count
    this.mat[row+1][col]==1 ? count++ : count
    this.mat[row+1][col+1]==1 ? count++ : count
  }

  //right top
  else if(row==0 && col==(size-1))
  {
    this.mat[row][col-1]==1 ? count++ : count
    this.mat[row+1][col-1]==1 ? count++ : count
    this.mat[row+1][col]==1 ? count++ : count
  }

  //left bottom
  else if(col==0 && row==(size-1))
  {
    this.mat[row-1][col]==1 ? count++ : count
    this.mat[row-1][col+1]==1 ? count++ : count
    this.mat[row][col+1]==1 ? count++ : count
  }

  //right bottom
  else if(row==(size-1) && col==(size-1))
  {
    this.mat[row-1][col-1]==1 ? count++ : count
    this.mat[row-1][col]==1 ? count++ : count
    this.mat[row][col-1]==1 ? count++ : count
  }

  // first row does not include the first and last cell
  else if(row==0)
  {
    this.mat[row][col-1]==1 ? count++ : count
    this.mat[row][col+1]==1 ? count++ : count
    this.mat[row+1][col-1]==1 ? count++ : count
    this.mat[row+1][col]==1 ? count++ : count
    this.mat[row+1][col+1]==1 ? count++ : count
  }

  // first col does not include the first and last cell
  else if(col==0 )
  {
    this.mat[row-1][col]==1 ? count++ : count
    this.mat[row-1][col+1]==1 ? count++ : count
    this.mat[row][col+1]==1 ? count++ : count
    this.mat[row+1][col]==1 ? count++ : count
    this.mat[row+1][col+1]==1 ? count++ : count
  }

  // last line not include the first and last cell
  else if(row==(size-1))
  {
    this.mat[row-1][col-1]==1 ? count++ : count
    this.mat[row-1][col]==1 ? count++ : count
    this.mat[row-1][col+1]==1 ? count++ : count
    this.mat[row][col-1]==1 ? count++ : count
    this.mat[row][col+1]==1 ? count++ : count
  }

  // last col not include the first and last cell
  else if(col==(size-1))
  {
    this.mat[row-1][col-1]==1 ? count++ : count
    this.mat[row-1][col]==1 ? count++ : count
    this.mat[row][col-1]==1 ? count++ : count
    this.mat[row+1][col-1]==1 ? count++ : count
    this.mat[row+1][col]==1 ? count++ : count
  }

  else
  {
    this.mat[row-1][col-1]==1 ? count++ : count
    this.mat[row-1][col]==1 ? count++ : count
    this.mat[row-1][col+1]==1 ? count++ : count
    this.mat[row][col-1]==1 ? count++ : count
    this.mat[row][col+1]==1 ? count++ : count
    this.mat[row+1][col-1]==1 ? count++ : count
    this.mat[row+1][col]==1 ? count++ : count
    this.mat[row+1][col+1]==1 ? count++ : count

  }

    return count;
  }

 

 public changeMat(size:number)
  {
    console.log('hi');
    
    let newMat =this.mat

    for(let row=0; row<this.mat.length; row++)
      for(let col=0;col<this.mat.length; col++)
      {      
        let count;

      // check how many living cells are around it
         count= this.checkNeighbours(Number(row),col,Number(size))

      // check if the the cell is live
        if(this.mat[Number(row)][col]==1)
        {       

          // if there are not 2 or 3 live cells around is died
          if(count!=3 && count!=2)
          newMat[Number(row)][col]=0
        }

      // the cell is died
        else{

        // if there is 3 live cells around is live 
          if(count==3)
          newMat[Number(row)][col]=1
        }

      }

     this.mat=newMat
  }

  chooseSpeed(speed:string)
  {
    if(speed=='very-slow')
     return 2000;
    
     else if(speed=='slow')
     return 1000;

     else if(speed=='normal')
     return 500;

     else if(speed=='fast')
     return 200;

     else return 0


  }

  speedGame(value:any,size:string)
    {

    var refSet:any;

    let chooseSpeed= this.chooseSpeed(value)

    if(value!='stop')
    {
       refSet= setInterval(() => {
       (this.changeMat(Number(size))) }, chooseSpeed);

      //  clearInterval(refSet);
    }
    else
          clearInterval(refSet);
   
  }


  startGame(size:string,seed:string,speed:string)
  {

    this.initMat(Number(size),seed)
    this.speedGame(speed,size)

  }

 


}
