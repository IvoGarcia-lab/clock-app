import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import AnalogClock from '../AnalogClock/AnalogClock';
import DigitalClock from '../DigitalClock/DigitalClock';

const DashboardContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 2rem;
  padding: 2rem;
  max-width: 1200px;
  width: 100%;
`;

const Card = styled.div`
  background: linear-gradient(145deg,
    ${props => props.theme.colors.primary}15,
    ${props => props.theme.colors.secondary}15
  );
  border-radius: 16px;
  padding: 2rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease;

  &:hover {
    transform: translateY(-5px);
  }
`;

const Title = styled.h2`
  color: ${props => props.theme.colors.primary};
  font-size: 1.5rem;
  margin-bottom: 1rem;
  text-align: center;
`;

const TabContainer = styled.div`
  display: flex;
  gap: 1rem;
  margin-bottom: 2rem;
`;

const Tab = styled.button<{ $active: boolean }>`
  padding: 0.5rem 1rem;
  border-radius: 8px;
  background: ${props => props.$active 
    ? props.theme.colors.primary 
    : 'transparent'};
  color: ${props => props.$active 
    ? props.theme.colors.background 
    : props.theme.colors.text};
  border: 2px solid ${props => props.theme.colors.primary};
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 12px ${props => props.theme.colors.primary}40;
  }
`;

const WorldTime = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  width: 100%;
`;

const TimeZoneItem = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem;
  background: ${props => props.theme.colors.background};
  border-radius: 8px;
  width: 100%;
`;

const City = styled.span`
  color: ${props => props.theme.colors.text};
  font-weight: 500;
`;

const Time = styled.span`
  color: ${props => props.theme.colors.primary};
  font-family: 'Inter', monospace;
  font-weight: 600;
`;

const Dashboard: React.FC = () => {
  const [activeTab, setActiveTab] = useState('clocks');
  const [currentTime, setCurrentTime] = useState(new Date());

  const timeZones = [
    { city: 'Nova York', offset: -4 },
    { city: 'Londres', offset: 1 },
    { city: 'Tóquio', offset: 9 },
    { city: 'Sydney', offset: 10 },
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const getTimeInTimeZone = (offset: number) => {
    const utc = currentTime.getTime() + (currentTime.getTimezoneOffset() * 60000);
    const newDate = new Date(utc + (3600000 * offset));
    return newDate.toLocaleTimeString('pt-BR', {
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: false
    });
  };

  return (
    <>
      <TabContainer>
        <Tab 
          $active={activeTab === 'clocks'} 
          onClick={() => setActiveTab('clocks')}
        >
          Relógios
        </Tab>
        <Tab 
          $active={activeTab === 'world'} 
          onClick={() => setActiveTab('world')}
        >
          Horário Mundial
        </Tab>
      </TabContainer>
      
      {activeTab === 'clocks' ? (
        <DashboardContainer>
          <Card>
            <Title>Relógio Analógico</Title>
            <AnalogClock />
          </Card>
          <Card>
            <Title>Relógio Digital</Title>
            <DigitalClock />
          </Card>
        </DashboardContainer>
      ) : (
        <DashboardContainer>
          <Card>
            <Title>Horários no Mundo</Title>
            <WorldTime>
              {timeZones.map(({ city, offset }) => (
                <TimeZoneItem key={city}>
                  <City>{city}</City>
                  <Time>{getTimeInTimeZone(offset)}</Time>
                </TimeZoneItem>
              ))}
            </WorldTime>
          </Card>
          <Card>
            <Title>Seu Horário Local</Title>
            <DigitalClock />
          </Card>
        </DashboardContainer>
      )}
    </>
  );
};

export default Dashboard;
