import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { format } from 'date-fns';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 2rem;
  background: linear-gradient(145deg, 
    ${props => props.theme.colors.primary}10,
    ${props => props.theme.colors.secondary}10
  );
  border-radius: 12px;
  min-width: 300px;
`;

const TimeDisplay = styled.div`
  font-size: 3.5rem;
  font-weight: 600;
  color: ${props => props.theme.colors.text};
  font-family: 'Inter', monospace;
  letter-spacing: 2px;
  text-shadow: 0 0 10px ${props => props.theme.colors.primary}40;
`;

const DateDisplay = styled.div`
  font-size: 1.2rem;
  color: ${props => props.theme.colors.textSecondary};
  margin-top: 0.5rem;
`;

const AmPmIndicator = styled.span<{ $isAm: boolean }>`
  color: ${props => props.$isAm 
    ? props.theme.colors.primary 
    : props.theme.colors.secondary};
  font-size: 1rem;
  margin-left: 0.5rem;
  font-weight: 500;
`;

const DigitalClock: React.FC = () => {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const isAm = time.getHours() < 12;

  return (
    <Container>
      <TimeDisplay>
        {format(time, 'hh:mm:ss')}
        <AmPmIndicator $isAm={isAm}>
          {isAm ? 'AM' : 'PM'}
        </AmPmIndicator>
      </TimeDisplay>
      <DateDisplay>
        {format(time, 'EEEE, MMMM d, yyyy')}
      </DateDisplay>
    </Container>
  );
};

export default DigitalClock;
