import { Component, OnInit } from '@angular/core';
import { NewsService } from './news.service';

const STORAGE_KEY = 'news_filters';

@Component({
  selector: 'app-news',
  templateUrl: './news.component.html',
  styleUrls: ['./news.component.css']
})
export class NewsComponent implements OnInit {
  newsList: any[] = [];
  filteredNews: any[] = [];
  paginatedNews: any[] = [];

  filterTicker = '';
  filterCategory = '';
  filterSource = '';
  filterStartDate = '';
  filterEndDate = '';
  filterImpactScore = 0;

  categoryOptions: string[] = [];
  sourceOptions: string[] = [];

  totalNews = 0;
  averageImpactScore = 0;
  impactScoreStdDev = 0;

  pageSize = 10;
  currentPage = 1;
  sortColumn = 'datetime';
  sortAsc = false;

  constructor(private newsService: NewsService) {}

  ngOnInit(): void {
    this.loadFilters();
    this.newsService.getNews().subscribe(news => {
      this.newsList = news;
      this.categoryOptions = [...new Set(news.map(n => n.category))].filter(Boolean);
      this.sourceOptions = [...new Set(news.map(n => n.source))].filter(Boolean);
      this.applyFilters();
    });
  }

  applyFilters(): void {
    this.saveFilters();

    const filtered = this.newsList.filter(n => {
      const matchTicker = !this.filterTicker || n.ticker?.toLowerCase().includes(this.filterTicker.toLowerCase());
      const matchCategory = !this.filterCategory || n.category === this.filterCategory;
      const matchSource = !this.filterSource || n.source === this.filterSource;
      const matchImpact = !this.filterImpactScore || (n.impactScore !== null && !isNaN(n.impactScore) && n.impactScore >= this.filterImpactScore);
      const matchDate = this.isWithinDateRange(n.datetime);
      return matchTicker && matchCategory && matchSource && matchImpact && matchDate;
    });

    this.filteredNews = this.sortNews(filtered);
    this.totalNews = this.filteredNews.length;
    this.setPaginatedNews();

    const impactScores = this.filteredNews
      .map(n => parseFloat(n.impactScore))
      .filter((score): score is number => !isNaN(score));

    const sum = impactScores.reduce((acc, val) => acc + val, 0);
    this.averageImpactScore = impactScores.length > 0 ? sum / impactScores.length : 0;

    const variance = impactScores.length > 0
      ? impactScores.reduce((acc, val) => acc + Math.pow(val - this.averageImpactScore, 2), 0) / impactScores.length
      : 0;
    this.impactScoreStdDev = Math.sqrt(variance);
  }

  saveFilters(): void {
    const filters = {
      filterTicker: this.filterTicker,
      filterCategory: this.filterCategory,
      filterSource: this.filterSource,
      filterStartDate: this.filterStartDate,
      filterEndDate: this.filterEndDate,
      filterImpactScore: this.filterImpactScore
    };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(filters));
  }

  loadFilters(): void {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      const filters = JSON.parse(saved);
      this.filterTicker = filters.filterTicker || '';
      this.filterCategory = filters.filterCategory || '';
      this.filterSource = filters.filterSource || '';
      this.filterStartDate = filters.filterStartDate || '';
      this.filterEndDate = filters.filterEndDate || '';
      this.filterImpactScore = filters.filterImpactScore || 0;
    }
  }

  sortNews(news: any[]): any[] {
    return news.sort((a, b) => {
      const aValue = a[this.sortColumn];
      const bValue = b[this.sortColumn];
      if (aValue == null || bValue == null) return 0;
      return this.sortAsc ? (aValue > bValue ? 1 : -1) : (aValue < bValue ? 1 : -1);
    });
  }

  setPaginatedNews(): void {
    const start = (this.currentPage - 1) * this.pageSize;
    const end = start + this.pageSize;
    this.paginatedNews = this.filteredNews.slice(start, end);
  }

  changePage(page: number): void {
    this.currentPage = page;
    this.setPaginatedNews();
  }

  changeSort(column: string): void {
    if (this.sortColumn === column) {
      this.sortAsc = !this.sortAsc;
    } else {
      this.sortColumn = column;
      this.sortAsc = true;
    }
    this.applyFilters();
  }

  get totalPages(): number {
    return Math.ceil(this.filteredNews.length / this.pageSize);
  }

  isWithinDateRange(dateStr: string): boolean {
    const date = new Date(dateStr);
    const start = this.filterStartDate ? new Date(this.filterStartDate) : null;
    const end = this.filterEndDate ? new Date(this.filterEndDate) : null;
    return (!start || date >= start) && (!end || date <= end);
  }
  
  clearFilters(): void {
    this.filterTicker = '';
    this.filterCategory = '';
    this.filterSource = '';
    this.filterStartDate = '';
    this.filterEndDate = '';
    this.filterImpactScore = 0;
    localStorage.removeItem(STORAGE_KEY);
    this.applyFilters();
  }

}