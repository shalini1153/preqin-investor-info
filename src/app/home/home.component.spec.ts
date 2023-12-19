// home.component.spec.ts

import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { HomeComponent } from './home.component';
import { RouterTestingModule } from '@angular/router/testing';
import { Router } from '@angular/router';
import { MockInvestorService } from '../MockInvestorService';
import { InvestorService } from '../investor.service';

describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;
  let router: Router;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [HomeComponent],
      imports: [RouterTestingModule],
      providers: [
        { provide: InvestorService, useClass: MockInvestorService }
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
    router = TestBed.inject(Router);
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should get access token and load investors on initialization', () => {
    const getHeadersSpy = spyOn(component, 'getHeaders').and.callThrough();
    const loadInvestorsSpy = spyOn(component, 'loadInvestors').and.callThrough();

    component.ngOnInit();

    expect(getHeadersSpy).toHaveBeenCalled();
    expect(loadInvestorsSpy).toHaveBeenCalled();
  });

  it('should navigate to investor page', () => {
    const navigateSpy = spyOn(router, 'navigate').and.stub();

    component.navigateToInvestorPage('2670');

    expect(navigateSpy).toHaveBeenCalledWith(['/investors', '2670']);
  });
});
