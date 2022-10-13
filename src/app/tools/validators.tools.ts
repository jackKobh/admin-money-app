import { AbstractControl, FormGroup, ValidationErrors, ValidatorFn, Validators } from "@angular/forms";

export class ValidatorsTools {
	static equalValueValidator(targetKey: string, toMatchKey: string): ValidatorFn {

		return (group: FormGroup): { [key: string]: string } => {
			const target = group.controls[targetKey];
			const toMatch = group.controls[toMatchKey];
			const isMatch = target.value === toMatch.value;

			if (!isMatch && target.valid && toMatch.valid) {
				toMatch.setErrors({ equalValue: targetKey });
				const message = targetKey + ' != ' + toMatchKey;
				return { 'equalValue': message };
			}
			if (isMatch && toMatch.hasError('equalValue')) {
				toMatch.setErrors(null);
			}

			return null;
		};
	}



	static cardValidValidator(fieldKey: string): ValidatorFn {

		return (cardForm: FormGroup): { [key: string]: string } => {

			let numberCard: string = (cardForm.controls[fieldKey].value as string);
			let regex: RegExp = new RegExp('(\D|^)4[0-9]{3}(\ |\-|)[0-9]{4}(\ |\-|)[0-9]{4}(\ |\-|)[0-9]{4}(\D|$)');

			if (numberCard.substring(numberCard.length - 1) === '-') return;
			if (numberCard.replace(/-/g, "").length % 4 === 0 && numberCard.replace(/-/g, "").length !== 16 && numberCard.replace(/-/g, "").length !== 0) cardForm.controls[fieldKey].setValue(numberCard + '-')

			if (!regex.test(numberCard.replace(/-/g, ""))) {
				cardForm.controls[fieldKey].setErrors({ cardValid: fieldKey });
				return { 'cardValid': fieldKey };
			}
			return null;
		}
	}

	static cardDateValidator(fieldKey: string): ValidatorFn {

		return (cardForm: FormGroup): { [key: string]: string } => {

			let dateCard: string = (cardForm.controls[fieldKey].value as string);
			let regex: RegExp = new RegExp('^[0-9]{4}$');

			//console.log(`date card value ${dateCard} - #${dateCard.replace(/\//g, "")}#`);
			if (dateCard.length === 2) cardForm.controls[fieldKey].setValue(dateCard + '/');

			if (!regex.test(dateCard.replace(/\//g, ""))) {
				//console.log(`Regex with error`);
				cardForm.controls[fieldKey].setErrors({ cardDate: fieldKey });
				return { 'cardDate': fieldKey };
			}
			return null;
		}
	}

	static checkValidator(control: AbstractControl): ValidationErrors | null {
		if (!control.value)
			return { 'checkValidator': true }

		return null;

	}

	static numericValidator() {
		return [
			Validators.required,
			Validators.pattern("^[+-]?([0-9]*[.])?[0-9]+$")
		]
	}

	static numericCodeValidatorArray(length: number) {
		return [
			Validators.required,
			Validators.pattern("^[0-9]*$"),
			Validators.minLength(length),
			Validators.maxLength(length)
		]
	}

	static lengthMinMax(minLength: number, maxLength: number) {
		return [
			Validators.required,
			Validators.minLength(minLength),
			Validators.maxLength(maxLength)
		]
	}

	static currencyValidator() {
		return [Validators.required, Validators.pattern('^[0-9]+(\.[0-9]{1,2})?$')]
	}

	static passwordValidatorArray(minLength: number = 8) {
		return [Validators.required, Validators.pattern(`^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-\+]).{${minLength},}$`)]
	}

	static cardDateValidatorArray() {
		return [Validators.required, Validators.pattern('^(0[1-9]|1[0-2])\/([0-9]{4}|[0-9]{2})$')]
	}

	static cardNumberValidatorArray() {
		return [Validators.required, Validators.pattern('^4\d{3}([\-]?)\d{4}\\1\d{4}\\1\d{4}$')]
	}

	static validateRegex(regex: string, cadena: string) {
		let expr: RegExp = new RegExp(regex);
		return expr.test(cadena);
	}

	static transactionCryptoIdRegex(currency: string) {
		switch (currency) {
			case 'BTC':
				return [Validators.required, Validators.pattern('^[a-fA-F0-9]{64}$')]
			case 'ETH':
				return [Validators.required, Validators.pattern('^(0x)[a-fA-F0-9]{64}$')]

		}
		return [Validators.required, Validators.pattern('^(0x)?[a-fA-F0-9]{64}$')]
	}

    static notUpdateValueField() {
        return { emitEvent: false }
    }

}