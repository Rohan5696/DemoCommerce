window.addEventListener('load', () => {
    const el = $('#app');

    // Compile Handlebar Templates
    const errorTemplate = Handlebars.compile($('#error-template').html());
    const homeTemplate = Handlebars.compile($('#home-template').html());
    const shopTemplate = Handlebars.compile($('#shop-template').html());
    const magazineTemplate = Handlebars.compile($('#magazine-template').html());
    const productTemplate = Handlebars.compile($('#product-detail').html());
    var furnitureItem, name;

    // Router Declaration
    const router = new Router({
      mode: 'history',
      page404: (path) => {
        const html = errorTemplate({
          color: 'yellow',
          title: 'Error 404 - Page NOT Found!',
          message: `The path '/${path}' does not exist on this site`,
        });
        el.html(html);
      },
    });
    router.addUriListener();
    router.add('/home', async ()  => {
        // Load home Rates
        const response = await getFurnitures();
        name = response;
        html = homeTemplate( {
          message: name
        } );
        el.html(html);
        setTimeout(displayRating,500);
      $('.card-title').on('click',  function() {
        furnitureItem = $(this).data("id");
        router.navigateTo("/productDetails");
      }); 
    });
  
    router.add('/shop', () => {
      let html = shopTemplate();
      el.html(html);
    });
    
    router.add('/magazine', () => {
      let html = magazineTemplate();
      el.html(html);
    });
    
    router.add('/productDetails', async () => {
      html = productTemplate( {
        message1: name[furnitureItem]
      } );
      el.html(html);
    });

    // Navigate app to current url
    router.navigateTo(window.location.pathname);
    
    // Highlight Active Menu on Refresh/Page Reload
    const link = $(`a[href$='${window.location.pathname}']`);
    link.addClass('active');
    
    $('a').on('click', (event) => {
      // Block browser page load
      event.preventDefault();
    
      // Highlight Active Menu on Click
      const target = $(event.target);
      $('.item').removeClass('active');
      target.addClass('active');
    
      // Navigate to clicked url
      const href = target.attr('href');
      const path = href.substr(href.lastIndexOf('/'));
      router.navigateTo(path);
    });
  
    async function getFurnitures() {
      return $.ajax({
        url: '/allfurnitures'
      });
    }
    });

    jQuery(document).ready(function($) {
        setTimeout(displayRating,500);
    });

    function displayRating(){
      let rating = $('.rating-container');
      for ( let i=0;i<rating.length;i++){
        let each = rating[i];
        let data = $(each).data("id");
        let allSpan = $(each).find('span');
        for (let j=0;j<data;j++){
          $(allSpan[j]).addClass('checked');
        }
      }
    }

