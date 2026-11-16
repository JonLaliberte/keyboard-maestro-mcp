/**
 * Guidance text for models using this server: a short `instructions` string
 * sent at initialization, and a longer macro-authoring guide exposed as an
 * MCP prompt and a resource. Links point to the Keyboard Maestro wiki.
 */

export const SERVER_INSTRUCTIONS = `This server controls Keyboard Maestro on macOS (macros, groups, actions, triggers, variables, logs).

Before building or editing macros, load the km_macro_authoring prompt (also the km-guide://macro_authoring resource). It covers variable scopes, tokens vs. calculations, action XML, and a safe workflow for editing macros. For what a specific action, token or function does, refer to the Keyboard Maestro wiki at https://wiki.keyboardmaestro.com. Add ?do=export_raw to a page URL to get its source text without the site navigation.`;

export const MACRO_AUTHORING_GUIDE = `# Building Keyboard Maestro macros with this server

## Look things up first
When you are unsure what an action, token or function does or what it is called, check the Keyboard Maestro wiki rather than guessing. Fetch only the pages you need.

Find the exact name on an index page (these lists are generated, so use the normal page, not the raw export):
- Actions: https://wiki.keyboardmaestro.com/Actions
- Tokens: https://wiki.keyboardmaestro.com/Tokens
- Functions: https://wiki.keyboardmaestro.com/Functions

Then read the page's source text by adding \`?do=export_raw\`. Page names use underscores for spaces:
- Action: https://wiki.keyboardmaestro.com/action/Execute_a_Shell_Script?do=export_raw
- Token: https://wiki.keyboardmaestro.com/token/SystemClipboard?do=export_raw
- Function: https://wiki.keyboardmaestro.com/function/JSONVALUE?do=export_raw
- Other topics: https://wiki.keyboardmaestro.com/manual/Variables?do=export_raw, https://wiki.keyboardmaestro.com/manual/Calculations?do=export_raw, https://wiki.keyboardmaestro.com/Text_Fields?do=export_raw, https://wiki.keyboardmaestro.com/Troubleshooting?do=export_raw

## Variables
- **Global** variables persist across runs and are visible to every macro. Avoid them for scratch values.
- **Local** variables (name starts with \`Local\`) belong to one macro execution and are not visible to sub-macros. Prefer these for temporary values.
- **Instance** variables (name starts with \`Instance\`) belong to one execution and are shared with sub-macros it runs.
- **Password** variables (name begins or ends with \`Password\` or \`PW\`) live only in memory and are never written to disk.
- Setting a variable to the empty string deletes it. Clear Global and Password variables when done.
- In text fields, insert a variable with the token \`%Variable%Name%\`. In calculation fields (numbers, conditions) use the bare name: \`Count + 1\`.
- Shell scripts see variables as environment variables \`$KMVAR_Name\` (spaces become underscores). AppleScript uses \`tell application "Keyboard Maestro Engine" to getvariable "Name"\` (add \`instance kmInst\` for Local/Instance variables). Details: https://wiki.keyboardmaestro.com/action/Execute_a_Shell_Script?do=export_raw and https://wiki.keyboardmaestro.com/manual/Scripting?do=export_raw.

## Text fields, tokens and calculations
- Text fields expand tokens such as \`%SystemClipboard%\`, \`%ShortDate%\`, \`%FrontWindowName%\`, \`%Calculate%1+2%\`. Check the wiki's token list for the exact name.
- Calculation fields take expressions and functions, e.g. \`RANDOM\`, \`ROUND\`, \`NOW\`, \`JSONVALUE\`.
- Many actions have a gear menu option to process or not process tokens. Literal \`%\` in a text field must be written as \`%%\`.

## Action XML
Actions, triggers and conditions are XML plist \`<dict>\` fragments. Every action has a \`MacroActionType\`, for example:
\`\`\`xml
<dict>
  <key>MacroActionType</key>
  <string>SetVariableToText</string>
  <key>Variable</key>
  <string>Local_Result</string>
  <key>Text</key>
  <string>%SystemClipboard%</string>
</dict>
\`\`\`
The wiki documents what actions do, not their XML keys. To get the exact XML for an action type:
1. Use a high-level helper if one exists (\`km_add_notification\`, \`km_add_pause\`, \`km_add_set_variable\`, \`km_add_calculation\`, \`km_add_display_text\`, \`km_add_if_variable_contains\`, \`km_add_if_calculation\`, \`km_add_execute_macro\`, \`km_add_shell_script\`).
2. Otherwise find an existing macro that uses that action (\`km_search_macros\`) and copy its XML with \`km_get_action_xml\`, changing only what you need.
3. If none exists, ask the user to add one in the Keyboard Maestro editor, then read it back.
Remove \`ActionUID\` keys from copied XML; Keyboard Maestro assigns new ones.

## Safe editing workflow
1. Read before writing: \`km_get_macro\` / \`km_list_actions\` / \`km_get_macro_xml\`.
2. For risky changes, \`km_clone_macro\` first and edit the copy.
3. Make small changes and read back the result.
4. Test with \`km_run_macro\`, then check \`km_get_errors\` / \`km_get_log\` for failures.
5. Disabled macros or macro groups do not fire; group activation rules (application-specific groups, palettes) also affect triggers. See https://wiki.keyboardmaestro.com/manual/Macro_Groups?do=export_raw.
`;
