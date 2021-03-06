import { renderComponent, expect } from '../test_helper';
import App from '../../src/components/app';

//'group similar tests'
describe('App Component', () => {
  let appComponent;    
  beforeEach(() => {
    appComponent = renderComponent(App);    
  });

  //test a single attribute of a target
  it('shows the correct text', () => {    
    //make an assertion about a target
    expect(appComponent).to.contain('React Simple Starter');
    expect(appComponent).to.contain('This is the comment list');
  }); 

  it('shows a comment box', () => {
    expect(appComponent.find('.comment-box')).to.exist;
  });   

  it('shows a comment list', () => {
    expect(appComponent.find('.comment-list')).to.exist;
  });
});
