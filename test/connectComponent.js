import 'jsdom-global/register';
import chai from 'chai';
import chaiEnzyme from 'chai-enzyme';
import { mount, configure, shallow, render } from 'enzyme';
import spies from 'chai-spies';
import React from 'react';
import Adapter from 'enzyme-adapter-react-16';
import connectComponent from '../src/connectComponent';
import LoginMutation from './fixtures/mutations/Login';

configure({ adapter: new Adapter() });

chai.use(spies);
chai.use(chaiEnzyme());
const expect = chai.expect;
chai.should();

const states = {
  login: {
    mutation: LoginMutation,
    initialState: {
      username: null,
      password: null,
    },
  },
};

const LoginForm = connectComponent(states)( // eslint-disable-line
class extends React.Component {
  render() {
    return (
      <div>
        <span>component enhanced with react-relay-local</span>
      </div>
    );
  }
});

describe('connectComponent', () => {
  const testprops = { name: 'react-relay-local', foo: 'bar' };

  it('should mount', () => {
    const component = mount(<LoginForm/>);
    expect(component).to.be.present();
  });

  it('should render wrapped component', () => {
    const component = mount(<LoginForm/>);
    expect(component.html()).to.equal('<div><span>component enhanced with react-relay-local</span></div>');
  });

  it('should pass down props to wrapped component', () => {
    const component = shallow(<LoginForm {...testprops}/>);
    const componentProps = component.props();
    componentProps.should.include.keys(testprops);
  });

  it('should pass down mutation functions', () => {
    const component = shallow(<LoginForm {...testprops}/>);
    const componentProps = component.props();
    componentProps.should.include.keys('mutations');
  });

  it('should pass down mutation state', () => {
    const component = shallow(<LoginForm {...testprops}/>);
    const componentProps = component.props();
    componentProps.should.include.keys(['login']);
  });

  it('should pass down correct initial state', () => {
    const loginState = mount(<LoginForm {...testprops}/>).children().props().login;
    expect(loginState).to.deep.equal(states.login.initialState);
  });

});
