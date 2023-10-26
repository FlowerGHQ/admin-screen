/*
 * @Date: 2023-10-25 17:17:03
 */
import Const from './const';

function isLocalStorageUsable() {
    const localStorageTestKey = '__localStorage_support_test';
    const localStorageTestValue = 'test';
    let isSupport = false;

    try {
        localStorage.setItem(localStorageTestKey, localStorageTestValue);
        if (
            localStorage.getItem(localStorageTestKey) === localStorageTestValue
        ) {
            isSupport = true;
        }
        localStorage.removeItem(localStorageTestKey);
        return isSupport;
    } catch (e) {
        if (
            e.name === 'QuotaExceededError' ||
            e.name === 'NS_ERROR_DOM_QUOTA_REACHED'
        ) {
            console.warn('localStorage 存储已达上限！');
        } else {
            console.warn('当前浏览器不支持 localStorage！');
        }
        return isSupport;
    }
}

function normalizeKey(key) {
    if (typeof key !== 'string') {
        console.warn(`${key} used as a key, but it is not a string.`);
        key = String(key);
    }
    return key;
}

function serialize(value, callback) {
    try {
        const valueString = JSON.stringify(value);
        callback(null, valueString);
    } catch (e) {
        callback(e);
    }
}

class StorageHandler {
    ready() {
        if (this.isSupport == null) {
            this.isSupport = isLocalStorageUsable();
        }
        return this.isSupport
    }

    setItem(key, value) {
        key = normalizeKey(key);
        if (this.ready()) {
            if (value === undefined) {
                value = null;
            }
            serialize(value, (error, valueString) => {
                if (error) {
                    return;
                }
                try {
                    // 可能会因超出最大存储空间，存储失败。
                    const FINAL_KEY = `${Const.DATA.KEY_PREFIX}${key}`;
                    localStorage.setItem(FINAL_KEY, valueString);
                } catch (e) {
                    console.log('e', e);
                }
            });
        }
    }
    getItem(key) {
        key = normalizeKey(key);
        const FINAL_KEY = `${Const.DATA.KEY_PREFIX}${key}`;
        return JSON.parse(localStorage.getItem(FINAL_KEY));
    }

    setToken(value) {
        this.setItem(Const.DATA.KEY_TOKEN, value);
    }
    getToken() {
        return this.getItem(Const.DATA.KEY_TOKEN)
    }
}

export default new StorageHandler();
