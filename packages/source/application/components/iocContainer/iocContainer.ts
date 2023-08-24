import { isset } from '../../utilities/typeGuards.utilities';

class IoCContainer {
  private instances: Map<symbol, unknown> = new Map();

  public get = <T>(token: symbol): T | never => {
    const constructor = this.instances.get(token);
    if (!isset(constructor)) {
      throw new Error(`DI failed: token "${ token.description ?? 'NoName token' }" not found`);
    }

    return constructor as T;
  };

  public set = <T>(token: symbol, constructor: T): void => {
    this.instances.set(token, constructor);
  };
}

export const iocContainer = new IoCContainer();
