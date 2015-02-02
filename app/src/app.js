import React from 'react';
import { DropDownMenu, IconButton, TextField } from 'material-ui';

let App = React.createClass({
	getDefaultProps: function () {
		return {
			fromCurrency: 'USD',
			toCurrency: 'EUR'
		};
	},
	getInitialState: function () {
		return {
			amount: '10.00',
		};
	},
	componentWillMount: function () {
		let currencies = this.props.converter.currencies;
		let menuItems = Object.keys(currencies).map(currency => ({
			payload: currency,
			text: `${currencies[currency]} (${currency})`
		}));

		this.setState({
			menuItems,
			fromIndex: Object.keys(currencies).indexOf(this.props.fromCurrency),
			toIndex: Object.keys(currencies).indexOf(this.props.toCurrency)
		});
	},
	handleAmountChange: function (e) {
		this.setState({
			amount: e.target.value
		});
	},
	handleSwap: function () {
		this.setState({
			fromIndex: this.state.toIndex,
			toIndex: this.state.fromIndex
		});
	},
	handleFromChange: function (e, selectedIndex) {
		this.setState({
			fromIndex: selectedIndex
		});
	},
	handleToChange: function (e, selectedIndex) {
		this.setState({
			toIndex: selectedIndex
		});
	},
	render: function () {
		let amount = this.state.amount;
		let from = this.state.menuItems[this.state.fromIndex].payload;
		let to = this.state.menuItems[this.state.toIndex].payload;
		let conversion = '?';

		try {
			conversion = this.props.converter.convert(+amount, from, to);
		} catch (ex) {
			console.error(ex);
		}

		return (
			<div>
				<TextField
					hintText="amount"
					value={this.state.amount}
					onChange={this.handleAmountChange} />
				<DropDownMenu
					menuItems={this.state.menuItems}
					selectedIndex={this.state.fromIndex}
					onChange={this.handleFromChange} />
				<IconButton
					icon="action-swap-vert"
					onClick={this.handleSwap} />
				<DropDownMenu
					menuItems={this.state.menuItems}
					selectedIndex={this.state.toIndex}
					onChange={this.handleToChange} />
				<p>{amount} {from} = {conversion} {to}</p>
			</div>
		);
	}
});

export default App;
