jQuery(function() {
  initMobileNav();
  initSameHeight();
  initRetinaCover();
  initStickyScrollBlock();
  initOpenClose();
  initCustomForms();
  initRangeCalc();
});

function initRangeCalc() {
  jQuery('.pricing-row').rangeCalcBox();
}

// mobile menu init
function initMobileNav() {
  jQuery('body').mobileNav({
    menuActiveClass: 'nav-active',
    menuOpener: '.nav-opener',
    hideOnClickOutside: true,
    menuDrop: '.menu-wrap'
  });
}

// open-close init
function initOpenClose() {
  jQuery('.open-close').openClose({
    activeClass: 'active',
    opener: '.opener,.btn-close',
    slider: '.slide',
    animSpeed: 400,
    hideOnClickOutside: true,
    effect: 'slide'
  });
}

// initialize custom form elements
function initCustomForms() {
  jcf.replaceAll();
}


// align blocks height
function initSameHeight() {
  jQuery('.box-row').sameHeight({
    elements: '.logo-wrap',
    flexible: true,
    multiLine: true,
    biggestHeight: true
  });

  jQuery('.pricing-row').sameHeight({
    elements: '.pricing-col',
    useMinHeight: true,
    flexible: true,
    multiLine: true,
    biggestHeight: true
  });
}

function initRetinaCover() {
  jQuery('.bg-stretch').retinaCover();
}


// initialize fixed blocks on scroll
function initStickyScrollBlock() {
  jQuery('.header').stickyScrollBlock({
    setBoxHeight: true,
    activeClass: 'fixed-position',
    container: '#wrapper',
    positionType: 'fixed',
    extraTop: function() {
      var totalHeight = 0;
      jQuery('0').each(function() {
        totalHeight += jQuery(this).outerHeight();
      });
      return totalHeight;
    }
  });
}

;(function($){
  function RangeCalcBox(options) {
    this.options = $.extend({
      range: 'input[type="range"]',
      switchers: 'input[type="radio"]',
      loginsToMonth: '.user-number',
      loginsToMonthMasked: '.user-number-masked',
      price: '.price-amount',
      pricePerTransaction: '.extra-amount',
      mask: '.',
      animClass: 'flip'
    }, options);
    this.init();
  }

  RangeCalcBox.prototype = {
    init: function() {
      this.findElements();
      this.attachEvents();
    },
    findElements: function() {
      this.holder = $(this.options.holder);
      this.valueBlock = this.holder.find(this.options.loginsToMonth);
      this.valueBlockMasked = this.holder.find(this.options.loginsToMonthMasked);
      this.price = this.holder.find(this.options.price);
      this.pricePerTransaction = this.holder.find(this.options.pricePerTransaction);
      this.range = this.holder.find(this.options.range);
      this.switchers = this.holder.find(this.options.switchers);

      this.dataPrice = this.holder.data('prices');
    },
    attachEvents: function() {
      var self = this;

      this.onRangeChange = function(e) {
        self.runFns(e.target.value);
      };
      this.onChange = function(e) {
        var input = jQuery(e.target);

        self.setPeriodVal(input);
        self.runFns(self.range.val());
        self.toggleAnimClass(input);
      };

      this.range.on('input', this.onRangeChange);
      this.switchers.on('change', this.onChange);

      this.setPeriodVal(this.switchers.filter(':checked'));
      this.runFns(this.range.val());
    },
    toggleAnimClass: function(input) {
      if (input.attr('id') === 'annual') {
        this.holder.addClass(this.options.animClass);
      } else {
        this.holder.removeClass(this.options.animClass);
      }
    },
    runFns: function(value) {
      this.setValue(+value);
      this.calcPrice(+value);
      this.changeBoundary(+value);
    },
    changeBoundary: function(value) {
      var activeBoundary = this.dataPrice.filter(function(el) {
        var from = +el.boundary[0];
        var to = +el.boundary[1];

        return value >= from && value <= to;
      });

      if(activeBoundary.length) {
        var obj = activeBoundary[0];
        var price = obj.price;
        var transactions = obj.boundary[0];

        this.valueBlockMasked.html(this.createMask(transactions));
        this.pricePerTransaction.html(price);
      }
    },
    calcPrice: function(value) {
      var priceIndex = +(this.activeData.selectorData[this.options.price]);
      var valIndex = +(this.activeData.rangeData.value);
      var index = valIndex/priceIndex;
      var result = Math.floor(value/index);

      this.price.html(result);
    },
    setPeriodVal: function(input) {
      if (!input.length) return;

      var selectorData = input.data('params');
      var rangeData = input.data('range');

      if (selectorData) {
        selectorData = JSON.parse(JSON.stringify(selectorData));
        this.setValuesToBlocks(selectorData);
      }
      if (rangeData) {
        rangeData = JSON.parse(JSON.stringify(rangeData));
        this.setParamsToRange(rangeData);
      }

      this.activeData = {
        rangeData: rangeData,
        selectorData: selectorData
      };

      if ('jcf' in window) {
        jcf.destroy(this.range);
        jcf.replace(this.range);
      }
    },
    setValuesToBlocks: function(data) {
      for (var selector in data) {
        var text = data[selector];

        var block = this.holder.find(selector);
        if (block.length) {
          block.text(text);
        }
      }
    },
    setParamsToRange: function(data) {
      this.range.prop('min', data.min);
      this.range.prop('max', data.max);
      this.range.val(data.value);
    },
    setValue: function(value) {
      this.valueBlock.html(value);
      // this.valueBlockMasked.html(this.createMask(value));
    },
    createMask: function(num) {
      var str = num.toString();
      var numLen = str.length;
      var mask = this.options.mask;

      return str.split('').reverse().map(function(el, i) {
        if ( i && i !== numLen-1 && !((i + 1) % 3) ) {
          return mask + el;
        } else {
          return el;
        }
      }).reverse().join('');
    },
    destroy: function() {
      this.range.off('input', this.onRangeChange);
      this.switchers.off('change', this.onChange);
      this.holder.removeData('RangeCalcBox');
    }
  };

  $.fn.rangeCalcBox = function(opt) {

    var args = Array.prototype.slice.call(arguments);
    var method = args[0];

    return this.each(function() {
      var $holder = jQuery(this);
      var instance = $holder.data('RangeCalcBox');

      if (typeof opt === 'object' || typeof opt === 'undefined') {
        $holder.data('RangeCalcBox', new RangeCalcBox($.extend({
          holder: this
        }, opt)));
      } else if (typeof method === 'string' && instance) {
        if (typeof instance[method] === 'function') {
          args.shift();
          instance[method].apply(instance, args);
        }
      }
    });
  };
}(jQuery));


/*
 * Simple Mobile Navigation
 */
;(function($) {
  function MobileNav(options) {
    this.options = $.extend({
      container: null,
      hideOnClickOutside: false,
      menuActiveClass: 'nav-active',
      menuOpener: '.nav-opener',
      menuDrop: '.nav-drop',
      toggleEvent: 'click',
      outsideClickEvent: 'click touchstart pointerdown MSPointerDown'
    }, options);
    this.initStructure();
    this.attachEvents();
  }
  MobileNav.prototype = {
    initStructure: function() {
      this.page = $('html');
      this.container = $(this.options.container);
      this.opener = this.container.find(this.options.menuOpener);
      this.drop = this.container.find(this.options.menuDrop);
    },
    attachEvents: function() {
      var self = this;

      if(activateResizeHandler) {
        activateResizeHandler();
        activateResizeHandler = null;
      }

      this.outsideClickHandler = function(e) {
        if(self.isOpened()) {
          var target = $(e.target);
          if(!target.closest(self.opener).length && !target.closest(self.drop).length) {
            self.hide();
          }
        }
      };

      this.openerClickHandler = function(e) {
        e.preventDefault();
        self.toggle();
      };

      this.opener.on(this.options.toggleEvent, this.openerClickHandler);
    },
    isOpened: function() {
      return this.container.hasClass(this.options.menuActiveClass);
    },
    show: function() {
      this.container.addClass(this.options.menuActiveClass);
      if(this.options.hideOnClickOutside) {
        this.page.on(this.options.outsideClickEvent, this.outsideClickHandler);
      }
    },
    hide: function() {
      this.container.removeClass(this.options.menuActiveClass);
      if(this.options.hideOnClickOutside) {
        this.page.off(this.options.outsideClickEvent, this.outsideClickHandler);
      }
    },
    toggle: function() {
      if(this.isOpened()) {
        this.hide();
      } else {
        this.show();
      }
    },
    destroy: function() {
      this.container.removeClass(this.options.menuActiveClass);
      this.opener.off(this.options.toggleEvent, this.clickHandler);
      this.page.off(this.options.outsideClickEvent, this.outsideClickHandler);
    }
  };

  var activateResizeHandler = function() {
    var win = $(window),
      doc = $('html'),
      resizeClass = 'resize-active',
      flag, timer;
    var removeClassHandler = function() {
      flag = false;
      doc.removeClass(resizeClass);
    };
    var resizeHandler = function() {
      if(!flag) {
        flag = true;
        doc.addClass(resizeClass);
      }
      clearTimeout(timer);
      timer = setTimeout(removeClassHandler, 500);
    };
    win.on('resize orientationchange', resizeHandler);
  };

  $.fn.mobileNav = function(opt) {
    var args = Array.prototype.slice.call(arguments);
    var method = args[0];

    return this.each(function() {
      var $container = jQuery(this);
      var instance = $container.data('MobileNav');

      if (typeof opt === 'object' || typeof opt === 'undefined') {
        $container.data('MobileNav', new MobileNav($.extend({
          container: this
        }, opt)));
      } else if (typeof method === 'string' && instance) {
        if (typeof instance[method] === 'function') {
          args.shift();
          instance[method].apply(instance, args);
        }
      }
    });
  };
}(jQuery));

/*
 * jQuery SameHeight plugin
 */
;(function($){
  $.fn.sameHeight = function(opt) {
    var options = $.extend({
      skipClass: 'same-height-ignore',
      leftEdgeClass: 'same-height-left',
      rightEdgeClass: 'same-height-right',
      elements: '>*',
      flexible: false,
      multiLine: false,
      useMinHeight: false,
      biggestHeight: false
    },opt);
    return this.each(function(){
      var holder = $(this), postResizeTimer, ignoreResize;
      var elements = holder.find(options.elements).not('.' + options.skipClass);
      if(!elements.length) return;

      // resize handler
      function doResize() {
        elements.css(options.useMinHeight && supportMinHeight ? 'minHeight' : 'height', '');
        if(options.multiLine) {
          // resize elements row by row
          resizeElementsByRows(elements, options);
        } else {
          // resize elements by holder
          resizeElements(elements, holder, options);
        }
      }
      doResize();

      // handle flexible layout / font resize
      var delayedResizeHandler = function() {
        if(!ignoreResize) {
          ignoreResize = true;
          doResize();
          clearTimeout(postResizeTimer);
          postResizeTimer = setTimeout(function() {
            doResize();
            setTimeout(function(){
              ignoreResize = false;
            }, 10);
          }, 100);
        }
      };

      // handle flexible/responsive layout
      if(options.flexible) {
        $(window).bind('resize orientationchange fontresize', delayedResizeHandler);
      }

      // handle complete page load including images and fonts
      $(window).bind('load', delayedResizeHandler);
    });
  };

  // detect css min-height support
  var supportMinHeight = typeof document.documentElement.style.maxHeight !== 'undefined';

  // get elements by rows
  function resizeElementsByRows(boxes, options) {
    var currentRow = $(), maxHeight, maxCalcHeight = 0, firstOffset = boxes.eq(0).offset().top;
    boxes.each(function(ind){
      var curItem = $(this);
      if(curItem.offset().top === firstOffset) {
        currentRow = currentRow.add(this);
      } else {
        maxHeight = getMaxHeight(currentRow);
        maxCalcHeight = Math.max(maxCalcHeight, resizeElements(currentRow, maxHeight, options));
        currentRow = curItem;
        firstOffset = curItem.offset().top;
      }
    });
    if(currentRow.length) {
      maxHeight = getMaxHeight(currentRow);
      maxCalcHeight = Math.max(maxCalcHeight, resizeElements(currentRow, maxHeight, options));
    }
    if(options.biggestHeight) {
      boxes.css(options.useMinHeight && supportMinHeight ? 'minHeight' : 'height', maxCalcHeight);
    }
  }

  // calculate max element height
  function getMaxHeight(boxes) {
    var maxHeight = 0;
    boxes.each(function(){
      maxHeight = Math.max(maxHeight, $(this).outerHeight());
    });
    return maxHeight;
  }

  // resize helper function
  function resizeElements(boxes, parent, options) {
    var calcHeight;
    var parentHeight = typeof parent === 'number' ? parent : parent.height();
    boxes.removeClass(options.leftEdgeClass).removeClass(options.rightEdgeClass).each(function(i){
      var element = $(this);
      var depthDiffHeight = 0;
      var isBorderBox = element.css('boxSizing') === 'border-box' || element.css('-moz-box-sizing') === 'border-box' || element.css('-webkit-box-sizing') === 'border-box';

      if(typeof parent !== 'number') {
        element.parents().each(function(){
          var tmpParent = $(this);
          if(parent.is(this)) {
            return false;
          } else {
            depthDiffHeight += tmpParent.outerHeight() - tmpParent.height();
          }
        });
      }
      calcHeight = parentHeight - depthDiffHeight;
      calcHeight -= isBorderBox ? 0 : element.outerHeight() - element.height();

      if(calcHeight > 0) {
        element.css(options.useMinHeight && supportMinHeight ? 'minHeight' : 'height', calcHeight);
      }
    });
    boxes.filter(':first').addClass(options.leftEdgeClass);
    boxes.filter(':last').addClass(options.rightEdgeClass);
    return calcHeight;
  }
}(jQuery));

/*
 * jQuery retina cover plugin
 */
;(function($) {

  'use strict';

  var styleRules = {};
  var templates = {
    '2x': [
      '(-webkit-min-device-pixel-ratio: 1.5)',
      '(min-resolution: 192dpi)',
      '(min-device-pixel-ratio: 1.5)',
      '(min-resolution: 1.5dppx)'
    ],
    '3x': [
      '(-webkit-min-device-pixel-ratio: 3)',
      '(min-resolution: 384dpi)',
      '(min-device-pixel-ratio: 3)',
      '(min-resolution: 3dppx)'
    ]
  };

  function addSimple(imageSrc, media, id) {
    var style = buildRule(id, imageSrc);

    addRule(media, style);
  }

  function addRetina(imageData, media, id) {
    var currentRules = templates[imageData[1]].slice();
    var patchedRules = currentRules;
    var style = buildRule(id, imageData[0]);

    if (media !== 'default') {
      patchedRules = $.map(currentRules, function(ele, i) {
        return ele + ' and ' + media;
      });
    }

    media = patchedRules.join(',');

    addRule(media, style);
  }

  function buildRule(id, src) {
    return '#' + id + '{background-image: url("' + src + '");}';
  }

  function addRule(media, rule) {
    var $styleTag = styleRules[media];
    var styleTagData;
    var rules = '';

    if (media === 'default') {
      rules = rule + ' ';
    } else {
      rules = '@media ' + media + '{' + rule + '}';
    }

    if (!$styleTag) {
      styleRules[media] = $('<style>').text(rules).appendTo('head');
    } else {
      styleTagData = $styleTag.text();
      styleTagData = styleTagData.substring(0, styleTagData.length - 2) + ' }' + rule + '}';
      $styleTag.text(styleTagData);
    }
  }

  $.fn.retinaCover = function() {
    return this.each(function() {
      var $block = $(this);
      var $items = $block.children('[data-srcset]');
      var id = 'bg-stretch' + Date.now() + (Math.random() * 1000).toFixed(0);

      if ($items.length) {
        $block.attr('id', id);

        $items.each(function() {
          var $item = $(this);
          var data = $item.data('srcset').split(', ');
          var media = $item.data('media') || 'default';
          var dataLength = data.length;
          var itemData;
          var i;

          for (i = 0; i < dataLength; i++) {
            itemData = data[i].split(' ');

            if (itemData.length === 1) {
              addSimple(itemData[0], media, id);
            } else {
              addRetina(itemData, media, id);
            }
          }
        });
      }

      $items.detach();
    });
  };
}(jQuery));

// Grayscale Images fix for IE10-IE11
var GrayScaleFix = (function() {
  var needToFix = /(MSIE 10)|(Trident.*rv:11\.0)|( Edge\/[\d\.]+$)/.test(navigator.userAgent);

  function replaceImage(image) {
    var tmpImage = new Image();
    tmpImage.onload = function() {
      var imgWrapper = document.createElement('span'),
        svgTemplate =
          '<svg xmlns="http://www.w3.org/2000/svg" id="svgroot" viewBox="0 0 '+tmpImage.width+' '+tmpImage.height+'" width="100%" height="100%">' +
          '<defs>' +
          '<filter id="gray">' +
          '<feColorMatrix type="matrix" values="0.3333 0.3333 0.3333 0 0 0.3333 0.3333 0.3333 0 0 0.3333 0.3333 0.3333 0 0 0 0 0 1 0" />' +
          '</filter>' +
          '</defs>' +
          '<image filter="url(&quot;#gray&quot;)" x="0" y="0" width="'+tmpImage.width+'" height="'+tmpImage.height+'" preserveAspectRatio="none" xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="'+tmpImage.src+'" />' +
          '</svg>';

      imgWrapper.innerHTML = svgTemplate;
      imgWrapper.className = 'grayscale-fix';
      image.parentNode.insertBefore(imgWrapper, image);

      image.style.cssText += 'visibility:hidden;display:block';
      imgWrapper.querySelector('svg').style.position = 'absolute';
      imgWrapper.style.cssText = 'display:inline-block;position:relative;';
      imgWrapper.appendChild(image);
    };
    tmpImage.src = image.src;
  }

  function replaceAll() {
    var images = document.querySelectorAll('img.grayscale');
    for(var i = 0; i < images.length; i++) {
      replaceImage(images[i]);
    }
  }

  if(needToFix) {
    document.addEventListener('DOMContentLoaded', replaceAll);
  }

  return {
    replace: replaceImage,
    refresh: replaceAll
  };
}());

/*
 * Responsive Layout helper
 */
window.ResponsiveHelper = (function($){
  // init variables
  var handlers = [],
    prevWinWidth,
    win = $(window),
    nativeMatchMedia = false;

  // detect match media support
  if(window.matchMedia) {
    if(window.Window && window.matchMedia === Window.prototype.matchMedia) {
      nativeMatchMedia = true;
    } else if(window.matchMedia.toString().indexOf('native') > -1) {
      nativeMatchMedia = true;
    }
  }

  // prepare resize handler
  function resizeHandler() {
    var winWidth = win.width();
    if(winWidth !== prevWinWidth) {
      prevWinWidth = winWidth;

      // loop through range groups
      $.each(handlers, function(index, rangeObject){
        // disable current active area if needed
        $.each(rangeObject.data, function(property, item) {
          if(item.currentActive && !matchRange(item.range[0], item.range[1])) {
            item.currentActive = false;
            if(typeof item.disableCallback === 'function') {
              item.disableCallback();
            }
          }
        });

        // enable areas that match current width
        $.each(rangeObject.data, function(property, item) {
          if(!item.currentActive && matchRange(item.range[0], item.range[1])) {
            // make callback
            item.currentActive = true;
            if(typeof item.enableCallback === 'function') {
              item.enableCallback();
            }
          }
        });
      });
    }
  }
  win.bind('load resize orientationchange', resizeHandler);

  // test range
  function matchRange(r1, r2) {
    var mediaQueryString = '';
    if(r1 > 0) {
      mediaQueryString += '(min-width: ' + r1 + 'px)';
    }
    if(r2 < Infinity) {
      mediaQueryString += (mediaQueryString ? ' and ' : '') + '(max-width: ' + r2 + 'px)';
    }
    return matchQuery(mediaQueryString, r1, r2);
  }

  // media query function
  function matchQuery(query, r1, r2) {
    if(window.matchMedia && nativeMatchMedia) {
      return matchMedia(query).matches;
    } else if(window.styleMedia) {
      return styleMedia.matchMedium(query);
    } else if(window.media) {
      return media.matchMedium(query);
    } else {
      return prevWinWidth >= r1 && prevWinWidth <= r2;
    }
  }

  // range parser
  function parseRange(rangeStr) {
    var rangeData = rangeStr.split('..');
    var x1 = parseInt(rangeData[0], 10) || -Infinity;
    var x2 = parseInt(rangeData[1], 10) || Infinity;
    return [x1, x2].sort(function(a, b){
      return a - b;
    });
  }

  // export public functions
  return {
    addRange: function(ranges) {
      // parse data and add items to collection
      var result = {data:{}};
      $.each(ranges, function(property, data){
        result.data[property] = {
          range: parseRange(property),
          enableCallback: data.on,
          disableCallback: data.off
        };
      });
      handlers.push(result);

      // call resizeHandler to recalculate all events
      prevWinWidth = null;
      resizeHandler();
    }
  };
}(jQuery));

/*! Picturefill - v3.0.1 - 2015-09-30
 * http://scottjehl.github.io/picturefill
 * Copyright (c) 2015 https://github.com/scottjehl/picturefill/blob/master/Authors.txt; Licensed MIT
 */
!function(a){var b=navigator.userAgent;a.HTMLPictureElement&&/ecko/.test(b)&&b.match(/rv\:(\d+)/)&&RegExp.$1<41&&addEventListener("resize",function(){var b,c=document.createElement("source"),d=function(a){var b,d,e=a.parentNode;"PICTURE"===e.nodeName.toUpperCase()?(b=c.cloneNode(),e.insertBefore(b,e.firstElementChild),setTimeout(function(){e.removeChild(b)})):(!a._pfLastSize||a.offsetWidth>a._pfLastSize)&&(a._pfLastSize=a.offsetWidth,d=a.sizes,a.sizes+=",100vw",setTimeout(function(){a.sizes=d}))},e=function(){var a,b=document.querySelectorAll("picture > img, img[srcset][sizes]");for(a=0;a<b.length;a++)d(b[a])},f=function(){clearTimeout(b),b=setTimeout(e,99)},g=a.matchMedia&&matchMedia("(orientation: landscape)"),h=function(){f(),g&&g.addListener&&g.addListener(f)};return c.srcset="data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==",/^[c|i]|d$/.test(document.readyState||"")?h():document.addEventListener("DOMContentLoaded",h),f}())}(window),function(a,b,c){"use strict";function d(a){return" "===a||"  "===a||"\n"===a||"\f"===a||"\r"===a}function e(b,c){var d=new a.Image;return d.onerror=function(){z[b]=!1,aa()},d.onload=function(){z[b]=1===d.width,aa()},d.src=c,"pending"}function f(){L=!1,O=a.devicePixelRatio,M={},N={},s.DPR=O||1,P.width=Math.max(a.innerWidth||0,y.clientWidth),P.height=Math.max(a.innerHeight||0,y.clientHeight),P.vw=P.width/100,P.vh=P.height/100,r=[P.height,P.width,O].join("-"),P.em=s.getEmValue(),P.rem=P.em}function g(a,b,c,d){var e,f,g,h;return"saveData"===A.algorithm?a>2.7?h=c+1:(f=b-c,e=Math.pow(a-.6,1.5),g=f*e,d&&(g+=.1*e),h=a+g):h=c>1?Math.sqrt(a*b):a,h>c}function h(a){var b,c=s.getSet(a),d=!1;"pending"!==c&&(d=r,c&&(b=s.setRes(c),s.applySetCandidate(b,a))),a[s.ns].evaled=d}function i(a,b){return a.res-b.res}function j(a,b,c){var d;return!c&&b&&(c=a[s.ns].sets,c=c&&c[c.length-1]),d=k(b,c),d&&(b=s.makeUrl(b),a[s.ns].curSrc=b,a[s.ns].curCan=d,d.res||_(d,d.set.sizes)),d}function k(a,b){var c,d,e;if(a&&b)for(e=s.parseSet(b),a=s.makeUrl(a),c=0;c<e.length;c++)if(a===s.makeUrl(e[c].url)){d=e[c];break}return d}function l(a,b){var c,d,e,f,g=a.getElementsByTagName("source");for(c=0,d=g.length;d>c;c++)e=g[c],e[s.ns]=!0,f=e.getAttribute("srcset"),f&&b.push({srcset:f,media:e.getAttribute("media"),type:e.getAttribute("type"),sizes:e.getAttribute("sizes")})}function m(a,b){function c(b){var c,d=b.exec(a.substring(m));return d?(c=d[0],m+=c.length,c):void 0}function e(){var a,c,d,e,f,i,j,k,l,m=!1,o={};for(e=0;e<h.length;e++)f=h[e],i=f[f.length-1],j=f.substring(0,f.length-1),k=parseInt(j,10),l=parseFloat(j),W.test(j)&&"w"===i?((a||c)&&(m=!0),0===k?m=!0:a=k):X.test(j)&&"x"===i?((a||c||d)&&(m=!0),0>l?m=!0:c=l):W.test(j)&&"h"===i?((d||c)&&(m=!0),0===k?m=!0:d=k):m=!0;m||(o.url=g,a&&(o.w=a),c&&(o.d=c),d&&(o.h=d),d||c||a||(o.d=1),1===o.d&&(b.has1x=!0),o.set=b,n.push(o))}function f(){for(c(S),i="",j="in descriptor";;){if(k=a.charAt(m),"in descriptor"===j)if(d(k))i&&(h.push(i),i="",j="after descriptor");else{if(","===k)return m+=1,i&&h.push(i),void e();if("("===k)i+=k,j="in parens";else{if(""===k)return i&&h.push(i),void e();i+=k}}else if("in parens"===j)if(")"===k)i+=k,j="in descriptor";else{if(""===k)return h.push(i),void e();i+=k}else if("after descriptor"===j)if(d(k));else{if(""===k)return void e();j="in descriptor",m-=1}m+=1}}for(var g,h,i,j,k,l=a.length,m=0,n=[];;){if(c(T),m>=l)return n;g=c(U),h=[],","===g.slice(-1)?(g=g.replace(V,""),e()):f()}}function n(a){function b(a){function b(){f&&(g.push(f),f="")}function c(){g[0]&&(h.push(g),g=[])}for(var e,f="",g=[],h=[],i=0,j=0,k=!1;;){if(e=a.charAt(j),""===e)return b(),c(),h;if(k){if("*"===e&&"/"===a[j+1]){k=!1,j+=2,b();continue}j+=1}else{if(d(e)){if(a.charAt(j-1)&&d(a.charAt(j-1))||!f){j+=1;continue}if(0===i){b(),j+=1;continue}e=" "}else if("("===e)i+=1;else if(")"===e)i-=1;else{if(","===e){b(),c(),j+=1;continue}if("/"===e&&"*"===a.charAt(j+1)){k=!0,j+=2;continue}}f+=e,j+=1}}}function c(a){return k.test(a)&&parseFloat(a)>=0?!0:l.test(a)?!0:"0"===a||"-0"===a||"+0"===a?!0:!1}var e,f,g,h,i,j,k=/^(?:[+-]?[0-9]+|[0-9]*\.[0-9]+)(?:[eE][+-]?[0-9]+)?(?:ch|cm|em|ex|in|mm|pc|pt|px|rem|vh|vmin|vmax|vw)$/i,l=/^calc\((?:[0-9a-z \.\+\-\*\/\(\)]+)\)$/i;for(f=b(a),g=f.length,e=0;g>e;e++)if(h=f[e],i=h[h.length-1],c(i)){if(j=i,h.pop(),0===h.length)return j;if(h=h.join(" "),s.matchesMedia(h))return j}return"100vw"}b.createElement("picture");var o,p,q,r,s={},t=function(){},u=b.createElement("img"),v=u.getAttribute,w=u.setAttribute,x=u.removeAttribute,y=b.documentElement,z={},A={algorithm:""},B="data-pfsrc",C=B+"set",D=navigator.userAgent,E=/rident/.test(D)||/ecko/.test(D)&&D.match(/rv\:(\d+)/)&&RegExp.$1>35,F="currentSrc",G=/\s+\+?\d+(e\d+)?w/,H=/(\([^)]+\))?\s*(.+)/,I=a.picturefillCFG,J="position:absolute;left:0;visibility:hidden;display:block;padding:0;border:none;font-size:1em;width:1em;overflow:hidden;clip:rect(0px, 0px, 0px, 0px)",K="font-size:100%!important;",L=!0,M={},N={},O=a.devicePixelRatio,P={px:1,"in":96},Q=b.createElement("a"),R=!1,S=/^[ \t\n\r\u000c]+/,T=/^[, \t\n\r\u000c]+/,U=/^[^ \t\n\r\u000c]+/,V=/[,]+$/,W=/^\d+$/,X=/^-?(?:[0-9]+|[0-9]*\.[0-9]+)(?:[eE][+-]?[0-9]+)?$/,Y=function(a,b,c,d){a.addEventListener?a.addEventListener(b,c,d||!1):a.attachEvent&&a.attachEvent("on"+b,c)},Z=function(a){var b={};return function(c){return c in b||(b[c]=a(c)),b[c]}},$=function(){var a=/^([\d\.]+)(em|vw|px)$/,b=function(){for(var a=arguments,b=0,c=a[0];++b in a;)c=c.replace(a[b],a[++b]);return c},c=Z(function(a){return"return "+b((a||"").toLowerCase(),/\band\b/g,"&&",/,/g,"||",/min-([a-z-\s]+):/g,"e.$1>=",/max-([a-z-\s]+):/g,"e.$1<=",/calc([^)]+)/g,"($1)",/(\d+[\.]*[\d]*)([a-z]+)/g,"($1 * e.$2)",/^(?!(e.[a-z]|[0-9\.&=|><\+\-\*\(\)\/])).*/gi,"")+";"});return function(b,d){var e;if(!(b in M))if(M[b]=!1,d&&(e=b.match(a)))M[b]=e[1]*P[e[2]];else try{M[b]=new Function("e",c(b))(P)}catch(f){}return M[b]}}(),_=function(a,b){return a.w?(a.cWidth=s.calcListLength(b||"100vw"),a.res=a.w/a.cWidth):a.res=a.d,a},aa=function(a){var c,d,e,f=a||{};if(f.elements&&1===f.elements.nodeType&&("IMG"===f.elements.nodeName.toUpperCase()?f.elements=[f.elements]:(f.context=f.elements,f.elements=null)),c=f.elements||s.qsa(f.context||b,f.reevaluate||f.reselect?s.sel:s.selShort),e=c.length){for(s.setupRun(f),R=!0,d=0;e>d;d++)s.fillImg(c[d],f);s.teardownRun(f)}};o=a.console&&console.warn?function(a){console.warn(a)}:t,F in u||(F="src"),z["image/jpeg"]=!0,z["image/gif"]=!0,z["image/png"]=!0,z["image/svg+xml"]=b.implementation.hasFeature("http://wwwindow.w3.org/TR/SVG11/feature#Image","1.1"),s.ns=("pf"+(new Date).getTime()).substr(0,9),s.supSrcset="srcset"in u,s.supSizes="sizes"in u,s.supPicture=!!a.HTMLPictureElement,s.supSrcset&&s.supPicture&&!s.supSizes&&!function(a){u.srcset="data:,a",a.src="data:,a",s.supSrcset=u.complete===a.complete,s.supPicture=s.supSrcset&&s.supPicture}(b.createElement("img")),s.selShort="picture>img,img[srcset]",s.sel=s.selShort,s.cfg=A,s.supSrcset&&(s.sel+=",img["+C+"]"),s.DPR=O||1,s.u=P,s.types=z,q=s.supSrcset&&!s.supSizes,s.setSize=t,s.makeUrl=Z(function(a){return Q.href=a,Q.href}),s.qsa=function(a,b){return a.querySelectorAll(b)},s.matchesMedia=function(){return a.matchMedia&&(matchMedia("(min-width: 0.1em)")||{}).matches?s.matchesMedia=function(a){return!a||matchMedia(a).matches}:s.matchesMedia=s.mMQ,s.matchesMedia.apply(this,arguments)},s.mMQ=function(a){return a?$(a):!0},s.calcLength=function(a){var b=$(a,!0)||!1;return 0>b&&(b=!1),b},s.supportsType=function(a){return a?z[a]:!0},s.parseSize=Z(function(a){var b=(a||"").match(H);return{media:b&&b[1],length:b&&b[2]}}),s.parseSet=function(a){return a.cands||(a.cands=m(a.srcset,a)),a.cands},s.getEmValue=function(){var a;if(!p&&(a=b.body)){var c=b.createElement("div"),d=y.style.cssText,e=a.style.cssText;c.style.cssText=J,y.style.cssText=K,a.style.cssText=K,a.appendChild(c),p=c.offsetWidth,a.removeChild(c),p=parseFloat(p,10),y.style.cssText=d,a.style.cssText=e}return p||16},s.calcListLength=function(a){if(!(a in N)||A.uT){var b=s.calcLength(n(a));N[a]=b?b:P.width}return N[a]},s.setRes=function(a){var b;if(a){b=s.parseSet(a);for(var c=0,d=b.length;d>c;c++)_(b[c],a.sizes)}return b},s.setRes.res=_,s.applySetCandidate=function(a,b){if(a.length){var c,d,e,f,h,k,l,m,n,o=b[s.ns],p=s.DPR;if(k=o.curSrc||b[F],l=o.curCan||j(b,k,a[0].set),l&&l.set===a[0].set&&(n=E&&!b.complete&&l.res-.1>p,n||(l.cached=!0,l.res>=p&&(h=l))),!h)for(a.sort(i),f=a.length,h=a[f-1],d=0;f>d;d++)if(c=a[d],c.res>=p){e=d-1,h=a[e]&&(n||k!==s.makeUrl(c.url))&&g(a[e].res,c.res,p,a[e].cached)?a[e]:c;break}h&&(m=s.makeUrl(h.url),o.curSrc=m,o.curCan=h,m!==k&&s.setSrc(b,h),s.setSize(b))}},s.setSrc=function(a,b){var c;a.src=b.url,"image/svg+xml"===b.set.type&&(c=a.style.width,a.style.width=a.offsetWidth+1+"px",a.offsetWidth+1&&(a.style.width=c))},s.getSet=function(a){var b,c,d,e=!1,f=a[s.ns].sets;for(b=0;b<f.length&&!e;b++)if(c=f[b],c.srcset&&s.matchesMedia(c.media)&&(d=s.supportsType(c.type))){"pending"===d&&(c=d),e=c;break}return e},s.parseSets=function(a,b,d){var e,f,g,h,i=b&&"PICTURE"===b.nodeName.toUpperCase(),j=a[s.ns];(j.src===c||d.src)&&(j.src=v.call(a,"src"),j.src?w.call(a,B,j.src):x.call(a,B)),(j.srcset===c||d.srcset||!s.supSrcset||a.srcset)&&(e=v.call(a,"srcset"),j.srcset=e,h=!0),j.sets=[],i&&(j.pic=!0,l(b,j.sets)),j.srcset?(f={srcset:j.srcset,sizes:v.call(a,"sizes")},j.sets.push(f),g=(q||j.src)&&G.test(j.srcset||""),g||!j.src||k(j.src,f)||f.has1x||(f.srcset+=", "+j.src,f.cands.push({url:j.src,d:1,set:f}))):j.src&&j.sets.push({srcset:j.src,sizes:null}),j.curCan=null,j.curSrc=c,j.supported=!(i||f&&!s.supSrcset||g),h&&s.supSrcset&&!j.supported&&(e?(w.call(a,C,e),a.srcset=""):x.call(a,C)),j.supported&&!j.srcset&&(!j.src&&a.src||a.src!==s.makeUrl(j.src))&&(null===j.src?a.removeAttribute("src"):a.src=j.src),j.parsed=!0},s.fillImg=function(a,b){var c,d=b.reselect||b.reevaluate;a[s.ns]||(a[s.ns]={}),c=a[s.ns],(d||c.evaled!==r)&&((!c.parsed||b.reevaluate)&&s.parseSets(a,a.parentNode,b),c.supported?c.evaled=r:h(a))},s.setupRun=function(){(!R||L||O!==a.devicePixelRatio)&&f()},s.supPicture?(aa=t,s.fillImg=t):!function(){var c,d=a.attachEvent?/d$|^c/:/d$|^c|^i/,e=function(){var a=b.readyState||"";f=setTimeout(e,"loading"===a?200:999),b.body&&(s.fillImgs(),c=c||d.test(a),c&&clearTimeout(f))},f=setTimeout(e,b.body?9:99),g=function(a,b){var c,d,e=function(){var f=new Date-d;b>f?c=setTimeout(e,b-f):(c=null,a())};return function(){d=new Date,c||(c=setTimeout(e,b))}},h=y.clientHeight,i=function(){L=Math.max(a.innerWidth||0,y.clientWidth)!==P.width||y.clientHeight!==h,h=y.clientHeight,L&&s.fillImgs()};Y(a,"resize",g(i,99)),Y(b,"readystatechange",e)}(),s.picturefill=aa,s.fillImgs=aa,s.teardownRun=t,aa._=s,a.picturefillCFG={pf:s,push:function(a){var b=a.shift();"function"==typeof s[b]?s[b].apply(s,a):(A[b]=a[0],R&&s.fillImgs({reselect:!0}))}};for(;I&&I.length;)a.picturefillCFG.push(I.shift());a.picturefill=aa,"object"==typeof module&&"object"==typeof module.exports?module.exports=aa:"function"==typeof define&&define.amd&&define("picturefill",function(){return aa}),s.supPicture||(z["image/webp"]=e("image/webp","data:image/webp;base64,UklGRkoAAABXRUJQVlA4WAoAAAAQAAAAAAAAAAAAQUxQSAwAAAABBxAR/Q9ERP8DAABWUDggGAAAADABAJ0BKgEAAQADADQlpAADcAD++/1QAA=="))}(window,document);



/*
 * jQuery sticky box plugin 
 */
;(function($, $win) {
  'use strict';

  function StickyScrollBlock($stickyBox, options) {
    this.options = options;
    this.$stickyBox = $stickyBox;
    this.init();
  }

  var StickyScrollBlockPrototype = {
    init: function() {
      this.findElements();
      this.attachEvents();
      this.makeCallback('onInit');
    },

    findElements: function() {
      // find parent container in which will be box move 
      this.$container = this.$stickyBox.closest(this.options.container);
      // define box wrap flag
      this.isWrap = this.options.positionType === 'fixed' && this.options.setBoxHeight;
      // define box move flag
      this.moveInContainer = !!this.$container.length;
      // wrapping box to set place in content
      if (this.isWrap) {
        this.$stickyBoxWrap = this.$stickyBox.wrap('<div class="' + this.getWrapClass() + '"/>').parent();
      }
      //define block to add active class
      this.parentForActive = this.getParentForActive();
      this.isInit = true;
    },

    attachEvents: function() {
      var self = this;

      // bind events
      this.onResize = function() {
        if (!self.isInit) return;
        self.resetState();
        self.recalculateOffsets();
        self.checkStickyPermission();
        self.scrollHandler();
      };

      this.onScroll = function() {
        self.scrollHandler();
      };

      // initial handler call
      this.onResize();

      // handle events
      $win.on('load resize orientationchange', this.onResize)
        .on('scroll', this.onScroll);
    },

    defineExtraTop: function() {
      // define box's extra top dimension
      var extraTop;

      if (typeof this.options.extraTop === 'number') {
        extraTop = this.options.extraTop;
      } else if (typeof this.options.extraTop === 'function') {
        extraTop = this.options.extraTop();
      }

      this.extraTop = this.options.positionType === 'absolute' ?
        extraTop :
        Math.min(this.winParams.height - this.data.boxFullHeight, extraTop);
    },

    checkStickyPermission: function() {
      // check the permission to set sticky
      this.isStickyEnabled = this.moveInContainer ?
        this.data.containerOffsetTop + this.data.containerHeight > this.data.boxFullHeight + this.data.boxOffsetTop + this.options.extraBottom :
        true;
    },

    getParentForActive: function() {
      if (this.isWrap) {
        return this.$stickyBoxWrap;
      }

      if (this.$container.length) {
        return this.$container;
      }

      return this.$stickyBox;
    },

    getWrapClass: function() {
      // get set of container classes
      try {
        return this.$stickyBox.attr('class').split(' ').map(function(name) {
          return 'sticky-wrap-' + name;
        }).join(' ');
      } catch (err) {
        return 'sticky-wrap';
      }
    },

    resetState: function() {
      // reset dimensions and state
      this.stickyFlag = false;
      this.$stickyBox.css({
        '-webkit-transition': '',
        '-webkit-transform': '',
        transition: '',
        transform: '',
        position: '',
        width: '',
        left: '',
        top: ''
      }).removeClass(this.options.activeClass);

      if (this.isWrap) {
        this.$stickyBoxWrap.removeClass(this.options.activeClass).removeAttr('style');
      }

      if (this.moveInContainer) {
        this.$container.removeClass(this.options.activeClass);
      }
    },

    recalculateOffsets: function() {
      // define box and container dimensions
      this.winParams = this.getWindowParams();

      this.data = $.extend(
        this.getBoxOffsets(),
        this.getContainerOffsets()
      );

      this.defineExtraTop();
    },

    getBoxOffsets: function() {
      function offetTop(obj){
        obj.top = 0;
        return obj
      }
      var boxOffset = this.$stickyBox.css('position') ==='fixed' ? offetTop(this.$stickyBox.offset()) : this.$stickyBox.offset();
      var boxPosition = this.$stickyBox.position();

      return {
        // sticky box offsets
        boxOffsetLeft: boxOffset.left,
        boxOffsetTop: boxOffset.top,
        // sticky box positions
        boxTopPosition: boxPosition.top,
        boxLeftPosition: boxPosition.left,
        // sticky box width/height
        boxFullHeight: this.$stickyBox.outerHeight(true),
        boxHeight: this.$stickyBox.outerHeight(),
        boxWidth: this.$stickyBox.outerWidth()
      };
    },

    getContainerOffsets: function() {
      var containerOffset = this.moveInContainer ? this.$container.offset() : null;

      return containerOffset ? {
        // container offsets
        containerOffsetLeft: containerOffset.left,
        containerOffsetTop: containerOffset.top,
        // container height
        containerHeight: this.$container.outerHeight()
      } : {};
    },

    getWindowParams: function() {
      return {
        height: window.innerHeight || document.documentElement.clientHeight
      };
    },

    makeCallback: function(name) {
      if (typeof this.options[name] === 'function') {
        var args = Array.prototype.slice.call(arguments);
        args.shift();
        this.options[name].apply(this, args);
      }
    },

    destroy: function() {
      this.isInit = false;
      // remove event handlers and styles
      $win.off('load resize orientationchange', this.onResize)
        .off('scroll', this.onScroll);
      this.resetState();
      this.$stickyBox.removeData('StickyScrollBlock');
      if (this.isWrap) {
        this.$stickyBox.unwrap();
      }
      this.makeCallback('onDestroy');
    }
  };

  var stickyMethods = {
    fixed: {
      scrollHandler: function() {
        this.winScrollTop = $win.scrollTop();
        var isActiveSticky = this.winScrollTop -
          (this.options.showAfterScrolled ? this.extraTop : 0) -
          (this.options.showAfterScrolled ? this.data.boxHeight + this.extraTop : 0) >
          this.data.boxOffsetTop - this.extraTop;

        if (isActiveSticky) {
          this.isStickyEnabled && this.stickyOn();
        } else {
          this.stickyOff();
        }
      },

      stickyOn: function() {
        if (!this.stickyFlag) {
          this.stickyFlag = true;
          this.parentForActive.addClass(this.options.activeClass);
          this.$stickyBox.css({
            width: this.data.boxWidth,
            position: this.options.positionType
          });
          if (this.isWrap) {
            this.$stickyBoxWrap.css({
              height: this.data.boxFullHeight
            });
          }
          this.makeCallback('fixedOn');
        }
        this.setDynamicPosition();
      },

      stickyOff: function() {
        if (this.stickyFlag) {
          this.stickyFlag = false;
          this.resetState();
          this.makeCallback('fixedOff');
        }
      },

      setDynamicPosition: function() {
        this.$stickyBox.css({
          top: this.getTopPosition(),
          left: this.data.boxOffsetLeft - $win.scrollLeft()
        });
      },

      getTopPosition: function() {
        if (this.moveInContainer) {
          var currScrollTop = this.winScrollTop + this.data.boxHeight + this.options.extraBottom;

          return Math.min(this.extraTop, (this.data.containerHeight + this.data.containerOffsetTop) - currScrollTop);
        } else {
          return this.extraTop;
        }
      }
    },
    absolute: {
      scrollHandler: function() {
        this.winScrollTop = $win.scrollTop();
        var isActiveSticky = this.winScrollTop > this.data.boxOffsetTop - this.extraTop;

        if (isActiveSticky) {
          this.isStickyEnabled && this.stickyOn();
        } else {
          this.stickyOff();
        }
      },

      stickyOn: function() {
        if (!this.stickyFlag) {
          this.stickyFlag = true;
          this.parentForActive.addClass(this.options.activeClass);
          this.$stickyBox.css({
            width: this.data.boxWidth,
            transition: 'transform ' + this.options.animSpeed + 's ease',
            '-webkit-transition': 'transform ' + this.options.animSpeed + 's ease',
          });

          if (this.isWrap) {
            this.$stickyBoxWrap.css({
              height: this.data.boxFullHeight
            });
          }

          this.makeCallback('fixedOn');
        }

        this.clearTimer();
        this.timer = setTimeout(function() {
          this.setDynamicPosition();
        }.bind(this), this.options.animDelay * 1000);
      },

      stickyOff: function() {
        if (this.stickyFlag) {
          this.clearTimer();
          this.stickyFlag = false;

          this.timer = setTimeout(function() {
            this.setDynamicPosition();
            setTimeout(function() {
              this.resetState();
            }.bind(this), this.options.animSpeed * 1000);
          }.bind(this), this.options.animDelay * 1000);
          this.makeCallback('fixedOff');
        }
      },

      clearTimer: function() {
        clearTimeout(this.timer);
      },

      setDynamicPosition: function() {
        var topPosition = Math.max(0, this.getTopPosition());

        this.$stickyBox.css({
          transform: 'translateY(' + topPosition + 'px)',
          '-webkit-transform': 'translateY(' + topPosition + 'px)'
        });
      },

      getTopPosition: function() {
        var currTopPosition = this.winScrollTop - this.data.boxOffsetTop + this.extraTop;

        if (this.moveInContainer) {
          var currScrollTop = this.winScrollTop + this.data.boxHeight + this.options.extraBottom;
          var diffOffset = Math.abs(Math.min(0, (this.data.containerHeight + this.data.containerOffsetTop) - currScrollTop - this.extraTop));

          return currTopPosition - diffOffset;
        } else {
          return currTopPosition;
        }
      }
    }
  };

  // jQuery plugin interface
  $.fn.stickyScrollBlock = function(opt) {
    var args = Array.prototype.slice.call(arguments);
    var method = args[0];

    var options = $.extend({
      container: null,
      positionType: 'fixed', // 'fixed' or 'absolute'
      activeClass: 'fixed-position',
      setBoxHeight: true,
      showAfterScrolled: false,
      extraTop: 0,
      extraBottom: 0,
      animDelay: 0.1,
      animSpeed: 0.2
    }, opt);

    return this.each(function() {
      var $stickyBox = jQuery(this);
      var instance = $stickyBox.data('StickyScrollBlock');

      if (typeof opt === 'object' || typeof opt === 'undefined') {
        StickyScrollBlock.prototype = $.extend(stickyMethods[options.positionType], StickyScrollBlockPrototype);
        $stickyBox.data('StickyScrollBlock', new StickyScrollBlock($stickyBox, options));
      } else if (typeof method === 'string' && instance) {
        if (typeof instance[method] === 'function') {
          args.shift();
          instance[method].apply(instance, args);
        }
      }
    });
  };

  // module exports
  window.StickyScrollBlock = StickyScrollBlock;
}(jQuery, jQuery(window)));


/*
 * jQuery Open/Close plugin
 */
;(function($) {
  function OpenClose(options) {
    this.options = $.extend({
      addClassBeforeAnimation: true,
      hideOnClickOutside: false,
      activeClass: 'active',
      opener: '.opener',
      slider: '.slide',
      animSpeed: 400,
      effect: 'fade',
      event: 'click'
    }, options);
    this.init();
  }
  OpenClose.prototype = {
    init: function() {
      if (this.options.holder) {
        this.findElements();
        this.attachEvents();
        this.makeCallback('onInit', this);
      }
    },
    findElements: function() {
      this.holder = $(this.options.holder);
      this.opener = this.holder.find(this.options.opener);
      this.slider = this.holder.find(this.options.slider);
    },
    attachEvents: function() {
      // add handler
      var self = this;
      this.eventHandler = function(e) {
        e.preventDefault();
        if (self.slider.hasClass(slideHiddenClass)) {
          self.showSlide();
        } else {
          self.hideSlide();
        }
      };
      self.opener.on(self.options.event, this.eventHandler);

      // hover mode handler
      if (self.options.event === 'hover') {
        self.opener.on('mouseenter', function() {
          if (!self.holder.hasClass(self.options.activeClass)) {
            self.showSlide();
          }
        });
        self.holder.on('mouseleave', function() {
          self.hideSlide();
        });
      }

      // outside click handler
      self.outsideClickHandler = function(e) {
        if (self.options.hideOnClickOutside) {
          var target = $(e.target);
          if (!target.is(self.holder) && !target.closest(self.holder).length) {
            self.hideSlide();
          }
        }
      };

      // set initial styles
      if (this.holder.hasClass(this.options.activeClass)) {
        $(document).on('click touchstart', self.outsideClickHandler);
      } else {
        this.slider.addClass(slideHiddenClass);
      }
    },
    showSlide: function() {
      var self = this;
      if (self.options.addClassBeforeAnimation) {
        self.holder.addClass(self.options.activeClass);
      }
      self.slider.removeClass(slideHiddenClass);
      $(document).on('click touchstart', self.outsideClickHandler);

      self.makeCallback('animStart', true);
      toggleEffects[self.options.effect].show({
        box: self.slider,
        speed: self.options.animSpeed,
        complete: function() {
          if (!self.options.addClassBeforeAnimation) {
            self.holder.addClass(self.options.activeClass);
          }
          self.makeCallback('animEnd', true);
        }
      });
    },
    hideSlide: function() {
      var self = this;
      if (self.options.addClassBeforeAnimation) {
        self.holder.removeClass(self.options.activeClass);
      }
      $(document).off('click touchstart', self.outsideClickHandler);

      self.makeCallback('animStart', false);
      toggleEffects[self.options.effect].hide({
        box: self.slider,
        speed: self.options.animSpeed,
        complete: function() {
          if (!self.options.addClassBeforeAnimation) {
            self.holder.removeClass(self.options.activeClass);
          }
          self.slider.addClass(slideHiddenClass);
          self.makeCallback('animEnd', false);
        }
      });
    },
    destroy: function() {
      this.slider.removeClass(slideHiddenClass).css({
        display: ''
      });
      this.opener.off(this.options.event, this.eventHandler);
      this.holder.removeClass(this.options.activeClass).removeData('OpenClose');
      $(document).off('click touchstart', this.outsideClickHandler);
    },
    makeCallback: function(name) {
      if (typeof this.options[name] === 'function') {
        var args = Array.prototype.slice.call(arguments);
        args.shift();
        this.options[name].apply(this, args);
      }
    }
  };

  // add stylesheet for slide on DOMReady
  var slideHiddenClass = 'js-slide-hidden';
  (function() {
    var tabStyleSheet = $('<style type="text/css">')[0];
    var tabStyleRule = '.' + slideHiddenClass;
    tabStyleRule += '{position:absolute !important;left:-9999px !important;top:-9999px !important;display:block !important}';
    if (tabStyleSheet.styleSheet) {
      tabStyleSheet.styleSheet.cssText = tabStyleRule;
    } else {
      tabStyleSheet.appendChild(document.createTextNode(tabStyleRule));
    }
    $('head').append(tabStyleSheet);
  }());

  // animation effects
  var toggleEffects = {
    slide: {
      show: function(o) {
        o.box.stop(true).hide().slideDown(o.speed, o.complete);
      },
      hide: function(o) {
        o.box.stop(true).slideUp(o.speed, o.complete);
      }
    },
    fade: {
      show: function(o) {
        o.box.stop(true).hide().fadeIn(o.speed, o.complete);
      },
      hide: function(o) {
        o.box.stop(true).fadeOut(o.speed, o.complete);
      }
    },
    none: {
      show: function(o) {
        o.box.hide().show(0, o.complete);
      },
      hide: function(o) {
        o.box.hide(0, o.complete);
      }
    }
  };

  // jQuery plugin interface
  $.fn.openClose = function(opt) {
    var args = Array.prototype.slice.call(arguments);
    var method = args[0];

    return this.each(function() {
      var $holder = jQuery(this);
      var instance = $holder.data('OpenClose');

      if (typeof opt === 'object' || typeof opt === 'undefined') {
        $holder.data('OpenClose', new OpenClose($.extend({
          holder: this
        }, opt)));
      } else if (typeof method === 'string' && instance) {
        if (typeof instance[method] === 'function') {
          args.shift();
          instance[method].apply(instance, args);
        }
      }
    });
  };
}(jQuery));

/*!
 * JavaScript Custom Forms
 *
 * Copyright 2014-2015 PSD2HTML - http://psd2html.com/jcf
 * Released under the MIT license (LICENSE.txt)
 *
 * Version: 1.1.3
 */
;(function(root, factory) {

  'use strict';
  if (typeof define === 'function' && define.amd) {
    define(['jquery'], factory);
  } else if (typeof exports === 'object') {
    module.exports = factory(require('jquery'));
  } else {
    root.jcf = factory(jQuery);
  }
}(this, function($) {

  'use strict';

  // define version
  var version = '1.1.3';

  // private variables
  var customInstances = [];

  // default global options
  var commonOptions = {
    optionsKey: 'jcf',
    dataKey: 'jcf-instance',
    rtlClass: 'jcf-rtl',
    focusClass: 'jcf-focus',
    pressedClass: 'jcf-pressed',
    disabledClass: 'jcf-disabled',
    hiddenClass: 'jcf-hidden',
    resetAppearanceClass: 'jcf-reset-appearance',
    unselectableClass: 'jcf-unselectable'
  };

  // detect device type
  var isTouchDevice = ('ontouchstart' in window) || window.DocumentTouch && document instanceof window.DocumentTouch,
    isWinPhoneDevice = /Windows Phone/.test(navigator.userAgent);
  commonOptions.isMobileDevice = !!(isTouchDevice || isWinPhoneDevice);
  
  var isIOS = /(iPad|iPhone).*OS ([0-9_]*) .*/.exec(navigator.userAgent);
  if(isIOS) isIOS = parseFloat(isIOS[2].replace(/_/g, '.'));
  commonOptions.ios = isIOS;

  // create global stylesheet if custom forms are used
  var createStyleSheet = function() {
    var styleTag = $('<style>').appendTo('head'),
      styleSheet = styleTag.prop('sheet') || styleTag.prop('styleSheet');

    // crossbrowser style handling
    var addCSSRule = function(selector, rules, index) {
      if (styleSheet.insertRule) {
        styleSheet.insertRule(selector + '{' + rules + '}', index);
      } else {
        styleSheet.addRule(selector, rules, index);
      }
    };

    // add special rules
    addCSSRule('.' + commonOptions.hiddenClass, 'position:absolute !important;left:-9999px !important;height:1px !important;width:1px !important;margin:0 !important;border-width:0 !important;-webkit-appearance:none;-moz-appearance:none;appearance:none');
    addCSSRule('.' + commonOptions.rtlClass + ' .' + commonOptions.hiddenClass, 'right:-9999px !important; left: auto !important');
    addCSSRule('.' + commonOptions.unselectableClass, '-webkit-user-select: none; -moz-user-select: none; -ms-user-select: none; user-select: none; -webkit-tap-highlight-color: rgba(0,0,0,0);');
    addCSSRule('.' + commonOptions.resetAppearanceClass, 'background: none; border: none; -webkit-appearance: none; appearance: none; opacity: 0; filter: alpha(opacity=0);');

    // detect rtl pages
    var html = $('html'), body = $('body');
    if (html.css('direction') === 'rtl' || body.css('direction') === 'rtl') {
      html.addClass(commonOptions.rtlClass);
    }

    // handle form reset event
    html.on('reset', function() {
      setTimeout(function() {
        api.refreshAll();
      }, 0);
    });

    // mark stylesheet as created
    commonOptions.styleSheetCreated = true;
  };

  // simplified pointer events handler
  (function() {
    var pointerEventsSupported = navigator.pointerEnabled || navigator.msPointerEnabled,
      touchEventsSupported = ('ontouchstart' in window) || window.DocumentTouch && document instanceof window.DocumentTouch,
      eventList, eventMap = {}, eventPrefix = 'jcf-';

    // detect events to attach
    if (pointerEventsSupported) {
      eventList = {
        pointerover: navigator.pointerEnabled ? 'pointerover' : 'MSPointerOver',
        pointerdown: navigator.pointerEnabled ? 'pointerdown' : 'MSPointerDown',
        pointermove: navigator.pointerEnabled ? 'pointermove' : 'MSPointerMove',
        pointerup: navigator.pointerEnabled ? 'pointerup' : 'MSPointerUp'
      };
    } else {
      eventList = {
        pointerover: 'mouseover',
        pointerdown: 'mousedown' + (touchEventsSupported ? ' touchstart' : ''),
        pointermove: 'mousemove' + (touchEventsSupported ? ' touchmove' : ''),
        pointerup: 'mouseup' + (touchEventsSupported ? ' touchend' : '')
      };
    }

    // create event map
    $.each(eventList, function(targetEventName, fakeEventList) {
      $.each(fakeEventList.split(' '), function(index, fakeEventName) {
        eventMap[fakeEventName] = targetEventName;
      });
    });

    // jQuery event hooks
    $.each(eventList, function(eventName, eventHandlers) {
      eventHandlers = eventHandlers.split(' ');
      $.event.special[eventPrefix + eventName] = {
        setup: function() {
          var self = this;
          $.each(eventHandlers, function(index, fallbackEvent) {
            if (self.addEventListener) self.addEventListener(fallbackEvent, fixEvent, false);
            else self['on' + fallbackEvent] = fixEvent;
          });
        },
        teardown: function() {
          var self = this;
          $.each(eventHandlers, function(index, fallbackEvent) {
            if (self.addEventListener) self.removeEventListener(fallbackEvent, fixEvent, false);
            else self['on' + fallbackEvent] = null;
          });
        }
      };
    });

    // check that mouse event are not simulated by mobile browsers
    var lastTouch = null;
    var mouseEventSimulated = function(e) {
      var dx = Math.abs(e.pageX - lastTouch.x),
        dy = Math.abs(e.pageY - lastTouch.y),
        rangeDistance = 25;

      if (dx <= rangeDistance && dy <= rangeDistance) {
        return true;
      }
    };

    // normalize event
    var fixEvent = function(e) {
      var origEvent = e || window.event,
        touchEventData = null,
        targetEventName = eventMap[origEvent.type];

      e = $.event.fix(origEvent);
      e.type = eventPrefix + targetEventName;

      if (origEvent.pointerType) {
        switch (origEvent.pointerType) {
          case 2: e.pointerType = 'touch'; break;
          case 3: e.pointerType = 'pen'; break;
          case 4: e.pointerType = 'mouse'; break;
          default: e.pointerType = origEvent.pointerType;
        }
      } else {
        e.pointerType = origEvent.type.substr(0, 5); // "mouse" or "touch" word length
      }

      if (!e.pageX && !e.pageY) {
        touchEventData = origEvent.changedTouches ? origEvent.changedTouches[0] : origEvent;
        e.pageX = touchEventData.pageX;
        e.pageY = touchEventData.pageY;
      }

      if (origEvent.type === 'touchend') {
        lastTouch = { x: e.pageX, y: e.pageY };
      }
      if (e.pointerType === 'mouse' && lastTouch && mouseEventSimulated(e)) {
        return;
      } else {
        return ($.event.dispatch || $.event.handle).call(this, e);
      }
    };
  }());

  // custom mousewheel/trackpad handler
  (function() {
    var wheelEvents = ('onwheel' in document || document.documentMode >= 9 ? 'wheel' : 'mousewheel DOMMouseScroll').split(' '),
      shimEventName = 'jcf-mousewheel';

    $.event.special[shimEventName] = {
      setup: function() {
        var self = this;
        $.each(wheelEvents, function(index, fallbackEvent) {
          if (self.addEventListener) self.addEventListener(fallbackEvent, fixEvent, false);
          else self['on' + fallbackEvent] = fixEvent;
        });
      },
      teardown: function() {
        var self = this;
        $.each(wheelEvents, function(index, fallbackEvent) {
          if (self.addEventListener) self.removeEventListener(fallbackEvent, fixEvent, false);
          else self['on' + fallbackEvent] = null;
        });
      }
    };

    var fixEvent = function(e) {
      var origEvent = e || window.event;
      e = $.event.fix(origEvent);
      e.type = shimEventName;

      // old wheel events handler
      if ('detail'      in origEvent) { e.deltaY = -origEvent.detail;      }
      if ('wheelDelta'  in origEvent) { e.deltaY = -origEvent.wheelDelta;  }
      if ('wheelDeltaY' in origEvent) { e.deltaY = -origEvent.wheelDeltaY; }
      if ('wheelDeltaX' in origEvent) { e.deltaX = -origEvent.wheelDeltaX; }

      // modern wheel event handler
      if ('deltaY' in origEvent) {
        e.deltaY = origEvent.deltaY;
      }
      if ('deltaX' in origEvent) {
        e.deltaX = origEvent.deltaX;
      }

      // handle deltaMode for mouse wheel
      e.delta = e.deltaY || e.deltaX;
      if (origEvent.deltaMode === 1) {
        var lineHeight = 16;
        e.delta *= lineHeight;
        e.deltaY *= lineHeight;
        e.deltaX *= lineHeight;
      }

      return ($.event.dispatch || $.event.handle).call(this, e);
    };
  }());

  // extra module methods
  var moduleMixin = {
    // provide function for firing native events
    fireNativeEvent: function(elements, eventName) {
      $(elements).each(function() {
        var element = this, eventObject;
        if (element.dispatchEvent) {
          eventObject = document.createEvent('HTMLEvents');
          eventObject.initEvent(eventName, true, true);
          element.dispatchEvent(eventObject);
        } else if (document.createEventObject) {
          eventObject = document.createEventObject();
          eventObject.target = element;
          element.fireEvent('on' + eventName, eventObject);
        }
      });
    },
    // bind event handlers for module instance (functions beggining with "on")
    bindHandlers: function() {
      var self = this;
      $.each(self, function(propName, propValue) {
        if (propName.indexOf('on') === 0 && $.isFunction(propValue)) {
          // dont use $.proxy here because it doesn't create unique handler
          self[propName] = function() {
            return propValue.apply(self, arguments);
          };
        }
      });
    }
  };

  // public API
  var api = {
    version: version,
    modules: {},
    getOptions: function() {
      return $.extend({}, commonOptions);
    },
    setOptions: function(moduleName, moduleOptions) {
      if (arguments.length > 1) {
        // set module options
        if (this.modules[moduleName]) {
          $.extend(this.modules[moduleName].prototype.options, moduleOptions);
        }
      } else {
        // set common options
        $.extend(commonOptions, moduleName);
      }
    },
    addModule: function(proto) {
      // add module to list
      var Module = function(options) {
        // save instance to collection
        if (!options.element.data(commonOptions.dataKey)) {
          options.element.data(commonOptions.dataKey, this);
        }
        customInstances.push(this);

        // save options
        this.options = $.extend({}, commonOptions, this.options, getInlineOptions(options.element), options);

        // bind event handlers to instance
        this.bindHandlers();

        // call constructor
        this.init.apply(this, arguments);
      };

      // parse options from HTML attribute
      var getInlineOptions = function(element) {
        var dataOptions = element.data(commonOptions.optionsKey),
          attrOptions = element.attr(commonOptions.optionsKey);

        if (dataOptions) {
          return dataOptions;
        } else if (attrOptions) {
          try {
            return $.parseJSON(attrOptions);
          } catch (e) {
            // ignore invalid attributes
          }
        }
      };

      // set proto as prototype for new module
      Module.prototype = proto;

      // add mixin methods to module proto
      $.extend(proto, moduleMixin);
      if (proto.plugins) {
        $.each(proto.plugins, function(pluginName, plugin) {
          $.extend(plugin.prototype, moduleMixin);
        });
      }

      // override destroy method
      var originalDestroy = Module.prototype.destroy;
      Module.prototype.destroy = function() {
        this.options.element.removeData(this.options.dataKey);

        for (var i = customInstances.length - 1; i >= 0; i--) {
          if (customInstances[i] === this) {
            customInstances.splice(i, 1);
            break;
          }
        }

        if (originalDestroy) {
          originalDestroy.apply(this, arguments);
        }
      };

      // save module to list
      this.modules[proto.name] = Module;
    },
    getInstance: function(element) {
      return $(element).data(commonOptions.dataKey);
    },
    replace: function(elements, moduleName, customOptions) {
      var self = this,
        instance;

      if (!commonOptions.styleSheetCreated) {
        createStyleSheet();
      }

      $(elements).each(function() {
        var moduleOptions,
          element = $(this);

        instance = element.data(commonOptions.dataKey);
        if (instance) {
          instance.refresh();
        } else {
          if (!moduleName) {
            $.each(self.modules, function(currentModuleName, module) {
              if (module.prototype.matchElement.call(module.prototype, element)) {
                moduleName = currentModuleName;
                return false;
              }
            });
          }
          if (moduleName) {
            moduleOptions = $.extend({ element: element }, customOptions);
            instance = new self.modules[moduleName](moduleOptions);
          }
        }
      });
      return instance;
    },
    refresh: function(elements) {
      $(elements).each(function() {
        var instance = $(this).data(commonOptions.dataKey);
        if (instance) {
          instance.refresh();
        }
      });
    },
    destroy: function(elements) {
      $(elements).each(function() {
        var instance = $(this).data(commonOptions.dataKey);
        if (instance) {
          instance.destroy();
        }
      });
    },
    replaceAll: function(context) {
      var self = this;
      $.each(this.modules, function(moduleName, module) {
        $(module.prototype.selector, context).each(function() {
          if (this.className.indexOf('jcf-ignore') < 0) {
            self.replace(this, moduleName);
          }
        });
      });
    },
    refreshAll: function(context) {
      if (context) {
        $.each(this.modules, function(moduleName, module) {
          $(module.prototype.selector, context).each(function() {
            var instance = $(this).data(commonOptions.dataKey);
            if (instance) {
              instance.refresh();
            }
          });
        });
      } else {
        for (var i = customInstances.length - 1; i >= 0; i--) {
          customInstances[i].refresh();
        }
      }
    },
    destroyAll: function(context) {
      if (context) {
        $.each(this.modules, function(moduleName, module) {
          $(module.prototype.selector, context).each(function(index, element) {
            var instance = $(element).data(commonOptions.dataKey);
            if (instance) {
              instance.destroy();
            }
          });
        });
      } else {
        while (customInstances.length) {
          customInstances[0].destroy();
        }
      }
    }
  };

  // always export API to the global window object
  window.jcf = api;

  return api;
})); 

 /*!
 * JavaScript Custom Forms : Range Module
 *
 * Copyright 2014-2015 PSD2HTML - http://psd2html.com/jcf
 * Released under the MIT license (LICENSE.txt)
 *
 * Version: 1.1.3
 */
;(function($) {

  'use strict';

  jcf.addModule({
    name: 'Range',
    selector: 'input[type="range"]',
    options: {
      realElementClass: 'jcf-real-element',
      fakeStructure: '<span class="jcf-range"><span class="jcf-range-wrapper"><span class="jcf-range-track"><span class="jcf-range-handle"></span></span></span></span>',
      dataListMark: '<span class="jcf-range-mark"></span>',
      rangeDisplayWrapper: '<span class="jcf-range-display-wrapper"></span>',
      rangeDisplay: '<span class="jcf-range-display"></span>',
      handleSelector: '.jcf-range-handle',
      trackSelector: '.jcf-range-track',
      activeHandleClass: 'jcf-active-handle',
      verticalClass: 'jcf-vertical',
      orientation: 'horizontal',
      range: false, // or "min", "max", "all"
      dragHandleCenter: true,
      snapToMarks: true,
      snapRadius: 5
    },
    matchElement: function(element) {
      return element.is(this.selector);
    },
    init: function() {
      this.initStructure();
      this.attachEvents();
      this.refresh();
    },
    initStructure: function() {
      this.page = $('html');
      this.realElement = $(this.options.element).addClass(this.options.hiddenClass);
      this.fakeElement = $(this.options.fakeStructure).insertBefore(this.realElement).prepend(this.realElement);
      this.track = this.fakeElement.find(this.options.trackSelector);
      this.trackHolder = this.track.parent();
      this.handle = this.fakeElement.find(this.options.handleSelector);
      this.createdHandleCount = 0;
      this.activeDragHandleIndex = 0;
      this.isMultiple = this.realElement.prop('multiple') || typeof this.realElement.attr('multiple') === 'string';
      this.values = this.isMultiple ? this.realElement.attr('value').split(',') : [this.realElement.val()];
      this.handleCount = this.isMultiple ? this.values.length : 1;

      // create range display
      this.rangeDisplayWrapper = $(this.options.rangeDisplayWrapper).insertBefore(this.track);
      if (this.options.range === 'min' || this.options.range === 'all') {
        this.rangeMin = $(this.options.rangeDisplay).addClass('jcf-range-min').prependTo(this.rangeDisplayWrapper);
      }
      if (this.options.range === 'max' || this.options.range === 'all') {
        this.rangeMax = $(this.options.rangeDisplay).addClass('jcf-range-max').prependTo(this.rangeDisplayWrapper);
      }

      // clone handles if needed
      while (this.createdHandleCount < this.handleCount) {
        this.createdHandleCount++;
        this.handle.clone().addClass('jcf-index-' + this.createdHandleCount).insertBefore(this.handle);

        // create mid ranges
        if (this.createdHandleCount > 1) {
          if (!this.rangeMid) {
            this.rangeMid = $();
          }
          this.rangeMid = this.rangeMid.add($(this.options.rangeDisplay).addClass('jcf-range-mid').prependTo(this.rangeDisplayWrapper));
        }
      }

      // grab all handles
      this.handle.detach();
      this.handle = null;
      this.handles = this.fakeElement.find(this.options.handleSelector);
      this.handles.eq(0).addClass(this.options.activeHandleClass);

      // handle orientation
      this.isVertical = (this.options.orientation === 'vertical');
      this.directionProperty = this.isVertical ? 'top' : 'left';
      this.offsetProperty = this.isVertical ? 'bottom' : 'left';
      this.eventProperty = this.isVertical ? 'pageY' : 'pageX';
      this.sizeProperty = this.isVertical ? 'height' : 'width';
      this.sizeMethod = this.isVertical ? 'innerHeight' : 'innerWidth';
      this.fakeElement.css('touchAction', this.isVertical ? 'pan-x' : 'pan-y');
      if (this.isVertical) {
        this.fakeElement.addClass(this.options.verticalClass);
      }

      // set initial values
      this.minValue = parseFloat(this.realElement.attr('min'));
      this.maxValue = parseFloat(this.realElement.attr('max'));
      this.stepValue = parseFloat(this.realElement.attr('step')) || 1;

      // check attribute values
      this.minValue = isNaN(this.minValue) ? 0 : this.minValue;
      this.maxValue = isNaN(this.maxValue) ? 100 : this.maxValue;

      // handle range
      if (this.stepValue !== 1) {
        this.maxValue -= (this.maxValue - this.minValue) % this.stepValue;
      }
      this.stepsCount = (this.maxValue - this.minValue) / this.stepValue;
      this.createDataList();
    },
    attachEvents: function() {
      this.realElement.on({
        focus: this.onFocus
      });
      this.trackHolder.on('jcf-pointerdown', this.onTrackPress);
      this.handles.on('jcf-pointerdown', this.onHandlePress);
    },
    createDataList: function() {
      var self = this,
        dataValues = [],
        dataListId = this.realElement.attr('list');

      if (dataListId) {
        $('#' + dataListId).find('option').each(function() {
          var itemValue = parseFloat(this.value || this.innerHTML),
            mark, markOffset;

          if (!isNaN(itemValue)) {
            markOffset = self.valueToOffset(itemValue);
            dataValues.push({
              value: itemValue,
              offset: markOffset
            });
            mark = $(self.options.dataListMark).text(itemValue).attr({
              'data-mark-value': itemValue
            }).css(self.offsetProperty, markOffset + '%').appendTo(self.track);
          }
        });
        if (dataValues.length) {
          self.dataValues = dataValues;
        }
      }
    },
    getDragHandleRange: function(handleIndex) {
      // calculate range for slider with multiple handles
      var minStep = -Infinity,
        maxStep = Infinity;

      if (handleIndex > 0) {
        minStep = this.valueToStepIndex(this.values[handleIndex - 1]);
      }
      if (handleIndex < this.handleCount - 1) {
        maxStep = this.valueToStepIndex(this.values[handleIndex + 1]);
      }

      return {
        minStepIndex: minStep,
        maxStepIndex: maxStep
      };
    },
    getNearestHandle: function(percent) {
      // handle vertical sliders
      if (this.isVertical) {
        percent = 1 - percent;
      }

      // detect closest handle when track is pressed
      var closestHandle = this.handles.eq(0),
        closestDistance = Infinity,
        self = this;

      if (this.handleCount > 1) {
        this.handles.each(function() {
          var handleOffset = parseFloat(this.style[self.offsetProperty]) / 100,
            handleDistance = Math.abs(handleOffset - percent);

          if (handleDistance < closestDistance) {
            closestDistance = handleDistance;
            closestHandle = $(this);
          }
        });
      }
      return closestHandle;
    },
    onTrackPress: function(e) {
      var trackSize, trackOffset, innerOffset;

      e.preventDefault();
      if (!this.realElement.is(':disabled') && !this.activeDragHandle) {
        trackSize = this.track[this.sizeMethod]();
        trackOffset = this.track.offset()[this.directionProperty];
        this.activeDragHandle = this.getNearestHandle((e[this.eventProperty] - trackOffset) / this.trackHolder[this.sizeMethod]());
        this.activeDragHandleIndex = this.handles.index(this.activeDragHandle);
        this.handles.removeClass(this.options.activeHandleClass).eq(this.activeDragHandleIndex).addClass(this.options.activeHandleClass);
        innerOffset = this.activeDragHandle[this.sizeMethod]() / 2;

        this.dragData = {
          trackSize: trackSize,
          innerOffset: innerOffset,
          trackOffset: trackOffset,
          min: trackOffset,
          max: trackOffset + trackSize
        };
        this.page.on({
          'jcf-pointermove': this.onHandleMove,
          'jcf-pointerup': this.onHandleRelease
        });

        if (e.pointerType === 'mouse') {
          this.realElement.focus();
        }

        this.onHandleMove(e);
      }
    },
    onHandlePress: function(e) {
      var trackSize, trackOffset, innerOffset;

      e.preventDefault();
      if (!this.realElement.is(':disabled') && !this.activeDragHandle) {
        this.activeDragHandle = $(e.currentTarget);
        this.activeDragHandleIndex = this.handles.index(this.activeDragHandle);
        this.handles.removeClass(this.options.activeHandleClass).eq(this.activeDragHandleIndex).addClass(this.options.activeHandleClass);
        trackSize = this.track[this.sizeMethod]();
        trackOffset = this.track.offset()[this.directionProperty];
        innerOffset = this.options.dragHandleCenter ? this.activeDragHandle[this.sizeMethod]() / 2 : e[this.eventProperty] - this.handle.offset()[this.directionProperty];

        this.dragData = {
          trackSize: trackSize,
          innerOffset: innerOffset,
          trackOffset: trackOffset,
          min: trackOffset,
          max: trackOffset + trackSize
        };
        this.page.on({
          'jcf-pointermove': this.onHandleMove,
          'jcf-pointerup': this.onHandleRelease
        });

        if (e.pointerType === 'mouse') {
          this.realElement.focus();
        }
      }
    },
    onHandleMove: function(e) {
      var self = this,
        newOffset, dragPercent, stepIndex, valuePercent, handleDragRange;

      // calculate offset
      if (this.isVertical) {
        newOffset = this.dragData.max + (this.dragData.min - e[this.eventProperty]) - this.dragData.innerOffset;
      } else {
        newOffset = e[this.eventProperty] - this.dragData.innerOffset;
      }

      // fit in range
      if (newOffset < this.dragData.min) {
        newOffset = this.dragData.min;
      } else if (newOffset > this.dragData.max) {
        newOffset = this.dragData.max;
      }

      e.preventDefault();
      if (this.options.snapToMarks && this.dataValues) {
        // snap handle to marks
        var dragOffset = newOffset - this.dragData.trackOffset;
        dragPercent = (newOffset - this.dragData.trackOffset) / this.dragData.trackSize * 100;

        $.each(this.dataValues, function(index, item) {
          var markOffset = item.offset / 100 * self.dragData.trackSize,
            markMin = markOffset - self.options.snapRadius,
            markMax = markOffset + self.options.snapRadius;

          if (dragOffset >= markMin && dragOffset <= markMax) {
            dragPercent = item.offset;
            return false;
          }
        });
      } else {
        // snap handle to steps
        dragPercent = (newOffset - this.dragData.trackOffset) / this.dragData.trackSize * 100;
      }

      // move handle only in range
      stepIndex = Math.round(dragPercent * this.stepsCount / 100);
      if (this.handleCount > 1) {
        handleDragRange = this.getDragHandleRange(this.activeDragHandleIndex);
        if (stepIndex < handleDragRange.minStepIndex) {
          stepIndex = Math.max(handleDragRange.minStepIndex, stepIndex);
        } else if (stepIndex > handleDragRange.maxStepIndex) {
          stepIndex = Math.min(handleDragRange.maxStepIndex, stepIndex);
        }
      }
      valuePercent = stepIndex * (100 / this.stepsCount);

      if (this.dragData.stepIndex !== stepIndex) {
        this.dragData.stepIndex = stepIndex;
        this.dragData.offset = valuePercent;
        this.activeDragHandle.css(this.offsetProperty, this.dragData.offset + '%');

        // update value(s) and trigger "input" event
        this.values[this.activeDragHandleIndex] = '' + this.stepIndexToValue(stepIndex);
        this.updateValues();
        this.realElement.trigger('input');
      }
    },
    onHandleRelease: function() {
      var newValue;
      if (typeof this.dragData.offset === 'number') {
        newValue = this.stepIndexToValue(this.dragData.stepIndex);
        this.realElement.val(newValue).trigger('change');
      }

      this.page.off({
        'jcf-pointermove': this.onHandleMove,
        'jcf-pointerup': this.onHandleRelease
      });
      delete this.activeDragHandle;
      delete this.dragData;
    },
    onFocus: function() {
      if (!this.fakeElement.hasClass(this.options.focusClass)) {
        this.fakeElement.addClass(this.options.focusClass);
        this.realElement.on({
          blur: this.onBlur,
          keydown: this.onKeyPress
        });
      }
    },
    onBlur: function() {
      this.fakeElement.removeClass(this.options.focusClass);
      this.realElement.off({
        blur: this.onBlur,
        keydown: this.onKeyPress
      });
    },
    onKeyPress: function(e) {
      var incValue = (e.which === 38 || e.which === 39),
        decValue = (e.which === 37 || e.which === 40);

      // handle TAB key in slider with multiple handles
      if (e.which === 9 && this.handleCount > 1) {
        if (e.shiftKey && this.activeDragHandleIndex > 0) {
          this.activeDragHandleIndex--;
        } else if (!e.shiftKey && this.activeDragHandleIndex < this.handleCount - 1) {
          this.activeDragHandleIndex++;
        } else {
          return;
        }
        e.preventDefault();
        this.handles.removeClass(this.options.activeHandleClass).eq(this.activeDragHandleIndex).addClass(this.options.activeHandleClass);
      }

      // handle cursor keys
      if (decValue || incValue) {
        e.preventDefault();
        this.step(incValue ? this.stepValue : -this.stepValue);
      }
    },
    updateValues: function() {
      var value = this.values.join(',');
      if (this.values.length > 1) {
        this.realElement.prop('valueLow', this.values[0]);
        this.realElement.prop('valueHigh', this.values[this.values.length - 1]);
        this.realElement.val(value);

        // if browser does not accept multiple values set only one
        if (this.realElement.val() !== value) {
          this.realElement.val(this.values[this.values.length - 1]);
        }
      } else {
        this.realElement.val(value);
      }

      this.updateRanges();
    },
    updateRanges: function() {
      // update display ranges
      var self = this,
        handle;

      if (this.rangeMin) {
        handle = this.handles[0];
        this.rangeMin.css(this.offsetProperty, 0).css(this.sizeProperty, handle.style[this.offsetProperty]);
      }
      if (this.rangeMax) {
        handle = this.handles[this.handles.length - 1];
        this.rangeMax.css(this.offsetProperty, handle.style[this.offsetProperty]).css(this.sizeProperty, 100 - parseFloat(handle.style[this.offsetProperty]) + '%');
      }
      if (this.rangeMid) {
        this.handles.each(function(index, curHandle) {
          var prevHandle, midBox;
          if (index > 0) {
            prevHandle = self.handles[index - 1];
            midBox = self.rangeMid[index - 1];
            midBox.style[self.offsetProperty] = prevHandle.style[self.offsetProperty];
            midBox.style[self.sizeProperty] = parseFloat(curHandle.style[self.offsetProperty]) - parseFloat(prevHandle.style[self.offsetProperty]) + '%';
          }
        });
      }
    },
    step: function(changeValue) {
      var originalValue = parseFloat(this.values[this.activeDragHandleIndex || 0]),
        newValue = originalValue,
        minValue = this.minValue,
        maxValue = this.maxValue;

      if (isNaN(originalValue)) {
        newValue = 0;
      }

      newValue += changeValue;

      if (this.handleCount > 1) {
        if (this.activeDragHandleIndex > 0) {
          minValue = parseFloat(this.values[this.activeDragHandleIndex - 1]);
        }
        if (this.activeDragHandleIndex < this.handleCount - 1) {
          maxValue = parseFloat(this.values[this.activeDragHandleIndex + 1]);
        }
      }

      if (newValue > maxValue) {
        newValue = maxValue;
      } else if (newValue < minValue) {
        newValue = minValue;
      }

      if (newValue !== originalValue) {
        this.values[this.activeDragHandleIndex || 0] = '' + newValue;
        this.updateValues();
        this.realElement.trigger('input').trigger('change');
        this.setSliderValue(this.values);
      }
    },
    valueToStepIndex: function(value) {
      return (value - this.minValue) / this.stepValue;
    },
    stepIndexToValue: function(stepIndex) {
      return this.minValue + this.stepValue * stepIndex;
    },
    valueToOffset: function(value) {
      var range = this.maxValue - this.minValue,
        percent = (value - this.minValue) / range;

      return percent * 100;
    },
    getSliderValue: function() {
      return $.map(this.values, function(value) {
        return parseFloat(value) || 0;
      });
    },
    setSliderValue: function(values) {
      // set handle position accordion according to value
      var self = this;
      this.handles.each(function(index, handle) {
        handle.style[self.offsetProperty] = self.valueToOffset(values[index]) + '%';
      });
    },
    refresh: function() {
      // handle disabled state
      var isDisabled = this.realElement.is(':disabled');
      this.fakeElement.toggleClass(this.options.disabledClass, isDisabled);

      // refresh handle position according to current value
      this.setSliderValue(this.getSliderValue());
      this.updateRanges();
    },
    destroy: function() {
      this.realElement.removeClass(this.options.hiddenClass).insertBefore(this.fakeElement);
      this.fakeElement.remove();

      this.realElement.off({
        keydown: this.onKeyPress,
        focus: this.onFocus,
        blur: this.onBlur
      });
    }
  });

}(jQuery));