import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'],
})
export class SignupComponent implements OnInit {
  private citiesUrl = environment.apiUrls.citiesUrl;
  signupForm: FormGroup;
  cities: any[] = [];
  districts: any[] = [];
  selectedCity: any = null;
  submittedData: any = null;
  cityData: any = null;
  districtData: any = null;

  constructor(private fb: FormBuilder, private http: HttpClient) {
    this.signupForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(50)]],
      number: ['', [Validators.required, Validators.pattern(/^[0-9]{10}$/)]],
      email: ['', [Validators.required, Validators.email, Validators.maxLength(50)]],
      password: ['', [Validators.required]],
      city: ['', Validators.required],
      district: [{ value: '', disabled: true }, Validators.required],
    });
  }

  ngOnInit(): void {
    this.getCities();
  }

  getCities() {
    this.http.get(this.citiesUrl).subscribe((data: any) => {
      this.cities = data.data;
    });
  }

  getDistricts() {
    if (this.selectedCity) {
      this.districts = this.selectedCity.districts;
    }
  }

  onCityChange(event: any) {
    this.selectedCity = this.cities.find(city => city.id == event.target.value);
    this.getDistricts();
    this.signupForm.get('district')?.setValue('');

    if (this.selectedCity) {
      this.signupForm.get('district')?.enable();
    } else {
      this.signupForm.get('district')?.disable();
    }
  }

  onSubmit() {
    if (this.signupForm.valid) {
      this.submittedData = this.signupForm.value;
      this.cityData = this.cities.find(city => city.id == this.submittedData.city);
      this.districtData = this.cityData.districts.find((district: { id: any; }) => district.id == this.submittedData.district);
      this.signupForm.reset();
    }
  }
}
