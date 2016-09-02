import { FETCH_COMMENTS, ADD_COMMENT } from './types';

export function fetchComments() {
    return {
        type: FETCH_COMMENTS,
        payload: ['First comment', 'Second comment', 'Third comment']
    };
}

export function addCommentToList(comment) {    
    return {
        type: ADD_COMMENT,
        payload: comment 
    };
}