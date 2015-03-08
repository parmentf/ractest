var films = [
{"title": "Rocky","year":1976,"director":"John G. Avildsen","actors":"Sylvester Stallone/Talia Shire/Carl Weathers/Burt Young"},
{"title": "Rocky 2","year":1979,"director":"Sylvester Stallone","actors":"Sylvester Stallone/Talia Shire/Carl Weathers/Burt Young/Burgess Meredith/Tony Burton/Frank Stallone/Stu Nahan"},
{"title": "Rocky 3","year":1982,"director":"Sylvester Stallone","actors":"Sylvester Stallone/Talia Shire/Carl Weathers/Burt Young/Burgess Meredith/Mister T./Hulk Hogan/Tony Burton"},
{"title": "Last Action Hero","year":1993,"director":"John McTierman","actors":"Arnold Schwarzenegger/Austin O'Brien/Charles Dance/Bridget Wilson-Sampras"},
{"title": "Terminator","year":1984,"director":"James Cameron","actors":"Arnold Schwarzenegger/Michael Biehn/Linda Hamilton"},
{"title": "Terminator 2","year":1949,"director":"James Cameron","actors":"Arnold Schwarzenegger/Linda Hamilton/Edward Furlong/Robert Patrick"},
{"title": "Terminator 3","year":2003,"director":"Jonathan Mostow","actors":"Arnold Schwarzenegger/Nick Stahl/Claire Danes/Kristanna Loken"},
{"title": "Terminator Salvation","year":2009,"director":"Joseph McGinty Nichol","actors":"Christian Bale/Sam Worthington/Anton Yelchin/Bryce Dallas Howard"},
{"title": "Total Recall","year":1990,"director":"Paul Verhoeven","actors":"Arnold Schwarzenegger/Sharon Stone/Michael Ironside/Rachel Ticotin/Ronny Cox"},
{"title": "RoboCop","year":1987,"director":"Paul Verhoeven","actors":"Peter Weller/Nancy Allen/Ronny Cox/Kurtwood Smith/Miguel Ferrer"},
{"title": "Ghostbusters","year":1984,"director":"Ivan Reitman","actors":"Bill Murray/Dan Aykroyd/Sigourney Weaver/Harold Ramis/Rick Moranis/Ernie Hudson/Annie Potts/William Atherton"},
{"title": "Alien","year":1979,"director":"Ridley Scott","actors":"Sigourney Weaver/John Hurt/Ian Holm/Harry Dean Stanton/Tom Skerritt/Yaphet Kotto/Veronica Cartwright"},
{"title": "Avatar","year":2009,"director":"James Cameron","actors":"Sam Worthington/Zoe Saldana/Sigourney Weaver/Michelle Rodriguez/Giovanni Ribisi"},
{"title": "Lucy","year":2014,"director":"Luc Besson","actors":"Scarlett Johansson/Morgan Freeman/Choi Min-sik"},
{"title": "Le Cinquième Élément","year":1997,"director":"Luc Besson","actors":"Bruce Willis/Milla Jovovich/Ian Holm/Gary Oldman/Chris Tucker"},
{"title": "Léon","year":1994,"director":"Luc Besson","actors":"Jean Reno/Gary Oldman/Natalie Portman/Danny Aiello"},
{"title": "2001: A Space Odyssey","year":1968,"director":"Stanley Kubrick","actors":"Keir Dullea/Gary Lockwood/William Sylvester/Daniel Richter/Leonard Rossiter/Douglas Rain"},
{"title": "Prometheus","year":2012,"director":"Ridley Scott","actors":"Noomi Rapace/Michael Fassbender/Guy Pearce/Idris Elba/Logan Marshall-Green/Charlize Theron"},
{"title": "Her","year":2013,"director":"Spike Jonze","actors":"Joaquin Phoenix/Scarlett Johansson/Olivia Wilde/Amy Adams/Rooney Mara"},
{"title": "Kingdom of Heaven","year":2005,"director":"Ridley Scott","actors":"Orlando Bloom/Eva Green/Jeremy Irons/Liam Neeson"},
{"title": "Edge of Tomorrow","year":2014,"director":"Doug Liman","actors":"Emily Blunt/Tom Cruise/Bill Paxton/Charlotte Riley/Jonas Armstrong"},
{"title": "Oblivion","year":2013,"director":"Joseph Kosinski","actors":"Tom Cruise/Nikolaj Coster-Waldau/Morgan Freeman/Olga Kurylenko/Melissa Leo/Andrea Riseborough"},
{"title": "Star Wars Episode IV: A New Hope","year":1977,"director":"George Lucas","actors":"Mark Hamill/Harrison Ford/Carrie Fisher/Peter Cushing/Alec Guinness/Anthony Daniels/Kenny Baker/David Prowse/Peter Mayhew"},
{"title": "Star Wars Episode V: The Empire Strikes Back","year":1980,"director":"Irvin Kershner","actors":"Mark Hamill/Harrison Ford/Carrie Fisher/Billy Dee Williams/Anthony Daniels/David Prowse/Kenny Baker/Peter Mayhew/Frank Oz"},
{"title": "Star Wars Episode VI: Return of the Jedi","year":1983,"director":"Richard Marquand","actors":"Mark Hamill/Harrison Ford/Carrie Fisher/Billy Dee Williams/Anthony Daniels/David Prowse/Kenny Baker/Peter Mayhew/Frank Oz"},
{"title": "Star Wars Episode I: The Phantom Menace","year":1999,"director":"George Lucas","actors":"Liam Neeson/Ewan McGregor/Natalie Portman/Jake Lloyd/Ian McDiarmid/Pernilla August"},
{"title": "Star Wars Episode II: Attack of the Clones","year":2002,"director":"George Lucas","actors":"Ewan McGregor/Natalie Portman/Hayden Christensen/Christopher Lee/Samuel L. Jackson"},
{"title": "Star Wars Episode III: Revenge of the Sith","year":2005,"director":"George Lucas","actors":"Ewan McGregor/Natalie Portman/Hayden Christensen/Ian McDiarmid/Samuel L. Jackson"},
{"title": "Dracula","year":1992,"director":"Francis Ford Coppola","actors":"Gary Oldman/Winona Ryder/Anthony Hopkins/Keanu Reeves"}
];

var distinct = window.distinct = function distinct (data, field) {
  var res = {};
  res = data.reduce(function (cumul, record) {
    var current = record[field];
    if (cumul[current]) {
      cumul[current] ++;
    }
    else {
      cumul[current] = 1;
    }
    return cumul;
  },res);
  var array = [];
  Object.keys(res).forEach(function (key) {
    var o = {};
    o.field = key;
    o.value  = res[key];
    array.push(o);
  });
  return array;
};

var max = window.max = function max (data, field) {
  return data.reduce(function (m, record) {
    return m < record[field] ? record[field] : m;
  }, -Infinity);
};

var maxYearValue = max(distinct(films,'year'), 'value');

var histogram = window.histogram =  new Ractive({
  el: 'container',
  template: '#svghisto',
  data: {
    scale: function (val) {
      // quick and dirty...
      return 100 / maxYearValue * Math.abs( val );
    },
    format: function (val) {
      return val;
    },
    getColor: function (val) {
      // quick and dirty function to pick a colour - the higher the
      // temperature, the warmer the colour
      var r = Math.max(0, Math.min(255, Math.floor(2.56*(val+50))));
      var g = 100;
      var b = Math.max(0, Math.min(255, Math.floor(2.56*(50-val))));

      return 'rgb('+r+','+g+','+b+')';
    },
    distinct: distinct
  }
});

histogram.set('films', films);

histogram.set('columns', distinct(films, 'year'));
