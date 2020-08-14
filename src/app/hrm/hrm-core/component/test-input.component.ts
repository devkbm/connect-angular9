import { Component, Self, Optional, Input, OnInit, forwardRef } from '@angular/core';
import { ControlValueAccessor, NgControl, NG_VALUE_ACCESSOR, NG_VALIDATORS, Validator, AbstractControl, ValidationErrors } from '@angular/forms';

@Component({
  selector: 'app-test-input',
  templateUrl: './test-input.component.html',
  styleUrls: ['./test-input.component.css']
  /*providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => TestInputComponent),
      multi: true
    }
  ]*/
})
export class TestInputComponent implements ControlValueAccessor {

  value: any = '';
  @Input() disabled: boolean;

  constructor(@Self()  @Optional()
    private ngControl: NgControl) {
      if (this.ngControl) {
        this.ngControl.valueAccessor = this;
      }
  }
  /*
  validate(control: AbstractControl): ValidationErrors {
    // throw new Error("Method not implemented.");
  }

  registerOnValidatorChange?(fn: () => void): void {
    // throw new Error("Method not implemented.");
  }
*/

  writeValue(value: any): void {
    this.value = value;
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  setDisabledState?(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }

  private onChange = (_: any) => {};
  private onTouched() {}

}
