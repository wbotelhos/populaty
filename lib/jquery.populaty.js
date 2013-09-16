/*!
 * jQuery Populaty - A Form Populator
 * ----------------------------------------------------------------------
 *
 * jQuery Populaty is a plugin to populate form from a JSON.
 *
 * Licensed under The MIT License
 *
 * @version        0.1.1
 * @since          2013-05-08
 * @author         Washington Botelho
 * @documentation  wbotelhos.com/populaty
 *
 * ----------------------------------------------------------------------
 *
 *  <form>
 *    <input name="number" />
 *  </form>
 *
 *  $('form').populaty({ json: { number: 1 } });
 *
 */

;(function($) {

  var methods = {
    init: function(settings) {
      return this.each(function() {
        if (settings && settings.json) {
          $.extend(settings.json, $.fn.populaty.defaults.json);
        }

        this.opt = $.extend({}, $.fn.populaty.defaults, settings);

        var that = this;

        if (!that.opt.json) {
          return;
        }

        if (that.opt.reset) {
          that.reset();
        }

        that.fields   = methods._fields.call(that);
        that.opt.json = methods._json.call(that);

        that.fields.each(function() {
          methods._seek.call(that, this);
        });

        $(that).data({ 'settings': that.opt, 'populaty': true });
      });
    }, _apply: function(field, value) {
      if (methods._is(field, this.opt.typeful)) {
        field.value = value;
      } else if (methods._is(field, this.opt.checkable)) {
        methods._markWith('checked', field, value);
      } else if (methods._is(field, this.opt.selectable)) {
        var options = $(field).children();

        for (var i = 0; i < options.length; i++) {
          methods._markWith('selected', options[i], value);
        }
      }

      methods._triggerEvents(field);
    }, _compact: function(array) {
      for (var i = 0; i < array.length; i++) {
        if (!array[i]) {
          array.splice(i--, 1);
        }
      }

      return array;
    }, _extract: function(field) {
      var paths  = (field.name || '').split('.'),
          result = []

      for (var item in paths) {
        var attributes = paths[item].split(/\[([\w]*)\]/);

        attributes = methods._compact(attributes);

        result = result.concat(attributes);
      }

      return result.length ? result : paths;
    }, _fields: function() {
      return $(this).find(this.opt.include).not(this.opt.exclude);
    }, _is: function(field, types) {
      return $.inArray(field.type, types) >= 0;
    }, _json: function() {
      var json = this.opt.json;

      return (typeof json === 'string') ? JSON.parse(json) : json;
    }, _markWith: function(mark, field, value) {
      value = value && value.toString();

      if (field.value == value) {
        var el = $(field);

        if (field.type !== 'select-multiple') {
          el.val(value);
        }

        el.prop(mark, mark);
      }
    }, _seek: function(field) {
      var that = this,
          path = methods._extract(field);

      (function seek(value, path) {
        for (var i = 0; i < path.length; i++) {
          value = value[path[i]];

          if (!value) {
            break;
          }

          if (typeof value === 'object') {
            if (value instanceof Array) {
              for (var item in value) {
                var subValue = value[item],
                    skip     = /[\d]/.test(path[i + 1]) ? 2 : 1,
                    subPath  = path.slice(i + skip);

                if (typeof subValue === 'object') {
                  seek(subValue, subPath)
                } else {
                  methods._apply.call(that, field, subValue);
                }
              }

              break;
            }
          } else {
            methods._apply.call(that, field, value);
          }
        }
      })(that.opt.json, path);
    }, _triggerEvents: function(field) {
      var el     = $(field),
          events = el.data('events');

      if (events) {
        if (events.click) {
          el.triggerHandler('click');
        }

        if (events.change) {
          el.triggerHandler('change');
        }
      }

      var onclick  = field.onclick,
          onchange = field.onchange;

      if (onclick) {
        onclick.call(field);
      }

      if (onchange) {
        onchange.call(field);
      }
    }
  };

  $.fn.populaty = function(method) {
    if (methods[method]) {
      return methods[method].apply(this, Array.prototype.slice.call(arguments, 1));
    } else if (typeof method === 'object' || !method) {
      return methods.init.apply(this, arguments);
    } else {
      $.error('Method ' + method + ' does not exist!');
    }
  };

  $.fn.populaty.defaults = {
    checkable  : ['checkbox', 'radio'],
    exclude    : ':submit, :reset, :button',
    include    : ':input',
    json       : undefined,
    reset      : true,
    selectable : ['select-one', 'select-multiple'],
    typeful    : ['text', 'textarea']
  };

})(jQuery);
