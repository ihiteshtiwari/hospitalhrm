import { Component, OnInit, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { AttendanceService } from '../../attendance.service'; // Import your attendance service
import { ItemService } from '../../item.service'; // Import your item service
import { Router } from '@angular/router';
import { EventInput } from '@fullcalendar/core';
import { Calendar } from '@fullcalendar/core';
import dayGridPlugin from '@fullcalendar/daygrid';

@Component({
  selector: 'app-attendance-dashboard',
  templateUrl: './attendance-dashboard.component.html',
  styleUrls: ['./attendance-dashboard.component.css']
})
export class AttendanceDashboardComponent implements OnInit, AfterViewInit {
  @ViewChild('fullCalendar') fullCalendarRef: ElementRef;

  items: any[]; // Array to store staff items
  daysInMonth: number[]; // Array to store days in the current month

  constructor(private itemService: ItemService, private router: Router) {}

  ngOnInit(): void {
    this.loadItems(); // Load staff items when the component initializes
    this.daysInMonth = this.generateDaysInMonth(); // Generate days in the current month
  }

  ngAfterViewInit(): void {
    this.initializeCalendar(); // Initialize FullCalendar after the view is initialized
  }

  loadItems(): void {
    this.itemService.getItems().subscribe(
      (items) => {
        this.items = items; // Assign fetched items to the component property
      },
      (error) => {
        console.error('Error fetching items:', error); // Log error if fetching fails
      }
    );
  }

  initializeCalendar(): void {
    const calendarEl: HTMLElement = this.fullCalendarRef.nativeElement;
    const calendar = new Calendar(calendarEl, {
      plugins: [dayGridPlugin],
      events: this.generateEventArrayFromItems(this.items) // Generate events for FullCalendar
    });
    calendar.render(); // Render FullCalendar
  }

  generateEventArrayFromItems(items: any[]): EventInput[] {
    // Implement logic to generate events from attendance data
    // Each event should represent a staff member's attendance
    return []; // For now, return an empty array as a placeholder
  }

  showDetails(itemId: string): void {
    this.router.navigate(['/items', itemId]); // Navigate to item details page
  }

  updateItem(itemId: string): void {
    this.router.navigate(['/items', itemId, 'edit']); // Navigate to item edit page
  }

  deleteItem(itemId: string): void {
    if (confirm('Are you sure you want to delete this item?')) {
      this.itemService.deleteItem(itemId).subscribe(
        () => {
          console.log('Item deleted successfully:', itemId); // Log successful deletion
          this.loadItems(); // Reload items after deletion
        },
        (error) => {
          console.error('Error deleting item:', error); // Log error if deletion fails
        }
      );
    }
  }

  generateDaysInMonth(): number[] {
    const daysInMonth = [];
    const daysCount = new Date(new Date().getFullYear(), new Date().getMonth() + 1, 0).getDate();
    for (let i = 1; i <= daysCount; i++) {
      daysInMonth.push(i); // Populate days in the current month array
    }
    return daysInMonth;
  }

  getCurrentMonthName(): string {
    const monthNames = ["January", "February", "March", "April", "May", "June",
      "July", "August", "September", "October", "November", "December"];
    return monthNames[new Date().getMonth()];
  }

  getCurrentDate(): string {
    // Format the current date in the desired format
    const currentDate = new Date();
    const formattedDate = currentDate.toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
    return formattedDate;
  }
  
  isPresent(employeeId: string, day: number): boolean {
    const currentDate = new Date();
    const currentMonth = currentDate.getMonth();
    const currentYear = currentDate.getFullYear();
    const dateToCheck = new Date(currentYear, currentMonth, day);
    // Implement your logic to determine if the employee is present on the specified day
    // For demonstration purposes, let's return true for even days and false for odd days in the current month
    // You can replace this with your actual logic to determine attendance status
    return dateToCheck.getMonth() === currentMonth && day % 2 === 0;
  }
  
  isWeekend(day: number): boolean {
    const currentDate = new Date();
    const currentMonth = currentDate.getMonth();
    const currentYear = currentDate.getFullYear();
    const dateToCheck = new Date(currentYear, currentMonth, day);
    // Get the day of the week (0 for Sunday, 1 for Monday, ..., 6 for Saturday)
    const dayOfWeek = dateToCheck.getDay();
    // Return true if the day is Saturday (6) or Sunday (0) in the current month
    return dateToCheck.getMonth() === currentMonth && (dayOfWeek === 0 || dayOfWeek === 6);
  }
  
  
  
}
