//function for validating edit form

//validate name
export function validateName(name: string) {
	if (typeof name !== 'string') {
		return { error: true, message: 'Navn må være bokstaver' };
	} else if (name.length < 2) {
		return { error: true,message: 'Navnet må være lengre ' };
	} else {
		return {error: false, name: name}
	}
}

export function validateQuote(quote: string) {
	if (typeof quote !== 'string') {
		return {error: true, message: 'quote må være en streng' };
	} else if (quote.length < 5) {
		return { error: true,message: 'Quote kan være kort, men ikke så kort'};
	} else {
		return {error: false, message:""};
	}
}

export function validateAge(age: string) {
	try {
		parseInt(age);
	} catch {
		return { message: 'alder er bare tall ' };
	}

	const age_num = parseInt(age);
	if (age_num < 18 || age_num > 67) {
		return { message: 'Du må være mellom 18 og 67' };
	} else {
		return null;
	}
}
