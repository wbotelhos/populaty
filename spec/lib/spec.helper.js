// $.fn.populaty.defaults.debug = true;

// TODO: test the 'file' type.
var typefulTypes = ['color'];

function pathFromName(name) {
  var form = Fixtury.append(Fixtury.form({ html: Fixtury.text({ 'name': name }) }));

  form.populaty();

  return form.populaty('_extract', form.children('input')[0]);
};

function text(name, json) {
  var form = Fixtury.append(Fixtury.form({ html: Fixtury.text({ name: name }) }));

  form.populaty({ json: json });

  return form.children('input');
};

function textarea(name, json) {
  var form = Fixtury.append(Fixtury.form({ html: Fixtury.textarea({ name: name }) }));

  form.populaty({ json: json });

  return form.children('textarea');
};

function select(name, options, json, isMultiple) {
  isMultiple = isMultiple || false;

  var form = Fixtury.append(Fixtury.form({ html: Fixtury.select({ name: name, multiple: isMultiple, html: options }) }));

  form.populaty({ json: json });

  return form.children('select');
};

function multiple(name, options, json) {
  select(name, options, json, true);
};

function checkbox(options, json) {
  var form = Fixtury.append(Fixtury.form({ html: options }));

  form.populaty({ json: json });

  return form;
};

function radio(options, json) {
  var form = Fixtury.append(Fixtury.form({ html: options }));

  form.populaty({ json: json });

  return form;
};
