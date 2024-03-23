import { useSetAtom } from 'jotai';
import React, { Suspense, lazy } from 'react';
import styled from 'styled-components';

import { DialogContentAtom } from '../atoms/DialogContentAtom';
import { Color, Space } from '../styles/variables';

import { Box } from './Box';
import { Button } from './Button';
import { Flex } from './Flex';

const TermDialog = lazy(() => import('./TermDialog'));
const ContactDialog = lazy(() => import('./ContactDialog'));
const QuestionDialog = lazy(() => import('./QuestionDialog'));
const CompanyDialog = lazy(() => import('./CompanyDialog'));
const OverviewDialog = lazy(() => import('./OverviewDialog'));

const _Button = styled(Button)`
  color: ${Color.MONO_A};
`;

export const Footer: React.FC = () => {
  const [isClient, setIsClient] = React.useState(false);

  React.useEffect(() => {
    setIsClient(true);
  }, []);

  const updateDialogContent = useSetAtom(DialogContentAtom);

  const handleRequestToTermDialogOpen = async() => {
    //const TERM_MODULE = await import('../constants/Term');
    //const { TERM } = TERM_MODULE;
    updateDialogContent(
      <Suspense fallback={null}>
        <TermDialog />
      </Suspense>,
    );
  };

  const handleRequestToContactDialogOpen = async () => {
    updateDialogContent(
      <Suspense fallback={null}>
        <ContactDialog />
      </Suspense>,
    );
  };

  const handleRequestToQuestionDialogOpen = async() => {
    updateDialogContent(
      <Suspense fallback={null}>
        <QuestionDialog />
      </Suspense>,
    );
  };

  const handleRequestToCompanyDialogOpen = async() => {
    updateDialogContent(
      <Suspense fallback={null}>
        <CompanyDialog />
      </Suspense>,
    );
  };

  const handleRequestToOverviewDialogOpen = async() => {
    //const OVERVIEW_MODULE = await import('../constants/Overview');
    //const { OVERVIEW } = OVERVIEW_MODULE;
    updateDialogContent(
      <Suspense fallback={null}>
        <OverviewDialog />
      </Suspense>,
    );
  };

  return (
    <Box as="footer" backgroundColor={Color.Background} p={Space * 1}>
      <Flex align="flex-start" direction="column" gap={Space * 1} justify="flex-start">
        <img alt="Cyber TOON" src="/assets/cyber-toon.svg" />
        <Flex align="start" direction="row" gap={Space * 1.5} justify="center">
          <_Button disabled={!isClient} onClick={handleRequestToTermDialogOpen}>
            利用規約
          </_Button>
          <_Button disabled={!isClient} onClick={handleRequestToContactDialogOpen}>
            お問い合わせ
          </_Button>
          <_Button disabled={!isClient} onClick={handleRequestToQuestionDialogOpen}>
            Q&A
          </_Button>
          <_Button disabled={!isClient} onClick={handleRequestToCompanyDialogOpen}>
            運営会社
          </_Button>
          <_Button disabled={!isClient} onClick={handleRequestToOverviewDialogOpen}>
            Cyber TOONとは
          </_Button>
        </Flex>
      </Flex>
    </Box>
  );
};
