import { MidbesserPage } from './app.po';

describe('midbesser App', () => {
  let page: MidbesserPage;

  beforeEach(() => {
    page = new MidbesserPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
