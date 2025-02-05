const posthtml = require('posthtml');
const filename = function (filePath) {return filePath.split('/').pop().split('.')[0]};

module.exports = function () {
	return function altAlways(tree) {
		tree.match({ tag: 'img', attrs: { alt: false } }, function(node) {
            node.attrs.alt = filename(node.attrs.src);
			return node;
		});
        tree.match({ tag: 'img', attrs: { alt: '' } }, function(node) {
			node.attrs.alt = filename(node.attrs.src);
			return node;
		});
	};
};

module.exports.process = function (contents, options) {
	return posthtml().use(module.exports(options)).process(contents);
};
