// app-routing.module.ts
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ItemListComponent } from './item-list/item-list.component';
import { ItemDetailComponent } from './item-detail/item-detail.component';
import { ItemFormComponent } from './item-form/item-form.component';
import { StaffComponent } from './pages/staff/staff.component';
import { ScheduleComponent } from './pages/schedule/schedule.component';
import { DashbordComponent } from './dashbord/dashbord.component';
import { SupportComponent } from './support/support.component';
import { SettingsComponent } from './settings/settings.component';
import { ReportsComponent } from './pages/reports/reports.component';
import { RecruitmentComponent } from './pages/recruitment/recruitment.component';
import { PayrollComponent } from './pages/payroll/payroll.component';
import { TimeoffComponent } from './pages/timeoff/timeoff.component';
import { TrainingComponent } from './pages/training/training.component';
import { LoginComponent } from './admin/login/login.component';
import { SignupComponent } from './admin/signup/signup.component';
import { ForgotPasswordComponent } from './admin/forgot-password/forgot-password.component';
import { ResetPasswordComponent } from './admin/reset-password/reset-password.component';
import { UserDetailsComponent } from './user-details/user-details.component';
import { AttendanceDashboardComponent } from './pages/attendance-dashboard/attendance-dashboard.component';
import { AttendanceDetailComponent } from './pages/attendance-detail/attendance-detail.component';
import { AddAttendanceComponent } from './pages/add-attendance/add-attendance.component';
import { AttendanceListComponent } from './pages/attendance-list/attendance-list.component';
import { PolicyComponent } from './pages/policy/policy.component';
import { TrainigFormComponent } from './pages/trainig-form/trainig-form.component';
import { RecruitmentformComponent } from './pages/recruitmentform/recruitmentform.component';
import { OverviewComponent } from './views/overview/overview.component';
import { StaffviewComponent } from './views/staffview/staffview.component';
import { ScheduleviewComponent } from './views/scheduleview/scheduleview.component';
import { TrainingviewComponent } from './views/trainingview/trainingview.component';






const routes: Routes = [
  { path: 'item', component: ItemListComponent },
  { path: 'new', component: ItemFormComponent },
  { path: 'items/:id', component: ItemDetailComponent },
  { path: 'items/:id/edit', component: ItemFormComponent },
  {path:'staff',component:StaffComponent},
  {path:'reports',component:ReportsComponent},
  {path:'recruitment',component:RecruitmentComponent},
  {path:'timeoff',component:TimeoffComponent},
  {path:'training',component:TrainingComponent},
  {path:'payroll',component:PayrollComponent},
  {path:'schedule',component:ScheduleComponent},
  { path: 'schedule/:id/edit', component: ScheduleComponent },
  {path:'dashboard',component:DashbordComponent},
  {path:'support',component:SupportComponent},
  {path:'settings',component:SettingsComponent},
  {path:'',component:LoginComponent},
  {path:'signup',component:SignupComponent},
  {path:'forgot-password',component:ForgotPasswordComponent},
  {path:'reset-password',component:ResetPasswordComponent},
  {path:'user-details',component:UserDetailsComponent},
  {path:'StaffAttendance',component:AttendanceDashboardComponent},
  {path:'attendance-detail',component:AttendanceDetailComponent},
  {path:'AddAttendance',component:AddAttendanceComponent},
  {path:'AttendanceList',component:AttendanceListComponent},
  {path:'policy',component:PolicyComponent},
  {path:'newtraining',component:TrainigFormComponent},
  {path:'newrecruitment',component:RecruitmentformComponent},
  {path:'overview',component:OverviewComponent},
  {path:'staffview',component:StaffviewComponent},
  {path:'scheduleview',component:ScheduleviewComponent},
  {path:'trainingview',component:TrainingviewComponent}
  
 
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
