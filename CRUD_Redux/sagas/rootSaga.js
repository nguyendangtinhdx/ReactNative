/*
rootSaga => to manage other sagas
*/
//Saga effects
import { fork, all } from "redux-saga/effects";
import { watchFetchMovies } from "./movieSagas";
//Add movie
import {
  watchAddNewMovie,
  watchUpdateMovie,
  watchDeleteMovie
} from "./movieSagas";

export default function* rootSaga() {
  yield all([
    fork(watchFetchMovies),
    fork(watchAddNewMovie),
    fork(watchUpdateMovie),
    fork(watchDeleteMovie)
  ]);
}
