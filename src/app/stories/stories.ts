import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-stories',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './stories.html',
  styleUrl: './stories.scss'
})
export class Stories {
  storiesList = [
    {
      brand: 'Gahranox',
      story: 'They helped to reach top markets like hardware and other potential market where indian hardware is needed and internet reach was improved.'
    },
    {
      brand: 'brand Revenue',
      story: 'Helped to make everything centralised in internret like giveing proper advice for the landing page and ui is amazing.'
    },
    {
      brand: 'Aanchal Designs',
      story: 'Internet ecommerce was made easy now we have untapped intenet full of market for our cloths like this add big huge insprational stories.'
    }
  ];
}
