# Updates

Listed in most recent version

## 1.0.10

Added `WJS.css` which can return classes based on passed props.

### Examples

```ts
// Returns "always-class"
WJS.css({ }, { always: "always-class", myprop: "another-class" });

// Returns same as above
WJS.css({ myprop: false }, { always: "always-class", myprop: "another-class" });

// Returns "always-class another-class"
WJS.css({ myprop: true }, { always: "always-class", myprop: "another-class" });
```
