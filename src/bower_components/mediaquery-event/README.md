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
        {name: 'mobile', media: 'screen and (max-width: 1023px)'},
        {name: 'desktop', media: 'screen and (min-width: 1024px)'}
    ]
});
```

## bugs and caveats

Good ol' InternetExplorer handles some stuff differently (no kiddin'), not all of
[these "issues"](http://www.javascriptkit.com/dhtmltutors/cssmediaqueries4.shtml) are handled yet:
- Your mediaquery.media should start with "screen and", otherwise IE adds its own idea to it.
