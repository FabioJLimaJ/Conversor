import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Formatador } from './formatador';

describe('Formatador', () => {
  let component: Formatador;
  let fixture: ComponentFixture<Formatador>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Formatador],
    }).compileComponents();

    fixture = TestBed.createComponent(Formatador);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
