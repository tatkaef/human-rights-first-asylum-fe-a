import React, { useEffect, useState } from 'react';
import OktaSignIn from '@okta/okta-signin-widget';
import '@okta/okta-signin-widget/dist/css/okta-sign-in.min.css';

import { config } from '../../../utils/oktaConfig';

import {
  LoginDiv,
  Header,
  InfoDiv,
  LoginButtonDiv,
  SecureLogin,
  LeftSide,
  RightSide,
  OverlayDiv,
  CloseLogin,
} from './LoginContainerStyled';
import VerticalSplitIcon from '@material-ui/icons/VerticalSplit';

const LoginContainer = () => {
  const [login, setLogin] = useState(false);

  const toggleLogin = event => {
    event.preventDefault();
    setLogin(!login);
  };

  useEffect(() => {
    const { pkce, issuer, clientId, redirectUri, scopes } = config;
    // destructure your config so that you can pass it into the required fields in your widget.
    const widget = new OktaSignIn({
      baseUrl: issuer ? issuer.split('/oauth2')[0] : '',
      clientId,
      redirectUri,
      registration: {
        // there is more we can do to handle some errors here.
      },
      features: { registration: true },
      // turning this feature on allows your widget to use Okta for user registration
      logo: require('./hrf-logo.png'),
      // add your custom logo to your signing/register widget here.
      i18n: {
        en: {
          'primaryauth.title': 'Refugee Asylum Case Database',
          // change title for your app
        },
      },
      authParams: {
        pkce,
        issuer,
        display: 'page',
        scopes,
      },
    });

    if (login) {
      widget.renderEl(
        { el: '#sign-in-widget' },
        () => {
          /**
           * In this flow, the success handler will not be called because we redirect
           * to the Okta org for the authentication workflow.
           */
        },
        err => {
          throw err;
        }
      );
    } else {
      widget.remove();
    }
  }, [login]);

  return (
    <LoginDiv>
      <Header>Welcome to Human Rights First©</Header>

      <InfoDiv>
        {/* Logo, application name, 3 icons with single line description */}
        <LeftSide>
          <img src={require('./hrf-logo.png')} alt="An Image" />
          <h2>
            Refugee <br />
            Asylum <br />
            Case <br />
            Database
          </h2>
        </LeftSide>
        <RightSide>
          <div>
            <VerticalSplitIcon style={{ fontSize: '6rem' }} />
            <p>lorem ipsum lorem ipsum lorem ipsum</p>
          </div>
          <div>
            <p>lorem ipsum lorem ipsum lorem ipsum</p>
            <VerticalSplitIcon style={{ fontSize: '6rem' }} />
          </div>
          <div>
            <VerticalSplitIcon style={{ fontSize: '6rem' }} />
            <p>lorem ipsum lorem ipsum lorem ipsum</p>
          </div>
        </RightSide>
      </InfoDiv>

      <LoginButtonDiv>
        {!login && (
          <SecureLogin onClick={toggleLogin}>Secure Login</SecureLogin>
        )}
      </LoginButtonDiv>

      {login && <div id="sign-in-widget" />}
      {login && <CloseLogin onClick={toggleLogin}>X</CloseLogin>}
      {login && <OverlayDiv></OverlayDiv>}
    </LoginDiv>
  );
};

export default LoginContainer;
