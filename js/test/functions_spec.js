describe('Email Validation', function() {
    it('should return true if the email is valid', function() {
        expect(handleEmail('jeremygreen1@gmail.com')).toBe(true);
    });
    it('should return false if the email is not valid', function() {
        expect(handleEmail('str@str')).toBe(false);
    });
    it('should return false there is no email', function() {
        expect(handleEmail()).toBe(false);
    });
});