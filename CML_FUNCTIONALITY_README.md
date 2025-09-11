# CML (Content Markup Language) Functionality

## Overview
The CML functionality in the Template editor allows users to insert rule descriptions from the Digital Content Manager directly into their template content with interactive capabilities.

## Features

### 1. Inserting CML Content
- Click the "+ CML" button in the editor toolbar
- Browse and select rules from the Digital Content Manager
- Click "Insert" to add the rule description at the current cursor position
- The rule description is inserted as plain text for easy editing

### 2. Visual Feedback
- Selected rules are highlighted with a blue background
- Tooltips show rule ID and instructions when hovering over rows
- The insert button shows the selected rule name
- A preview of the selected rule appears in the dialog header

### 3. Cursor Position Tracking
- Content is inserted exactly where the cursor is positioned in the editor
- Cursor position is tracked on clicks and key presses
- After insertion, cursor moves to the end of the inserted content

### 4. Double-Click to Edit
- Double-click on any inserted CML content in the editor
- The system automatically identifies which rule the content belongs to
- Opens the Edit Rule dialog for that specific rule
- Content is automatically selected to show which text will be affected

### 5. Rule ID Hover Information
- Hover over any rule row in the CML selection dialog
- Displays the rule ID and selection instructions
- Provides context for rule identification

## Technical Implementation

### Content Mapping
- Uses localStorage to maintain a mapping between inserted descriptions and rule IDs
- Key: `cml-content-map` stores description → rule ID relationships
- Allows for accurate rule identification on double-click

### Text Selection Logic
- Expands selection to word and line boundaries for better content identification
- Handles partial matches and full descriptions
- Preserves editor state and cursor position

### Integration Points
- Connects with existing Digital Content Manager data
- Uses the same rule editing flow as the main DCM interface
- Maintains consistency with existing UI patterns

## User Workflow

1. **Content Creation**
   - Navigate to Template page
   - Position cursor where content should be inserted
   - Click "+ CML" button

2. **Rule Selection**
   - Browse available rules in the popup table
   - Click on desired rule to select it
   - Review rule details in the preview section
   - Click "Insert" to add to editor

3. **Content Editing**
   - Edit the inserted content as needed
   - Double-click on CML content to open rule editor
   - Make changes to the rule if needed
   - Changes affect all instances where that rule is used

## Error Handling

- Gracefully handles cases where no rules exist
- Shows helpful message when DCM is empty
- Prevents insertion without rule selection
- Handles missing or corrupted mapping data

## Future Enhancements

- Visual highlighting of CML content in the editor
- Bulk operations for multiple rule insertions
- Real-time synchronization with rule changes
- Export/import of content mappings