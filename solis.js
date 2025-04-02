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

/* The Solis framework main class */
class Solis {
  /**
   * 
   * @param {*} name 
   * @param  {...any} children 
   * @returns {HTMLElement}
   */
  static html_tag(name, ...children) {
    let res = document.createElement(name);
    for (const child of children) {
      if (typeof (child) == "string") {
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

  static div(...children) {
    return this.html_tag("div", ...children);
  }

  static h1(...children) {
    return this.html_tag("h1", ...children);
  }

  /**
   * 
   * @param {Object} routes 
   * @param {HTMLElement} res 
   * @returns 
   */
  static #update_hash(routes, res) {
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

  /**
   * Returns an object with current route.
   * @param {*} routes 
   * @returns 
   */
  static router(routes) {
    const res = this.html_tag("div");
    this.#update_hash(routes, res);
    window.addEventListener("hashchange", () => this.#update_hash(routes, res));
    
    res.refresh = () => this.#update_hash(routes, res);
    return res;
  }
}