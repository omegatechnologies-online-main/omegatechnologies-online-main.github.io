import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Contact } from '../../src/app/contact/contact';

describe('ContactComponent', () => {
  let component: Contact;
  let fixture: ComponentFixture<Contact>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Contact]
    }).compileComponents();

    fixture = TestBed.createComponent(Contact);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should invalidate form when empty', () => {
    expect(component.contactForm.valid).toBeFalsy();
  });

  it('should validate form when correctly filled', () => {
    component.contactForm.controls['name'].setValue('Test User');
    component.contactForm.controls['email'].setValue('test@example.com');
    component.contactForm.controls['interest'].setValue('ai');
    component.contactForm.controls['message'].setValue('Hello World');

    expect(component.contactForm.valid).toBeTruthy();
  });
});
