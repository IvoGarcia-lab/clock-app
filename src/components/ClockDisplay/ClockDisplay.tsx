import React from 'react';
import styled from 'styled-components';
import AnalogClock from '../AnalogClock/AnalogClock';
import DigitalClock from '../DigitalClock/DigitalClock';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2rem;
  padding: 2rem;
  background: linear-gradient(145deg, 
    ${props => props.theme.colors.primary}15,
    ${props => props.theme.colors.secondary}15
  );
  border-radius: 16px;
`;

const Title = styled.h2`
  color: ${props => props.theme.colors.primary};
  font-size: 1.5rem;
  margin-bottom: 1rem;
`;

const ClockSection = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
`;

const ClockDisplay: React.FC = () => {
  return (
    <Container>
      <Title>Relógio</Title>
      <ClockSection>
        <AnalogClock />
        <DigitalClock />
      </ClockSection>
    </Container>
  );
};

export default ClockDisplay;
