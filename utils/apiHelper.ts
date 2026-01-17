import 'dotenv/config';

type ApiEnv = 'staging' | 'dev' | 'prod';

const ENV: ApiEnv = (process.env.API_ENV as ApiEnv) || 'prod';

const BASE_URLS: Record<ApiEnv, string | undefined> = {
    staging: process.env.STAGING_URL,
    dev: process.env.DEV_URL,
    prod: process.env.PROD_URL
};
console.info(`----  `, BASE_URLS);

export const BASE_URL: string = BASE_URLS[ENV] || '';

interface ApiResponse {
    response: Response;
    body: string;
}

export async function apiGet(path: string, options: RequestInit = {}): Promise<ApiResponse> {
    const url = path.startsWith('http')
        ? path
        : `${BASE_URL.replace(/\/$/, '')}/${path.replace(/^\//, '')}`;
    const response = await fetch(url, { method: 'GET', ...options });
    const body = await response.text();
    return { response, body };
}

export async function apiPost(
    path: string,
    data: unknown = {},
    options: RequestInit = {}
): Promise<ApiResponse> {
    const url = path.startsWith('http') ? path : `${BASE_URL}${path}`;

    const response = await fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            ...(options.headers || {})
        },
        body: JSON.stringify(data),
        ...options
    });

    const body = await response.text();
    return { response, body };
}
