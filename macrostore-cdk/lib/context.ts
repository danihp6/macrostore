import { Constants } from "./constants";

export type Environment = 'dev' | 'pre' | 'pro';

export class Context {
  static instance?: Context;
  env: Environment = 'dev';

  private constructor(env: Environment) {
    this.env = env;
  }

  static create(env: Environment) {
    if (this.instance) {
      throw Error('instance already exists');
    }
    this.instance = new Context(env);
    return this.instance;
  }

  static get() {
    if (!this.instance) {
      throw Error('instance not exists');
    }
    return this.instance;
  }

  fullName(name: string) {
    return `${Constants.appName}-${name}-${this.env}`;
  }
}
