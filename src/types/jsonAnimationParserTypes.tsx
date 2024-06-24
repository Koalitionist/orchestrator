import { JsonParserGui } from "../jsonParserGui/jsonParserGui";

export type ChildProps = {
    type: string;
    target: gsap.TweenTarget;
    params: any;
}

export type VideoProps = {
    id: string;
    target: gsap.TweenTarget;
    type: string;
    params: {
        scrollTrigger?: ScrollTrigger.Vars;
        [key: string]: any; // Allow additional properties
    };
}

export type TweenProps = {
    id: string;
    target: gsap.TweenTarget;
    type: string;
    params: {
        to?: gsap.TweenVars;
        from?: gsap.TweenVars;
        [key: string]: any; // Allow additional properties
    };
}

export type TimelineProps = {
    id?: string;
    delay?: number;
}

export interface IJsonAnimationParser {
	setGsDevTools(isActivated: boolean): void;
	setGui(isActivated: boolean): void;
	// addItemToGui({ elemFolder, tween }: { elemFolder: string, tween: gsap.core.Tween }): void;
	addToTimeline({ child, timeline, params }: any): void;
	generateTimeline({
		timelineProps,
		parentTimelineId,
	}: {
		timelineProps: gsap.TimelineVars;
		parentTimelineId: string;
	}): gsap.core.Timeline;
	generateTween({
		elementProps,
		parentTimelineId,
	}: {
		elementProps: any;
		parentTimelineId: string;
	}): gsap.core.Tween;
	setElementToAdd({
		elementProps,
		parentTimelineId,
	}: {
		elementProps: any;
		parentTimelineId: string;
	}): gsap.core.Tween | gsap.core.Timeline;
	createBaseTimeline({
		jsonToParse,
		timelineId,
	}: {
		jsonToParse: any;
		timelineId: string;
	}): void;
	get gui(): any;
	get gsDevTool(): any;
	get activatedDevTools(): {gsDevToolIsActivated: boolean, guiIsActivated: boolean};
}

export type ParserOptions = {
    debounceWaitTime?: number;
    customDefinitions?: any;
    customProccessors?: any;
    jsonToParser?: Array<object> | null;
}

export type JSONData = {
    id: string;
    type: string;
    target: gsap.TweenTarget;
    params: {
        scrollTrigger?: ScrollTrigger.Vars;
        [key: string]: any; // Allow additional properties
    };
    [key: string]: any; // Allow additional properties
}

export interface ITypeExtension {
    generate({
		elementProps,
		parentTimelineId,
        parserGui,
        guiIsActivated
	}: {
		elementProps: TweenProps | VideoProps; // TODO change to correct type of elementProps
		parentTimelineId: string;
        parserGui: JsonParserGui | null;
        guiIsActivated: boolean;
	}): gsap.core.Tween;
    type: string;
}