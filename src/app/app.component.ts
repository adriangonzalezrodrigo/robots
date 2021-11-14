import { Component, OnInit } from '@angular/core';
import { SEQ1, SEQ2, SEQ3 } from './constants/sequences.constants';
import { RobotColorsEnum } from './enums/robot-colors.enum';
import { SequenceStepActions } from './enums/sequence-step-actions.enum';
import { History } from './models/history.model';
import { Robot } from './models/robot.model';
import { SequenceStepAction } from './models/sequence-step-action.model';
import { SequenceStep } from './models/sequence-step.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  public orangeRobot: Robot = {
    color: RobotColorsEnum.ORANGE,
    position: 1
  };
  public blueRobot: Robot = {
    color: RobotColorsEnum.BLUE,
    position: 1
  };
  public time = 0;
  public history: History[] = [];

  ngOnInit(): void {
    // Set here the sequence to test
    this.calculateSeqTime(SEQ2);
  }

  public calculateSeqTime(sequence: SequenceStep[]): void {
    this.time = 0;
    sequence.forEach((sequenceStep: SequenceStep, index: number) => {
      let sequenceStepComplete = false;
      // Get the robot that needs to push the next button (main robot)
      const mainRobot: Robot = sequenceStep.robotcolor === RobotColorsEnum.BLUE ? this.blueRobot : this.orangeRobot;
      const secondaryRobot: Robot = sequenceStep.robotcolor === RobotColorsEnum.BLUE ? this.orangeRobot : this.blueRobot;
      do {
        // Main robot action
        const mainAction: SequenceStepAction | null = this.getMainAction(sequenceStep, mainRobot);
        if (mainAction?.action === SequenceStepActions.PRESS_BUTTON) {
          sequenceStepComplete = true;
        }
        // Secondary robot action
        const secondaryAction: SequenceStepAction | null = this.getSecondaryAction(sequence, index, secondaryRobot);

        this.time++;

        this.history.push({
          time: this.time,
          blueRobot: mainRobot.color === RobotColorsEnum.BLUE ? mainAction : secondaryAction,
          orangeRobot: mainRobot.color === RobotColorsEnum.ORANGE ? mainAction : secondaryAction,
        });
      } while (!sequenceStepComplete);
    });
  }

  private getMainAction(sequenceStep: SequenceStep, mainRobot: Robot): SequenceStepAction | null {
    let action: SequenceStepAction | null = null;
    let position = mainRobot.position;
    let robotAction: SequenceStepActions | null = null;
    if (sequenceStep.position === mainRobot.position) {
      // Push Button
      robotAction = SequenceStepActions.PRESS_BUTTON;
    } else if (mainRobot.position < sequenceStep.position) {
      // Go forward
      robotAction = SequenceStepActions.WALK;
      position = mainRobot.position + 1;
    } else if (mainRobot.position > sequenceStep.position) {
      // Go back
      robotAction = SequenceStepActions.WALK;
      position = mainRobot.position - 1;
    }
    mainRobot.position = position;
    if (position && robotAction) {
      action = this.getAction(mainRobot.color, position, robotAction);
    }
    return action;
  }

  private getSecondaryAction(sequence: SequenceStep[], index: number, secondaryRobot: Robot): SequenceStepAction | null {
    let action: SequenceStepAction | null = null;
    let position = secondaryRobot.position;
    let robotAction: SequenceStepActions | null = null;
    const nextActionForSecondaryRobot = sequence
      .find((sequenceStep: SequenceStep, sequenceStepIndex: number) => sequenceStep.robotcolor === secondaryRobot.color && sequenceStepIndex > index);
    if (!nextActionForSecondaryRobot || secondaryRobot.position === nextActionForSecondaryRobot.position) {
      // Stay
      robotAction = SequenceStepActions.STAY_AND_NOT_PRESS_BUTTON;
    } else if (secondaryRobot.position < nextActionForSecondaryRobot.position) {
      // Go forward
      robotAction = SequenceStepActions.WALK;
      position = secondaryRobot.position + 1;
    } else if (secondaryRobot.position > nextActionForSecondaryRobot.position) {
      // Go back
      robotAction = SequenceStepActions.WALK;
      position = secondaryRobot.position - 1;
    }
    secondaryRobot.position = position;
    if (position && robotAction) {
      action = this.getAction(secondaryRobot.color, position, robotAction);
    }
    return action;
  }

  private getAction(robotcolor: RobotColorsEnum, position: number, action: SequenceStepActions): SequenceStepAction {
    return {
      robotcolor,
      position,
      action
    }
  }
}
