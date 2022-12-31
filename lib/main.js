var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var style = "\n.title-bar {\n  padding: 10px;\n  text-align: center;\n}\n\n.window {\n  box-shadow: 5px 5px 15px #00000030;\n  overflow: hidden;\n  border-radius: 10px;\n  position: fixed;\n}\n\n.body {\n  padding: 10px;\n  width: calc(100% - 20px);\n  height: calc(100% - 1rem - 40px);\n  background-color: white;\n}\n";
var uyouWindow = /** @class */ (function (_super) {
    __extends(uyouWindow, _super);
    function uyouWindow() {
        var _this = _super.call(this) || this;
        _this._data = {
            title: _this.getAttribute('title') ? _this.getAttribute('title') : 'title',
            titleBarColor: _this.getAttribute('tb-color') ? _this.getAttribute('tb-color') : 'blue',
            titleTextColor: _this.getAttribute('tt-color') ? _this.getAttribute('tt-color') : 'white',
            width: _this.getAttribute('width') ? _this.getAttribute('width') : '400',
            height: _this.getAttribute('height') ? _this.getAttribute('height') : '300',
            top: _this.getAttribute('y') ? _this.getAttribute('y') : '0',
            left: _this.getAttribute('x') ? _this.getAttribute('x') : '0'
        };
        _this.render();
        return _this;
    }
    uyouWindow.prototype.render = function () {
        var _a, _b;
        var shadow = this.attachShadow({ mode: 'open' });
        var styleDom = document.createElement('style');
        styleDom.innerHTML = style;
        shadow.innerHTML = "\n    <div class=\"window\" style=\"width: ".concat(this._data.width, "px; height: ").concat(this._data.height, "px; top: ").concat(this._data.top, "px; left: ").concat(this._data.left, "px;\">\n      <div class=\"title-bar\" style=\"background-color: ").concat(this._data.titleBarColor, "; color: ").concat(this._data.titleTextColor, "\">").concat(this._data.title, "</div>\n      <div class=\"body\">\n       <slot></slot>\n      </div>\n    </div>\n    ");
        shadow.appendChild(styleDom);
        var windowDom = shadow.querySelector('.window');
        var x, y;
        var windowMove = function (e) {
            windowDom.style.top = e.clientY - y + 'px';
            windowDom.style.left = e.clientX - x + 'px';
        };
        (_a = windowDom === null || windowDom === void 0 ? void 0 : windowDom.querySelector('.title-bar')) === null || _a === void 0 ? void 0 : _a.addEventListener('mousedown', function (e) {
            var _a;
            x = e.offsetX;
            y = e.offsetY;
            (_a = windowDom.querySelector('.title-bar')) === null || _a === void 0 ? void 0 : _a.addEventListener('mousemove', windowMove);
        });
        (_b = windowDom === null || windowDom === void 0 ? void 0 : windowDom.querySelector('.title-bar')) === null || _b === void 0 ? void 0 : _b.addEventListener('mouseup', function () {
            var _a;
            (_a = windowDom.querySelector('.title-bar')) === null || _a === void 0 ? void 0 : _a.removeEventListener('mousemove', windowMove);
        });
    };
    return uyouWindow;
}(HTMLElement));
window.customElements.define('uyou-window', uyouWindow);
