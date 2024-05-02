import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FullCalendarModule } from '@fullcalendar/angular';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ItemListComponent } from './item-list/item-list.component';
import { ItemDetailComponent } from './item-detail/item-detail.component';
import { ItemFormComponent } from './item-form/item-form.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { StaffComponent } from './pages/staff/staff.component';
import { ScheduleComponent } from './pages/schedule/schedule.component';
import { TimeoffComponent } from './pages/timeoff/timeoff.component';
import { PayrollComponent } from './pages/payroll/payroll.component';
import { TrainingComponent } from './pages/training/training.component';
import { RecruitmentComponent } from './pages/recruitment/recruitment.component';
import { ReportsComponent } from './pages/reports/reports.component';
import { SettingsComponent } from './settings/settings.component';
import { SupportComponent } from './support/support.component';
import { DashbordComponent } from './dashbord/dashbord.component';
import { LoginComponent } from './admin/login/login.component';
import { SignupComponent } from './admin/signup/signup.component';
import { ForgotPasswordComponent } from './admin/forgot-password/forgot-password.component';
import { ResetPasswordComponent } from './admin/reset-password/reset-password.component';
import { UserDetailsComponent } from './user-details/user-details.component';
import { AttendanceDashboardComponent } from './pages/attendance-dashboard/attendance-dashboard.component';
import { AttendanceDetailComponent } from './pages/attendance-detail/attendance-detail.component';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { AddAttendanceComponent } from './pages/add-attendance/add-attendance.component';
import { AttendanceListComponent } from './pages/attendance-list/attendance-list.component';
import { PolicyComponent } from './pages/policy/policy.component';
import { TrainigFormComponent } from './pages/trainig-form/trainig-form.component';
import { RecruitmentformComponent } from './pages/recruitmentform/recruitmentform.component';
import { OverviewComponent } from './views/overview/overview.component';
import { StaffviewComponent } from './views/staffview/staffview.component';
import { ScheduleviewComponent } from './views/scheduleview/scheduleview.component';
import { TrainingviewComponent } from './views/trainingview/trainingview.component';





@NgModule({
  declarations: [
    AppComponent,
    ItemListComponent,
    ItemDetailComponent,
    ItemFormComponent,
    StaffComponent,
    ScheduleComponent,
    TimeoffComponent,
    PayrollComponent,
    TrainingComponent,
    RecruitmentComponent,
    ReportsComponent,
    SettingsComponent,
    SupportComponent,
    DashbordComponent,
    LoginComponent,
    SignupComponent,
    ForgotPasswordComponent,
    ResetPasswordComponent,
    UserDetailsComponent,
    AttendanceDashboardComponent,
    AttendanceDetailComponent,
    AddAttendanceComponent,
    AttendanceListComponent,
    PolicyComponent,
    TrainigFormComponent,
    RecruitmentformComponent,
    OverviewComponent,
    StaffviewComponent,
    ScheduleviewComponent,
    TrainingviewComponent,


  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    FullCalendarModule
  ],
  providers: [
    provideAnimationsAsync()
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
