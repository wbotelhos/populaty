describe('Populaty', function() {
  afterEach(function() { Fixtury.clear(); });

  describe('channing', function() {
    beforeEach(function() { Fixtury.append(Fixtury.form()); });

    it ('is chainable', function() {
      // given
      var self = $('form');

      // when
      var ref = self.populaty();

      // then
      expect(ref).toBe(self);
    });
  });

  describe('json', function() {
    beforeEach(function() {
      Fixtury.append(Fixtury.form({ html: Fixtury.text({ name: 'name' }) }));
    });

    context('as object', function() {
      it ('is usable', function() {
        var field = text('name.item', { name: 1 });

        expect(field).toHaveValue(1);

        Fixtury.clear();
      });
    });

    context('as string', function() {
      it ('is usable', function() {
        var field = text('name.item', "{ \"name\": \"1\" }");

        expect(field).toHaveValue(1);

        Fixtury.clear();
      });
    });
  });

  describe('checkbox', function() {
    context('with one path name', function() {
      context('without array', function() {
        it ('is selected', function() {
          var checkboxes = [Fixtury.checkbox({ name: 'name', value: 1 }), Fixtury.checkbox({ name: 'name', value: 2 })],
              json       = { name: 2 },
              form       = checkbox(checkboxes, json);

          expect(form.children('[value="1"]')).not.toBeChecked();
          expect(form.children('[value="2"]')).toBeChecked();
        });
      });

      context('with array', function() {
        it ('is selected', function() {
          var checkboxes = [Fixtury.checkbox({ name: 'name[0]', value: 1 }), Fixtury.checkbox({ name: 'name[1]', value: 2 })],
              json       = { name: [2] },
              form       = checkbox(checkboxes, json);

          // then
          expect(form.children('[value="1"]')).not.toBeChecked();
          expect(form.children('[value="2"]')).toBeChecked();
        });
      });
    });

    context('with multiple path name', function() {
      context('using dot annotation', function() {
        context('without array', function() {
          it ('is selected', function() {
            var checkboxes = [Fixtury.checkbox({ name: 'name.item.id', value: 1 }), Fixtury.checkbox({ name: 'name.item.id', value: 2 })],
                json       = { name: { item: { id: 2 } } },
                form       = checkbox(checkboxes, json);

            expect(form.children('[value="1"]')).not.toBeChecked();
            expect(form.children('[value="2"]')).toBeChecked();
          });
        });

        context('with array', function() {
          it ('is selected', function() {
            var checkboxes = [Fixtury.checkbox({ name: 'name.item[0].id', value: 1 }), Fixtury.checkbox({ name: 'name.item[1].id', value: 2 })],
                json       = { name: { item: [{ id: 2 }] } },
                form       = checkbox(checkboxes, json);

            expect(form.children('[value="1"]')).not.toBeChecked();
            expect(form.children('[value="2"]')).toBeChecked();
          });
        });

        context('with double arrays', function() {
          it ('is selected', function() {
            var checkboxes = [Fixtury.checkbox({ name: 'name.item[0].more.names[1].id', value: 1 }), Fixtury.checkbox({ name: 'name.item[0].more.names[1].id', value: 2 })],
                json       = { name: { item: [{ more: { names: [{ id: 2 }] } }] } },
                form       = checkbox(checkboxes, json);

            expect(form.children('[value="1"]')).not.toBeChecked();
            expect(form.children('[value="2"]')).toBeChecked();
          });
        });
      });

      context('using bracket annotation', function() {
        context('without array', function() {
          it ('is selected', function() {
            var checkboxes = [Fixtury.checkbox({ name: 'name[item][id]', value: 1 }), Fixtury.checkbox({ name: 'name[item][id]', value: 2 })],
                json       = { name: { item: { id: 2 } } },
                form       = checkbox(checkboxes, json);

            expect(form.children('[value="1"]')).not.toBeChecked();
            expect(form.children('[value="2"]')).toBeChecked();
          });
        });

        context('with array', function() {
          it ('is selected', function() {
            var checkboxes = [Fixtury.checkbox({ name: 'name[item][0][id]', value: 1 }), Fixtury.checkbox({ name: 'name[item][0][id]', value: 2 })],
                json       = { name: { item: [{ id: 2 }] } },
                form       = checkbox(checkboxes, json);

            expect(form.children('[value="1"]')).not.toBeChecked();
            expect(form.children('[value="2"]')).toBeChecked();
          });
        });

        context('with double arrays', function() {
          it ('is selected', function() {
            var checkboxes = [Fixtury.checkbox({ name: 'name[item][0][more][names][1][id]', value: 1 }), Fixtury.checkbox({ name: 'name[item][0][more][names][1][id]', value: 2 })],
                json       = { name: { item: [{ more: { names: [{ id: 2 }] } }] } },
                form       = checkbox(checkboxes, json);

            expect(form.children('[value="1"]')).not.toBeChecked();
            expect(form.children('[value="2"]')).toBeChecked();
          });
        });
      });
    });
  });

  describe('input typeful', function() {
    context('with one path name', function() {
      context('without array', function() {
        it ('is populated', function() {
          var field = text('name', { name: 1 });

          expect(field).toHaveValue(1);

          Fixtury.clear();
        });
      });

      context('with array', function() {
        it ('is populated', function() {
          var field = text('name[0]', { name: [1] });

          expect(field).toHaveValue(1);

          Fixtury.clear();
        });
      });
    });

    context('with multiple path name', function() {
      context('using dot annotation', function() {
        context('without array', function() {
          it ('is populated', function() {
            var field = text('name.item', { name: { item: 1 } });

            expect(field).toHaveValue(1);

            Fixtury.clear();
          });
        });

        context('with array', function() {
          it ('is populated', function() {
            var field = text('name.item[0].id', { name: { item: [{ id: 1 }] } });

            expect(field).toHaveValue(1);

            Fixtury.clear();
          });
        });

        context('with double arrays', function() {
          it ('is populated', function() {
            var field = text('name.item[0].more.names[0].id', { name: { item: [{ more: { names: [{ id: 1 }] } }] } });

            expect(field).toHaveValue(1);

            Fixtury.clear();
          });
        });
      });

      context('using bracket annotation', function() {
        context('without array', function() {
          it ('is populated', function() {
            var field = text('name.item.id', { name: { item: { id: 1 } } });

            expect(field).toHaveValue(1);

            Fixtury.clear();
          });
        });

        context('with array', function() {
          it ('is populated', function() {
            var field = text('name.item[0]id', { name: { item: [{ id: 1 }] } });

            expect(field).toHaveValue(1);

            Fixtury.clear();
          });
        });

        context('with double arrays', function() {
          it ('is populated', function() {
            var field = text('name[item][0][more][names][0][id]', { name: { item: [{ more: { names: [{ id: 1 }] } }] } });

            expect(field).toHaveValue(1);

            Fixtury.clear();
          });
        });
      });
    });
  });

  describe('options', function() {
    it ('has the right value options', function() {
      // given
      var self = $.fn.populaty

      // when
      var opt = self.defaults

      // then
      expect(opt.checkable).toEqual(['checkbox', 'radio']);
      expect(opt.debug).toBeFalsy();
      expect(opt.exclude).toEqual(':submit, :reset, :button');
      expect(opt.include).toEqual(':input');
      expect(opt.json).toBeUndefined();
      expect(opt.reset).toBeTruthy();
      expect(opt.selectable).toEqual(['select-one', 'select-multiple']);
      expect(opt.typeful).toEqual(['text', 'textarea']);
    });

    describe(':exclude', function() {
      beforeEach(function() {
        Fixtury.append(Fixtury.form({
          html: [Fixtury.text({ name: 'text' }), Fixtury.textarea({ name: 'textarea' }) ]
        }));
      });

      context('excluding some field', function() {
        it ('ignores the field', function() {
          // given
          var form = $('form'),
              json = { text: 1, textarea: 1 };

          // when
          form.populaty({ exclude: ':text', json: json });

          // then
          expect(form.children('input')).toHaveValue('');
        });
      });
    });

    describe(':include', function() {
      beforeEach(function() {
        Fixtury.append(Fixtury.form({ html: Fixtury.input({ name: 'custom' }, 'custom') }));
      });

      context('including some new type of field', function() {
        it ('includes the field', function() {
          // given
          var form = $('form'),
              json = { custom: 1 };

          // when
          form.populaty({ include: '[type="custom"]', json: json });

          // then
          expect(form.children('input')).toHaveValue(1);
        });
      });
    });

    describe(':typeful', function() {
      beforeEach(function() {
        Fixtury.append(Fixtury.form({ html: Fixtury.text({ name: 'name' }) }));
      });

      context('when the field was not setted as typeful', function() {
        it ('is ignored by populate strategy', function() {
          // given
          var form = $('form'),
              json = { name: 1 };

          // when
          form.populaty({ typeful: ['textarea'], json: json });

          // then
          expect(form.children('input')).toHaveValue('');
        });
      });
    });

    describe(':selectable', function() {
      beforeEach(function() {
        Fixtury.append(Fixtury.form({
          html: Fixtury.select({
            name: 'name',
            html: [
              Fixtury.option({ html: '' }),
              Fixtury.option({ html: '1', value: 1 }),
              Fixtury.option({ html: '2', value: 2 })
            ]
          })
        }));
      });

      context('when the select type is not setted as selectable', function() {
        it ('does not match with any type of population and is ignored by populate method', function() {
          // given
          var form = $('form'),
              json = { name: 2 };

          // when
          form.populaty({ selectable: [], json: json });

          // then
          expect(form.find('option[value="1"]')).not.toBeSelected();
          expect(form.find('option[value="2"]')).not.toBeSelected();
        });
      });
    });

    describe(':checkable', function() {
      beforeEach(function() {
        Fixtury.append(Fixtury.form({ html: Fixtury.checkbox({ name: 'name', value: 1 }) }));
      });

      context('when the checkbox type is not setted as checkable', function() {
        it ('does not match with any type of population and is ignored by populate method', function() {
          // given
          var form = $('form'),
              json = { name: 1 };

          // when
          form.populaty({ checkable: [], json: json });

          // then
          expect(form.children('input')).not.toBeChecked();
        });
      });
    });

    describe(':json', function() {
      beforeEach(function() {
        $.fn.populaty.defaults.json = { name: 1 };

        Fixtury.append(Fixtury.form({ html: Fixtury.text({ name: 'name' }) }));
      });

      afterEach(function() {
        $.fn.populaty.defaults.json = undefined;
      });

      context('when whe have a default json', function() {
        it ('is merged with the json parameter', function() {
          // given
          var form = $('form'),
              json = { missing: '' };

          // when
          form.populaty({ json: json });

          // then
          expect(form.children('input')).toHaveValue(1);
        });
      });
    });
  });

  describe('radio', function() {
    context('with one path name', function() {
      context('without array', function() {
        it ('is selected', function() {
          var radios = [Fixtury.radio({ name: 'name', value: 1 }), Fixtury.radio({ name: 'name', value: 2 })],
              json   = { name: 2 },
              form   = radio(radios, json);

          expect(form.children('[value="1"]')).not.toBeChecked();
          expect(form.children('[value="2"]')).toBeChecked();
        });
      });

      context('with array', function() {
        it ('is selected', function() {
          var radios = [Fixtury.radio({ name: 'name[0]', value: 1 }), Fixtury.radio({ name: 'name[1]', value: 2 })],
              json   = { name: [2] },
              form   = radio(radios, json);

          expect(form.children('[value="1"]')).not.toBeChecked();
          expect(form.children('[value="2"]')).toBeChecked();
        });
      });
    });

    context('with multiple path name', function() {
      context('using dot annotation', function() {
        context('without array', function() {
          it ('is selected', function() {
            var radios = [Fixtury.radio({ name: 'name.item.id', value: 1 }), Fixtury.radio({ name: 'name.item.id', value: 2 })],
                json   = { name: { item: { id: 2 } } },
                form   = radio(radios, json);

            expect(form.children('[value="1"]')).not.toBeChecked();
            expect(form.children('[value="2"]')).toBeChecked();
          });
        });

        context('with array', function() {
          it ('is selected', function() {
            var radios = [Fixtury.radio({ name: 'name.item[0].id', value: 1 }), Fixtury.radio({ name: 'name.item[1].id', value: 2 })],
                json   = { name: { item: [{ id: 2 }] } },
                form   = radio(radios, json);

            expect(form.children('[value="1"]')).not.toBeChecked();
            expect(form.children('[value="2"]')).toBeChecked();
          });
        });

        context('with double arrays', function() {
          it ('is selected', function() {
            var radios = [Fixtury.radio({ name: 'name.item[0].more.names[1].id', value: 1 }), Fixtury.radio({ name: 'name.item[0].more.names[1].id', value: 2 })],
                json   = { name: { item: [{ more: { names: [{ id: 2 }] } }] } },
                form   = radio(radios, json);

            expect(form.children('[value="1"]')).not.toBeChecked();
            expect(form.children('[value="2"]')).toBeChecked();
          });
        });
      });

      context('using bracket annotation', function() {
        context('without array', function() {
          it ('is selected', function() {
            var radios = [Fixtury.radio({ name: 'name[item][id]', value: 1 }), Fixtury.radio({ name: 'name[item][id]', value: 2 })],
                json   = { name: { item: { id: 2 } } },
                form   = radio(radios, json);

            expect(form.children('[value="1"]')).not.toBeChecked();
            expect(form.children('[value="2"]')).toBeChecked();
          });
        });

        context('with array', function() {
          it ('is selected', function() {
            var radios = [Fixtury.radio({ name: 'name[item][0][id]', value: 1 }), Fixtury.radio({ name: 'name[item][0][id]', value: 2 })],
                json   = { name: 2 },
                form   = radio(radios, json);

            expect(form.children('[value="1"]')).not.toBeChecked();
            expect(form.children('[value="2"]')).toBeChecked();
          });
        });

        context('with double arrays', function() {
          it ('is selected', function() {
            var radios = [Fixtury.radio({ name: 'name[item][0][more][names][1][id]', value: 1 }), Fixtury.radio({ name: 'name[item][0][more][names][1][id]', value: 2 })],
                json   = { name: { item: [{ more: { names: [{ id: 2 }] } }] } },
                form   = radio(radios, json);

            expect(form.children('[value="1"]')).not.toBeChecked();
            expect(form.children('[value="2"]')).toBeChecked();
          });
        });
      });
    });
  });

  describe('select', function() {
    context('with multiple disabled', function() {
      context('with one path name', function() {
        context('without array', function() {
          it ('is selected', function() {
            var options = [Fixtury.option({ html: '1', value: 1 }), Fixtury.option({ html: '2', value: 2 })],
                json    = { name: 2 },
                field   = select('name', options, json);

            expect(field.children('[value="1"]')).not.toBeSelected();
            expect(field.children('[value="2"]')).toBeSelected();
          });
        });

        context('with array', function() {
          it ('is selected', function() {
            var options = [Fixtury.option({ html: '1', value: 1 }), Fixtury.option({ html: '2', value: 2 })],
                json    = { name: [2] },
                field   = select('name', options, json);

            expect(field.children('[value="1"]')).not.toBeSelected();
            expect(field.children('[value="2"]')).toBeSelected();
          });
        });
      });

      context('with multiple path name', function() {
        context('using dot annotation', function() {
          context('without array', function() {
            it ('is selected', function() {
              var options = [Fixtury.option({ html: '1', value: 1 }), Fixtury.option({ html: '2', value: 2 })],
                  json    = { name: { item: { id: 2 } } },
                  field   = select('name.item.id', options, json);

              expect(field.children('[value="1"]')).not.toBeSelected();
              expect(field.children('[value="2"]')).toBeSelected();
            });
          });

          context('with array', function() {
            it ('is selected', function() {
              var options = [Fixtury.option({ html: '1', value: 1 }), Fixtury.option({ html: '2', value: 2 })],
                  json    = { name: { item: [{ id: 2 }] } },
                  field   = select('name.item[0].id', options, json);

              expect(field.children('[value="1"]')).not.toBeSelected();
              expect(field.children('[value="2"]')).toBeSelected();
            });
          });

          context('with double arrays', function() {
            it ('is selected', function() {
              var options = [Fixtury.option({ html: '1', value: 1 }), Fixtury.option({ html: '2', value: 2 })],
                  json    = { name: { item: [{ more: { names: [{ id: 2 }] } }] } },
                  field   = select('name.item[0].more.names[0].id', options, json);

              expect(field.children('[value="1"]')).not.toBeSelected();
              expect(field.children('[value="2"]')).toBeSelected();
            });
          });
        });

        context('using bracket annotation', function() {
          context('without array', function() {
            it ('is selected', function() {
              var options = [Fixtury.option({ html: '1', value: 1 }), Fixtury.option({ html: '2', value: 2 })],
                  json    = { name: { item: { id: 2 } } },
                  field   = select('name[item][id]', options, json);

              expect(field.children('[value="1"]')).not.toBeSelected();
              expect(field.children('[value="2"]')).toBeSelected();
            });
          });

          context('with array', function() {
            it ('is selected', function() {
              var options = [Fixtury.option({ html: '1', value: 1 }), Fixtury.option({ html: '2', value: 2 })],
                  json    = { name: { item: [{ id: 2 }] } },
                  field   = select('name[item][0][id]', options, json);

              expect(field.children('[value="1"]')).not.toBeSelected();
              expect(field.children('[value="2"]')).toBeSelected();
            });
          });

          context('with double arrays', function() {
            it ('is selected', function() {
              var options = [Fixtury.option({ html: '1', value: 1 }), Fixtury.option({ html: '2', value: 2 })],
                  json    = { name: { item: [{ more: { names: [{ id: 2 }] } }] } },
                  field   = select('name[item][0][more][names][0][id]', options, json);

              expect(field.children('[value="1"]')).not.toBeSelected();
              expect(field.children('[value="2"]')).toBeSelected();
            });
          });
        });
      });
    });

    context('with multiple enabled', function() {
      context('with one path name', function() {
        context('with array', function() {
          beforeEach(function() {
            Fixtury.append(Fixtury.form({
              html: Fixtury.select({
                name    : 'name[0]',
                multiple: true,
                html    : [
                  Fixtury.option({ html: '1', value: 1 }),
                  Fixtury.option({ html: '2', value: 2 }),
                  Fixtury.option({ html: '3', value: 3 }),
                ]
              })
            }));
          });

          it ('is selected', function() {
            // given
            var form = $('form');

            // when
            form.populaty({ json: { name: [1, 3] } });

            // then
            expect(form.find('option[value="1"]')).toBeSelected();
            expect(form.find('option[value="2"]')).not.toBeSelected();
            expect(form.find('option[value="3"]')).toBeSelected();
          });
        });
      });

      context('with multiple path name', function() {
        context('using dot annotation', function() {
          context('with array', function() {
            beforeEach(function() {
              Fixtury.append(Fixtury.form({
                html: Fixtury.select({
                  name    : 'name.item[0].id',
                  multiple: true,
                  html    : [
                    Fixtury.option({ html: '1', value: 1 }),
                    Fixtury.option({ html: '2', value: 2 }),
                    Fixtury.option({ html: '3', value: 3 }),
                  ]
                })
              }));
            });

            it ('is selected', function() {
              // given
              var form = $('form');

              // when
              form.populaty({ json: { name: { item: [{ id: 1 }, { id: 3 }] } } });

              // then
              expect(form.find('option[value="1"]')).toBeSelected();
              expect(form.find('option[value="2"]')).not.toBeSelected();
              expect(form.find('option[value="3"]')).toBeSelected();
            });
          });

          context('with double arrays', function() {
            beforeEach(function() {
              Fixtury.append(Fixtury.form({
                html: Fixtury.select({
                  name: 'name.item[0].more.names[0].id',
                  multiple: true,
                  html    : [
                    Fixtury.option({ html: '1', value: 1 }),
                    Fixtury.option({ html: '2', value: 2 }),
                    Fixtury.option({ html: '3', value: 3 }),
                  ]
                })
              }));
            });

            it ('is selected', function() {
              // given
              var form = $('form');

              // when
              form.populaty({ json: { name: { item: [{ more: { names: [{ id: 1 }, { id: 3 }] } }] } } });

              // then
              expect(form.find('option[value="1"]')).toBeSelected();
              expect(form.find('option[value="2"]')).not.toBeSelected();
              expect(form.find('option[value="3"]')).toBeSelected();
            });
          });
        });

        context('using bracket annotation', function() {
          context('with array', function() {
            beforeEach(function() {
              Fixtury.append(Fixtury.form({
                html: Fixtury.select({
                  name: 'name[item][0][id]',
                  multiple: true,
                  html    : [
                    Fixtury.option({ html: '1', value: 1 }),
                    Fixtury.option({ html: '2', value: 2 }),
                    Fixtury.option({ html: '3', value: 3 }),
                  ]
                })
              }));
            });

            it ('is selected', function() {
              // given
              var form = $('form');

              // when
              form.populaty({ json: { name: { item: [{ id: 1 }, { id: 3 }] } } });

              // then
              expect(form.find('option[value="1"]')).toBeSelected();
              expect(form.find('option[value="2"]')).not.toBeSelected();
              expect(form.find('option[value="3"]')).toBeSelected();
            });
          });

          context('with double arrays', function() {
            beforeEach(function() {
              Fixtury.append(Fixtury.form({
                html: Fixtury.select({
                  name: 'name[item][0][more][names][0][id]',
                  multiple: true,
                  html    : [
                    Fixtury.option({ html: '1', value: 1 }),
                    Fixtury.option({ html: '2', value: 2 }),
                    Fixtury.option({ html: '3', value: 3 }),
                  ]
                })
              }));
            });

            it ('is selected', function() {
              // given
              var form = $('form');

              // when
              form.populaty({ json: { name: { item: [{ more: { names: [{ id: 1 }, { id: 3 }] } }] } } });

              // then
              expect(form.find('option[value="1"]')).toBeSelected();
              expect(form.find('option[value="2"]')).not.toBeSelected();
              expect(form.find('option[value="3"]')).toBeSelected();
            });
          });
        });
      });
    });
  });

  describe('textarea', function() {
    context('with one path name', function() {
      context('without array', function() {
        it ('is populated', function() {
          var field = textarea('name', { name: 1 });

          expect(field).toHaveValue(1);

          Fixtury.clear();
        });
      });

      context('with array', function() {
        it ('is populated', function() {
          var field = textarea('name[0]', { name: [1] });

          expect(field).toHaveValue(1);

          Fixtury.clear();
        });
      });
    });

    context('with multiple path name', function() {
      context('using dot annotation', function() {
        context('without array', function() {
          it ('is populated', function() {
            var field = textarea('name.item', { name: { item: 1 } });

            expect(field).toHaveValue(1);

            Fixtury.clear();
          });
        });

        context('with array', function() {
          it ('is populated', function() {
            var field = textarea('name.item[0].id', { name: { item: [{ id: 1 }] } });

            expect(field).toHaveValue(1);

            Fixtury.clear();
          });
        });

        context('with double arrays', function() {
          it ('is populated', function() {
            var field = textarea('name.item[0].more.names[0].id', { name: { item: [{ more: { names: [{ id: 1 }] } }] } });

            expect(field).toHaveValue(1);

            Fixtury.clear();
          });
        });
      });

      context('using bracket annotation', function() {
        context('without array', function() {
          it ('is populated', function() {
            var field = textarea('name.item.id', { name: { item: { id: 1 } } });

            expect(field).toHaveValue(1);

            Fixtury.clear();
          });
        });

        context('with array', function() {
          it ('is populated', function() {
            var field = textarea('name.item[0]id', { name: { item: [{ id: 1 }] } });

            expect(field).toHaveValue(1);

            Fixtury.clear();
          });
        });

        context('with double arrays', function() {
          it ('is populated', function() {
            var field = textarea('name[item][0][more][names][0][id]', { name: { item: [{ more: { names: [{ id: 1 }] } }] } });

            expect(field).toHaveValue(1);

            Fixtury.clear();
          });
        });
      });
    });
  });

  describe('#reset', function() {
    context('enabled', function() {
      beforeEach(function() {
        Fixtury.append(Fixtury.form({
          html: [
            Fixtury.text({ name: 'name' }),
            Fixtury.checkbox({ name: 'name' }),
            Fixtury.checkbox({ name: 'name' }),
            Fixtury.select({
              name    : 'name',
              html    : [
                Fixtury.option({ value: '' }),
                Fixtury.option({ html: '1', value: 1 })
              ]
            }),
            Fixtury.select({
              name    : 'name',
              multiple: true,
              html    : [
                Fixtury.option({ html: '1', value: 1 }),
                Fixtury.option({ html: '2', value: 2 })
              ]
            })
          ]
        }));
      });

      it ('is called before the populaty method', function() {
        // given
        var form       = $('form'),
            text       = form.children(':text'),
            checkboxes = form.children(':checkbox'),
            select     = form.children('select:first'),
            multiple   = form.children('select:last');

        text.val(1);
        checkboxes.click();
        select.children(':last').attr('selected', 'selected');
        multiple.children(':last').attr('selected', 'selected');


        // when
        form.populaty({ json: {} });

        // then
        expect(text).toHaveValue('');
        expect(checkboxes).not.toBeChecked();
      });
    });

    context('disabled', function() {
      beforeEach(function() {
        Fixtury.append(Fixtury.form({
          html: [
            Fixtury.text({ name: 'name' }),
            Fixtury.checkbox({ name: 'name' }),
            Fixtury.checkbox({ name: 'name' }),
            Fixtury.select({
              name    : 'name',
              html    : [
                Fixtury.option({ value: '' }),
                Fixtury.option({ html: '1', value: 1 })
              ]
            }),
            Fixtury.select({
              name    : 'name',
              multiple: true,
              html    : [
                Fixtury.option({ html: '1', value: 1 }),
                Fixtury.option({ html: '2', value: 2 })
              ]
            })
          ]
        }));
      });

      it ('is called before the populaty method', function() {
        // given
        var form       = $('form'),
            text       = form.children(':text'),
            checkboxes = form.children(':checkbox'),
            select     = form.children('select:first'),
            multiple   = form.children('select:last');

        text.val(1);
        checkboxes.click();
        select.children(':last').attr('selected', 'selected');
        multiple.children(':last').attr('selected', 'selected');


        // when
        form.populaty({ json: {}, reset: false });

        // then
        expect(text).toHaveValue(1);
        expect(checkboxes).toBeChecked();
      });
    });
  });

  describe('#_extract', function() {
    it ("a returns ['a']", function() {
      expect(pathFromName('a')).toEqual(['a']);
    });

    it ("[a] returns ['a']", function() {
      expect(pathFromName('[a]')).toEqual(['a']);
    });

    it ("[0] returns ['0']", function() {
      expect(pathFromName('[0]')).toEqual(['0']);
    });

    it ("a.b returns ['a', 'b']", function() {
      expect(pathFromName('a.b')).toEqual(['a', 'b']);
    });

    it ("a.b.c returns ['a', 'b', 'c']", function() {
      expect(pathFromName('a.b.c')).toEqual(['a', 'b', 'c']);
    });

    it ("a[0] returns ['a', '0']", function() {
      expect(pathFromName('a[0]')).toEqual(['a', '0']);
    });

    it ("a[b] returns ['a', 'b']", function() {
      expect(pathFromName('a[b]')).toEqual(['a', 'b']);
    });

    it ("a[0][1] returns ['a', '0', '1']", function() {
      expect(pathFromName('a[0][1]')).toEqual(['a', '0', '1']);
    });

    it ("a[0][b] returns ['a', '0', 'b']", function() {
      expect(pathFromName('a[0][b]')).toEqual(['a', '0', 'b']);
    });

    it ("a[b][0] returns ['a', 'b', '0']", function() {
      expect(pathFromName('a[b][0]')).toEqual(['a', 'b', '0']);
    });

    it ("a[b].c returns ['a', 'b', 'c']", function() {
      expect(pathFromName('a[b].c')).toEqual(['a', 'b', 'c']);
    });

    it ("a[b].c[0] returns ['a', 'b', 'c', '0']", function() {
      expect(pathFromName('a[b].c[0]')).toEqual(['a', 'b', 'c', '0']);
    });

    it ("a[b].c[0][1].d.e[2].f returns ['a', 'b', 'c', '0', '1', 'd', 'e', '2', 'f']", function() {
      expect(pathFromName('a[b].c[0][1].d.e[2].f')).toEqual(['a', 'b', 'c', '0', '1', 'd', 'e', '2', 'f']);
    });

    it ("article[category_ids][] returns ['article', 'category_ids']", function() {
      expect(pathFromName('article[category_ids][]')).toEqual(['article', 'category_ids']);
    });
  });
});
