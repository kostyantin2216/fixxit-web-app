import { FormControl, Validators } from "@angular/forms";

export class CustomValidators {
    static emailNotRequired(control: FormControl) {
        if(control.value) {
            return Validators.email(control);
        }
        return null;
    }
}