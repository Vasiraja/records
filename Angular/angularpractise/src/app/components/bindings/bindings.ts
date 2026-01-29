import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
@Component({
  selector: 'app-bindings',
  imports: [FormsModule],
  templateUrl: './bindings.html',
  styleUrl: './bindings.css',
})
export class Bindings {

  interpolVar:string="oneWayBindingInterpolation";
  twoWayBindVar:string="";

  buttonWorks:boolean|undefined;
  firstname:string="";
  isError:boolean=true;

  checkFirstname(){
    if(this.firstname !==""){
      this.buttonWorks=true;
    }
    else{
      this.buttonWorks=false;
    }
  }
    
  propId: string | null = 'propertyId';
  attrId: string | null = 'attributeId';

  clearIds() {
    this.propId = null;
    this.attrId = null;
  }
  checkErr()
  {
    this.isError=!this.isError;
    
  }
  eventTrigger(){
    alert("Event triggered in template and triggered inside typescript component")

  }
}
