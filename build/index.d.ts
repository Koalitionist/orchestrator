import GUI from 'lil-gui';

interface IJsonAnimationParser {
    setGsDevTools(isActivated: boolean): void;
    setGui(isActivated: boolean): void;
    addToTimeline({ child, timeline, params }: any): void;
    generateTimeline({ timelineProps, parentTimelineId, }: {
        timelineProps: gsap.TimelineVars;
        parentTimelineId: string;
    }): gsap.core.Timeline;
    generateTween({ elementProps, parentTimelineId, }: {
        elementProps: any;
        parentTimelineId: string;
    }): gsap.core.Tween;
    setElementToAdd({ elementProps, parentTimelineId, }: {
        elementProps: any;
        parentTimelineId: string;
    }): gsap.core.Tween | gsap.core.Timeline;
    createBaseTimeline({ jsonToParse, timelineId, }: {
        jsonToParse: any;
        timelineId: string;
    }): void;
    get gui(): any;
    get gsDevTool(): any;
    get activatedDevTools(): {
        gsDevToolIsActivated: boolean;
        guiIsActivated: boolean;
    };
}

declare class jsonAnimationParser implements IJsonAnimationParser {
    private _gsDevTool;
    private _activatedDevTools;
    private _parserGui;
    private _options;
    private _typeExtensions;
    jsonToParserModified: Array<object> | null;
    jsonToParserInitial: Array<object> | null;
    constructor({ activateGSDevTool, activateGUI, options, extensions, }: {
        activateGSDevTool: boolean;
        activateGUI: boolean;
        options: {
            [key: string]: any;
        };
        extensions: any[];
    });
    get gui(): any;
    setGui(isActivated: boolean): void;
    get gsDevTool(): any;
    setGsDevTools(isActivated: boolean): void;
    get activatedDevTools(): {
        gsDevToolIsActivated: boolean;
        guiIsActivated: boolean;
    };
    addItemToGui({ targetGui, propertiesObject, propertiesToParse, additionalProps, jsonToParser }: {
        targetGui: GUI;
        propertiesObject: any;
        propertiesToParse: any;
        additionalProps: {
            [key: string]: any;
        };
        jsonToParser: any;
    }): void;
    addToTimeline({ child, timeline, params }: any): void;
    generateTimeline({ timelineProps, parentTimelineId, }: {
        timelineProps: gsap.TimelineVars;
        parentTimelineId: string;
    }): gsap.core.Timeline;
    generateTween({ elementProps, parentTimelineId, }: {
        elementProps: any;
        parentTimelineId: string;
    }): gsap.core.Tween;
    setElementToAdd({ elementProps, parentTimelineId, }: {
        elementProps: any;
        parentTimelineId: string;
    }): gsap.core.Tween | gsap.core.Timeline;
    createBaseTimeline({ jsonToParse, timelineId, }: {
        jsonToParse: any;
        timelineId: string;
    }): void;
}

export { jsonAnimationParser as default };
