import { call, put, takeLatest } from "redux-saga/effects";
import fetch from "isomorphic-fetch";


export const fetchUrl = () => fetch( "http://yun.ydma.cn/api/category-groups/1/categories", {
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

export function* catList() {
    try {
        const gists = yield call( fetchUrl );

        yield put( {
            type: 'SUCCESS_CAT',
            payload: {
                cateList: gists
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
    yield takeLatest( 'REQUEST_CAT', catList );
}
