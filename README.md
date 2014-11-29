# Thought Machine challenge

To get started, run `npm install` to fetch all dependencies and `npm start` to spin up the development server. The npm commands proxy through to gulp, if you wish to execute gulp commands directly, you need to have it installed with the `-g` option (`npm install -g gulp`).

You can use `gulp test` or `npm test` to lint and test the source as well as `gulp test-watch` to continually run them as files change. Below are my "workings out" and thoughts as I go along.

## Key requirements

 * List of items
   * Each item has a room, weight, description and if it's fragile or not
   * Show items broken down by room
   * Allow add, update and remove of items
 * Manifest view
   * Sections
     1. Two heaviest per room
     2. Fragile items
     3. All remaining items
   * Should each show description, weight and room

## Tooling

 * Vim + Arch Linux + Terminal + tmux (standard :D)
 * Gulp
 * React
 * Custom React DOM compiler (don't like JSX or their long hand alternative)
 * Browserify
 * Flux architecture (Reflux)
 * Router
 * Pure CSS (I could style it, but this will be faster and look great)
 * Immutable data structures (possibly a stretch, makes React faster though, only needs ref check)
 * Storage abstraction (should be able to serialise back and forth, also a stretch)

## Ideas on how to implement key points

 * Manifest view can encode the data in the URL or a hunk you can copy / paste back in. So it can be shared with anyone. Everything else is stored in your browser.

## Reflux structure

 * Stores
   * roomStore (only need one store, will also hold items, breaking up is overkill)
 * Actions
   * roomActions
     * addRoom(description)
     * updateRoom(roomId, description)
     * removeRoom(roomId)
     * addItem(roomId, description, weight, isFragile)
     * updateItem(itemId, roomId, description, weight, isFragile)
     * removeItem(itemId)
 * Components
   * dashboard
     * room (rooms can be updated, if it doesn't have an ID it will create on write)
       * item (items can be updated, if it doesn't have an ID it will create on write, just like rooms)
   * manifest

Room and item components should have an `isEditable` flag that is set to true in the dashboard, but false by default for the manifest. It's essentially a version of the dashboard with groupings and read only components.

## To do

 * Manifest view
 * Item editor
 * Add item button
 * Find a way to test components that isn't dumb
 * Can only save if all fields are filled

I think I can send a "begin edit" action that changes the main state. This state change will cause an editor to be rendered in place of things that are being edited. When done it performs an update and knocks it out of edit mode. The "add new" buttons can just create a new item and drop it into edit mode.
