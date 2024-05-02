import { HttpClient } from '@angular/common/http';
import { Component, AfterViewInit, ViewChild, ElementRef, OnInit } from '@angular/core';
declare var Chart: any;

@Component({
  selector: 'app-dashbord',
  templateUrl: './dashbord.component.html',
  styleUrl: './dashbord.component.css'
})
export class DashbordComponent implements AfterViewInit  {

  @ViewChild('myChart') myChart!: ElementRef;
  fatchUserDetails: any;

  ngAfterViewInit(): void {
    if (!this.myChart || !this.myChart.nativeElement) {
      console.error('Canvas element not found.');
      return;
    }

    const ctx = this.myChart.nativeElement.getContext('2d');
    if (!ctx) {
      console.error('Unable to get 2D context for canvas element.');
      return;
    }

    const myChart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: ['Doctor',
              'Nurse',
              'Administrator',
              'Technician',
              'Receptionist',
              'Pharmacist',
              'Therapist',
              'Laboratory Technician',
              'Radiologist'],
            datasets: [{
                label: '# of Votes',
                data: [12, 19, 3, 5, 6, 3,9,4,4],
                backgroundColor: [
                  'rgba(255, 99, 132, 0.2)',   // Red
                  'rgba(54, 162, 235, 0.2)',   // Blue
                  'rgba(255, 206, 86, 0.2)',   // Yellow
                  'rgba(75, 192, 192, 0.2)',   // Teal
                  'rgba(153, 102, 255, 0.2)',  // Purple
                  'rgba(255, 159, 64, 0.2)',   // Orange
                  'rgba(255, 0, 0, 0.2)',      // Bright Red
                  'rgba(0, 255, 0, 0.2)',      // Bright Green
                  'rgba(0, 0, 255, 0.2)'   
                ],
                borderColor: [
                    'rgba(255, 99, 132, 1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 99, 132, 1)',
                    'rgba(255, 99, 132, 1)',
                    'rgba(255, 99, 132, 1)',
                    'rgba(255, 99, 132, 1)',
                    'rgba(255, 206, 86, 1)',
                    'rgba(75, 192, 192, 1)',
                    'rgba(153, 102, 255, 1)',
                    'rgba(255, 159, 64, 1)'
                ],
                borderWidth: 0.5
            }]
        },
        options: {
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
    });
  }
  user:any;
  constructor(private http:HttpClient){}
  ngOnInit(): void{
    this.fatchUserDetails();
}
fetchUserDetails():void{
  this.http.get<any>('/users/details').subscribe(
    (response: any)=>{
      this.user=response;
    },
    (error: any)=>{
      console.error('Error fetching user details:', error);

    }
  );

}
logout():void{

}
}
