import { VideoProps } from "../types/jsonAnimationParserTypes";
import {TypeExtension} from "./abstractExtension";
import { gsap } from "gsap";
import { JsonParserGui } from "../jsonParserGui/jsonParserGui";

export default class VideoScrollerExtension extends TypeExtension {
  constructor() {
    super('video');
    console.log("comes from VideoScrollerExtension"); 
  }

  generate({
    elementProps,
    parentTimelineId,
    parserGui,
    guiIsActivated
  }: {
    elementProps: VideoProps;
    parentTimelineId: string;
    parserGui: JsonParserGui | null;
    guiIsActivated: boolean;
  }): gsap.core.Tween {
    const { params, id } = elementProps;
    const { scrollTrigger, ...gsapProperties } = params;
    let video: HTMLVideoElement;
    try {
      video = document.querySelector<HTMLVideoElement>(
        `${elementProps.target}`
      );
    } catch (error) {
      return;
    }

    if (!video) return;

    const TweenDevId = `${parentTimelineId}__${id || elementProps.target}`;

    const tween = gsap.to(elementProps.target, {
      id: TweenDevId,
      ...gsapProperties,
      scrollTrigger: {
        ...scrollTrigger,
        onUpdate: (self: any) => {
          const scrollProgress = self.progress;
          const maxTime = video?.duration;
          const currentTime = maxTime * scrollProgress;
          video.currentTime = currentTime;
        },
      },
    });

    return tween;
  }

//   get type(): string {
//     return this._type;
//   }
}
