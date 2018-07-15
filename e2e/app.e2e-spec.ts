import { CoeliacAppPage } from './app.po';

describe('coeliac-app App', function() {
  let page: CoeliacAppPage;

  beforeEach(() => {
    page = new CoeliacAppPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
