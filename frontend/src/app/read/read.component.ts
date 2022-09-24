import { Component, Inject, inject, OnInit } from '@angular/core';
import { ApiserviceService } from '../apiservice.service';
import { DOCUMENT } from '@angular/common';

@Component({
  selector: 'app-read',
  templateUrl: './read.component.html',
  styleUrls: ['./read.component.css']
})
export class ReadComponent implements OnInit {

  constructor(private service:ApiserviceService,@Inject(DOCUMENT) private document:Document) { }

  readData:any;
  successmsg:any;

  ngOnInit(): void {
   this.getAllData();
  }

  //getAllData
  getAllData(){
    this.service.getAllData().subscribe((res:any)=>{
      console.log(res.data,"res==>")
      this.readData = res.data;
    })
  }
   //getDeleteId
   deleteID(id:any){
    console.log(id,`deleteid=>`);
    this.service.deleteData(id).subscribe((res:any)=>{
     console.log(res,"deleteres==>");
     this.getAllData();
     this.successmsg = res.message;
     this.document.location.reload();
    })
   }
}
