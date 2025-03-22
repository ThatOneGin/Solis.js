/*
MIT License

Copyright (c) 2025 ThatOneGin

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
*/

function html_tag(name, ...children) {
  let res = document.createElement(name);
  for (const child of children) {
    if (typeof(child) == "string") {
      res.appendChild(document.createTextNode(child));
    } else {
      res.appendChild(child);
    }
  }
  res.attr = function (index, value) {
    this.setAttribute(index, value);
    return this;
  }
  res.event = function name(event, fn) {
    this.addEventListener(event, fn);
  }
  return res;
}

function div(...children) {
  return html_tag("div", ...children);
}

function update_hash(routes, res) {
  let location = document.location.hash.split("#")[1];
  if (!location) {
    location = "/";
  }
  if (!(location in routes)) {
    console.assert("/404" in routes);
    location = "/404";
  }
  res.replaceChildren(routes[location]);
  return res;
}

function router(routes) {
  const res = html_tag("div");
  update_hash(routes, res);
  window.addEventListener("hashchange", () => update_hash(routes, res));
  res.refresh = () => update_hash(routes, res);
  return res;
}