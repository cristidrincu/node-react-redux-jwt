import { expect } from '../test_helper';
import { ADD_COMMENT } from '../../src/actions/types';
import { addCommentToList } from '../../src/actions/comments';

describe('actions', () => {
    describe('addCommentToList', () => {
        let action;
        beforeEach(() => {
            action = addCommentToList('new comment');
        });

        it('has the correct type', () => {            
            expect(action.type).to.equal(ADD_COMMENT);
        });

        it('has the correct payload', () => {
            expect(action.payload).to.equal('new comment');
        });
    });
});