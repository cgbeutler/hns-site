
export enum ModelValidationState {
    Invalid = 0,
    Skipped = 1,
    Unvalidated = 2,
    Valid = 3
}

export interface ModelStateError {
    exception: object,
    errorMessage: string
}

export interface ModelStateEntry {
    rawValue: string,
    attemptedValue: string,
    errors: ModelStateError[],
    validationState: ModelValidationState,
    isContainerNode: boolean,
    children: any[]
}

export interface ModelState {
    [key: string]: ModelStateEntry
}

export interface ValidationProblemDetails {
    type: string,
    title: string,
    status: number,
    detail: string,
    instance: string,
    errors: { [key: string]: string[] }
}
