clean = true;

function context(description, spec) {
  describe(description, spec);
};

var Fixtury = {
  init: function() {
  }, _checks: function(tag, data) {
    var type   = $(tag)[0].type,
        single = tag.indexOf(' />') !== -1;

    if (data.checked) {
      if (type === 'checkbox') {
        tag = tag.replace(' />', ' checked="checked" />');
      } else {
        $.error('You can check just checkbox element!');
      }
    } else if (data.selected) {
      if (type === 'radio') {
        tag = tag.replace(' />', ' selected="selected" />');
      } else if (tag.indexOf('<option') !== -1) {
        tag = tag.replace('>', ' selected="selected">');
      } else {
        $.error('You can select just radio and option element!');
      }
    }

    return tag;
  }, _data: function(options) {
    options = options || {};

    var times      = Fixtury._getTimes(options),
        html       = Fixtury._getHtml(options),
        checked    = Fixtury._getChecked(options),
        selected   = Fixtury._getSelected(options),
        opt        = Fixtury._normalize(options),
        attributes = Fixtury._parameterize(opt);

    return { attributes: attributes, html: html, checked: checked, selected: selected, times: times };
  }, _getChecked: function(options) {
    return options.checked || false;
  }, _getHtml: function(options) {
    var html    = options.html || '',
        content = '';

    if (typeof html === 'object') {
      for (var i = 0; i < html.length; i++) {
        content += html[i];
      }
    } else {
      content = html;
    }

    return content;
  }, _getSelected: function(options) {
    return options.selected || false;
  }, _getTimes: function(options) {
    return options.times || 1;
  }, _normalize: function(options) {
    delete options.times;
    delete options.html;
    delete options.selected;
    delete options.checked;

    return options;
  }, _parameterize: function(options) {
    var content = '';

    for (var option in options) {
      content += option + '="' + options[option] + '" ';
    }

    return content.replace(/\s$/, '');
  }, _repeat: function(tag, data) {
    var html = '';

    for (var i = 0; i < data.times; i++) {
      html += Fixtury._checks(tag, data).replace(/{index}/g, i + 1);
    }

    return html;
  }, _verify: function(options) {
    if (options && options.type) {
      $.error('You cannot set the "type" using an alias!');
    }
  }, append: function(html) {
    return $(html).appendTo('.fixtury');
  }, checkbox: function(options) {
    Fixtury._verify(options);

    return Fixtury.input(options, 'checkbox');
  }, clear: function() {
    if (clean) {
      $('.fixtury').empty();
    }
  }, double: function(options, name) {
    var data = Fixtury._data(options),
        tag  = '<' + name + ' ' + data.attributes + '>' + data.html + '</' + name + '>';

    return Fixtury._repeat(tag.replace(' >', '>'), data);
  }, fieldset: function(options) {
    return Fixtury.double(options, 'fieldset');
  }, form: function(options) {
    return Fixtury.double(options, 'form');
  }, hidden: function(options) {
    Fixtury._verify(options);

    return Fixtury.input(options, 'hidden');
  }, html: function(html) {
    $('.fixtury').html(html);
  }, input: function(options, type) {
    options = options || {};

    if (type) {
      options['type'] = type;
    }

    return Fixtury.single(options, 'input');
  }, label: function(options) {
    return Fixtury.double(options, 'label');
  }, legend: function(options) {
    return Fixtury.double(options, 'legend');
  }, option: function(options) {
    return Fixtury.double(options, 'option');
  }, password: function(options) {
    Fixtury._verify(options);

    return Fixtury.input(options, 'password');
  }, radio: function(options) {
    Fixtury._verify(options);

    return Fixtury.input(options, 'radio');
  }, select: function(options) {
    return Fixtury.double(options, 'select');
  }, single: function(options, name) {
    var data = Fixtury._data(options),
        tag  = '<' + name + ' ' + data.attributes + ' />';

    return Fixtury._repeat(tag.replace('  />', ' />'), data);
  }, submit: function(options) {
    Fixtury._verify(options);

    return Fixtury.input(options, 'submit');
  }, text: function(options) {
    Fixtury._verify(options);

    return Fixtury.input(options, 'text');
  }, textarea: function(options) {
    return Fixtury.double(options, 'textarea');
  }
};
