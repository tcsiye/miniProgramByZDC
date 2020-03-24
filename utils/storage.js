export const getStore = (key) => {
	const value = uni.getStorageSync(key);
	if (typeof value === 'string') {
		return JSON.parse(value);
	}
	return value;
}
export const setStore = (key, value) => {
	uni.setStorageSync(_key, JSON.stringify(value));
}

export const removeStore =  (key,success) => {
	uni.removeStorage(key: 'storage_key',
    success
}

