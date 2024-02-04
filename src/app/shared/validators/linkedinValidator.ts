import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';
import { LinkedinPipe } from '../pipes/linkedinUrl.pipe';

export function LinkedinValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const linkedinPipe = new LinkedinPipe();
    const isValid = linkedinPipe.transform(control.value);
    
    return isValid ? null : { linkedinUrl: true };
  };
}