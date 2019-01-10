declare global {
    interface String {
        isEmpty(): boolean;
        isIn(...args: any[]): boolean;
        isEmptyOrWhiteSpace(): boolean;
    }
}

String.prototype.isEmpty = function (): boolean {
    return (!this || this.length === 0);
};

String.prototype.isEmptyOrWhiteSpace = function (): boolean {
    return (!this || this.length === 0 || !this.trim());
};

String.prototype.isIn = function (...args: any[]): boolean {
    if (!this || this.length === 0) {
        return false;
    }

    for (var i = 0; i < args.length; i++) {
        if (args[i] == this)
            return true;
    }

    return false;
};

export { };