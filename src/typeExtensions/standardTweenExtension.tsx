import { TweenProps } from "../types/jsonAnimationParserTypes";
import {TypeExtension} from "./abstractExtension";
import { gsap } from "gsap";
import { JsonParserGui } from "../jsonParserGui/jsonParserGui";

export default class StandardTweenExtension extends TypeExtension {
  constructor() {
    super('tween');
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
    let tween;
    const { params, id } = elementProps;
    const TweenDevId = `${parentTimelineId}__${id || elementProps.target}`;

    if (params.to && params.from) {
      tween = gsap.fromTo(
        elementProps.target,
        {
          id: TweenDevId,
          ...params.from,
        },
        {
          id: TweenDevId,
          ...params.to,
        }
      );
    } else if (params.to) {
      tween = gsap.to(elementProps.target, {
        id: TweenDevId,
        ...params.to,
      });
    } else if (params.from) {
      tween = gsap.from(elementProps.target, {
        id: TweenDevId,
        ...params.from,
      });
    }

    if (guiIsActivated && parserGui != null) {
			const folder = parserGui.createFolder({targetGui: null, folderId: TweenDevId});
			if (params.from) {
				const folderFrom = parserGui.createFolder({targetGui: folder, folderId: "from"})
				parserGui.addItemToGui({targetGui: folderFrom, propertiesObject: tween.vars, propertiesToParse: params.from, additionalProps: {isTween: true, tween: tween}, jsonToParser: elementProps.params.from});
			}
			if (params.to) {
				const folderTo = parserGui.createFolder({targetGui: folder, folderId: "to"})
				parserGui.addItemToGui({targetGui: folderTo, propertiesObject: tween.vars, propertiesToParse: params.to, additionalProps: {isTween: true, tween: tween}, jsonToParser: elementProps.params.to});
			}
		}

    return tween;
  }
}
