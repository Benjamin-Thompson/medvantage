import { MedvantagecoPage } from './app.po';

describe('medvantageco App', () => {
  let page: MedvantagecoPage;

  beforeEach(() => {
    page = new MedvantagecoPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
