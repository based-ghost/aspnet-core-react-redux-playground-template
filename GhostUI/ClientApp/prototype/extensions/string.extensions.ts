declare global {
    interface String {
        isIn(...args: any[]): boolean;
    }
}

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