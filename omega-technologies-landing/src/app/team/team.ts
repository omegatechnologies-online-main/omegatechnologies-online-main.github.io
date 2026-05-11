import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-team',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './team.html',
  styleUrl: './team.scss'
})
export class Team {
  teamMembers = [
    {
      name: 'Abdul Faheem',
      role: 'Co-Founder & Lead AI Engineer',
      bio: 'Expert in designing autonomous AI workflows and scalable digital infrastructure. Abdul specializes in bridging the gap between complex business requirements and cutting-edge technical solutions.',
      image: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Faheem'
    },
    {
      name: 'Tharun',
      role: 'Co-Founder & Full-Stack Architect',
      bio: 'Visionary developer focused on high-performance web systems and brand growth engineering. Tharun has a track record of building elite platforms that drive measurable business results.',
      image: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Tharun'
    }
  ];
}
