import React from 'react';
import { FC } from 'react';
import {
  isRouteErrorResponse,
  useNavigate,
  useNavigation,
  useRouteError,
} from 'react-router-dom';
import styled from 'styled-components';

import { DEFAULT_ORGANIZATION_ID } from '../../models/organization';
import { DEFAULT_PROJECT_ID } from '../../models/project';
import { Mailto } from '../components/base/mailto';
import { Button } from '../components/themed-button';

const Container = styled.div({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  height: '100%',
  width: '100%',
});

const Spinner = () => <i className="fa fa-spin fa-refresh" />;

export const ErrorRoute: FC = () => {
  const error = useRouteError();
  const getErrorMessage = (err: any) => {
    if (isRouteErrorResponse(err)) {
      return err.data;
    }
    if (err instanceof Error) {
      return err.message;
    }

    return err?.message || 'Unknown error';
  };

  const navigate = useNavigate();
  const navigation = useNavigation();

  const errorMessage = getErrorMessage(error);

  return (
    <Container>
      <h1 style={{ color: 'var(--color-font)' }}>Application Error</h1>
      <p style={{ color: 'var(--color-font)' }}>
        Failed to render. Please send the following error to{' '}
        <Mailto
          email="support@insomnia.rest"
          subject="Error Report"
          body={errorMessage}
        />
        .
      </p>
      <span style={{ color: 'var(--color-font)' }}>
        <code className="selectable" style={{ wordBreak: 'break-word', margin: 'var(--padding-sm)' }}>{errorMessage}</code>
      </span>
      <Button onClick={() => navigate(`/organization/${DEFAULT_ORGANIZATION_ID}/project/${DEFAULT_PROJECT_ID}`)}>
        Try to reload the app{' '}
        <span>{navigation.state === 'loading' ? <Spinner /> : null}</span>
      </Button>
    </Container>
  );
};
