import { Component } from '@angular/core';
import { bootstrapApplication } from '@angular/platform-browser';
import { JsonFormsModule } from '@jsonforms/angular';
import { JsonFormsAngularMaterialModule } from '@jsonforms/angular-material';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { importProvidersFrom } from '@angular/core';

@Component({
  selector: 'app-root',
  template: `
    <div class="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div class="max-w-3xl mx-auto">
        <h1 class="text-3xl font-bold text-gray-900 text-center mb-8">
          Dynamic JSON Forms Demo
        </h1>
        <div class="bg-white shadow rounded-lg p-6">
          <jsonforms
            [data]="data"
            [schema]="schema"
            [uischema]="uischema"
            (dataChange)="onDataChange($event)"
          ></jsonforms>
        </div>
      </div>
    </div>
  `,
  standalone: true,
  imports: [JsonFormsModule, JsonFormsAngularMaterialModule]
})
export class App {
  schema = {
    type: 'object',
    properties: {
      firstName: {
        type: 'string',
        minLength: 2,
        title: 'First Name'
      },
      lastName: {
        type: 'string',
        minLength: 2,
        title: 'Last Name'
      },
      email: {
        type: 'string',
        format: 'email',
        title: 'Email'
      },
      age: {
        type: 'integer',
        minimum: 0,
        title: 'Age'
      }
    },
    required: ['firstName', 'lastName', 'email']
  };

  uischema = {
    type: 'VerticalLayout',
    elements: [
      {
        type: 'Control',
        scope: '#/properties/firstName'
      },
      {
        type: 'Control',
        scope: '#/properties/lastName'
      },
      {
        type: 'Control',
        scope: '#/properties/email'
      },
      {
        type: 'Control',
        scope: '#/properties/age'
      }
    ]
  };

  data = {};

  onDataChange(data: any) {
    console.log('Form data changed:', data);
    this.data = data;
  }
}

bootstrapApplication(App, {
  providers: [
    importProvidersFrom(BrowserAnimationsModule)
  ]
}).catch(err => console.error(err));