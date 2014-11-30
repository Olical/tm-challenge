# Thought Machine challenge

To get started, run `npm install` to fetch all dependencies and `npm start` to spin up the development server. The npm commands proxy through to gulp, if you wish to execute gulp commands directly, you need to have it installed with the `-g` option (`npm install -g gulp`).

You can use `gulp test` or `npm test` to lint and test the source as well as `gulp test-watch` to continually run them as files change. Below are my "workings out" and thoughts as I go along.

This is my first time ever building something with React so I've learnt a lot along the way. I've wanted to use it for a long time and this seemed like a good opportunity to try it out, it may mean that I'm not following every pattern yet though.

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
 * Another approach for manifest: Allow exporting the data structure as a CSV or plain text, maybe both. I'm going to take this approach I think. It's by far the most practical, the user could be savvy with NPM and running this locally, who knows! They can't give a link to the moving company, they'll be able to email them though. The manifest view should simply generate portable formats (plain text / CSV).

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

 * Find a way to test components that isn't dumb. I've put quite a lot of time into researching this, but it looks like the only good way to test actual components is to use Jest and render them in some fake, massively mocked, way. I wanted to new up the component class and prod the state, like a model, but it looks like that's impossible. You have to render the whole thing in memory and prod the DOM-ish stuff.

## Things I'd want to do next time

 * Continue to develop the `compile` idea in it's own repository to turn it into a clone of the ClojureScript / Reagent / Hiccup style declarative array syntax. It does a lot right now, but it's not perfect and my code looks weird in some places because of that.
 * Plan out the overall architecture more, I've already learned where files grow and complexity builds if left unchecked. Need to make some decisions about where the state should be held, should component local state be used in the way I'm using it? Should things like `isEditing` be global?
 * I'd like to either invest some time in ClojureScript or maybe mix in Immutable.js (also from Facebook) to get even saner and faster data flows. Even though I love learning about Clojure(Script) I'll probably stick to JavaScript and continually improve my tooling and utilities.
 * Have an actual visual / DOM design up front. Design is not my thing, and I've had others dedicated to the CSS for the past year. I've just focussed on the JavaScript since I was trying to learn React / Reflux at the same time, so style is an afterthought and that may show.
 * More routing, I'm only using it to switch between the dashboard and manifest, but I now realise it's incredible and could have helped with a lot of state things.
 * Isomorphism is easy with React (render on the server for instant load and noscript support), this also leads onto progressive enhancement.
 * More generic components. The smaller and more numerous the better.
 * Some kind of standard outline of how to build and scale this sort of thing, I'm winging it as I go because I'm still learning how to build with these tools, but some rules would be nice. I'm amazed at how quickly it can be picked up and used though.
 * Use jsPDF to render the manifest as a PDF and maybe PDF.js to preview it before download. Had to use CSV + plain text as a quick alternative.
 * More tests, I can do better than that. I can test all of the components by instantiating the classes. I originally shied away from it because I thought I'd end up testing the DOM of the components, I think I can around it and test the state manipulating functions now though.
