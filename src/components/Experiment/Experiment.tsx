import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

const ExperimentContainer = styled.div`
  padding: 20px;
  border-radius: 8px;
  background: linear-gradient(145deg, 
    ${props => props.theme.colors.primary}15,
    ${props => props.theme.colors.secondary}15
  );
  margin: 20px;
  width: 300px;
`;

const Button = styled.button<{ $isActive?: boolean }>`
  padding: 10px 20px;
  margin: 5px;
  border-radius: 4px;
  background: ${props => props.$isActive 
    ? props.theme.colors.primary 
    : 'transparent'};
  color: ${props => props.$isActive 
    ? props.theme.colors.background 
    : props.theme.colors.text};
  border: 2px solid ${props => props.theme.colors.primary};
  transition: all 0.3s ease;
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 2px 8px rgba(255, 105, 180, 0.3);
  }
`;

const Display = styled.div`
  font-size: 2rem;
  margin: 20px 0;
  text-align: center;
  color: ${props => props.theme.colors.text};
`;

const ProgressBar = styled.div<{ $progress: number }>`
  width: 100%;
  height: 10px;
  background: ${props => props.theme.colors.background};
  border-radius: 5px;
  margin: 10px 0;
  overflow: hidden;
  
  &::after {
    content: '';
    display: block;
    width: ${props => props.$progress}%;
    height: 100%;
    background: linear-gradient(90deg, 
      ${props => props.theme.colors.primary}, 
      ${props => props.theme.colors.secondary}
    );
    transition: width 0.3s ease;
  }
`;

const ButtonGroup = styled.div`
  display: flex;
  justify-content: center;
  gap: 10px;
  margin: 10px 0;
`;

const Experiment: React.FC = () => {
  const [count, setCount] = useState(0);
  const [isActive, setIsActive] = useState(false);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    
    if (isActive) {
      interval = setInterval(() => {
        setCount(prev => prev + 1);
        setProgress(prev => (prev + 1) % 101);
      }, 100);
    }

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isActive]);

  const handleReset = () => {
    setCount(0);
    setProgress(0);
    setIsActive(false);
  };

  const handleToggle = () => {
    setIsActive(!isActive);
  };

  return (
    <ExperimentContainer>
      <Display>{count}</Display>
      <ProgressBar $progress={progress} />
      <ButtonGroup>
        <Button 
          $isActive={isActive} 
          onClick={handleToggle}
        >
          {isActive ? 'Pause' : 'Start'}
        </Button>
        <Button onClick={handleReset}>
          Reset
        </Button>
      </ButtonGroup>
    </ExperimentContainer>
  );
};

export default Experiment;
