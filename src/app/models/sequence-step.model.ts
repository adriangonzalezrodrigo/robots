import { RobotColorsEnum } from '../enums/robot-colors.enum';

export interface SequenceStep {
  robotcolor: RobotColorsEnum;
  position: number;
}
