studentedithttpcomponent.ts:
-----------------------------
import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { StudentHttpService } from 'src/app/student/student-http.service';
import { Studt } from 'src/app/studn';

@Component({
  selector: 'app-student-edit-http',
  templateUrl: './student-edit-http.component.html',
  styleUrls: ['./student-edit-http.component.css']
})
export class StudentEditHttpComponent implements OnInit {
  
  fetchedStudent :Studt={
    id:0,
    studName:'',
    studTotalMarks:0,
    studDob:new Date(),
    studGender:''
    }   
  
  myReactiveForm:FormGroup=new FormGroup({
    rsId:new FormControl(),
    rsName:new FormControl('',[Validators.required,this.onlyText]),
    rsMarks:new FormControl('',Validators.required),
    rsDob:new FormControl('',Validators.required),
    rsGender:new FormControl()
  });
  constructor(private router:Router, 
              private activatedRoute:ActivatedRoute,
              private studentHttpService:StudentHttpService ) { }

  ngOnInit(): void {
    let studId=this.activatedRoute.snapshot.paramMap.get('sid');
    if(studId!=null)
    this.studentHttpService.getAStudent(studId).subscribe({
      next:(response)=>{
        this.fetchedStudent=response;
      this.myReactiveForm.setValue({
        rsId:this.fetchedStudent.id,
        rsName:this.fetchedStudent.studName,
        rsMarks:this.fetchedStudent.studTotalMarks,
        rsDob:this.fetchedStudent.studDob,
        rsGender:this.fetchedStudent.studGender
      })},
      error:(err)=>console.log(err)
 })    

  }
  editStudent(){
   console.log(this.myReactiveForm);
   let updatStudent:Studt={
    id:this.myReactiveForm.value.rsId,
    studName:this.myReactiveForm.value.rsName,
    studTotalMarks:this.myReactiveForm.value.rsMarks,
    studDob:this.myReactiveForm.value.rsDob,
    studGender:this.myReactiveForm.value.rsGender
  }
//send this student object to backend through the service to get added to databse
  this.studentHttpService.updateStudent(updatStudent).subscribe({
    next:(response)=>{this.router.navigate(['studentlist']),
                      console.log(response)},
    error:(err)=>{console.log(err)}
    
  })
  }
}


-----------------------------------
studentedithttpcomponent.html:
--------------------------------

<div class="container">
    <form [formGroup]="myReactiveForm" (ngSubmit)="editStudent()">
        <div class="card">
            <div class="card-header bg-warning text-white">
                <h3>Edit Student</h3>
            </div>
            <div class="card-body">
                <div class="form-group">
                    <label for="sId" class="form-label">Student Id</label>
                    <input type="text" 
                           class="form-control" 
                           id="sId" 
                           formControlName="rsId"    
                           [readonly]="true"                                               
                           >                          
                          
                </div>
                <div class="form-group">
                    <label for="sName" class="form-label">Student Name</label>
                    <div class="text-danger" *ngIf="myReactiveForm.get('rsName')?.errors?.['required']">
                        Student Name is required
                      </div>
                      <div class="text-danger" *ngIf="myReactiveForm.get('rsName')?.errors?.['minlength']">
                        Student Name should be of minium 2 characters
                      </div>
                      <div class="text-danger" *ngIf="myReactiveForm.get('rsName')?.errors?.['invalidText']">
                        Student Name should have only characters and white spaces
                      </div>
                    <input type="text" 
                           class="form-control" 
                           id="sName" 
                           formControlName="rsName"> 
                                               
                                
                           
                </div>
                <div class="form-group">
                    <label for="sMarks" class="form-label">Student Marks</label>
                    <input type="text" 
                           class="form-control" 
                           id="sMarks" 
                           formControlName="rsMarks" 
                           >
                          
                </div>
                <div class="form-group">
                    <label for="sDob" class="form-label">Student DOB</label>
                    <input type="date" class="form-control" id="sDob" formControlName="rsDob" >
                   
                </div>
                <div class="form-check">
                    <input formControlName="rsGender"   class="form-check-input" type="radio"  id="sGender" value="Male">
                    <label class="form-check-label" for="sGender">
                      Male
                    </label>
                  </div>
                  <div class="form-check">
                    <input formControlName="rsGender" value="Female"  class="form-check-input" type="radio"  id="sGender">
                    <label class="form-check-label" for="sGender">
                      Female
                    </label>
                  </div>
            </div>
            <div class="card-footer bg-warning text-white">
                <button type="submit" class="btn btn-sucess" >Edit Student</button>
                <button type="button" class="btn btn-sucess" (click)="addanotherValidator()">Add Validator</button>
            </div>
        </div>

    </form>
</div>
--------------------------------------

echo {} > db.json

db.json:
----------------
{
  "Stud": [
    {
      "studId": 101,
      "studName": "Vaishnavi",
      "studTotalMarks": 475,
      "studDob": "new Date(5,5,2020)",
      "studGender": "Female",
      "id": "6820"
    },
    {
      "studId": 102,
      "studName": "Nitin kalokar",
      "studTotalMarks": 400,
      "studDob": "new Date(5,7,2020)",
      "studGender": "Female",
      "id": "bc33"
    },
    {
      "studId": 103,
      "studName": "PattuBai",
      "studTotalMarks": 375,
      "studDob": "new Date(6,5,2020)",
      "studGender": "Male",
      "id": "8f3e"
    },
    {
      "studId": 104,
      "studName": "Vaish patel",
      "studTotalMarks": 500,
      "studDob": "new Date(5,5,2020)",
      "studGender": "Female",
      "id": "5218"
    },
    {
      "id": "b3a9",
      "studId": 0,
      "studName": "Valabai patel",
      "studTotalMarks": "900",
      "studDob": "2025-07-03",
      "studGender": "Male"
    }
  ]
}




npx json-server db.json

ng g s services/studserv

ng g c student/httpstudlist

StudservService.ts:
-----------------------

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Stud } from '../stud.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StudservService {

   baseUrl="http://localhost:3000/Stud";
 
  constructor(private httpClient:HttpClient) { }
 
  getAllStudents():Observable<Stud[]>{
    return this.httpClient.get<Stud[]>(this.baseUrl);
  }

  addStudents(student:Stud):Observable<Stud>{
    return this.httpClient.post<Stud>(this.baseUrl,student);
  }


  getAStudent(studId:any):Observable<Stud>{
    return this.httpClient.get<Stud>(this.baseUrl+'/'+studId);
  }

   deleteStudent(studId:number):Observable<void>{
    return this.httpClient.delete<void>(this.baseUrl+'/'+studId);
  }

   updateStudent(student:Stud):Observable<Stud>{
     return this.httpClient.put<Stud>(this.baseUrl+'/'+student.studId,student);
   }
}
--------------------------------------------------

httpstudlist.ts:
--------------------
import { Component } from '@angular/core';
import { Stud } from '../../stud.model';
import { StudservService } from '../../services/studserv.service';
import { Router } from '@angular/router';
import { NgForOf } from '@angular/common';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-httpstudlist',
  imports: [NgForOf,CommonModule],
  templateUrl: './httpstudlist.component.html',
  styleUrl: './httpstudlist.component.css'
})
export class HttpstudlistComponent {
  
   allStud:Stud[]=[];
   constructor(private studentHttpService :StudservService ,
     private router:Router ) { }
    loadData()
   {
     this.studentHttpService.getAllStudents().subscribe({
       next:(response)=>{this.allStud=response}
       
     })
   }
  
   ngOnInit(): void {
     this.loadData();
   }
 
   addStudent(){
     this.router.navigate(['studentadd']);
   }
   viewStudent(studId:any){
     this.router.navigate(['studentview',studId]);
  
   }
   editStudent(studId:any){
      this.router.navigate(['studentedit',studId]);    
   }
   deleteStudent(studId:any){
     this.studentHttpService.deleteStudent(studId).subscribe({
      next:(response)=>{this.loadData();
     console.log(response)},
      error:(error)=>{console.log(error)}
     })
 
   }
 
}
-----------------------------------------------
httpstudlist.html:
------------------------
<p>stud-list-http works!</p>


<div class="container">
    <h2> Student details from Server</h2>
    <button type="button" class="btn btn-success m-3" (click)="addStudent()">Add Student</button>
    <table class="table table-striped">
        <thead class="table-dark text-white">
            <tr>
                <th>Id</th>
                <th>Name</th>
                <th>TotalMarks</th>
                <th>Dob</th>
                <th>Gender</th>
                <th>Delete</th>
                <th>Edit</th>
                <th>View</th>
            </tr>
        </thead>
        <tbody>
                <tr *ngFor="let stud of allStud" >
                <td>{{stud.studId}}</td>
                <td>{{stud.studName  }}</td>
                <td>{{stud.studTotalMarks }}</td>
                <td>{{stud.studDob}} </td>    
                <td>{{stud.studGender}}</td>
              <td><button type="button" class="btn btn-danger" 
                (click)="deleteStudent(stud.studId)">Remove</button></td>
                <td><button type="button" class="btn btn-primary" 
                    (click)="editStudent(stud.studId)">Edit</button></td>
                <td><button type="button" class="btn btn-warning" 
                    (click)="viewStudent(stud.studId)">View</button></td>
            </tr>
        </tbody>
    </table>   
</div>


---------------------------------------------
httpaddstud.ts:
---------------------
import { Component } from '@angular/core';
import { StudservService } from '../../services/studserv.service';
import { Router } from '@angular/router';
import { Stud } from '../../stud.model';
import { FormsModule } from '@angular/forms';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-httpstudadd',
  imports: [FormsModule,NgIf],
  templateUrl: './httpstudadd.component.html',
  styleUrl: './httpstudadd.component.css'
})
export class HttpstudaddComponent {
 constructor(private studentHttpService:StudservService
    ,private router:Router) { }

  ngOnInit(): void {
  }
  addStudent(myForm:any){
   //construct a student object and assign the form data to it
      let newStudent:Stud={
        studId:0,
        studName:myForm.value.sName,
        studTotalMarks:myForm.value.studMarks,
        studDob:myForm.value.studDob,
        studGender:myForm.value.studGender
      }
   //send this student object to backend through the service to get added to databse
      this.studentHttpService.addStudents(newStudent).subscribe({
        next:(response)=>{this.router.navigate(['ListStud']),console.log(response)},
        error:(err)=>{console.log(err)}
      })
  }

  back(){

  }
}
--------------------------------
httpaddstud.html:
------------------------
<div class="container">
    <form #myForm="ngForm" (ngSubmit)="addStudent(myForm)">
        <div class="card">
            <div class="card-header bg-warning text-white">
                <h3>Add Student</h3>
            </div>
            <div class="card-body">
                <div class="form-group">
                    <label for="sName" class="form-label">Student Name</label>
                   <input type="text" 
                           class="form-control" 
                           id="sName" 
                           name="sName" 
                           ngModel
                           required
                           OnlyText
                           #myStudName="ngModel">   
                           <div class="text-danger" 
                           *ngIf="myStudName.errors?.['required'] && myStudName.touched">
                        Student name is required
                      </div>                       
                           <div class="text-danger" 
                                *ngIf="myStudName.errors?.['invalidText'] && myStudName.touched">
                             Student name should be only charcters
                           </div>
                </div>
                <div class="form-group">
                    <label for="sMarks" class="form-label">Student Marks</label>
                    <input type="text" 
                           class="form-control" 
                           id="sMarks" 
                           name="studMarks" 
                           ngModel
                           required
                           #myStudMarks="ngModel">
                           <div class="text-danger" *ngIf="!myStudMarks.valid && myStudName.touched">
                             Please enter Student Marks
                          </div>
                </div>
                <div class="form-group">
                    <label for="sDob" class="form-label">Student DOB</label>
                    <input type="date" class="form-control" id="sDob" name="studDob" 
                    ngModel required
                    #myStudDob="ngModel">
                    <div class="text-danger" *ngIf="!myStudDob.valid && myStudName.touched">
                      Please enter Student Dob
                   </div>>
                </div>
                <div class="form-check">
                    <input ngModel class="form-check-input" type="radio" name="studGender" id="sGender" value="Male">
                    <label class="form-check-label" for="sGender">
                      Male
                    </label>
                  </div>
                  <div class="form-check">
                    <input value="Female" ngModel class="form-check-input" type="radio" name="studGender" id="sGender">
                    <label class="form-check-label" for="sGender">
                      Female
                    </label>
                  </div>
            </div>
            <div class="card-footer bg-warning text-white">
                <button type="submit" class="btn btn-sucess" [disabled]="myForm.invalid" >Add Student</button>
            </div>
        </div>

    </form>
</div>

------------------------------------------------------------

# MyAngularApp

This project was generated using [Angular CLI](https://github.com/angular/angular-cli) version 19.2.15.

## Development server

To start a local development server, run:

```bash
ng serve
```

Once the server is running, open your browser and navigate to `http://localhost:4200/`. The application will automatically reload whenever you modify any of the source files.

## Code scaffolding

Angular CLI includes powerful code scaffolding tools. To generate a new component, run:

```bash
ng generate component component-name
```

For a complete list of available schematics (such as `components`, `directives`, or `pipes`), run:

```bash
ng generate --help
```

## Building

To build the project run:

```bash
ng build
```

This will compile your project and store the build artifacts in the `dist/` directory. By default, the production build optimizes your application for performance and speed.

## Running unit tests

To execute unit tests with the [Karma](https://karma-runner.github.io) test runner, use the following command:

```bash
ng test
```

## Running end-to-end tests

For end-to-end (e2e) testing, run:

```bash
ng e2e
```

Angular CLI does not come with an end-to-end testing framework by default. You can choose one that suits your needs.

## Additional Resources

For more information on using the Angular CLI, including detailed command references, visit the [Angular CLI Overview and Command Reference](https://angular.dev/tools/cli) page.
