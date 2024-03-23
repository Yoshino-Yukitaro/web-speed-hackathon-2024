import { useId } from "react";
import styled from "styled-components";

import { COMPANY } from "../constants/Company";
import { Color, Space, Typography } from '../styles/variables';

import { Spacer } from "./Spacer";
import { Text } from "./Text";

const CompanyDialog = () => {
    const companyDialogA11yId = useId();
    const _Content = styled.section`
        white-space: pre-line;
        `;
    return (
        <_Content aria-labelledby={companyDialogA11yId} role="dialog">
        <Text as="h2" color={Color.MONO_100} id={companyDialogA11yId} typography={Typography.NORMAL16}>
          運営会社
        </Text>
        <Spacer height={Space * 1} />
        <Text as="p" color={Color.MONO_100} typography={Typography.NORMAL12}>
          {COMPANY}
        </Text>
      </_Content>
    )
}

export default CompanyDialog;
