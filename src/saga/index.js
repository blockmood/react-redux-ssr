import { all } from "redux-saga/effects";
import gistsSaga from "./gists";

export default function* () {
    yield all( [
        gistsSaga(),
    ] );
}
