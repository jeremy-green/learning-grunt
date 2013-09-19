describe('Email Validation', function() {
    it('should return true if the email is valid', function() {
        expect(handleEmail('email@example.com')).toBeTruthy();
    });
    it('should return false if the email is not valid', function() {
        expect(handleEmail('str@str')).toBeFalsy();
    });
    it('should return false there is no email', function() {
        expect(handleEmail()).toBeFalsy();
    });
});

describe('Random Color', function() {
    it('should not be null', function() {
        expect(randomColor()).not.toBeNull();
    });

    it('should return a random color', function() {
        expect(randomColor()).toMatch(/#?[0-9A-Fa-f]{3,6}/g);
    });
});