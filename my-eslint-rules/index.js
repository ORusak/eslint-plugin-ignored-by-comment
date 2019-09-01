/**
 * @fileoverview Disabled plugins by comment
 * @author Oleg Rusak
 */
"use strict";

//------------------------------------------------------------------------------
// Requirements
//------------------------------------------------------------------------------


//------------------------------------------------------------------------------
// Plugin Definition
//------------------------------------------------------------------------------

const PATTERNS = {
  Es6: /^\s*(ESLint-config: server-es6.js)(?:\s|$)/u
};
const disableFiles = {};

const debug = require('debug')('processor');

module.exports = {
  processors: {
    '.js': {
      // takes text of the file and filename
      preprocess: function (text, filename) {
        debug('args', arguments);
        debug('preprocess run');
        const isRequireDisabled = text.indexOf('ESLint-config: server-es6.js') !== -1;

        if (isRequireDisabled) {
          disableFiles[filename] = true;
        } else {
          delete disableFiles[filename];
        }

        return [ // return an array of code blocks to lint
          text
        ];
      },

      // takes a Message[][] and filename
      postprocess: function (messages, filename) {
        debug('args', arguments);
        debug('postprocess run', filename);
        let initMessages = [];

        debug('disabled', disableFiles[filename]);

        if (disableFiles[filename]) {
          initMessages = messages[0].filter(message => {
            // Rule is undefined if ESLint fails to parse source file
            if (!message.ruleId) return true;

            // Plugin rules are prefixed with plugin name: "plugin/some-rule"
            const parts = message.ruleId.split('/');
            const isRemovable = (parts.length === 2 &&
              parts[0] === 'es5');

            // Return "false" to remove a message
            return !isRemovable;
          });
        } else {
          initMessages = messages[0];
        }

        return initMessages;
      },

      supportsAutofix: true // (optional, defaults to false)
    }
  },
};
