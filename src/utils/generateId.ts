import { randomUUID } from "crypto";

export const generateId = () => {
    const id = randomUUID();
    return id.slice(id.length - 5, id.length - 1);
}