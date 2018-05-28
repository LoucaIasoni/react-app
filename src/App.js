import React, { Component } from 'react';


import { connect } from 'react-redux';
import { bindActionCreators } from "redux";


import { authentification, channel_fecth, message_fecth, chat_post_messages_to_channel } from "./services/chat/actions";

const ErrorDisplay = (props) => (
	<div>
		{
			props.message
		}
	</div>
)

const NotChannel = (props) => (
	<div>
		Aucun channel
	</div>
)
const NotMessage = (props) => (
	<div>
		Aucun message
	</div>
)

const LoadingDisplay = (props) => (
	<div
		style={{
			position: "absolute",
			top:0,left:0,right:0,bottom:0,
			backgroundColor: "rgba(0,0,0,0.5)"
		}}
	>
		<div
			style={{
				display: "flex",
				flex: 1,
				flexDirection: "column",
				height: "100vh",
				alignItems: "center",
				justifyContent: "center"
			}}
		>
			<div
				style={{
					fontSize: 26,
					color: "white"
				}}
			>
				Chargement...
			</div>
		</div>
	</div>
)


class App extends Component {
	constructor(props) {
		super(props);
		this.state = {
			firstname: "",
			lastname: "",
			email: "",
			message: "",
		}
	  }

	  componentDidMount() {
		this.interval = setInterval(() => {
		  this.props.channel_fecth({id_user: this.props.chat.resultat})
		  this.props.message_fecth({id_channel: this.state.idChannel})
		}, 5000);
  
	  }


	render() {

		if (this.state.submitted && this.props.chat.error == false) {

			return (
				<div className="container">
				  
				  <div>
					  
					  <b>Cliquez sur le channel attendez 5 secondes <br />
						Envoyer le message attendez 5 secondes</b>
					  <br />
					  <i>J'ai mis le rafraichissement du serveur sur toute l'App.. donc tout la page se réactualise :/</i>
					  <br />
					  <br />
					  <p>Selectionner votre channel:</p>	
						{
														
							this.props.chat.loading ?
								"Chargement des Channel..."
							:
								this.props.chat.items.length == 0 ?
									<NotChannel />
								:
									this.props.chat.items.map((item, index) => {
										return (
											
											
											<div>
											<p>
												{	
													"Channel id:  " + item.id + " " + item.firstname + " " + item.lastname
												}
											
												
											</p>
											<br />
											<button
											onClick={() => {
													this.setState({ submitted2: true});
													this.setState({ idChannel: item.id});
													this.setState({ idUser: item.id_user});
												}}
											>Chatter</button>
											</div>	
											

									)})
								}
								<br />
								<br />
								<br />
								<br />
								<br />
						{
								this.props.chat.messages.length == 0 && !this.state.submitted2 ?
									<NotMessage />
								:
								this.props.chat.messages.map((item, index) => {
												
									return (		
										<div>
										<p>
											{	
												item.firstname + ' ' + item.lastname + ': ' + item.message
												
											}
																		
										</p>
										
										</div>
									);
								})
						}

						<div>
							<input
								type="text"
								placeholder={"Entrer son message"}
								value={this.state.message}
								onChange={(e) => this.setState({ message: e.target.value })}
							/>
							<button
								onClick={() => {
									this.props.chat_post_messages_to_channel({
										id_channel: this.state.idChannel,
										id_user: this.props.chat.resultat,
										message: this.state.message
									})
									this.setState({
										message: "",
										submitted3: true
									});
								}}
							>
								Envoyer
							</button>
						</div>
								
					</div>
		
				  {
							this.props.chat.error ?
								<ErrorDisplay message={this.props.chat.error_message}/>
							:
								null

								
							}

							
		
		
		
				</div>
			  );
		  }


		else{
		return (
			<div>
			    <h1>Roman INC</h1>
			    <div>
					firstname : <input type="text" onChange={(e) => { this.setState({ firstname: e.target.value }) }} /><br></br>
					lastname : <input type="text" onChange={(e) => { this.setState({ lastname: e.target.value }) }} /><br></br>
					email : <input type="text" onChange={(e) => { this.setState({ email: e.target.value }) }} /><br></br>
			    </div>
				<br />
					<button
						onClick={() => {
							this.props.authentification({
								email: this.state.email,
								lastname: this.state.lastname,
								firstname: this.state.firstname
							})
							this.setState({ submitted: true});
						}}
					>
						Envoyer
					</button>
					<br />
					<br />
					<i>Identifiants admin:</i>
					<br />
					<p>firstname: david</p>
					<p>lastname: roman</p>
					<p>email: david.roman</p>
					{
					this.props.chat.error ?
						<ErrorDisplay message={this.props.chat.error_message1}/>
					:
						null
					}			
			</div>

		);

	}
	}

}

const mapStateToProps = (state) => ({
	chat: state.chat,
});


const mapActionsToProps = (dispatch) => ({
	authentification: bindActionCreators(authentification, dispatch),
	channel_fecth: bindActionCreators(channel_fecth, dispatch),
	message_fecth: bindActionCreators(message_fecth, dispatch),
	chat_post_messages_to_channel: bindActionCreators(chat_post_messages_to_channel, dispatch),
});

export default connect(mapStateToProps, mapActionsToProps)( App );
