import { AsyncLocalStorage } from 'node:async_hooks';

const als = new AsyncLocalStorage<string>();

export function runWithClientId<T>(clientId: string, fn: () => T) {
    return als.run(clientId, fn);
}

export function getClientId(): string {
    const id = als.getStore();
    if (!id) throw new Error('ClientId no disponible en el contexto');
    return id;
}