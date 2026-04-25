declare global {
    namespace NodeJS {
        interface ProcessEnv {
            SUT_URL?: string;
            BEDROCK_MODEL_ID?: string;
        }
    }
}

export {};
