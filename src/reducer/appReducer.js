const appReducer = ( state = false, action ) => {
    switch ( action.type ) {
        case "INITIALISE_APP":
            return ( {
                initialised: true,
            } );
        default: return state;
    }
};

export default appReducer