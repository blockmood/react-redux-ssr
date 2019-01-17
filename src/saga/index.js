import { all } from "redux-saga/effects";
import gistsSaga from "./gists";
import category from './category'

export default function* () {
    yield all( [
        category(),
        gistsSaga(),
    ] );
}
