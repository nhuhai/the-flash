const hbs = require('hbs');

module.exports = function serveViews (app) {
  hbs.registerPartials(__dirname + '/views/partials');
  app.set('view engine', 'hbs');

  hbs.registerHelper('getCurrentYear', () => {
    return new Date().getFullYear();
  });

  hbs.registerHelper('screamIt', (text) => {
    return text.toUpperCase();
  })

  app.get('/', (req, res) => {
    res.render('home.hbs', {
      pageTitle: 'Home Page',
      welcomeMessage: 'welcome to my website'
    });
  });

  app.get('/about', (req, res) => {
    res.render('about.hbs', {
      pageTitle: 'About'
    });
  });

  app.get('/bad', (req, res) => {
    res.send({
      errorMessage: 'Unable to handle request'
    });
  });
};
