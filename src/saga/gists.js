import { call, put, takeLatest } from "redux-saga/effects";
import fetch from "isomorphic-fetch";

export const fetchUrl = () => fetch( "http://yun.ydma.cn/api/home", {
    method: "get",
    headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
    },
} ).then( ( response ) => {
    if ( !response.ok ) {
        throw new Error();
    }

    return response.json();
} );

export function* fetchGists() {
    try {
        const gists = yield call( fetchUrl );

        yield put( {
            type: 'SUCCESS',
            payload: {
                gists: gists
            },
        } );
    } catch ( error ) {
        yield put( {
            type: FETCH_GISTS__FAILED,
            payload: error,
        } );
    }
}

export default function* () {
    yield takeLatest( 'REQUEST', fetchGists );
}
