import { __extends, __rest, __assign, __spreadArray } from 'tslib';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import GUI from 'lil-gui';

var TypeExtension = /** @class */ (function () {
    function TypeExtension(type) {
        if (type === void 0) { type = ''; }
        if (this.constructor == TypeExtension) {
            throw new Error("Abstract classes can't be instantiated.");
        }
        this._type = type;
    }
    TypeExtension.prototype.generate = function (_a) {
        _a.elementProps; _a.parentTimelineId; _a.parserGui; _a.guiIsActivated;
        throw new Error("Method 'generate()' must be implemented.");
    };
    Object.defineProperty(TypeExtension.prototype, "type", {
        get: function () {
            return this._type;
        },
        set: function (value) {
            this._type = value;
        },
        enumerable: false,
        configurable: true
    });
    return TypeExtension;
}());

var VideoScrollerExtension = /** @class */ (function (_super) {
    __extends(VideoScrollerExtension, _super);
    function VideoScrollerExtension() {
        var _this = _super.call(this, 'video') || this;
        console.log("comes from VideoScrollerExtension");
        return _this;
    }
    VideoScrollerExtension.prototype.generate = function (_a) {
        var elementProps = _a.elementProps, parentTimelineId = _a.parentTimelineId; _a.parserGui; _a.guiIsActivated;
        var params = elementProps.params, id = elementProps.id;
        var scrollTrigger = params.scrollTrigger, gsapProperties = __rest(params, ["scrollTrigger"]);
        var video;
        try {
            video = document.querySelector("".concat(elementProps.target));
        }
        catch (error) {
            return;
        }
        if (!video)
            return;
        var TweenDevId = "".concat(parentTimelineId, "__").concat(id || elementProps.target);
        var tween = gsap.to(elementProps.target, __assign(__assign({ id: TweenDevId }, gsapProperties), { scrollTrigger: __assign(__assign({}, scrollTrigger), { onUpdate: function (self) {
                    var scrollProgress = self.progress;
                    var maxTime = video === null || video === void 0 ? void 0 : video.duration;
                    var currentTime = maxTime * scrollProgress;
                    video.currentTime = currentTime;
                } }) }));
        return tween;
    };
    return VideoScrollerExtension;
}(TypeExtension));

var VideoScrollerExtension$1 = /*#__PURE__*/Object.freeze({
  __proto__: null,
  default: VideoScrollerExtension
});

var StandardTweenExtension = /** @class */ (function (_super) {
    __extends(StandardTweenExtension, _super);
    function StandardTweenExtension() {
        return _super.call(this, 'tween') || this;
    }
    StandardTweenExtension.prototype.generate = function (_a) {
        var elementProps = _a.elementProps, parentTimelineId = _a.parentTimelineId, parserGui = _a.parserGui, guiIsActivated = _a.guiIsActivated;
        var tween;
        var params = elementProps.params, id = elementProps.id;
        var TweenDevId = "".concat(parentTimelineId, "__").concat(id || elementProps.target);
        if (params.to && params.from) {
            tween = gsap.fromTo(elementProps.target, __assign({ id: TweenDevId }, params.from), __assign({ id: TweenDevId }, params.to));
        }
        else if (params.to) {
            tween = gsap.to(elementProps.target, __assign({ id: TweenDevId }, params.to));
        }
        else if (params.from) {
            tween = gsap.from(elementProps.target, __assign({ id: TweenDevId }, params.from));
        }
        if (guiIsActivated && parserGui != null) {
            var folder = parserGui.createFolder({ targetGui: null, folderId: TweenDevId });
            if (params.from) {
                var folderFrom = parserGui.createFolder({ targetGui: folder, folderId: "from" });
                parserGui.addItemToGui({ targetGui: folderFrom, propertiesObject: tween.vars, propertiesToParse: params.from, additionalProps: { isTween: true, tween: tween }, jsonToParser: elementProps.params.from });
            }
            if (params.to) {
                var folderTo = parserGui.createFolder({ targetGui: folder, folderId: "to" });
                parserGui.addItemToGui({ targetGui: folderTo, propertiesObject: tween.vars, propertiesToParse: params.to, additionalProps: { isTween: true, tween: tween }, jsonToParser: elementProps.params.to });
            }
        }
        return tween;
    };
    return StandardTweenExtension;
}(TypeExtension));

var StandardTweenExtension$1 = /*#__PURE__*/Object.freeze({
  __proto__: null,
  default: StandardTweenExtension
});

var defaultTypeObject = {
    type: 'object',
};
var defaultTypeDimension = {
    type: 'dimension',
    value: 0,
    unit: ['px', '%', 'em', 'rem', 'vh', 'vw'],
};
var defaultTypeString = {
    type: 'string',
    defaultValue: '',
};
var defaultTypeNumber = {
    type: 'number',
    defaultValue: 0,
};
var defaultTypeBoolean = {
    type: 'boolean',
    defaultValue: false,
};
var defaultTypeRange = {
    type: 'range',
    min: 0,
    max: 1,
    step: 0.1
};
var definitionsDict = {
    opacity: __assign({}, defaultTypeRange),
    top: __assign({}, defaultTypeDimension),
    immediateRender: __assign({}, defaultTypeBoolean),
    scrollTrigger: __assign({}, defaultTypeObject),
    trigger: __assign({}, defaultTypeString),
    start: __assign({}, defaultTypeString),
    end: __assign({}, defaultTypeString),
    scrub: __assign({}, defaultTypeBoolean),
    markers: __assign({}, defaultTypeBoolean)
};

var lodash = require("lodash");
function setRangeTypeToGui(_a) {
    var targetGui = _a.targetGui, propertiesObject = _a.propertiesObject, propertyDefinition = _a.propertyDefinition, propertyKey = _a.propertyKey; _a.propertyValue; var additionalProps = _a.additionalProps, jsonToParser = _a.jsonToParser;
    var debounceTweenRefresh = lodash.debounce(function (tween) { return tween.invalidate(); }, this._debounceWaitTime);
    targetGui
        .add(propertiesObject, propertyKey)
        .min(propertyDefinition.min)
        .max(propertyDefinition.max)
        .step(propertyDefinition.step)
        .onChange(function (event) {
        if (additionalProps === null || additionalProps === void 0 ? void 0 : additionalProps.isTween) {
            debounceTweenRefresh(additionalProps.tween);
        }
        if (additionalProps === null || additionalProps === void 0 ? void 0 : additionalProps.isScrolltrigger) {
            ScrollTrigger.refresh();
        }
        if (jsonToParser && jsonToParser.hasOwnProperty(propertyKey)) {
            jsonToParser[propertyKey] = event;
        }
    });
}
function setNumberTypeToGui(_a) {
    var targetGui = _a.targetGui, propertiesObject = _a.propertiesObject; _a.propertyDefinition; var propertyKey = _a.propertyKey; _a.propertyValue; var additionalProps = _a.additionalProps, jsonToParser = _a.jsonToParser;
    var debounceTweenRefresh = lodash.debounce(function (tween) { return tween.invalidate(); }, this._debounceWaitTime);
    targetGui.add(propertiesObject, propertyKey).onChange(function (event) {
        if (additionalProps === null || additionalProps === void 0 ? void 0 : additionalProps.isTween) {
            debounceTweenRefresh(additionalProps.tween);
        }
        if (additionalProps === null || additionalProps === void 0 ? void 0 : additionalProps.isScrolltrigger) {
            ScrollTrigger.refresh();
        }
        if (jsonToParser && jsonToParser.hasOwnProperty(propertyKey)) {
            jsonToParser[propertyKey] = event;
        }
    });
}
function setStringTypeToGui(_a) {
    var targetGui = _a.targetGui, propertiesObject = _a.propertiesObject; _a.propertyDefinition; var propertyKey = _a.propertyKey; _a.propertyValue; var additionalProps = _a.additionalProps, jsonToParser = _a.jsonToParser;
    var debounceTweenRefresh = lodash.debounce(function (tween) { return tween.invalidate(); }, this._debounceWaitTime);
    targetGui.add(propertiesObject, propertyKey).onChange(function (event) {
        if (additionalProps === null || additionalProps === void 0 ? void 0 : additionalProps.isTween) {
            debounceTweenRefresh(additionalProps.tween);
        }
        if (additionalProps === null || additionalProps === void 0 ? void 0 : additionalProps.isScrolltrigger) {
            ScrollTrigger.refresh();
        }
        if (jsonToParser && jsonToParser.hasOwnProperty(propertyKey)) {
            jsonToParser[propertyKey] = event;
        }
    });
}
function setBooleanTypeToGui(_a) {
    var targetGui = _a.targetGui, propertiesObject = _a.propertiesObject; _a.propertyDefinition; var propertyKey = _a.propertyKey; _a.propertyValue; var additionalProps = _a.additionalProps, jsonToParser = _a.jsonToParser;
    var debounceTweenRefresh = lodash.debounce(function (tween) { return tween.invalidate(); }, this._debounceWaitTime);
    targetGui.add(propertiesObject, propertyKey).onChange(function (event) {
        if (additionalProps === null || additionalProps === void 0 ? void 0 : additionalProps.isTween) {
            debounceTweenRefresh(additionalProps.tween);
        }
        if (additionalProps === null || additionalProps === void 0 ? void 0 : additionalProps.isScrolltrigger) {
            ScrollTrigger.refresh();
        }
        if (jsonToParser && jsonToParser.hasOwnProperty(propertyKey)) {
            jsonToParser[propertyKey] = event;
        }
    });
}
function setObjectTypeToGui(_a) {
    var targetGui = _a.targetGui, propertiesObject = _a.propertiesObject; _a.propertyDefinition; var propertyKey = _a.propertyKey, propertyValue = _a.propertyValue, additionalProps = _a.additionalProps, jsonToParser = _a.jsonToParser;
    var folder = this.createFolder({ targetGui: targetGui, folderId: propertyKey });
    var propObject = propertiesObject[propertyKey];
    var jsonToParseChild = jsonToParser && jsonToParser.hasOwnProperty(propertyKey)
        ? jsonToParser[propertyKey]
        : jsonToParser;
    this.addItemToGui({
        targetGui: folder,
        propertiesObject: propObject,
        propertiesToParse: __assign({}, propertyValue),
        additionalProps: __assign(__assign({}, additionalProps), { isScrolltrigger: propertyKey == "scrollTrigger" }),
        jsonToParser: jsonToParseChild,
    });
}
function setDimensionTypeToGui(_a) {
    var targetGui = _a.targetGui, propertiesObject = _a.propertiesObject, propertyDefinition = _a.propertyDefinition, propertyKey = _a.propertyKey, propertyValue = _a.propertyValue, additionalProps = _a.additionalProps, jsonToParser = _a.jsonToParser;
    var debounceTweenRefresh = lodash.debounce(function (tween) { return tween.invalidate(); }, this._debounceWaitTime);
    var onPropertyChange = function () {
        propertiesObject[propertyKey] = "".concat(propObjectAux.value).concat(propObjectAux.unit);
        if (additionalProps === null || additionalProps === void 0 ? void 0 : additionalProps.isTween) {
            debounceTweenRefresh(additionalProps.tween);
        }
        if (additionalProps === null || additionalProps === void 0 ? void 0 : additionalProps.isScrolltrigger) {
            ScrollTrigger.refresh();
        }
        if (jsonToParser && jsonToParser.hasOwnProperty(propertyKey)) {
            jsonToParser[propertyKey] = "".concat(propObjectAux.value).concat(propObjectAux.unit);
        }
    };
    var matches = propertyValue.match(/^(-?\d+)(.*)/);
    var propObjectAux = {
        value: matches[1],
        unit: matches[2],
    };
    var folder = this.createFolder({ targetGui: targetGui, folderId: propertyKey });
    folder
        .add(propObjectAux, "value")
        .name("".concat(propertyKey, " value"))
        .onChange(function (event) {
        onPropertyChange();
    });
    folder
        .add(propObjectAux, "unit", __spreadArray([], propertyDefinition.unit, true))
        .name("".concat(propertyKey, " unit"))
        .onChange(function (event) {
        onPropertyChange();
    });
}
var definitionsHandlersDict = {
    range: setRangeTypeToGui,
    string: setStringTypeToGui,
    number: setNumberTypeToGui,
    boolean: setBooleanTypeToGui,
    object: setObjectTypeToGui,
    dimension: setDimensionTypeToGui,
};

require('lodash');
var JsonParserGui = /** @class */ (function () {
    function JsonParserGui(_a) {
        var customDefinitions = _a.customDefinitions, customProccessors = _a.customProccessors, _b = _a.debounceWaitTime, debounceWaitTime = _b === void 0 ? 1000 : _b, jsonToParser = _a.jsonToParser;
        this._definitionsDict = null;
        this._definitionsHandlers = null;
        this._gui = null;
        this._guiConfig = {
            width: 500,
            title: 'Available Tween Collection',
            closeFolders: true
        };
        this._debounceWaitTime = 1000;
        this._jsonToParser = null;
        this._definitionsDict = __assign(__assign({}, definitionsDict), customDefinitions);
        this._definitionsHandlers = __assign(__assign({}, definitionsHandlersDict), customProccessors);
        this._debounceWaitTime = debounceWaitTime;
        this._jsonToParser = jsonToParser ? jsonToParser : null;
        this._gui = new GUI(this._guiConfig);
        this.addExportJsonButton();
    }
    Object.defineProperty(JsonParserGui.prototype, "gui", {
        get: function () {
            return this._gui;
        },
        enumerable: false,
        configurable: true
    });
    JsonParserGui.prototype.destroyGui = function () {
        try {
            if (this._gui != null && this._gui instanceof GUI) {
                this._gui.destroy();
            }
        }
        catch (error) {
            console.error(error);
        }
        finally {
            this._gui = null;
        }
    };
    Object.defineProperty(JsonParserGui.prototype, "jsonToParser", {
        get: function () {
            return this._jsonToParser;
        },
        enumerable: false,
        configurable: true
    });
    JsonParserGui.prototype.exportJson = function () {
        navigator.clipboard.writeText(JSON.stringify(this._jsonToParser))
            .then(function () {
            console.log("JSON COPIED!!");
        })
            .catch(function (err) {
            console.log('Something went wrong', err);
        });
    };
    JsonParserGui.prototype.addExportJsonButton = function () {
        this._gui.add({ exportJson: this.exportJson.bind(this) }, 'exportJson');
    };
    JsonParserGui.prototype.setJsonToParser = function (jsonToParserModified) {
        this._jsonToParser = jsonToParserModified;
    };
    JsonParserGui.prototype.createFolder = function (_a) {
        var _b = _a.targetGui, targetGui = _b === void 0 ? null : _b, _c = _a.folderId, folderId = _c === void 0 ? "folder name placeholder by default" : _c;
        if (targetGui == null)
            targetGui = this._gui;
        var folder = targetGui.addFolder(folderId);
        return folder;
    };
    JsonParserGui.prototype.checkDefinitionsFromValue = function (_a) {
        var propertyValue = _a.propertyValue;
        if (typeof propertyValue === 'string') {
            if (/^-?\d+(px|%|em|rem|vh|vw)$/.test(propertyValue)) {
                return __assign({}, defaultTypeDimension);
            }
            else {
                return __assign({}, defaultTypeString);
            }
        }
        else if (typeof propertyValue === 'object') {
            return __assign({}, defaultTypeObject);
        }
        else if (typeof propertyValue === 'number') {
            return __assign({}, defaultTypeNumber);
        }
        else if (typeof propertyValue === 'boolean') {
            return __assign({}, defaultTypeBoolean);
        }
        else {
            return null;
        }
    };
    JsonParserGui.prototype.parseProperty = function (_a) {
        var targetGui = _a.targetGui, propertiesObject = _a.propertiesObject, propertyKey = _a.propertyKey, propertyValue = _a.propertyValue, additionalProps = _a.additionalProps, jsonToParser = _a.jsonToParser;
        var propertyDefinition;
        if (this._definitionsDict[propertyKey]) {
            propertyDefinition = this._definitionsDict[propertyKey];
        }
        else {
            propertyDefinition = this.checkDefinitionsFromValue({ propertyValue: propertyValue });
        }
        if (propertyDefinition != null) {
            this._definitionsHandlers[propertyDefinition.type].bind(this)({ targetGui: targetGui, propertiesObject: propertiesObject, propertyDefinition: propertyDefinition, propertyKey: propertyKey, propertyValue: propertyValue, additionalProps: additionalProps, jsonToParser: jsonToParser });
        }
    };
    JsonParserGui.prototype.parsePropertyCollection = function (_a) {
        var _this = this;
        var targetGui = _a.targetGui, propertiesObject = _a.propertiesObject, propertiesToParse = _a.propertiesToParse, additionalProps = _a.additionalProps, jsonToParser = _a.jsonToParser;
        Object.entries(propertiesToParse).map(function (_a) {
            var key = _a[0], value = _a[1];
            _this.parseProperty({ targetGui: targetGui, propertiesObject: propertiesObject, propertyKey: key, propertyValue: value, additionalProps: additionalProps, jsonToParser: jsonToParser });
        });
    };
    JsonParserGui.prototype.addItemToGui = function (_a) {
        var _b = _a.targetGui, targetGui = _b === void 0 ? null : _b, propertiesObject = _a.propertiesObject, propertiesToParse = _a.propertiesToParse, additionalProps = _a.additionalProps, jsonToParser = _a.jsonToParser;
        if (targetGui == null)
            targetGui = this._gui;
        if (targetGui != null && targetGui instanceof GUI) {
            this.parsePropertyCollection({ targetGui: targetGui, propertiesObject: propertiesObject, propertiesToParse: propertiesToParse, additionalProps: additionalProps, jsonToParser: jsonToParser });
        }
    };
    return JsonParserGui;
}());

require("lodash");
// gsap.registerPlugin(GSDevTools);
gsap.registerPlugin(ScrollTrigger);
var jsonAnimationParser = /** @class */ (function () {
    function jsonAnimationParser(_a) {
        var _b = _a.activateGSDevTool, activateGSDevTool = _b === void 0 ? false : _b, _c = _a.activateGUI, activateGUI = _c === void 0 ? false : _c, _d = _a.options, options = _d === void 0 ? {} : _d, _e = _a.extensions, extensions = _e === void 0 ? [] : _e;
        var _this = this;
        this._gsDevTool = null;
        this._activatedDevTools = {
            gsDevToolIsActivated: false,
            guiIsActivated: false,
        };
        this._typeExtensions = {
            video: VideoScrollerExtension$1,
            tween: StandardTweenExtension$1,
        };
        this.jsonToParserModified = null;
        this.jsonToParserInitial = null;
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
        for (var key in this._typeExtensions) {
            var extensionInstance = new this._typeExtensions[key].default();
            this._typeExtensions[key] = extensionInstance;
        }
        extensions.forEach(function (extension) {
            try {
                if (extension.prototype instanceof TypeExtension) {
                    var extensionInstance = new extension();
                    _this._typeExtensions[extensionInstance.type] = extensionInstance;
                }
            }
            catch (error) {
                console.error("error: ", error);
            }
        });
    }
    Object.defineProperty(jsonAnimationParser.prototype, "gui", {
        get: function () {
            return this._parserGui.gui;
        },
        enumerable: false,
        configurable: true
    });
    jsonAnimationParser.prototype.setGui = function (isActivated) {
        this._activatedDevTools.guiIsActivated = isActivated;
        if (isActivated && this._parserGui == null) {
            this._parserGui = new JsonParserGui({
                customDefinitions: this._options.customDefinitions,
                customProccessors: this._options.customProccessors,
                debounceWaitTime: this._options.debounceWaitTime,
                jsonToParser: this.jsonToParserInitial,
            });
        }
        else {
            try {
                if (this._parserGui instanceof JsonParserGui) {
                    this._parserGui.destroyGui();
                }
            }
            catch (error) {
                console.error(error);
            }
            finally {
                this._parserGui = null;
            }
        }
    };
    Object.defineProperty(jsonAnimationParser.prototype, "gsDevTool", {
        get: function () {
            return this._gsDevTool;
        },
        enumerable: false,
        configurable: true
    });
    jsonAnimationParser.prototype.setGsDevTools = function (isActivated) {
        this._activatedDevTools.gsDevToolIsActivated = isActivated;
        if (!isActivated) {
            try {
                this._gsDevTool.kill();
            }
            catch (error) {
                console.error(error);
            }
            finally {
                this._gsDevTool = null;
            }
        }
    };
    Object.defineProperty(jsonAnimationParser.prototype, "activatedDevTools", {
        get: function () {
            return this._activatedDevTools;
        },
        enumerable: false,
        configurable: true
    });
    jsonAnimationParser.prototype.addItemToGui = function (_a) {
        var targetGui = _a.targetGui, propertiesObject = _a.propertiesObject, propertiesToParse = _a.propertiesToParse, additionalProps = _a.additionalProps, jsonToParser = _a.jsonToParser;
        if (this._parserGui != null && this._parserGui instanceof JsonParserGui)
            this._parserGui.addItemToGui({
                targetGui: targetGui,
                propertiesObject: propertiesObject,
                propertiesToParse: propertiesToParse,
                additionalProps: additionalProps,
                jsonToParser: jsonToParser
            });
    };
    jsonAnimationParser.prototype.addToTimeline = function (_a) {
        var child = _a.child, timeline = _a.timeline, params = _a.params;
        timeline.add(child, (params === null || params === void 0 ? void 0 : params.position) || ">");
    };
    jsonAnimationParser.prototype.generateTimeline = function (_a) {
        var timelineProps = _a.timelineProps, parentTimelineId = _a.parentTimelineId;
        var id = timelineProps.id, otherTimelineProps = __rest(timelineProps, ["id"]);
        var timeline = gsap.timeline(__assign({ id: "".concat(parentTimelineId, "__").concat(id || "nested-timeline") }, otherTimelineProps));
        return timeline;
    };
    jsonAnimationParser.prototype.generateTween = function (_a) {
        var elementProps = _a.elementProps, parentTimelineId = _a.parentTimelineId;
        var tween;
        tween = this._typeExtensions[elementProps.type].generate({
            elementProps: elementProps,
            parentTimelineId: parentTimelineId,
            parserGui: this._parserGui,
            guiIsActivated: this._activatedDevTools.guiIsActivated
        });
        return tween;
    };
    jsonAnimationParser.prototype.setElementToAdd = function (_a) {
        var _this = this;
        var elementProps = _a.elementProps, parentTimelineId = _a.parentTimelineId;
        if (elementProps === null || elementProps === void 0 ? void 0 : elementProps.children) {
            var timeline_1 = this.generateTimeline({
                timelineProps: elementProps,
                parentTimelineId: parentTimelineId,
            });
            var parentTimelineIdChain_1 = "".concat(parentTimelineId, "__").concat(elementProps.id || "nested-timeline");
            elementProps.children.forEach(function (childProps) {
                return _this.addToTimeline({
                    child: _this.setElementToAdd({
                        elementProps: childProps,
                        parentTimelineId: parentTimelineIdChain_1,
                    }),
                    timeline: timeline_1,
                    params: childProps,
                });
            });
            return timeline_1;
        }
        return this.generateTween({ elementProps: elementProps, parentTimelineId: parentTimelineId });
    };
    jsonAnimationParser.prototype.createBaseTimeline = function (_a) {
        var _this = this;
        var jsonToParse = _a.jsonToParse, timelineId = _a.timelineId;
        var baseTimeline = gsap.timeline({
            id: timelineId,
        });
        this.jsonToParserInitial = __spreadArray([], jsonToParse, true);
        this.jsonToParserModified = __spreadArray([], jsonToParse, true);
        this.jsonToParserInitial.forEach(function (childProps) {
            _this.addToTimeline({
                child: _this.setElementToAdd({
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
        if (this._activatedDevTools.guiIsActivated && this._parserGui != null && this._parserGui instanceof JsonParserGui) {
            this._parserGui.setJsonToParser(this.jsonToParserInitial);
        }
    };
    return jsonAnimationParser;
}());

export { jsonAnimationParser as default };
