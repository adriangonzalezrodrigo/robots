import { SequenceStepAction } from './sequence-step-action.model';

export interface History {
  time: number;
  blueRobot: SequenceStepAction | null;
  orangeRobot: SequenceStepAction | null;
}
