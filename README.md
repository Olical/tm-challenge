# Thought Machine challenge

To get started, run `npm install` to fetch all dependencies and `npm start` to spin up the development server. The npm commands proxy through to gulp, if you wish to execute gulp commands directly, you need to have it installed with the `-g` option (`npm install -g gulp`).

You can use `gulp test` or `npm test` to lint and test the source as well as `gulp test-watch` to continually run them as files change. Below are my "workings out" and thoughts as I go along.

## Key requirements

 * List of items
  * Each item has a room, weight, description and if it's fragile or not
  * Show items broken down by room
  * Allow add, edit and remove of items
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
  * RoomStore (only need one, will also hold items, breaking up is overkill)
 * Actions
  * roomActions
   * addRoom(description)
   * removeRoom(roomId)
   * addItem(roomId, description, weight, isFragile)
   * removeItem(itemId)
 * Components
  * RoomEditor
   * Room (rooms can be edited, if it doesn't have an ID it will create on write)
    * Item (items can be edited, if it doesn't have an ID it will create on write, just like rooms)
  * Manifest
   * ItemsGroup
