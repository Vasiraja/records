import { Component, ViewContainerRef } from '@angular/core';
import { NgComponentOutlet }           from '@angular/common';

 @Component({
  selector: 'app-leaf-content',
  standalone: true,
  template: `
    <div style="padding:10px; background:lightyellow; border-radius:6px;">
      <p> Content Component</p>
      <p>  dynamically from TypeScript!</p>
    </div>
  `
})
export class LeafContentComponent {}

 @Component({
  selector: 'app-admin-bio',
  standalone: true,
  template: `
    <div style="padding:10px; background:lightblue; border-radius:6px;">
      <p> Admin Bio Component</p>
    </div>
  `
})
export class AdminBioComponent {}

 @Component({
  selector: 'app-standard-bio',
  standalone: true,
  template: `
    <div style="padding:10px; background:lightgreen; border-radius:6px;">
      <p>Standard Bio Component</p>
    </div>
  `
})
export class StandardBioComponent {}
 
@Component({
  selector: 'app-dynamic-render',
  standalone: true,
  imports: [NgComponentOutlet],
  templateUrl: './dynamic-render.html',
  styleUrl:    './dynamic-render.css',
})
export class DynamicRender {

  isAdmin = false;

   constructor(private viewContainer: ViewContainerRef) {}

   showAdmin()    { this.isAdmin = true;  }
  showStandard() { this.isAdmin = false; }

  getBioComponent() {
    return this.isAdmin ? AdminBioComponent : StandardBioComponent;
  }

   loadContent() {
     this.viewContainer.createComponent(LeafContentComponent);
  }

  clearContent() {

    this.viewContainer.clear();
  }
} 