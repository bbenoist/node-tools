export interface Get {
  get: StringValue;
}

export interface Eval {
  eval: StringValue;
}

export interface SetAny {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  set: {name: StringValue; value: any};
}

export interface SetEval {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  set: {name: StringValue; eval: StringValue};
}

export interface Each<TBody> {
  each: {
    items: StringValue[];
    body: TBody;
    variableName?: StringValue;
  };
}

export interface If<TBody> {
  if: {
    condition: BooleanValue;
    body: TBody;
  };
}

export type Value = StringValue | BooleanValue;

export type StringValue =
  | UnknownValue
  | StringValue[]
  | If<StringValue>
  | Each<StringValue>
  | string
  | FileValue
  | PackageJsonStringValue
  | RushStringValue
  | Eval
  | SetAny
  | SetEval
  | Section
  | Image
  | Link
  | Code
  | Bold
  | Italic
  | Strikethrough
  | Paragraph
  | CodeBlock
  | List
  | Table
  | HorizontalRule
  | RushProjectsTable;

export type BooleanValue =
  | UnknownValue
  | boolean
  | FileExists
  | DirectoryExists
  | RushBooleanValue;

export type UnknownValue = Get | JsonValue;

/** @public */
export interface Document {
  title: StringValue;
  body: StringValue[];
}

/** @public */
export interface Section {
  section: {
    title: StringValue;
    body: StringValue[];
  };
}

/** @public */
export interface Paragraph {
  paragraph: StringValue;
}

/** @public */
export interface CodeBlock {
  codeBlock:
    | StringValue
    | StringValue[]
    | {
        code: StringValue[];
        language?: StringValue;
      };
}

/** @public */
export interface List {
  list: StringValue[];
}

/** @public */
export interface Blockquote {
  blockquote: StringValue[];
}

/** @public */
export interface Table {
  table:
    | StringValue[][]
    | {
        header: StringValue[][];
        rows: StringValue[][][];
        alignment?: StringValue | StringValue[];
      };
}

/** @public */
export interface HorizontalRule {
  horizontalRule: {
    character?: '-' | '=' | '_';
    length?: number;
  };
}

/** @public */
export interface Image {
  image:
    | StringValue
    | {
        url: StringValue;
        alt: StringValue;
      };
}

/** @public */
export interface Link {
  link:
    | StringValue
    | {
        url: StringValue;
        body: Exclude<StringValue, Link>;
      };
}

/** @public */
export interface Code {
  code: StringValue | StringValue[];
}

/** @public */
export interface Bold {
  bold: StringValue;
}

/** @public */
export interface Italic {
  italic: StringValue;
}

/** @public */
export interface Strikethrough {
  strikethrough: StringValue;
}

/** @public */
export interface FileValue {
  file: StringValue;
}

export interface FileExists {
  fileExists: StringValue;
}

export interface DirectoryExists {
  directoryExists: StringValue;
}

export interface JsonValue {
  json:
    | StringValue
    | {
        path: StringValue;
        property?: StringValue;
      };
}

/** @public */
export interface PackageJsonStringValue {
  packageJson:
    | PackageJsonStringValueName
    | {
        property: PackageJsonStringValueName;
        cwd?: StringValue;
      };
}

/** @public */
export type PackageJsonStringValueName =
  | 'name'
  | 'description'
  | 'version'
  | 'license';

export type RushValue = RushStringValue | RushBooleanValue;

export interface RushValueBase<TUnion = string, TObj extends {} = {}> {
  rush: TUnion | (TObj & {cwd?: StringValue; property: TUnion});
}

export type RushProjectValue<TUnion = string> = RushValueBase<
  TUnion,
  {project: StringValue}
>;

export type RushStringValue =
  | RushValueBase<
      | 'rushVersion'
      | 'pnpmVersion'
      | 'npmVersion'
      | 'yarnVersion'
      | 'nodeSupportedVersionRange'
      | 'projects'
      | 'firstProjectFolder'
    >
  | RushProjectValue<'packageName' | 'projectFolder' | 'shouldPublish'>;

export type RushBooleanValue = RushProjectValue<'shouldPublish'>;

export type RushProjectsTable = RushValueBase<'projectsTable'>;
