import _ from 'lodash';
import jsonPlaceholder from '../apis/jsonPlaceHolder';

export const fetchPostsAndUsers = () => async (dispatch, getState) =>{
    await dispatch(fetchPosts());

    _.chain(getState().posts)
        .map('userId')
        .uniq()
        .forEach(id => dispatch(fetchUser(id)))
        .value();
    //value is added to execute chain
};

export const fetchPosts = () => async dispatch => {
    const response = await jsonPlaceholder.get('/posts');

    dispatch({ type: 'FETCH_POSTS', payload: response.data })
};

export const fetchUser = (id) => async dispatch => {
    const response = await jsonPlaceholder.get(`/users/${ id }`);

    dispatch({ type: 'FETCH_USER', payload: response.data })
};


//LODASH EXAMPLE
// export const fetchUser = (id) => dispatch => {
//     _fetchUser(id, dispatch);
// };
//
// const _fetchUser = _.memoize(async (id, dispatch) => {
//     const response = await jsonPlaceholder.get(`/users/${ id }`);
//
//     dispatch({ type: 'FETCH_USER', payload: response.data });
// });
