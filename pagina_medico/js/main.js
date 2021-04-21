


(function() {
  "use strict";
  //Jquery ok
  window.onload=function(e){
    console.log("onload")
    const locale=navigator.language;

    const localeFormat=new Intl.DateTimeFormat(locale,{weekday: 'short',  month: 'long', day: 'numeric',hour:'numeric',minute:'numeric' }).format;
    $(".date-intl").each(function(elem){
      const date=new Date(this.innerHTML);
      this.innerHTML=localeFormat(date);
      console.log(this.innerHTML)
  })

  }
  //Jquery ok
  $( document ).ready(function() {
    $("#animatebutton").click(function(){
    const element = document.querySelector('.animatebutton');
    element.classList.add('animated', 'pulse');
    setTimeout(function() {
    element.classList.remove('pulse');
    }, 1000);
    });
    
    
    });

    function update_users_count() {
      $('#users b').animate({
          counter: 1500
      }, {
          duration: 2000,
          easing: 'swing',
          step: function(now) {
              $(this).text(Math.ceil(now));
          },
          complete: update_users_count
      });
  };
  
  update_users_count();

  function update_users_count2() {
    $('#users2 b').animate({
        counter: 200
    }, {
        duration: 2000,
        easing: 'swing',
        step: function(now) {
            $(this).text(Math.ceil(now));
        },
        complete: update_users_count
    });
};

update_users_count2();

function update_users_count3() {
  $('#users3 b').animate({
      counter: 100
  }, {
      duration: 2000,
      easing: 'swing',
      step: function(now) {
          $(this).text(Math.ceil(now));
      },
      complete: update_users_count
  });
};

update_users_count3();

function update_users_count4() {
  $('#users4 b').animate({
      counter: 350
  }, {
      duration: 2000,
      easing: 'swing',
      step: function(now) {
          $(this).text(Math.ceil(now));
      },
      complete: update_users_count
  });
};

update_users_count4();

  /**
   *  selector helper function 
   */
  const select = (el, all = false) => {
    el = el.trim()
    if (all) {
      return [...document.querySelectorAll(el)]
    } else {
      return document.querySelector(el)
    }
  }
 

  /**
   *  event listener function ok
   */
  const on = (type, el, listener, all = false) => {
    let selectEl = select(el, all)
    if (selectEl) {
      if (all) {
        selectEl.forEach(e => e.addEventListener(type, listener))
      } else {
        selectEl.addEventListener(type, listener)
      }
    }
  }

  /**
   *  on scroll event listener ok
   */
  const onscroll = (el, listener) => {
    el.addEventListener('scroll', listener)
  }

 /**
   * Bottone che torna su
   */
  let backtotop = select('.back-to-top')
  if (backtotop) {
    const toggleBacktotop = () => {
      if (window.scrollY > 100) {
        backtotop.classList.add('active')
      } else {
        backtotop.classList.remove('active')
      }
    }
    window.addEventListener('load', toggleBacktotop)
    onscroll(document, toggleBacktotop)
  }

  
  

})
()