export {}

declare global {
    namespace NodeJS {
        interface ProcessEnv {
            NEXT_PUBLIC_GOOG_MAPS_API_KEY : string;
        }
    }
}