import { RobotColorsEnum } from '../enums/robot-colors.enum';
import { SequenceStep } from '../models/sequence-step.model';

export const SEQ1: SequenceStep[] = [
  {
    robotcolor: RobotColorsEnum.BLUE,
    position: 2
  },
  {
    robotcolor: RobotColorsEnum.BLUE,
    position: 1
  }
];

export const SEQ2: SequenceStep[] = [
  {
    robotcolor: RobotColorsEnum.ORANGE,
    position: 2
  },
  {
    robotcolor: RobotColorsEnum.BLUE,
    position: 1
  },
  {
    robotcolor: RobotColorsEnum.BLUE,
    position: 2
  },
  {
    robotcolor: RobotColorsEnum.ORANGE,
    position: 4
  }
];

export const SEQ3: SequenceStep[] = [
  {
    robotcolor: RobotColorsEnum.ORANGE,
    position: 5
  },
  {
    robotcolor: RobotColorsEnum.ORANGE,
    position: 8
  },
  {
    robotcolor: RobotColorsEnum.BLUE,
    position: 100
  }
];
