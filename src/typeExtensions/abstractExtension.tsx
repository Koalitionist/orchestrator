import { ITypeExtension, TweenProps } from "../types/jsonAnimationParserTypes";
import { JsonParserGui } from "../jsonParserGui/jsonParserGui";

export abstract class TypeExtension implements ITypeExtension {
  private _type: string;

  constructor(type='') {
    if (this.constructor == TypeExtension) {
      throw new Error("Abstract classes can't be instantiated.");
    }

    this._type = type;
  }

  public generate({
    elementProps,
    parentTimelineId,
    parserGui,
    guiIsActivated
  }: {
    elementProps: TweenProps;
    parentTimelineId: string;
    parserGui: JsonParserGui | null;
    guiIsActivated: boolean;
  }): gsap.core.Tween {
    throw new Error("Method 'generate()' must be implemented.");
  }

  get type(): string {
      return this._type;
  }

  set type(value: string) {
      this._type = value;
  }
}