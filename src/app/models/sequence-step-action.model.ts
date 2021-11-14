import { RobotColorsEnum } from '../enums/robot-colors.enum';
import { SequenceStepActions } from '../enums/sequence-step-actions.enum';

export interface SequenceStepAction {
  robotcolor: RobotColorsEnum;
  position: number;
  action: SequenceStepActions;
}
