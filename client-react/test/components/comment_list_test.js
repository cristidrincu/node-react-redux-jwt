import { renderComponent, expect } from '../test_helper';
import CommentList from '../../src/components/testing-purposes/comment_list';

describe('Comment List', () => {
    let component;

    beforeEach(() => {
        const props = { comments: ['first comment', 'second comment', 'third comment'] };
        component = renderComponent(CommentList, null, props);
        
    });

    // it('shows an li for each comment', () => {
    //     expect(component.find('li').length).to.equal(3);
    // });

    // it('shows each comment that is provided', () => {
    //     expect(component).to.contain('first comment');
    //     expect(component).to.contain('second comment');
    //     expect(component).to.contain('third comment');
    // });
});