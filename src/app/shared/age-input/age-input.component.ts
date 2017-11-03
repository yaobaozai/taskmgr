import { Component, OnInit, forwardRef, Input } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR, NG_VALIDATORS, FormControl, FormBuilder, FormGroup } from '@angular/forms';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-age-input',
  templateUrl: './age-input.component.html',
  styleUrls: ['./age-input.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => AgeInputComponent),
      multi: true
    },
    {
      provide: NG_VALIDATORS,
      useExisting: forwardRef(() => AgeInputComponent),
      multi: true
    }
  ]
})
export class AgeInputComponent implements ControlValueAccessor {

  @Input() value;
  form: FormGroup;
  private propagateChange = (_: any) => {

  }
  constructor(private fb: FormBuilder) { }

  ngOnInit() {
    this.form = this.fb.group({
      birthday: [],
      age: this.fb.group({
        ageNum: [],
        ageUnit: []
      })
    });
    const birthday = this.form.get('birthday');
    const ageNum = this.form.get('age').get('ageNum');
    const ageUnit = this.form.get('age').get('ageUnit');

    const birthday$ = birthday.valueChanges.map(d => {
      return {date: d, from: 'birthday'};
    });
    const ageNum$ = ageNum.valueChanges;
    const ageUnit$ = ageUnit.valueChanges;
    const age$ = Observable.combineLatest(ageNum$, ageUnit$, (_n, _u) => {
      return this.toDate({age: _n, unit: _u});
    })
    .map(d => {
      return {date: d, from: 'age'};
    })
    const merged$ = Observable.merge(birthday$, age$);
    merged$.subscribe(d => {
      const age = this.toAge(d.date);
      if(d.from === 'birthday') {
        if(age.age !== ageNum.value) {
          ageNum.patchValue(age.age, {emitEvent: false});
        }
        if(age.unit !== ageUnit.value) {
          ageUnit.patchValue(age.unit, {emitEvent: false});
        }
        this.propagateChange(d.date);
      }else {
        const ageToCompare = this.toAge(birthday.value);
        if()
      }
    })
  }


  

  writeValue(obj: any):void {

  }

  registerOnChange(fn: any): void {
    this.propagateChange = fn;
  }

  registerOnTouched(fn: any): void {

  }

}
