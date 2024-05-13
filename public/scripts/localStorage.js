function setItemWithExpiry(key, value, ttl) {
    const now = new Date();
    const item = {
        value: value,
        expiry: now.getTime() + ttl // TTL in milliseconds
    };
    localStorage.setItem(key, JSON.stringify(item));
}

// Retrieve data and check expiry
function getItemWithExpiry(key) {
    const itemStr = localStorage.getItem(key);
    if (!itemStr) {
        return null;
    }
    const item = JSON.parse(itemStr);
    const now = new Date();
    if (now.getTime() > item.expiry) {
        // Data has expired
        localStorage.removeItem(key);
        return null;
    }
    return item.value;
}