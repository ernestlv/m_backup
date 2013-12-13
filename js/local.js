if( typeof(SNI) == "undefined" ) { SNI = {}; }
if( typeof(SNI.M) == "undefined" ) { SNI.M = {}; }

SNI.M.SPEED = 250;

// carousel date picker
// TODO: extend to include swipe, tap events

SNI.M.carousel = function() {
  $(".date-picker").jCarouselLite({
      btnNext: ".next",
      btnPrev: ".prev",
      visible: 4.3,
      start: 1,
      circular: true,
    speed: SNI.M.SPEED
  });
};

// double click to view source (debug only)
SNI.M.debug = function() { 
  var node = $('section');
  node.each(function(i, obj) {
     var the_html = $(obj).html();
     the_html = the_html.replace(/[<>]/g, function(m){
             return {
                 '<' : '&lt;',
                 '>' : '&gt;'
             }[m];
         });
     $(obj).append('<pre class="block">'+the_html+'</pre>');
  });
  node.dblclick(function () {
     $(this).css('position','relative');
     var codenode = $(this).find('pre');
     codenode
         .fadeToggle('350');
         $('html,body').animate({scrollTop: codenode.offset().top-14},SNI.M.SPEED);
  });
};

$(function() {
  // toggle templates list
  var templates = $('.warn');
  var template_list = $('.warn > ul');
  templates.hover( 
    function () {template_list.slideDown()},
    function () {template_list.slideUp()}
  );
});

// simple accordion 
// todo: change active arrow, scrollto          
SNI.M.accordion = function (elem) {

  var $selector = $(elem);

  $selector
    .filter(':nth-child(n+4)')
    .addClass('hide');

  $('dl').on('click', 'dt', function(e) {
    var $target = $(event.target);
    $(this).find('a').addClass('current');
    $(this).next()
        .slideDown(SNI.M.SPEED)
        .addClass('active')        
        .siblings('dd')
          .slideUp(SNI.M.SPEED)
          .removeClass('active');
      e.preventDefault();
    // todo: $('html,body').animate({scrollTop: $(this).offset().top-7},SNI.M.SPEED)
  });  
};

// expand list items following .expand link on "tap"
// todo: figure out how to scroll to top of clicked header
SNI.M.expose = function(elem) {

  var $link = $(elem);
  var $list = $(elem + '~ div');

  $list
    .addClass('hide');

  $link.on('click', $list, function(e) {
    $(this).fadeOut(SNI.M.SPEED, function() {
      $(this).next()
        .fadeIn(SNI.M.SPEED);
        $('html,body').animate({scrollTop: $(this).offset().top+56},SNI.M.SPEED);
    });
  e.preventDefault();
  });
};

// toggle one element
SNI.M.toggler = function (clicked, panel) {

  var $clicked = $(clicked);
  var $panel = $(panel);

  $clicked.on('click',function() {
      $(this).toggleClass('active');
      $panel.toggle();
      return false;
  });

};

// determines height of h2 banner tag and add class
SNI.M.SizeBanner = function () {

  var b = $('.banner').find('h2'),
      h = b.height(),
      sm = 32,
      med = 49;

  if (!b.length) {
    return;
  }

  $.each(b, function (index, value) {

    console.log(index, value);

    if (h > sm && h < med) {
      b.addClass('med') 
    }

    else if (h > med) {
      b.addClass('sm');
    }

  })

};

// tooltip example for plugin
(function($){
  $.fn.tooltip = function(options) {

    var
      defaults = {
        background: '#e3e3e3',
        color: 'black',
        rounded: false
      },
    
      settings = $.extend({}, defaults, options);

      this.each(function() {
        var $this = $(this);
        var title = this.title;

        if($this.is('a') && $this.attr('title') != '') {
          this.title = '';
          $this.hover(function(e) {
            // mouse over
            $('<div id="tooltip" />')
              .appendTo('body')
              .text(title)
              .hide()
              .css({
                backgroundColor: settings.background,
              color: settings.color,
              top: e.pageY + 10,
              left: e.pageX + 20
              })
              .fadeIn(350);

            if(settings.rounded) {
              $('#tooltip').addClass('rounded');
            }
          }, function() {
            // mouse out
            $('#tooltip').remove();
          });
        }

        $this.mousemove(function(e) {
          $('#tooltip').css({
            top: e.pageY + 10,
            left: e.pageX + 20
             });
        });
      });
      // returns the jQuery object to allow for chainability.
      return this;
  }
})(jQuery);