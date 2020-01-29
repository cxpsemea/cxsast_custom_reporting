import validator from 'validator';
import { statSync } from 'fs';

const isUrl = (val: string): boolean => {
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
};

const isFqdn = (val: string): boolean => {
    return validator.isFQDN(val, {
        require_tld: true,
        allow_underscores: false,
        allow_trailing_dot: false,
    });
};

const isIPV4 = (val: string): boolean => {
    return validator.isIP(val, '4');
};

const isEmpty = (_val: string): boolean => {
    if (!_val || _val === 'undefined' || _val === 'null') {
        return true;
    }

    return validator.isEmpty(String(_val), { ignore_whitespace: false });
};

const isEmail = (val: string): boolean => {
    return validator.isEmail(val, {
        allow_display_name: false,
        require_display_name: false,
        allow_utf8_local_part: false,
        require_tld: true,
        allow_ip_domain: false,
        domain_specific_validation: false,
    });
};

const isFile = (_path: string): boolean => {
    try {
        statSync(_path);
        return true;
    } catch (_e) {
        return false;
    }
};

const isInteger = (val: string): boolean => {
    return validator.isInt(val, { allow_leading_zeroes: false });
};

export { isEmail, isEmpty, isFile, isFqdn, isIPV4, isUrl, isInteger };
