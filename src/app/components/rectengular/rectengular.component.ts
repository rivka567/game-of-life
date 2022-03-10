import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-rectengular',
  templateUrl: './rectengular.component.html',
  styleUrls: ['./rectengular.component.css']
})
export class RectengularComponent implements OnInit {
  public mat:any;
  public refSet:any;

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

   //this.mat=undefined;
    this.mat= new Array(size)

    for(let i=0; i<this.mat.length;i++)
      this.mat[i]=new Array(size)

    let num=0 ,ranRow , ranCol
    let chooseSeed= this.chooseSeed(seed,size)

    //initialize cells randomly
      while(num<chooseSeed)
      {
        ranRow= Math.floor((Math.random() * size));
        ranCol=Math.floor((Math.random() * size));

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
              ranRow= Math.floor((Math.random() * size));
              ranCol=Math.floor((Math.random() * size)); 

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

 

 public changeMat(size:number,speed:string)
  {

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
          if(count<2 || count>3)
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

     else
       return 

  }

  speedGame(value:any,size:string)
  {

    let chooseSpeed=this.chooseSpeed(value)
        this.refSet= setInterval(() => {

        if(value!='stop')
          this.changeMat((Number(size)),value)
        
        }, chooseSpeed  );         
    
  }

  stopInterval()
  {
    clearInterval(this.refSet);    
  }

  startGame(size:string,seed:string,speed:string)
  {  
    clearInterval(this.refSet);
    this.initMat(Number(size),seed)
    this.speedGame(speed,size)
  }


}
