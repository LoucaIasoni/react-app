import * as types from "./constants";


const initialState = {
	items: [],
	messages: [],
	loading: false,
	postMessageLoading: false,
	getChannel: false,
	getMessageLoading: false,
	error: false,
	error_message1: "",
	resultat: "",
};

export default function reducer(state = initialState, action)
{
	switch(action.type)
	{
		case types.AUTHENTIFICATION_START:

			return {
				...state,
				
			}
		break;

		case types.AUTHENTIFICATION_SUCCESS:

			return {
				...state,

				resultat: action.payload,
			}
		break;

		case types.AUTHENTIFICATION_FAIL:

			return {
				...state,

				error: true,
				error_message1: "Désolé vos identifiants sont incorects :'( !"
			}
		break;

		case types.CHANNEL_FETCH_START:
			return {
				...state,
				loading: true,
				getChannel: true,
				error: false,
			};
			break;

		case types.CHANNEL_FETCH_SUCCESS:
			console.log("types.CHANNEL_FETCH_SUCCESS", action)
			return {
				...state,
				items: action.payload,
				loading: false,
				error: false,
				
				getChannel: false,
			};
			break;

		case types.CHANNEL_FETCH_FAIL:
			return {
				...state,
				error: true,
				getChannel: false,
				error_message: "Désolé nous ne pouvons afficher aucun channel!"
			}
			break;
		
		case types.MESSAGE_FETCH_START:
		return {
			...state,
			loading: true,
			error: false,
		};
		break;

		case types.MESSAGE_FETCH_SUCCESS:
			console.log("types.MESSAGE_FETCH_SUCCESS", action)
			return {
				...state,
				messages: action.payload,
				loading: false,
				error: false,
				
				getMessageLoading: false,
			};
			break;

		case types.MESSAGE_FETCH_FAIL:
			return {
				...state,
				error: true,
				getMessageLoading: false,
				error_message2: "Désolé nous ne pouvons afficher aucun message!"
			}
			break;

		case types.CHAT_POST_MESSAGES_START:
			return {
				...state,
				
				postMessageLoading: true,
			}
			break;

		case types.CHAT_POST_MESSAGES_SUCCESS:
			return {
				...state,
				postMessageLoading: false,
			}
			break;

		case types.CHAT_POST_MESSAGES_FAIL:
			return {
				...state,
				postMessageLoading: false,
				error: true,
				error_message: "Désolé, impossible d'envoyer votre message !"
			}
			break;

		default:
			return state;
			break;
	};
};
