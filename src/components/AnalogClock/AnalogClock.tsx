import React, { useEffect, useState } from 'react';
import styled from 'styled-components';

const ClockContainer = styled.div`
  width: 300px;
  height: 300px;
  border-radius: ${props => props.theme.borderRadius.circle};
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  background: linear-gradient(135deg, 
    ${props => props.theme.colors.primary}20,
    ${props => props.theme.colors.secondary}20
  );
  border: 2px solid ${props => props.theme.colors.primary}40;
`;

const ClockFace = styled.div`
  width: 280px;
  height: 280px;
  border-radius: ${props => props.theme.borderRadius.circle};
  position: relative;
`;

interface ClockHandProps {
  rotation: number;
  length: string;
  width: string;
  color: string;
}

const ClockHand = styled.div<ClockHandProps>`
  position: absolute;
  bottom: 50%;
  left: 50%;
  transform-origin: bottom;
  transform: translateX(-50%) rotate(${props => props.rotation}deg);
  background-color: ${props => props.color};
  height: ${props => props.length};
  width: ${props => props.width};
  border-radius: ${props => props.theme.borderRadius.small};
`;

const HourMarker = styled.div<{ rotation: number }>`
  position: absolute;
  width: 2px;
  height: 15px;
  background-color: ${props => props.theme.colors.textSecondary};
  bottom: 50%;
  left: 50%;
  transform-origin: bottom;
  transform: translateX(-50%) rotate(${props => props.rotation}deg);
`;

const AnalogClock: React.FC = () => {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const hours = time.getHours() % 12;
  const minutes = time.getMinutes();
  const seconds = time.getSeconds();

  const hourRotation = (hours * 30) + (minutes * 0.5);
  const minuteRotation = minutes * 6;
  const secondRotation = seconds * 6;

  return (
    <ClockContainer>
      <ClockFace>
        {[...Array(12)].map((_, index) => (
          <HourMarker key={index} rotation={index * 30} />
        ))}
        <ClockHand
          rotation={hourRotation}
          length="80px"
          width="4px"
          color="#FF69B4"
        />
        <ClockHand
          rotation={minuteRotation}
          length="100px"
          width="3px"
          color="#FFFFFF"
        />
        <ClockHand
          rotation={secondRotation}
          length="120px"
          width="2px"
          color="#1E90FF"
        />
      </ClockFace>
    </ClockContainer>
  );
};

export default AnalogClock;
