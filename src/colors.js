import Color from 'color';

function coin() {
  Math.round(Math.random()) == 0;
}

function randomVal(max, min) {
  return Math.random() * (max - min) + min;
}

export function colorValue(s) {
  if (s.fontColor.value) {
    console.log(s.varyColors);
    if (s.varyColors.value === false) {
      return Color(s.fontColor.value.color)
        .alpha(s.fontColor.value.opacity)
        .rgb()
        .string();
    }

    return (word) => {
      var color = Color(s.fontColor.value.color);
      var varier = (x) => (coin() ? color.darken(x) : color.lighten(x));
      return varier(randomVal(0.75, 0.0)).rgb().string();
    };
  }

  return (
    (s.darkBackground.value || s.darkBackground.defaultValue) ?
    'random-light' : 'random-dark'
  );
}
