export default (state = [] , action) => {
    switch(action.type){
        case 'SUCCESS':{
            return {
                ...state,
                gists:action.payload.gists
            }
        }
        case 'SUCCESS_CAT':{
            return {
                ...state,
                catList:action.payload.cateList
            }
        }
    }
    return state
}