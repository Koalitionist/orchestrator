export const defaultTypeObject = {
    type: 'object',
}

export const defaultTypeDimension = {
    type: 'dimension',
    value: 0,
    unit: ['px','%','em','rem','vh','vw'],
}

export const defaultTypeString = {
	type: 'string',
    defaultValue: '',
}

export const defaultTypeNumber = {
	type: 'number',
    defaultValue: 0,
}

export const defaultTypeBoolean = {
	type: 'boolean',
    defaultValue: false,
}

export const defaultTypeRange = {
    type: 'range',
    min: 0,
    max: 1, 
    step: 0.1
}

export const definitionsDict = {
	opacity: {
		...defaultTypeRange,
	},
    top: {
        ...defaultTypeDimension,
    },
    immediateRender: {
        ...defaultTypeBoolean,
    },
    scrollTrigger: {
        ...defaultTypeObject,
    },
    trigger: {
        ...defaultTypeString,
    },
    start: {
        ...defaultTypeString,
    },
    end: {
        ...defaultTypeString,
    },
    scrub: {
        ...defaultTypeBoolean,
    },
    markers: {
        ...defaultTypeBoolean,
    }
}
