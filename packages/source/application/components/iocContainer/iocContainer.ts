import { isset } from '../../utilities/typeGuards.utility';

class IoCContainer {
  private instances: Map<symbol, unknown> = new Map();

  public get = <T>(token: symbol): T | undefined => {
    const constructor = this.instances.get(token);
    if (!isset(constructor)) {
      console.error(`DI failed: token "${ token.description ?? 'NoName token' }" not found`);
      return undefined;
    }

    return constructor as T;
  };

  public set = <T>(token: symbol, constructor: T): void => {
    this.instances.set(token, constructor);
  };
}

export const iocContainer = new IoCContainer();
