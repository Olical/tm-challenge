# Thought Machine challenge

Get running instantly with `./run.sh` (as long as you have npm installed). Below are my "workings out" and thoughts as I go along.

## Key requirements

 * List of items
   * Each item has a room, weight, description and if it's fragile or not
   * Show items broken down by room
 * Manifest view
   * Sections
     1. Two heaviest per room
     2. Fragile items
     3. All remaining items
   * Should each show description, weight and room (not sure if this only applies to section 3?)

## Tooling

 * Vim + Arch Linux + Terminal + tmux (standard :D)
 * Gulp
 * React
 * Custom React DOM constructor (don't like JSX or their long hand alternative)
 * Browserify
 * Flux architecture
 * Router
 * Pure CSS (I could style it, but this will be faster and look great)
 * Immutable data structures (possibly a stretch, makes React faster though, only needs ref check)
 * Storage abstraction (should be able to serialise back and forth)

## Ideas on how to implement key points

 * Manifest view can encode the data in the URL or a hunk you can copy / paste back in. So it can be shared with anyone. Everything else is stored in your browser.
