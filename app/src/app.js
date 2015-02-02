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
			value: 1.00,
		};
	},
	componentWillMount: function () {
		let currencies = this.props.currencies;
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
	handleSwap: function () {
		this.setState({
			fromIndex: this.state.toIndex,
			toIndex: this.state.fromIndex
		});
	},
	handleFromChange: function (e, selectedIndex) {
		console.log('handleFromChange', arguments);
		this.setState({
			fromIndex: selectedIndex
		});
	},
	handleToChange: function (e, selectedIndex) {
		console.log('handleToChange', arguments);
		this.setState({
			toIndex: selectedIndex
		});
	},
	render: function () {
		return (
			<div>
				<TextField
					hintText="amount"
					value={this.state.value} />
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
			</div>
		);
	}
});

export default App;
