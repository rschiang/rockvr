function isString(obj) {
  return (Object.prototype.toString.call(obj) === '[object String]');
}

exports.on = function(idOrElement, e, callback) {
    var ele = isString(idOrElement) ? document.getElementById(id) : idOrElement;
    ele.addEventListener(e, callback);
    return ele;
}
