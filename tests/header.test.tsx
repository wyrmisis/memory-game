import { h } from 'preact';
import Header from '../src/components/header';
// See: https://github.com/preactjs/enzyme-adapter-preact-pure
import { shallow } from 'enzyme';

describe('Initial Test of the Header', () => {
  test('Header renders the correct title', () => {
    const context = shallow(<Header />);
    expect(context.find('h1').text()).toBe('Treasure Chest Game');
  });
});
