import { ControlVariablesLevelEnum } from '@novu/shared';

export class ControlValuesEntity {
  _id: string;
  createdAt: string;
  updatedAt: string;
  _environmentId: string;
  _organizationId: string;
  level: ControlVariablesLevelEnum;
  priority: number;
  inputs: Record<string, unknown>;
  controls: Record<string, unknown>;
  _workflowId: string;
  _stepId: string;
}
