# Dice Animation Feature - TDD Implementation Plan

## Goal
Animate the dice values while waiting for the server to respond with the actual roll result.

## Current State Analysis
- Frontend dice code: `src/public/heisldice/dice.ts`
- Existing tests: `src/public/heisldice/dice.test.ts` (Playwright tests)
- Backend random utility: `src/heisldice/random.ts` (uses Node's `crypto.randomInt`)
- Dice are hidden (`aria-hidden="true"`) while rolling, then revealed when complete
- Existing test at line 77 is stubbed out with a comment about needing to test rapid dice value changes

## Implementation Steps

### 1. Adapt Random Integer Utility for Frontend

- [ ] Read and understand the existing `src/heisldice/random.ts` implementation
- [ ] Read and understand the existing `src/heisldice/random.test.ts` tests
- [ ] Write failing test: `randomInteger(1, 6)` returns values between 1-6 inclusive
- [ ] Write failing test: edge cases (same min/max, negative numbers)
- [ ] Write failing test: verify it works without Node.js dependencies
- [ ] Create `src/public/utils/random.ts` with browser-compatible implementation using `Math.random()`
- [ ] Verify all random utility tests pass

### 2. Create Animation Loop Utility

- [ ] Write failing test: animation starts when called
- [ ] Write failing test: animation stops when cancelled
- [ ] Write failing test: callback is invoked at regular intervals
- [ ] Write failing test: cleanup/memory management
- [ ] Create animation utility using `setInterval`
- [ ] Implement cancel function return value
- [ ] Accept callback and interval duration as parameters
- [ ] Verify all animation utility tests pass

### 3. Integrate Random Values During Roll

- [ ] Read the existing stubbed test at `dice.test.ts:77`
- [ ] Write failing test: mock `randomInteger` to return predictable values
- [ ] Write failing test: verify dice elements update to mocked random values while rolling
- [ ] Write failing test: verify updates happen multiple times (animation loop is working)
- [ ] Write failing test: verify animation stops when API response returns
- [ ] Write failing test: verify final dice values match API response (not animated values)
- [ ] Import browser-compatible `randomInteger` in `dice.ts`
- [ ] Start animation loop when roll begins (after hiding dice)
- [ ] Generate 5 random numbers in animation callback and update dice elements
- [ ] Stop animation when API response arrives
- [ ] Update dice with final API response values
- [ ] Verify all integration tests pass

### 4. Configurable Animation Speed

- [ ] Write failing test: verify animation timing with different interval values
- [ ] Extract animation interval to a constant
- [ ] Verify animation speed tests pass

## Technical Considerations

### Module Loading in Browser
The HTML currently loads dice.ts with a script tag:
```html
<script src="./dice.ts" defer></script>
```

Parcel handles TypeScript transpilation and module bundling, so we can:
- Use ES6 `import` statements in `dice.ts`
- Import the random utility as a module
- Parcel will bundle dependencies automatically

### Mocking in Playwright Tests
For the test at line 77, we need to mock the `randomInteger` function:
- Use Playwright's `page.evaluate()` or `page.addInitScript()` to inject mocked function
- Alternatively, expose the random function on window object for testing
- Or use Playwright's route interception to inject a modified script bundle

### Animation Performance
- Use `requestAnimationFrame` instead of `setInterval` for smoother animations (optional enhancement)
- Ensure animation cleanup to prevent memory leaks
- Consider animation duration (e.g., 100ms intervals for visible changes)

## Testing Strategy

1. **Unit Tests:** Test random utility and animation controller in isolation
2. **Integration Tests:** Use Playwright to test full dice animation flow
3. **TDD Workflow:**
   - Write failing test for random utility
   - Implement random utility
   - Write failing test for animation controller
   - Implement animation controller
   - Write failing test for dice animation integration
   - Integrate animation into dice.ts

## Files to Create/Modify

### New Files
- `src/public/utils/random.ts` - Browser-compatible random integer utility
- `src/public/utils/random.test.ts` - Unit tests for random utility (if using Vitest for utils)
- `src/public/utils/animation.ts` - Animation loop controller (optional separate file)

### Modified Files
- `src/public/heisldice/dice.ts` - Add animation logic
- `src/public/heisldice/dice.test.ts` - Complete test at line 77, add new tests

## Success Criteria

- [ ] Browser-compatible `randomInteger` utility exists and is tested
- [ ] Dice values change rapidly while waiting for API response
- [ ] Animation stops when API response arrives
- [ ] Final dice values match API response
- [ ] No memory leaks from animation loops
- [ ] All tests pass
- [ ] TypeScript compilation succeeds
