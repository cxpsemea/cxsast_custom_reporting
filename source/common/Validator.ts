import validator from 'validator';

export function isUrl(val: string): boolean {
    return validator.isURL(val, {
        protocols: ['http', 'https'],
        require_tld: true,
        require_protocol: false,
        require_host: true,
        require_valid_protocol: true,
        allow_underscores: false,
        allow_trailing_dot: false,
        allow_protocol_relative_urls: false,
        disallow_auth: true,
    });
}

export function isFqdn(val: string): boolean {
    return validator.isFQDN(val, {
        require_tld: true,
        allow_underscores: false,
        allow_trailing_dot: false,
    });
}

export function isIPV4(val: string): boolean {
    return validator.isIP(val, '4');
}
