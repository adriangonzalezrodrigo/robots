import { RobotColorsEnum } from '../enums/robot-colors.enum';
import { SequenceStepAction } from './sequence-step-action.model';

export interface Robot {
  color: RobotColorsEnum;
  /**
   * Button position
   */
  position: number;
}
