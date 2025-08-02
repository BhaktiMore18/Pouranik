/**
 * The Firebase AI Web SDK.
 *
 * @packageDocumentation
 */
declare global {
    interface Window {
        [key: string]: unknown;
    }
}
export * from './api';
export * from './public-types';
