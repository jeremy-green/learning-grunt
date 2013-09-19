describe('Cake Validation', function() {
  var count = 6,
  cake = new Cake();

  cake.type = 'Anniversary';
  cake.setCandles(new CandleCollection(count));
  cake.cut(count);

  it('should not be a birthday cake', function() {
    expect(cake.type).not.toBe('Birthday');
  });

  it('should be a anniversary cake', function() {
    expect(cake.type).toBe('Anniversary');
  });

  it('should be true when the candles are lit', function() {
    expect(cake.lightCandles()).toBeTruthy();
  });

  it('should still have some slices available', function() {
    expect(cake.eat()).toBeTruthy();
    expect(cake.slices.length).toBeLessThan(count);
    expect(cake.slices.length).toBeGreaterThan(0);
  });

  it('should have a name', function() {
    var name = 'Jeremy';
    expect(cake.setName(name)).toBe(name);
  });

  it('should throw an error when there\'s no name', function() {
    expect(cake.setName()).toBeFalsy();
  });

  it('should have a message', function() {
    var message = 'Happy Anniversary';
    expect(cake.setMessage(message)).toBe(message);
  });

});


describe('Candle Validation', function() {
  var candle = new Candle(),
  count = 5;

  it('candlecollection should have x candles', function() {
    expect(new CandleCollection(count)).not.toBeLessThan(count);
  });

  it('should have a default color of red', function() {
    expect(candle.color).toBe('#f00');
  });

  it('should be able to have a new color assigned to it', function() {
    candle.color = '#ff0';
    expect(candle.color).toBe('#ff0');
  });

  it('should return true when it\'s lit', function() {
    expect(candle.light()).toBeTruthy();
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

});