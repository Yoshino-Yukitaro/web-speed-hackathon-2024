import { useId } from "react";
import styled from "styled-components";

import { QUESTION } from "../constants/Question";
import { Color, Space, Typography } from '../styles/variables';

import { Spacer } from "./Spacer";
import { Text } from "./Text";

const QuestionDialog = () => {
    const questionDialogA11yId = useId();
    const _Content = styled.section`
        white-space: pre-line;
        `;
    return (
        <_Content aria-labelledby={questionDialogA11yId} role="dialog">
        <Text as="h2" color={Color.MONO_100} id={questionDialogA11yId} typography={Typography.NORMAL16}>
          Q&A
        </Text>
        <Spacer height={Space * 1} />
        <Text as="p" color={Color.MONO_100} typography={Typography.NORMAL12}>
          {QUESTION}
        </Text>
      </_Content>
    )
}

export default QuestionDialog;
