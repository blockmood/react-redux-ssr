export default (state = [] , action) => {
    switch(action.type){
        case 'SUCCESS':{
            return {
                ...state,
                gists:action.payload.gists
            }
        }
    }
    return state
}