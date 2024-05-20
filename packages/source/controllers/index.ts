import { TRANSFER_ERRORS } from '@sa-frontend/application/contracts/ResponseTransfer/ResponseTransfer.constants';
import { type ResponseTransfer, type TransferParameters } from '@sa-frontend/application/contracts/ResponseTransfer/ResponseTransfer.contracts';
import { isKeyOfObject } from '@sa-frontend/application/utilities/typeGuards.utilities';
import { ElectronHandlerError } from '@sa-frontend/infrastructure/services/ElectronHandler/ElectronHandler.utility';

export const initControllers = <T>(handler: ResponseTransfer, controllers: T): void => {
  handler.listen(async (data: TransferParameters) => {
    const { id, controller, method, body } = data;

    if (!isKeyOfObject(controllers, controller)) {
      handler.response(id, new ElectronHandlerError(TRANSFER_ERRORS.BAD_REQUEST));
      return;
    }

    if (!isKeyOfObject(controllers[controller], method)) {
      handler.response(id, new ElectronHandlerError(TRANSFER_ERRORS.BAD_REQUEST));
      return;
    }

    const result = await (controllers[controller][method] as FunctionType)(...body as Parameters<FunctionType>);
    handler.response(data.id, result);
  });
};
