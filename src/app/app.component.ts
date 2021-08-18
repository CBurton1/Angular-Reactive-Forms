import { Component } from '@angular/core';
import { FormArray, FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  public events: any[] = [
    { name: "Youth Camp", price: 10 },
    { name: "Teen Camp", price: 10 },
    { name: "Weekend Retreat", price: 5 }
  ];

  // end result of what our registration will look like
  public registration = {
    events: [
      {
        name: "Youth Camp",
        campers: [
          {
            name: "Sally",
            age: 10
          }
        ]
      },
      {
        name: "Teen Camp",
        campers: [
          {
            name: "Greg",
            age: 15
          }
        ]
      },
      {
        name: "Weekend Retreat",
        campers: [
          {
            name: "Markus",
            age: 14
          }
        ]
      }
    ],
    price: 25
  };

  public registrationForm!: FormGroup;
  public totalOwed: number = 0;

  public ngOnInit(): void {
    this.registrationForm = new FormGroup({
      events: new FormArray([]),
    })
  }

  public addEvent(): void {
    const event = new FormGroup({
      name: new FormControl(this.events[0].name),
      campers: new FormArray([]),
    });

    this.formEvents.push(event);
  }

  public removeEvent(index: number): void {
    this.formEvents.removeAt(index);
  }

  public addCamper(formEvent: any): void {
    const camper = new FormGroup({
      name: new FormControl(),
      age: new FormControl()
    });

    const eventPrice = this.events.find((event) => event.name === formEvent.value.name)?.price;

    this.totalOwed += eventPrice;
    (formEvent.controls.campers as FormArray).push(camper);
  }

  public removeCamper(formEvent: FormGroup, index: number): void {
    (formEvent.controls.campers as FormArray).removeAt(index);
    const eventPrice = this.events.find((event) => event.name === formEvent.value.name)?.price;
    this.totalOwed -= eventPrice;
  }

  public get formEvents(): FormArray {
    return this.registrationForm.controls.events as FormArray;
  }
}
