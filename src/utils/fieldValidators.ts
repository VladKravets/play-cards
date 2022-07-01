
export const validateField = {

    required(fieldValue: string | boolean, errorsObj: ErrorsObjType, valueName: string) {
        if (!fieldValue) errorsObj[valueName] = 'Required'
    },

    minLength(fieldValue: string, errorsObj: ErrorsObjType, valueName: string, minLength: number) {
        if (fieldValue.length < minLength) errorsObj[valueName] = `Minimum field length ${minLength} characters`
    },
    
    maxLength(fieldValue: string, errorsObj: ErrorsObjType, valueName: string, maxLength: number) {
        if (fieldValue.length > maxLength) errorsObj[valueName] = `Maximum field length ${maxLength} characters`
    },

    isEmail(fieldValue: string, errorsObj: ErrorsObjType, valueName: string) {
        if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(fieldValue)) {
            errorsObj[valueName] = 'Invalid email address'
        }
    },

    isEqual(fieldValue: string, errorsObj: ErrorsObjType, valueName: string, comparedValue: string) {
        if (fieldValue !== comparedValue) errorsObj[valueName] = 'Values must be the same'
    }
}




type ErrorsObjType = {
    [name: string]: string | boolean
}