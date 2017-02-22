# mediaquery-event

Get events when mediaquery changes happen. written in plain vanilla js.

## example

```
document.addEventListener('mediaquery', function (event) {

  if (!event.detail.active) {
    return; // dont react to mediaqueries becoming inactive
  }
  
  if (event.detail.media === 'desktop') {
      // do something
  }
  
  if (event.detail.media === 'mobile') {
      // do something else
  }
});

mqe.init({
    mediaqueries: [
        {name: 'mobile', media: '(max-width: 1023px)'},
        {name: 'desktop', media: '(min-width: 1024px)'}
    ]
});
```
