import * as types from "./constants";
import axios from "axios";


export function authentification(payload) {
	return (dispatch, state) => {

		dispatch({
			type: types.AUTHENTIFICATION_START
		});

		axios.post('http://localhost:9000/api/authentification',
		{ 
			"email": payload.email,
			"lastname": payload.lastname, 
			"firstname": payload.firstname		
			
		})
		.then((result) => {
			console.log("chat - ", result);

			dispatch({
				type: types.AUTHENTIFICATION_SUCCESS,
				payload: result.data
			});
		})
		.catch((e) => { 

			dispatch({
				type: types.AUTHENTIFICATION_FAIL
			});

		 })
	};
}; 

export function channel_fecth(payload) {
	return (dispatch, state) => {

		dispatch({
			type: types.CHANNEL_FETCH_START
		});

		axios.get(`http://localhost:9000/api/channels/${payload.id_user}`)
		.then((result) => {
			console.log("chat - ", result);

			dispatch({
				type: types.CHANNEL_FETCH_SUCCESS,
				payload: result.data
			});
		})
		.catch((e) => {
			console.log("chat - failed", e);
			dispatch({
				type: types.CHANNEL_FETCH_FAIL
			});
		})

	};
};

export function message_fecth(payload) {
	return (dispatch, state) => {

		dispatch({
			type: types.MESSAGE_FETCH_START
		});

		axios.get(`http://localhost:9000/api/channel/${payload.id_channel}`)
		.then((result1) => {
			console.log("chat - ", result1);

			dispatch({
				type: types.MESSAGE_FETCH_SUCCESS,
				payload: result1.data
			});
		})
		.catch((e) => {
			console.log("message - failed", e);
			dispatch({
				type: types.MESSAGE_FETCH_FAIL
			});
		})

	};
};


export function chat_post_messages_to_channel(payload) {
	return (dispatch, state) => {

		dispatch({
			type: types.CHAT_POST_MESSAGES_START
		});

		axios.post(
			`http://localhost:9000/api/channel/${payload.id_channel}`,
			{
				"id_user": payload.id_user,
				"message": payload.message
			}
		)
		.then((result) => {

			dispatch({
				type: types.CHAT_POST_MESSAGES_SUCCESS,
				payload: result.data
			});

		})
		.catch((e) => {

			dispatch({
				type: types.CHAT_POST_MESSAGES_FAIL
			});
		})

	};
};

