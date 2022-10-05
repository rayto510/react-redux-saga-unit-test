import { takeEvery, put, call } from 'redux-saga/effects';
import { postsSuccess, postsFail } from './features/posts/postsSlice';

export function* fetchPosts(action) {
    try {
        const data = yield call(() => fetch('https://jsonplaceholder.typicode.com/posts'));
        const formattedData = yield data.json();

        const posts = formattedData.slice(0, 10);

        yield put(postsSuccess(posts));
    } catch (e) {
        yield put(postsFail());
    }
}

function* mySaga() {
    yield takeEvery("posts/postsFetch", fetchPosts);
}

export default mySaga;
