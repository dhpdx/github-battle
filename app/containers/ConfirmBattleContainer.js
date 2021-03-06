var React = require('react');
var ConfirmBattle = require('../components/ConfirmBattle')
var githubHelpers = require('../utils/githubHelpers');

var ConfirmBattleContainer = React.createClass({
	contextTypes: {
		router: React.PropTypes.object.isRequired
	},
	getInitialState: function(){
		console.log('getInitialState');
		return {
			isLoading: true,
			playersInfo: []
		}
	},

	componentWillMount: function(){
		console.log('componentwillMount');
	},

	componentDidMount: function(){
		var query = this.props.location.query;
		githubHelpers.getPlayersInfo([query.playerOne, query.playerTwo])
			.then(function(players){
				this.setState({
					isLoading: false,
					playersInfo: [players[0], players[1]]
				})
			}.bind(this))
		//fetch info from github then update state
		console.log('componentDidMount');
	},

	componentWillReceiveProps: function(){
	console.log('componentWillReceiveProps');
	},

	componentWillUnmount: function(){
		console.log('compnentwillUnmount');
	},

	handleInitiateBattle: function(){
		this.context.router.push({
			pathname: '/results',
			state: {
				playersInfo: this.state.playersInfo
			}
		})
	},

	render: function(){
		return (
			<ConfirmBattle
				isLoading={this.state.isLoading}
				playersInfo={this.state.playersInfo}
				onInitiateBattle={this.handleInitiateBattle} />
			)
	}
})

module.exports = ConfirmBattleContainer;
