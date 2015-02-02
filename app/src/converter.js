import 'whatwg-fetch';
import money from 'money';
import accounting from 'accounting';

const LATEST = 'https://dl.dropboxusercontent.com/u/5991328/convertify/latest.json';
const CURRENCIES = 'https://dl.dropboxusercontent.com/u/5991328/convertify/currencies.json';

export default class Converter {
	static initialize() {
		let latest = fetch(LATEST)
			.then(response => response.json())
			.then(data => {
				money.rates = data.rates;
				money.base = data.base;
			});
		let currencies = fetch(CURRENCIES)
			.then(response => response.json())
			.then(data => {
				this._currencies = data;
			});

		return Promise.all([latest, currencies]);
	}

	static convert(value, from, to) {
		return accounting.formatMoney(
			money.convert(value, { from, to }),
			{ format: '%v' }
		);
	}

	static get currencies() {
		return this._currencies;
	}
};
