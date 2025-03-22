# Solis.js

**Solis.js is a simple front-end framework with focus on functional programming**

### Why?

I wanted to learn front-end development, so i did what most javascript developers has saturated... Frameworks. It was also made for learning-purposes.

Example use:
```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Solis.js overview</title>
</head>
<body>
  <div id="entry_point"></div>
  <script src="solis.js"></script>
  <script>
    // placeholder for the pages
    const entry_point = document.getElementById("entry_point");

    // current active page
    // at document.location.hash
    const page_map = router({
      "/": div(
        html_tag("h1", "Hello, Solis!"),
        html_tag("a", "this goes to foo page").attr("href", "#/foo")
      ),
      "/foo": div(
        html_tag("h1", "Foo page"),
        html_tag("p", "goto 404 page ", html_tag("a", "click me!").attr("href", "#/404"))
      ),
      "/404": div(
        html_tag("h1", "404: page not found."), // the href is the root page.
        html_tag("p", "go to sweet ", html_tag("a", "home").attr("href", "#/"))
      )
    });

    entry_point.appendChild(page_map);
  </script>
</body>
</html>
```