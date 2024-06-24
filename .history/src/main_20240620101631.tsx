import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { GSDevTools } from "gsap/GSDevTools";
import GUI from "lil-gui";
import {
  VideoScrollerExtension,
  StandardTweenExtension,
  TypeExtension,
} from "./typeExtensions/typeExtensions";

import {
  ParserOptions,
  IJsonAnimationParser,
} from "./types/jsonAnimationParserTypes";

import { JsonParserGui } from "./jsonParserGui/jsonParserGui";

const lodash = require("lodash");

gsap.registerPlugin(GSDevTools);
gsap.registerPlugin(ScrollTrigger);

export default class jsonAnimationParser implements IJsonAnimationParser {
  private _gsDevTool: any = null;
  private _activatedDevTools = {
    gsDevToolIsActivated: false,
    guiIsActivated: false,
  };
  private _parserGui: JsonParserGui | null;
  private _options: ParserOptions;
  private _typeExtensions: { [key: string]: any } = {
    video: VideoScrollerExtension,
    tween: StandardTweenExtension,
  };
  public jsonToParserModified: Array<object> | null = null;
  public jsonToParserInitial: Array<object> | null = null;

  constructor({
    activateGSDevTool = false,
    activateGUI = false,
    options = {},
    extensions = [],
  }: {
    activateGSDevTool: boolean;
    activateGUI: boolean;
    options: { [key: string]: any };
    extensions: any[];
  }) {
    this._activatedDevTools.gsDevToolIsActivated = activateGSDevTool;
    this._activatedDevTools.guiIsActivated = activateGUI;
    this._options = options;
    if (activateGUI) {
      this._parserGui = new JsonParserGui({
        customDefinitions: options.customDefinitions,
        customProccessors: options.customProccessors,
        debounceWaitTime: options.debounceWaitTime,
				jsonToParser: options.jsonToParser
      });
    }

    for (let key in this._typeExtensions) {
      const extensionInstance = new this._typeExtensions[key].default();
      this._typeExtensions[key] = extensionInstance;
    }

    extensions.forEach((extension) => {
      try {
        if (extension.prototype instanceof TypeExtension) {
          const extensionInstance = new extension();
          this._typeExtensions[extensionInstance.type] = extensionInstance;
        }
      } catch (error) {
        console.error("error: ", error);
      }
    });
  }
	
	get gui(): any {
		return this._parserGui.gui;
	}

	public setGui(isActivated: boolean): void {
    this._activatedDevTools.guiIsActivated = isActivated;
    if (isActivated && this._parserGui == null) {
      this._parserGui = new JsonParserGui({
        customDefinitions: this._options.customDefinitions,
        customProccessors: this._options.customProccessors,
        debounceWaitTime: this._options.debounceWaitTime,
				jsonToParser: this.jsonToParserInitial,
      });
    } else {
      try {
        if (this._parserGui instanceof JsonParserGui) {
          this._parserGui.destroyGui();
        }
      } catch (error) {
        console.error(error);
      } finally {
        this._parserGui = null;
      }
    }
  }

	get gsDevTool(): any {
    return this._gsDevTool;
  }

  public setGsDevTools(isActivated: boolean): void {
    this._activatedDevTools.gsDevToolIsActivated = isActivated;
    if (!isActivated) {
      try {
        this._gsDevTool.kill();
      } catch (error) {
        console.error(error);
      } finally {
        this._gsDevTool = null;
      }
    }
  }

  get activatedDevTools(): {
    gsDevToolIsActivated: boolean;
    guiIsActivated: boolean;
  } {
    return this._activatedDevTools;
  }

  public addItemToGui({
    targetGui,
    propertiesObject,
    propertiesToParse,
    additionalProps,
		jsonToParser
  }: {
    targetGui: GUI,
    propertiesObject: any,
    propertiesToParse: any,
    additionalProps: { [key: string]: any },
		jsonToParser: any
  }): void {
    if (this._parserGui != null && this._parserGui instanceof JsonParserGui)
      this._parserGui.addItemToGui({
        targetGui,
        propertiesObject,
        propertiesToParse,
        additionalProps,
				jsonToParser
      });
  }

  public addToTimeline({ child, timeline, params }: any): void {
    timeline.add(child, params?.position || ">");
  }

  public generateTimeline({
    timelineProps,
    parentTimelineId,
  }: {
    timelineProps: gsap.TimelineVars;
    parentTimelineId: string;
  }): gsap.core.Timeline {
    const { id, ...otherTimelineProps } = timelineProps;
    const timeline = gsap.timeline({
      id: `${parentTimelineId}__${id || "nested-timeline"}`,
      ...otherTimelineProps,
    });
    return timeline;
  }

  public generateTween({
    elementProps,
    parentTimelineId,
  }: {
    elementProps: any;
    parentTimelineId: string;
  }): gsap.core.Tween {
    let tween: GSAPTween;

    tween = this._typeExtensions[elementProps.type].generate({
      elementProps,
      parentTimelineId,
			parserGui: this._parserGui,
			guiIsActivated: this._activatedDevTools.guiIsActivated
    });

    return tween;
  }

  public setElementToAdd({
    elementProps,
    parentTimelineId,
  }: {
    elementProps: any;
    parentTimelineId: string;
  }): gsap.core.Tween | gsap.core.Timeline {
    if (elementProps?.children) {
      let timeline = this.generateTimeline({
        timelineProps: elementProps,
        parentTimelineId,
      });
      const parentTimelineIdChain = `${parentTimelineId}__${
        elementProps.id || "nested-timeline"
      }`;
      elementProps.children.forEach((childProps: any) =>
        this.addToTimeline({
          child: this.setElementToAdd({
            elementProps: childProps,
            parentTimelineId: parentTimelineIdChain,
          }),
          timeline,
          params: childProps,
        })
      );
      return timeline;
    }
    return this.generateTween({ elementProps, parentTimelineId });
  }

  public createBaseTimeline({
    jsonToParse,
    timelineId,
  }: {
    jsonToParse: any;
    timelineId: string;
  }): void {
    const baseTimeline = gsap.timeline({
      id: timelineId,
    });
		this.jsonToParserInitial = [...jsonToParse];
		this.jsonToParserModified = [...jsonToParse];

    this.jsonToParserInitial.forEach((childProps: any) => {
      this.addToTimeline({
        child: this.setElementToAdd({
          elementProps: childProps,
          parentTimelineId: timelineId,
        }),
        timeline: baseTimeline,
        params: childProps,
      });
			
    });
		
    // if (this._activatedDevTools.gsDevToolIsActivated) {
    //   this._gsDevTool = GSDevTools.create({
    //     animation: baseTimeline,
    //     paused: false,
    //     timeScale: 1,
    //     hideGlobalTimeline: true,
    //     loop: false,
    //     persist: false,
    //     id: "scene",
    //   });
    // }

		if (this._activatedDevTools.guiIsActivated && this._parserGui != null && this._parserGui instanceof JsonParserGui ) {
      this._parserGui.setJsonToParser(this.jsonToParserInitial);
    }
  }
}
