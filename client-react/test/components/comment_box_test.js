import { renderComponent, expect } from '../test_helper';
import CommentBox from '../../src/components/testing-purposes/comment_box';

describe('Comment Box Component Test', () => {
    let component;

    beforeEach(() => {
        //jquery object that contains our react component
        component = renderComponent(CommentBox);
    });
    
    it('has a class name of comment-box', () => {
        expect(component).to.have.class('comment-box');
    });

    it('has a text area', () => {
        expect(component.find('textarea')).to.exist;
    });

    it('has a button', () => {
        expect(component.find('button')).to.exist;
        expect(component.find('button')).to.contain('Submit comment');
    });
});