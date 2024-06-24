import GUI from "lil-gui";
import { ScrollTrigger } from "gsap/ScrollTrigger";
const lodash = require("lodash");

interface ThisContext {
  _debounceWaitTime: number;
  createFolder: ({
    targetGui,
    folderId,
  }: {
    targetGui: GUI;
    folderId: string;
  }) => GUI;
  addItemToGui: ({targetGui, propertiesObject, propertiesToParse, additionalProps, jsonToParser}: {targetGui: GUI | null, propertiesObject: any, propertiesToParse: any, additionalProps: {[key: string]: any}, jsonToParser: any}) => void;
}

function setRangeTypeToGui(
  this: ThisContext,
  {
  targetGui,
  propertiesObject,
  propertyDefinition,
  propertyKey,
  propertyValue,
  additionalProps,
  jsonToParser,
}: {
  targetGui: GUI;
  propertiesObject: any;
  propertyDefinition: any;
  propertyKey: string;
  propertyValue: any;
  additionalProps: { [key: string]: any };
  jsonToParser: any;
}): void {
  const debounceTweenRefresh: Function | null = lodash.debounce(
    (tween: gsap.core.Tween) => tween.invalidate(),
    this._debounceWaitTime
  );
  targetGui
    .add(propertiesObject, propertyKey)
    .min(propertyDefinition.min)
    .max(propertyDefinition.max)
    .step(propertyDefinition.step)
    .onChange((event: any) => {
      if (additionalProps?.isTween) {
        debounceTweenRefresh(additionalProps.tween);
      }

      if (additionalProps?.isScrolltrigger) {
        ScrollTrigger.refresh();
      }

      if (jsonToParser && jsonToParser.hasOwnProperty(propertyKey)) {
        jsonToParser[propertyKey] = event;
      }
    });
}

function setNumberTypeToGui(
  this: ThisContext,
  {
  targetGui,
  propertiesObject,
  propertyDefinition,
  propertyKey,
  propertyValue,
  additionalProps,
  jsonToParser,
}: {
  targetGui: GUI;
  propertiesObject: any;
  propertyDefinition: any;
  propertyKey: string;
  propertyValue: any;
  additionalProps: { [key: string]: any };
  jsonToParser: any;
}): void {
  const debounceTweenRefresh: Function | null = lodash.debounce(
    (tween: gsap.core.Tween) => tween.invalidate(),
    this._debounceWaitTime
  );
  targetGui.add(propertiesObject, propertyKey).onChange((event: any) => {
    if (additionalProps?.isTween) {
      debounceTweenRefresh(additionalProps.tween);
    }

    if (additionalProps?.isScrolltrigger) {
      ScrollTrigger.refresh();
    }

    if (jsonToParser && jsonToParser.hasOwnProperty(propertyKey)) {
      jsonToParser[propertyKey] = event;
    }
  });
}

function setStringTypeToGui(
  this: ThisContext,
  {
  targetGui,
  propertiesObject,
  propertyDefinition,
  propertyKey,
  propertyValue,
  additionalProps,
  jsonToParser,
}: {
  targetGui: GUI;
  propertiesObject: any;
  propertyDefinition: any;
  propertyKey: string;
  propertyValue: any;
  additionalProps: { [key: string]: any };
  jsonToParser: any;
}): void {
  const debounceTweenRefresh: Function | null = lodash.debounce(
    (tween: gsap.core.Tween) => tween.invalidate(),
    this._debounceWaitTime
  );
  targetGui.add(propertiesObject, propertyKey).onChange((event: any) => {
    if (additionalProps?.isTween) {
      debounceTweenRefresh(additionalProps.tween);
    }

    if (additionalProps?.isScrolltrigger) {
      ScrollTrigger.refresh();
    }

    if (jsonToParser && jsonToParser.hasOwnProperty(propertyKey)) {
      jsonToParser[propertyKey] = event;
    }
  });
}

function setBooleanTypeToGui(
  this: ThisContext,
  {
  targetGui,
  propertiesObject,
  propertyDefinition,
  propertyKey,
  propertyValue,
  additionalProps,
  jsonToParser,
}: {
  targetGui: GUI;
  propertiesObject: any;
  propertyDefinition: any;
  propertyKey: string;
  propertyValue: any;
  additionalProps: { [key: string]: any };
  jsonToParser: any;
}): void {
  const debounceTweenRefresh: Function | null = lodash.debounce(
    (tween: gsap.core.Tween) => tween.invalidate(),
    this._debounceWaitTime
  );
  targetGui.add(propertiesObject, propertyKey).onChange((event: any) => {
    if (additionalProps?.isTween) {
      debounceTweenRefresh(additionalProps.tween);
    }

    if (additionalProps?.isScrolltrigger) {
      ScrollTrigger.refresh();
    }

    if (jsonToParser && jsonToParser.hasOwnProperty(propertyKey)) {
      jsonToParser[propertyKey] = event;
    }
  });
}

function setObjectTypeToGui(
  this: ThisContext,
  {
  targetGui,
  propertiesObject,
  propertyDefinition,
  propertyKey,
  propertyValue,
  additionalProps,
  jsonToParser,
}: {
  targetGui: GUI;
  propertiesObject: any;
  propertyDefinition: any;
  propertyKey: string;
  propertyValue: any;
  additionalProps: { [key: string]: any };
  jsonToParser: any;
}): void {
  const folder = this.createFolder({ targetGui, folderId: propertyKey });
  const propObject = propertiesObject[propertyKey];
  const jsonToParseChild =
    jsonToParser && jsonToParser.hasOwnProperty(propertyKey)
      ? jsonToParser[propertyKey]
      : jsonToParser;

  this.addItemToGui({
    targetGui: folder,
    propertiesObject: propObject,
    propertiesToParse: { ...propertyValue },
    additionalProps: {
      ...additionalProps,
      isScrolltrigger: propertyKey == "scrollTrigger",
    },
    jsonToParser: jsonToParseChild,
  });
}

function setDimensionTypeToGui(
  this: ThisContext,
  {
  targetGui,
  propertiesObject,
  propertyDefinition,
  propertyKey,
  propertyValue,
  additionalProps,
  jsonToParser,
}: {
  targetGui: GUI;
  propertiesObject: any;
  propertyDefinition: any;
  propertyKey: string;
  propertyValue: any;
  additionalProps: { [key: string]: any };
  jsonToParser: any;
}): void {
  const debounceTweenRefresh: Function | null = lodash.debounce(
    (tween: gsap.core.Tween) => tween.invalidate(),
    this._debounceWaitTime
  );
  const onPropertyChange: Function = () => {
    propertiesObject[
      propertyKey
    ] = `${propObjectAux.value}${propObjectAux.unit}`;

    if (additionalProps?.isTween) {
      debounceTweenRefresh(additionalProps.tween);
    }

    if (additionalProps?.isScrolltrigger) {
      ScrollTrigger.refresh();
    }

    if (jsonToParser && jsonToParser.hasOwnProperty(propertyKey)) {
      jsonToParser[propertyKey] = `${propObjectAux.value}${propObjectAux.unit}`;
    }
  };
  const matches = propertyValue.match(/^(-?\d+)(.*)/);
  const propObjectAux: any = {
    value: matches[1],
    unit: matches[2],
  };
  const folder = this.createFolder({ targetGui, folderId: propertyKey });

  folder
    .add(propObjectAux, "value")
    .name(`${propertyKey} value`)
    .onChange((event: any) => {
      onPropertyChange();
    });
  folder
    .add(propObjectAux, "unit", [...propertyDefinition.unit])
    .name(`${propertyKey} unit`)
    .onChange((event: any) => {
      onPropertyChange();
    });
}

export const definitionsHandlersDict = {
  range: setRangeTypeToGui,
  string: setStringTypeToGui,
  number: setNumberTypeToGui,
  boolean: setBooleanTypeToGui,
  object: setObjectTypeToGui,
  dimension: setDimensionTypeToGui,
};
