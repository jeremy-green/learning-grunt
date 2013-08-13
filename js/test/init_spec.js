describe('A suite', function() {
  it('contains spec with an expectation', function() {
    expect(true).toBe(true);
  });
});

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

describe('Cake Validation', function() {
  var count = 6;
  var cake = new Cake();
  cake.type = 'Anniversary';
  cake.setCandles(new CandleCollection(count));
  cake.cut(count);

  it('should not be a birthday cake', function() {
    expect(cake.type).not.toBe('Birthday');
  });
  it('should be a anniversary cake', function() {
    expect(cake.type).toBe('Anniversary');
  });
  it('candlecollection should have x candles', function() {
    expect(new CandleCollection(count)).not.toBeLessThan(count);
  });
  it('should be true when the candles are lit', function() {
    expect(cake.lightCandles()).toBe(true);
  });
  it('should still have some slices available', function() {
    expect(cake.eat()).toBe(true);
  });
});

describe('Spy Work', function() {
    var count = 6;
    var cake = new Cake();
    cake.cut(count);

    beforeEach(function() {
        spyOn(cake, 'eat');
        for (var i = 0; i < cake.slices.length; i++) {
            cake.eat();
        }
    });

    it('assumes has taken a slice', function() {
        expect(cake.eat).toHaveBeenCalled();
    });

    it('assumes theres no slices left', function() {
        expect(cake.eat.calls.length).toBe(count);
    });

    //it('assumes there is no slices left', function() {
    //   expect(cake.slices.length).toBe(0);
    //});


});