import { SET_WEB3 } from "../actions/types"

export default function bc(state={web3: ''}, action={}){
    switch (action.type){
        case SET_WEB3:
        // console.log("red", action.data.certificateCreatorInstance);
            return {
                ...state, 
                web3: action.data.web3, 
                accounts: action.data.accounts, 
                certificateCreatorInstance: action.data.certificateCreatorInstance,
            };
        default: 
            return state;
    } 
}
