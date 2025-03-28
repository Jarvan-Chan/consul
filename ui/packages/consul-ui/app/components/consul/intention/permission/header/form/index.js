/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: BUSL-1.1
 */

import Component from '@ember/component';
import { set, computed } from '@ember/object';
import { alias, equal, not } from '@ember/object/computed';
import { inject as service } from '@ember/service';

const name = 'intention-permission-http-header';
export default Component.extend({
  tagName: '',
  name: name,

  schema: service('schema'),
  change: service('change'),
  repo: service(`repository/${name}`),

  onsubmit: function () {},
  onreset: function () {},

  changeset: computed('item', function () {
    return this.change.changesetFor(
      name,
      this.item ||
        this.repo.create({
          HeaderType: this.headerTypes.firstObject,
        })
    );
  }),

  headerTypes: alias(`schema.${name}.HeaderType.allowedValues`),

  headerLabels: computed(function () {
    return {
      Exact: 'Exactly Matching',
      Prefix: 'Prefixed by',
      Suffix: 'Suffixed by',
      Contains: 'Containing',
      Regex: 'Regular Expression',
      Present: 'Is present',
    };
  }),

  headerType: computed('changeset.HeaderType', 'headerTypes.firstObject', function () {
    return this.changeset.HeaderType || this.headerTypes.firstObject;
  }),

  headerTypeEqualsPresent: equal('headerType', 'Present'),
  shouldShowValueField: not('headerTypeEqualsPresent'),

  shouldShowIgnoreCaseField: computed('headerType', function () {
    return this.headerType !== 'Present' && this.headerType !== 'Regex';
  }),

  actions: {
    change: function (name, changeset, e) {
      const valueIndicator = e.target?.type === 'checkbox' ? e.target?.checked : e.target?.value;
      const value = typeof valueIndicator !== 'undefined' ? valueIndicator : e;
      switch (name) {
        default:
          changeset.set(name, value);
      }
      changeset.validate();
    },
    submit: function (changeset) {
      this.headerTypes.forEach((prop) => {
        changeset.set(prop, undefined);
      });
      // Present is a boolean, whereas all other header types have a value
      const value = changeset.HeaderType === 'Present' ? true : changeset.Value;
      changeset.set(changeset.HeaderType, value);
      changeset.set('IgnoreCase', changeset.IgnoreCase);

      // this will prevent the changeset from overwriting the
      // computed properties on the ED object
      delete changeset._changes.HeaderType;
      delete changeset._changes.Value;
      //

      this.repo.persist(changeset);
      this.onsubmit(changeset.data);

      set(
        this,
        'item',
        this.repo.create({
          HeaderType: this.headerType,
        })
      );
    },
    reset: function (changeset, e) {
      changeset.rollback();
    },
  },
});
