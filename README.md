# jQuery Populaty - A Form Populator - [wbotelhos.com/populaty](http://wbotelhos.com/populaty)

jQuery Populaty is a plugin to populate form from a JSON.

## Version

```
@version        0.1.0
@since          2013-05-08
@author         Washington Botelho
@documentation  wbotelhos.com/populaty
@twitter        twitter.com/wbotelhos
```

## Required Files

+ jquery.populaty.js

## Options

```js
checkable  : ['checkbox', 'radio']             // Checkable fields.
exclude    : ':submit, :reset, :button'        // Field to be excluded from includeds.
include    : ':input'                          // Fields to be included on population.
json       : undefined                         // JSON data to populate the fields.
reset      : true                              // Reset or not the form before populate.
selectable : ['select-one', 'select-multiple'] // Selectable fields.
typeful    : ['text', 'textarea']              // Typeful fields.
```

## Usage

```html
<form>
  <input name="number" />
</form>
```

```js
$('form').populaty({ json: { number: 1 } });
```

## Licence

The MIT License

## Donate

You can do it via [PayPal](https://www.paypal.com/cgi-bin/webscr?cmd=_donations&business=X8HEP2878NDEG&item_name=jQuery%20Populaty). Thanks! (:
