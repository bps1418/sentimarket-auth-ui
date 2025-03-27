import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { DashboardRoutingModule } from './dashboard-routing.module';
import { PortfolioComponent } from './portfolio/portfolio.component';
import { NewsComponent } from './news/news.component';
//import { NgChartsModule } from 'ng2-charts';

@NgModule({
  declarations: [PortfolioComponent, NewsComponent],
  imports: [CommonModule, FormsModule, DashboardRoutingModule]
})
export class DashboardModule {}