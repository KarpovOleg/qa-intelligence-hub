declare global {
    namespace NodeJS {
        interface ProcessEnv {
            DEV_URL: string;
            PROD_URL: string;
            STAGING_URL?: string;
            API_ENV: 'dev' | 'prod' | 'staging';
        }
    }
}

export {};
