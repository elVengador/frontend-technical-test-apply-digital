export const deleteObjectProperty = (object: Record<string, any>, key: string) => {
    const newObject = { ...object };
    delete newObject[key];
    return newObject;
}