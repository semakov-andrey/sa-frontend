import { type EventResponse, type EventResponseParameters } from '@sa-frontend/application/contracts/EventResponse/EventResponse.contracts';
import { TRANSFER_STATUSES } from '@sa-frontend/application/contracts/Transfer/Transfer.constants';
import { isKeyOfObject } from '@sa-frontend/application/utilities/typeGuards.utilities';
import { ElectronHandlerError } from '@sa-frontend/infrastructure/services/ElectronHandler/ElectronHandler.utility';

export const initControllers = <T>(handler: EventResponse, controllers: T): void => {
  handler.listen(async (data: EventResponseParameters) => {
    const { id, controller, method, body } = data;

    if (!isKeyOfObject(controllers, controller)) {
      handler.response(id, new ElectronHandlerError(TRANSFER_STATUSES.BAD_REQUEST));
      return;
    }

    if (!isKeyOfObject(controllers[controller], method)) {
      handler.response(id, new ElectronHandlerError(TRANSFER_STATUSES.BAD_REQUEST));
      return;
    }

    const result = await (controllers[controller][method] as FunctionType)(...body);
    handler.response(data.id, result);
  });
};
