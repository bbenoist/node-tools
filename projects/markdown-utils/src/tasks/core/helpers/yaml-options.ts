import YAML from 'yaml';
import {OptionsDefinitions} from '../../../task';

export const YAML_OPTIONS: OptionsDefinitions<Omit<YAML.Options, 'tags'>> = {
  anchorPrefix: {
    type: 'string',
    description: 'Default prefix for anchors.'
  },
  indent: {
    type: 'number',
    description: 'The number of spaces to use when indenting code.'
  },
  indentSeq: {
    type: 'boolean',
    description: 'Whether block sequences should be indented.'
  },
  keepBlobsInJSON: {
    type: 'boolean',
    description:
      'Allow non-JSON JavaScript objects to remain in the `toJSON` output.'
  },
  keepCstNodes: {
    type: 'boolean',
    description:
      "Include references in the AST to each node's corresponding CST node."
  },
  keepNodeTypes: {
    type: 'boolean',
    description: 'Store the original node type when parsing documents.'
  },
  mapAsMap: {
    type: 'boolean',
    description:
      'When outputting JS, use Map rather than Object to represent mappings.'
  },
  maxAliasCount: {
    type: 'number',
    description:
      'Prevent exponential entity expansion attacks by limiting data aliasing count; set to `-1` to disable checks; `0` disallows all alias nodes.'
  },
  prettyErrors: {
    type: 'boolean',
    description:
      'Include line position & node type directly in errors; drop their verbose source and context.'
  },
  simpleKeys: {
    type: 'boolean',
    description:
      'When stringifying, require keys to be scalars and to use implicit rather than explicit notation.'
  },
  version: {
    type: 'string',
    description:
      'The YAML version used by documents without a `%YAML` directive.'
  },
  // TODO - Support union of stringArray and string[] => string[] function
  customTags: {
    type: 'stringArray',
    description: 'Array of additional tags to include in the schema.'
    // ...or a function that may modify the schema's base tag array.
  },
  merge: {
    type: 'boolean',
    description: 'Enable support for `<<` merge keys.'
  },
  schema: {
    type: 'string',
    description: 'The base schema to use.'
  },
  sortMapEntries: {
    type: 'boolean',
    description:
      'When stringifying, sort map entries. If `true`, sort by comparing key values with `<`.'
  }
};
