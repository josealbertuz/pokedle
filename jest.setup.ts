import '@testing-library/jest-dom'

const mockedLocalStorage = (() => {

    let fakeLocalStorage: {[key: string]: string} = {}

    return {
        setItem: (key: string, value: string) => fakeLocalStorage[key] = value,
        getItem: (key: string) => fakeLocalStorage[key],
        clear: () => {
            fakeLocalStorage = {}
        },
        removeItem: (key: string) => {
            delete fakeLocalStorage[key]
        }
    }

})()

Object.defineProperty(global, 'Storage', {
    value: mockedLocalStorage
})