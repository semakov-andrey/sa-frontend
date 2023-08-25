import { isset } from '../../utilities/typeGuards.utilities';

export class IoCContainer<Instances> {
  private instances: Partial<Instances> = {};

  private isset = <Token extends keyof Instances>(
    instance: Partial<Instances>[Token]
  ): instance is Instances[Token] =>
    isset(instance);

  public get = <Token extends keyof Instances>(token: Token & symbol): Instances[Token] | never => {
    const instance = this.instances[token];

    if (!this.isset(instance)) {
      throw new Error(`DI failed: token "${ token.description ?? 'NoName token' }" not found`);
    }

    return instance;
  };

  public set = <Token extends keyof Instances>(token: Token, instance: Instances[Token]): void => {
    this.instances[token] = instance;
  };
}
