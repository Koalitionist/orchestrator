import * as Definitions from '../definitions/jsonAnimationParserDefinitions';
import * as DefinitionsHandlers from '../definitions/jsonAnimationParserDefinitionsHandlers';
import { ScrollTrigger } from "gsap/ScrollTrigger";

import GUI from "lil-gui";
import {
	ParserOptions,
} from "../types/jsonAnimationParserTypes";

const lodash = require('lodash');

export class JsonParserGui {
    private _definitionsDict: {[key: string]: any} | null = null;
    private _definitionsHandlers: {[key: string]: any} | null = null;
	private _gui: GUI | null = null;
    private _guiConfig: {
		width: number,
		title: string,
		closeFolders: boolean,
		[key: string]: any
	} = {
		width: 500,
		title: 'Available Tween Collection',
		closeFolders: true
	};
	private _debounceWaitTime: number = 1000;
    private _jsonToParser: Array<object> | null = null;

    constructor({ customDefinitions, customProccessors, debounceWaitTime = 1000, jsonToParser}: ParserOptions) {
        this._definitionsDict = {...Definitions.definitionsDict, ...customDefinitions};
        this._definitionsHandlers = {...DefinitionsHandlers.definitionsHandlersDict, ...customProccessors};
        this._debounceWaitTime = debounceWaitTime;
        this._jsonToParser = jsonToParser ? jsonToParser : null;
        this._gui = new GUI(this._guiConfig);
        this.addExportJsonButton();
    }

    get gui(): any {
		return this._gui;
	}

    public destroyGui(): void {
        try {
            if (this._gui != null && this._gui instanceof GUI) {
                this._gui.destroy();
            }
        } catch (error) {
            console.error(error);
        } finally {
            this._gui = null;
        }
    }
    
    get jsonToParser(): Array<object> | null {
        return this._jsonToParser;
    }

    public exportJson() {
        navigator.clipboard.writeText(JSON.stringify(this._jsonToParser))
        .then(() => {
            console.log("JSON COPIED!!");
        })
        .catch(err => {
            console.log('Something went wrong', err);
        });
    }

    public addExportJsonButton() {
        this._gui.add( {exportJson: this.exportJson.bind(this)}, 'exportJson' );
    }

    public setJsonToParser(jsonToParserModified: Array<object> | null): void {
        this._jsonToParser = jsonToParserModified;
    }

    public createFolder({targetGui = null, folderId = "folder name placeholder by default"}: {targetGui: GUI | null, folderId: string}): GUI {
        if (targetGui == null) targetGui = this._gui;
        const folder = targetGui.addFolder( folderId );
        return folder;
    }

    private checkDefinitionsFromValue({propertyValue}: {propertyValue: any}): any {
        if (typeof propertyValue === 'string') {
            if (/^-?\d+(px|%|em|rem|vh|vw)$/.test(propertyValue)) {
                return {
                    ...Definitions.defaultTypeDimension
                }
            } else {
                return {
                    ...Definitions.defaultTypeString
                }
            }
        } else if (typeof propertyValue === 'object') {
            return {
                ...Definitions.defaultTypeObject
            }
        } else if (typeof propertyValue === 'number') {
            return {
                ...Definitions.defaultTypeNumber
            }
        } else if (typeof propertyValue === 'boolean') {
            return {
                ...Definitions.defaultTypeBoolean
            }
        } else {
            return null;
        }
    }

    private parseProperty({targetGui, propertiesObject, propertyKey, propertyValue, additionalProps, jsonToParser }: {targetGui: GUI, propertiesObject: any, propertyKey: string, propertyValue: any, additionalProps: {[key: string]: any}, jsonToParser: any}): void {
        let propertyDefinition: {[key: string]: any};
        if (this._definitionsDict[propertyKey]) {
            propertyDefinition = this._definitionsDict[propertyKey];
        } else {
            propertyDefinition = this.checkDefinitionsFromValue({propertyValue});
        }
        
        if (propertyDefinition != null) {
            this._definitionsHandlers[propertyDefinition.type].bind(this)({targetGui, propertiesObject, propertyDefinition, propertyKey, propertyValue, additionalProps, jsonToParser});
        }
    }

    private parsePropertyCollection({targetGui, propertiesObject, propertiesToParse, additionalProps, jsonToParser}: {targetGui: GUI, propertiesObject: any, propertiesToParse: any, additionalProps: {[key: string]: any}, jsonToParser: any}): void {
        Object.entries(propertiesToParse).map(([key, value]: [string, any]) => {
            this.parseProperty({targetGui, propertiesObject, propertyKey: key, propertyValue: value, additionalProps, jsonToParser});
        });
    }

    public addItemToGui({targetGui = null, propertiesObject, propertiesToParse, additionalProps, jsonToParser}: {targetGui: GUI | null, propertiesObject: any, propertiesToParse: any, additionalProps: {[key: string]: any}, jsonToParser: any}): void {
		if (targetGui == null) targetGui = this._gui;

		if (targetGui != null && targetGui instanceof GUI) {
            this.parsePropertyCollection({targetGui, propertiesObject, propertiesToParse, additionalProps, jsonToParser});
		}
	}
}