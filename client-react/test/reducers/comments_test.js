import { expect } from '../test_helper';
import CommentsReducer from '../../src/reducers/comments_reducer';
import { FETCH_COMMENTS, ADD_COMMENT } from '../../src/actions/types';

describe('Comments Reducer', () => {
    it('handles action with unknown type', () => {        
        //eql does a deep comparison - if this is an array, then all the values in one array are equal to the ones in the other
        //equal makes sure that one array is the identical to the other one
        //taken from chai assertion library
        expect(CommentsReducer(undefined, {})).to.eql([]);
    });

    it('handles action of type ADD_COMMENT', () => {
        const action = { type: ADD_COMMENT, payload: 'new comment' };
        expect(CommentsReducer([], action)).to.eql([ 'new comment' ]);
    });

    it('handles action of type FETCH_COMMENTS', () => {
        const action = { type: FETCH_COMMENTS, payload: ['comment1', 'comment2', 'comment 3'] };
        expect(CommentsReducer([], action)).to.eql(
            [
                { comments: ['comment1', 'comment2', 'comment 3'] }
            ]
        );
    });
});