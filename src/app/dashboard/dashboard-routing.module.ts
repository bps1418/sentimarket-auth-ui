import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PortfolioComponent } from './portfolio/portfolio.component';
import { NewsComponent } from './news/news.component';
import { TokenManagerComponent } from '../token-manager/token-manager.component';
import { AuthGuard } from '../guards/auth.guard';
import { ProfileComponent } from './profile/profile.component';

const routes: Routes = [
  { path: '', redirectTo: 'portfolio', pathMatch: 'full' },
  { path: 'portfolio', component: PortfolioComponent,canActivate: [AuthGuard] },
  { path: 'news', component: NewsComponent,canActivate: [AuthGuard] },
  { path: 'token-manager', component: TokenManagerComponent,canActivate: [AuthGuard]},
  { path: 'profile', component: ProfileComponent,  canActivate: [AuthGuard] }
  ];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule {}