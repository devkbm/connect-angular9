import { Directive } from '@angular/core';
import { NG_ASYNC_VALIDATORS, AbstractControl, ValidationErrors, AsyncValidator, AsyncValidatorFn } from '@angular/forms';

import { Observable } from 'rxjs';
import { map, tap, catchError } from 'rxjs/operators';

import { MenuService } from '../service/menu.service';

export function existingMenuGroupValidator(menuService: MenuService): AsyncValidatorFn {
  return (control: AbstractControl): Promise<ValidationErrors | null> | Observable<ValidationErrors | null> => {
    return control.value ?
              menuService.getValidDupMenuGroup(control.value)
                          .pipe(
                            map( responseObj => {
                              if ( responseObj.data === false ) {
                                return {exists: responseObj.message};
                              } else {
                                return null;
                              }
                            } )
                          ) : new Observable<null>();
  };
}
