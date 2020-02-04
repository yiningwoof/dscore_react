import { FETCH_POSTS, NEW_POST} from './types';

export const fetchPosts = () => {
  return function (dispatch) {
    // fetch request
    .then(posts => dispatch({
      type: FETCH_POSTS,
      payload: posts
    }))
  }
}