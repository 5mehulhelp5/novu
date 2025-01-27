import { Injectable, NotFoundException } from '@nestjs/common';
import { NotificationTemplateRepository } from '@novu/dal';

import { UpsertControlValuesCommand, UpsertControlValuesUseCase } from '@novu/application-generic';
import { StoreControlVariablesCommand } from './store-control-variables.command';

@Injectable()
export class StoreControlVariablesUseCase {
  constructor(
    private notificationTemplateRepository: NotificationTemplateRepository,
    private upsertControlValuesUseCase: UpsertControlValuesUseCase
  ) {}

  async execute(command: StoreControlVariablesCommand) {
    const workflowExist = await this.notificationTemplateRepository.findByTriggerIdentifier(
      command.environmentId,
      command.workflowId
    );

    if (!workflowExist) {
      throw new NotFoundException('Workflow not found');
    }

    const step = workflowExist?.steps.find((item) => item.stepId === command.stepId);

    if (!step || !step._id) {
      throw new NotFoundException('Step not found');
    }

    return await this.upsertControlValuesUseCase.execute(
      UpsertControlValuesCommand.create({
        organizationId: command.organizationId,
        environmentId: command.environmentId,
        notificationStepEntity: step,
        workflowId: workflowExist._id,
        newControlValues: command.variables,
      })
    );
  }
}
