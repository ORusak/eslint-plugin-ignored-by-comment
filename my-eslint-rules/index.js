/**
 * @fileoverview Disabled plugins by comment
 * @author Oleg Rusak
 */
"use strict";

//------------------------------------------------------------------------------
// Requirements
//------------------------------------------------------------------------------

// var requireIndex = require("requireindex");



//------------------------------------------------------------------------------
// Plugin Definition
//------------------------------------------------------------------------------

const PATTERNS = {
    Es6: /^\s*(ESLint-config: server-es6.js)(?:\s|$)/u
}

module.exports = {
    meta: {
        type: "suggestion",
        docs: {
            description: "123",
            category: "Stylistic Issues",
            recommended: false,
            url: "https://",
        },
        fixable: null,
        schema: [
            {
                type: "object",
                properties: {},
                additionalProperties: false,
            },
        ],
    },

    create(context) {
        const sourceCode = context.getSourceCode()

        return {
            Program() {
                for (const comment of sourceCode.getAllComments()) {
                    const pattern = PATTERNS[comment.type]
                    if (pattern == null) {
                        continue
                    }
                }
            },
        }
    },
};


